"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { SiteHeader } from "./site-header";
import ClientFooter from "./footer";
export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/doctor/dashboard") ||
    pathname.startsWith("/signup")
  )
    return <>{children}</>;
  return (
    <>
      <SiteHeader />
      {children}
      <ClientFooter />
    </>
  );
}
