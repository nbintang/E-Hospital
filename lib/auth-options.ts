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
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      async profile(profile) {
        const adminUser = await findUserByEmail(profile.email);
        return {
          id: adminUser?.id as string,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: adminUser?.role,
        };
      },
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
        // Google-specific sign-in
        if (!profile?.email) {
          return false;
        }

        const user = await db.users.upsert({
          where: { email: profile.email },
          update: {},
          create: {
            email: profile.email,
            password: "", // Placeholder for OAuth users
            termAccepted: true,
            profile: {
              create: {
                fullname: profile.name || "Anonymous User",
                profileUrl: profile.picture || null,
              },
            },
          },
        });

        if (!user) {
          return false;
        }
        return true;
      }

      if (account?.provider === "credentials") {
        return true;
      }

      return false;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
        },
      };
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      return token;
    },
  },
};
export default authOptions;
