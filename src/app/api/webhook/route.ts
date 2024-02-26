import Stripe from "stripe";
import { headers } from "next/headers";
import { ObjectId } from "mongodb";
import UserModel from "@/models/User";
import DArtModel, { DArt } from "@/models/DArt";
import dbConnect from "@/utils/dbConnect";
export const POST = async (req: Request) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    typescript: true,
  });
  try {
    const payload = await req.text();
    const headersList = headers();
    const sig = headersList.get("stripe-signature");
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        payload,
        sig!,
        process.env.STRIPE_WEBHOOK_SECRET!,
      );
    } catch (err) {
      return new Response(`webhook error ${err}`, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
      await dbConnect();
      const session = event.data.object;
      if (!session.client_reference_id)
        return new Response("Internal Server Error", { status: 500 });
      const userId = new ObjectId(session.client_reference_id);
      const user = await UserModel.findById(userId);
      if (!user) return new Response("Internal Server Error", { status: 500 });
      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
        event.data.object.id,
        {
          expand: ["line_items"],
        },
      );
      const lineItems = sessionWithLineItems.line_items;
      if (!lineItems)
        return new Response("Internal Server Error", { status: 500 });
      for (const lineItem of lineItems.data) {
        const product = await DArtModel.findOne({
          price_id: lineItem.price?.id,
        });
        if (!product)
          return new Response("Internal Server Error", { status: 500 });
        if (product.nCopies > lineItem.quantity!) {
          product.nCopies -= lineItem.quantity!;
          await product.save();
        } else {
          await DArtModel.deleteOne({ price_id: lineItem.price?.id });
        }
        user.purchasedArts?.push(product.uuid);
        await user.save();
      }
      return new Response("success", { status: 200 });
    }
  } catch (error) {
    return new Response("webhook error", { status: 400 });
  }
  return new Response("success", { status: 200 });
};
