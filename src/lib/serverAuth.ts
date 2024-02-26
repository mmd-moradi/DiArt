// "use server";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import UserModel from "@/models/User";
// import { getServerSession } from "next-auth";
// import { NextRequest } from "next/server";

// const serverAuth = async () => {
//   const session = await getServerSession(authOptions);
//   if (!session?.user?.email) {
//     throw new Error("Unauthorized, email not found");
//   }
//   const currentUser = await UserModel.findOne({ email: session.user.email });
//   if (!currentUser) {
//     throw new Error("Unauthorized");
//   }
//   return { currentUser };
// };

// export default serverAuth;
