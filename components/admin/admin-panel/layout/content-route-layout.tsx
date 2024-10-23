"use client";
import { usePathname } from "next/navigation";
import { ContentLayout } from "./content-layout";

export  function ContentRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  let name;
  switch (pathname) {
    case "/dashboard": {
      name = "Dashboard";
      break;
    }
    case "/dashboard/users": {
      name = "Users";
      break;
    }
    case "/dashboard/products": {
      name = "Products";
      break;
    }
    case "/dashboard/questions": {
      name = "Questions";
      break;
    }
    case "/dashboard/appointments": {
      name = "Appointments";
      break;
    }
    case "/dashboard/articles": {
      name = "Articles";
      break;
    }
    case "/dashboard/ordered-products": {
      name = "Ordered Products";
      break;
    }
    case "/dashboard/account": {
      name = "Account";
      break;
    }
    default: {
      name = "Dashboard";
      break;
    }
  }

  return <ContentLayout title={name}>{children}</ContentLayout>;
}
