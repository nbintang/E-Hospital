import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { findUserByEmail } from "@/repositories/users.repository";
import { verifyPassword } from "@/helper/server/verify-password";
import { findProfileByUserId } from "@/repositories/profile.repository";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
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

          if (!user) {
            throw new Error("User not found");
          }
          const password = credentials.password;
          const hashedPassword = user.password;

          const isPasswordValid = await verifyPassword({
            password,
            hashedPassword,
          });

          if (!isPasswordValid) {
            throw new Error("Invalid email or password");
          }
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
      if (account?.provider === "credentials") {
        return true;
      }
      return false; // Reject if not handled
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
    async jwt({ token, user }) {
      if (user) {
        const u = await findUserByEmail(user.email as string);
        console.log({
          ...token,
          id: user.id,
          role: u?.role,
        });

        return {
          ...token,
          id: user.id,
          role: u?.role,
        };
      }
      console.log("JWT reused:", token);
      return token;
    },
  },
};
export default authOptions;
