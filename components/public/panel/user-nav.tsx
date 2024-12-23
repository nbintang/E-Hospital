"use client";

import Link from "next/link";
import { LayoutGrid, LoaderCircleIcon, LogOut, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { Role } from "@prisma/client";
import getAuthenticatedUserSession from "@/helper/server/get-authenticated-user-seesion";
import { redirect, usePathname } from "next/navigation";
import { useHandleLoadingNavigate } from "@/hooks/use-handle-loading-navigate";
interface UserProfilProp {
  name: string;
  image?: string;
  email: string;
  picture?: string;
  role?: Role;
}

export function UserNav({ name, image, email }: UserProfilProp) {
  const pathname = usePathname();
  const handleNavigate = useHandleLoadingNavigate({ pathname: pathname });
  return (
    <DropdownMenu>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={image as string} alt={name} />
                <AvatarFallback className="bg-transparent">
                  {name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent side="bottom">Profile</TooltipContent>
      </Tooltip>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <form
              action={async () => {
                const session = await getAuthenticatedUserSession();
                console.log(session);
                if (session?.user.role === "DOCTOR") {
                  handleNavigate("/doctor/dashboard/account");
                }
                if (session?.user.role === "PATIENT") {
                  handleNavigate("/account");
                }
                if (session?.user.role === "ADMIN") {
                  handleNavigate("/dashboard/account");
                }
              }}
            >
              <Button
                type="submit"
                variant={"ghost"}
                className="flex items-center"
              >
                <User className="w-4 h-4 mr-3 text-muted-foreground" />
                Account
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="hover:cursor-pointer"
          onClick={async () => {
            toast.promise(signOut(), {
              loading: "Signing out...",
              success: "Signed out successfully",
              error: "Failed to sign out, please try again later",
            });
          }}
        >
          <LogOut className="w-4 h-4 mr-3 text-muted-foreground" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
