import { formatSlugToTitle } from "@/helper/common";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export function useHandleLoadingNavigate({ pathname }: { pathname: string }) {
  const router = useRouter();
  const handleNavigate = (href: string) => {
    if (pathname === href) return;
    const currentRoute = `${href
      .split("/")
      .pop()
      ?.slice(0, 1)
      .toUpperCase()}${href.split("/").pop()?.slice(1)}`;
    toast.loading(`to the ${formatSlugToTitle(currentRoute)}`, {
      id: "redirect",
      position: "bottom-right",
    });

    router.push(href);
  };

  useEffect(() => {
    toast.dismiss("redirect"); 
  }, [pathname]);
  return handleNavigate;
}
