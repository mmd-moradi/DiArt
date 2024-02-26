import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { authOptions } from "../auth/[...nextauth]/route";
import UserModel from "@/models/User";

interface Products {
  price_id: string;
  quantity: number;
}

interface CheckoutReq {
  data: Products[];
}

export const POST = async (req: NextRequest) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    typescript: true,
  });
  const { data } = (await req.json()) as CheckoutReq;
  const userSession = await getServerSession(authOptions);
  if (!userSession || !userSession.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = await UserModel.findOne({ email: userSession.user.email });
  const userData = JSON.parse(JSON.stringify(user));
  const userId: string = userData._id;
  const session = await stripe.checkout.sessions.create({
    line_items: data.map((item) => {
      return {
        price: item.price_id,
        quantity: item.quantity,
      };
    }),
    mode: "payment",
    client_reference_id: userId,
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
  });
  if (!session.url) {
    return NextResponse.json({ error: "Somthing went wrong" }, { status: 500 });
  }
  return NextResponse.json(session.url);
};
