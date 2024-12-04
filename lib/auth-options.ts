import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { findUserByEmail } from "@/repositories/users.repository";
import { verifyPassword } from "@/helper/server/verify-password";
import { findProfileByUserId } from "@/repositories/profile.repository";
import GoogleProvider from "next-auth/providers/google";
import db from "./db";
const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Enter your email",
          type: "email",
          placeholder: "hello@example.com",
        },
        password: { label: "Enter your password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        try {
          const user = await findUserByEmail(credentials.email);

          if (!user) throw new Error("User not found");

          if (user.termAccepted === false)
            throw new Error("Please accept terms and conditions");

          const password = credentials.password;
          const hashedPassword = user.password;

          const isPasswordValid = await verifyPassword({
            password,
            hashedPassword,
          });

          if (!isPasswordValid) throw new Error("Invalid email or password");

          const userProfile = await findProfileByUserId({ userId: user.id });
          return {
            id: user.id as string,
            name: userProfile?.fullname,
            image: userProfile?.profileUrl,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message || "Invalid email or password");
          } else {
            throw new Error("An unknown error occurred");
          }
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ profile, account }) {
      if (account?.provider === "google") {
        if (!profile?.email) return false;

        const user = await db.users.upsert({
          where: { email: profile.email },
          update: {},
          create: {
            email: profile.email,
            password: "",
            termAccepted: true,
            profile: {
              create: {
                fullname: profile.name || "Anonymous User",
                profileUrl: profile.picture || null,
              },
            },
          },
        });
        if (!user) return false;
        return true;
      }

      if (account?.provider === "credentials") return true;
      return false;
    },
    async session({ session, token }) {
      const customSession = {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
        },
      };
      return customSession;
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        const u = await findUserByEmail(user.email as string);
        if (!u) return token;
        const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60 * 24; // 1 day

        return {
          ...token,
          id: user.id,
          role: u.role,
          exp: expirationTime,
        };
      }
      return token;
    },
  },
};
export default authOptions;