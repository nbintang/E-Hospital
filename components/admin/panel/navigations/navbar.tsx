import { ModeToggle } from "@/components/mode-toggle";
import { UserNav } from "@/components/client/panel/user-nav";
import { SheetMenu } from "@/components/admin/panel/navigations/sheet-menu";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useSession } from "next-auth/react";

interface NavbarProps {
  title: string;
}

export function Navbar({ title }: NavbarProps) {
  const { data: session, status } = useSession();
  return (
    <TooltipProvider>
      <header className="sticky top-0 z-30 w-full bg-clean-pool  shadow backdrop-blur supports-[backdrop-filter]:bg-clean-pool  dark:shadow-secondary">
        <div className="mx-4 sm:mx-8 flex h-14 items-center">
          <div className="flex items-center space-x-4 lg:space-x-0">
            <SheetMenu />
            <h1 className="font-bold text-white">{title}</h1>
          </div>
          <div className="flex flex-1 items-center justify-end">
            {/* <ModeToggle /> */}
            {status === "authenticated" && (
              <UserNav
                name={session?.user?.name as string}
                image={session?.user?.image as string}
                email={session?.user.email as string}
              />
            )}
            {status === "unauthenticated" && (
              <p className="bg-red-500 text-white">Something went wrong</p>
            )}
          </div>
        </div>
      </header>
    </TooltipProvider>
  );
}
