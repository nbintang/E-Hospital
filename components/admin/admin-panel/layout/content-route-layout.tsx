"use client";
import { usePathname } from "next/navigation";
import { ContentLayout } from "./content-layout";

export function ContentRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const title: Record<string, string> = {
    "": "Dashboard",
    "/users": "Users",
    "/products": "Products",
    "/questions": "Questions",
    "/appointments": "Appointments",
    "/articles": "Articles",
    "/ordered-products": "Ordered Products",
    "/account": "Account",
  };
  const subPath =
    pathname.startsWith("/dashboard") 
      ? pathname.replace("/dashboard", "")
      : "";
  const name = title[subPath] || "Dashboard";

  return <ContentLayout title={name}>{children}</ContentLayout>;
}
