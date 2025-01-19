"use client";
import React from "react";
import { NextAuthProviders } from "./auth-provider";
import RQProvider from "./rq-provider";
import { SigninDialog } from "../auth/signin/signin-dialog";
import PublicLayout from "../public/panel/public-layout";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "sonner";
interface ChildrenProps {
  children: React.ReactNode;
}
export default function Providers({ children }: ChildrenProps) {
  return (
    <>
      <NextNProgress />
      <NextAuthProviders>
        <RQProvider>
          <SigninDialog />
          <PublicLayout>{children}</PublicLayout>
        </RQProvider>
      </NextAuthProviders>
      <Toaster />
    </>
  );
}
