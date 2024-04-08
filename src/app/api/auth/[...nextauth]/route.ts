import { randomChar, randomPass } from "@/lib/randomPass";
import UserModel from "@/models/User";
import dbConnect from "@/utils/dbConnect";
import nextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password, username } = credentials as {
          username: string;
          email: string;
          password: string;
        };
        dbConnect();
        console.log(email, password);
        const user = await UserModel.findOne({ email });
        if (!user) {
          throw new Error("email/pawssword is incorrect");
        }
        const passwordMatch = await user.comparePassword(password);
        if (!passwordMatch) {
          throw new Error("email/pawssword is incorrect");
        }
        return {
          username: user.userName,
          email: user.email,
          id: user._id,
        };
      },
    }),
  ],
  callbacks: {
    jwt(params: any) {
      if (params.user?.id) {
        params.token.id = params.user.id;
      }
      return params.token;
    },
    async session({ session, token, user }) {
      if (session.user) {
        (session.user as { id: string }).id = token.id as string;
      }
      await dbConnect();

      if (session.user && session.user.email) {
        const currentUser = await UserModel.findOne({
          email: session.user.email,
        });
        if (!currentUser) {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(randomPass(), salt);
          const newUser = await UserModel.create({
            userName: session.user.name?.split(" ")[0] + "_" + randomChar(3),
            email: session.user.email,
            password: hashedPassword,
          });
        }
      }
      return session;
    },
  },
};

const authHandler = nextAuth(authOptions);

export { authHandler as GET, authHandler as POST };
