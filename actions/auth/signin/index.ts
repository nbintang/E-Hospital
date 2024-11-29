"use server";

import { findUserByEmail } from "@/repositories/users.repository";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function handleSignIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const user = await findUserByEmail(email);
    if (!user) throw new Error("User not found");
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (user?.role === "ADMIN" || user?.role === "DOCTOR") {
      redirect("/dashboard");
    } else {
      redirect("/");
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
