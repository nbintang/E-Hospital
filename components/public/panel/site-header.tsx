"use client";

import * as React from "react";
import Link from "next/link";
import { Search, Menu, LogsIcon, LoaderCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Company from "@/components/icons/company";
import { cn } from "@/lib/utils";
import useOpenAuthDialog from "@/hooks/dialog/use-open-auth-dialog";
import { useSession } from "next-auth/react";
import { UserNav } from "./user-nav";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function SiteHeader() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { setShowSignIn: setIsOpenDialogSignin } = useOpenAuthDialog();
  const { data: session, status } = useSession();

  return (
    <TooltipProvider disableHoverableContent>
      <header className="sticky flex justify-center top-0 px-2 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-clean-pool">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative ">
              <Company className="h-10 w-10" />
            </div>
            <div className="lg:flex hidden flex-col">
              <span className="font-bold text-sm text-destructive">
                Rumah Sakit
              </span>
              <span className=" text-xs text-white">Inovasi Medika</span>
            </div>
          </Link>
          <NavigationMenu className="hidden md:ml-6 md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={navigationMenuTriggerStyle()}>
                  Layanan
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Konsultasi Online
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Dapatkan saran medis dari dokter terpercaya kapan
                            saja dan di mana saja.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/questions" title="Tanya Dokter">
                      Ajukan pertanyaan dan dapatkan jawaban dari dokter ahli.
                    </ListItem>
                    <ListItem href="/toko-obat" title="Toko Obat">
                      Beli obat dengan resep atau tanpa resep dengan mudah.
                    </ListItem>
                    <ListItem href="/appointments" title="Buat Janji">
                      Jadwalkan kunjungan ke dokter atau rumah sakit.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger>
                    <NavigationMenuLink
                      href="/articles"
                      className={navigationMenuTriggerStyle()}
                    >
                      Artikel
                    </NavigationMenuLink>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Halaman Artikel</TooltipContent>
                </Tooltip>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger>
                    <NavigationMenuLink
                      href="/about"
                      className={navigationMenuTriggerStyle()}
                    >
                      Tentang Kami
                    </NavigationMenuLink>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    Halaman Tentang Rumah Sakit ini
                  </TooltipContent>
                </Tooltip>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="ml-auto flex items-center space-x-4">
            <div className="relative hidden md:block w-60">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari dokter atau artikel..."
                className="pl-8"
              />
            </div>
            {status === "unauthenticated" && (
              <Button
                className={cn("hidden md:inline-flex border hover:opacity-80")}
                variant={"blue"}
                onClick={() => setIsOpenDialogSignin(true)}
              >
                Masuk
              </Button>
            )}
            {status === "loading" && (
              <LoaderCircleIcon className="animate-spin text-white h-6 w-6" />
            )}
            {status === "authenticated" && (
              <UserNav
                email={session.user.email as string}
                image={session.user.image || ""}
                name={session.user.name as string}
              />
            )}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <LogsIcon className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetTitle className="hidden"></SheetTitle>
                <nav className="flex flex-col space-y-4">
                  <Link
                    href="/"
                    className="text-lg font-semibold"
                    onClick={() => setIsOpen(false)}
                  >
                    Beranda
                  </Link>
                  <details>
                    <summary className="text-lg font-semibold cursor-pointer">
                      Layanan
                    </summary>
                    <ul className="pl-4 mt-2 space-y-2">
                      <li>
                        <Link
                          href="/tanya-dokter"
                          onClick={() => setIsOpen(false)}
                        >
                          Tanya Dokter
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/toko-obat"
                          onClick={() => setIsOpen(false)}
                        >
                          Toko Obat
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/buat-janji"
                          onClick={() => setIsOpen(false)}
                        >
                          Buat Janji
                        </Link>
                      </li>
                    </ul>
                  </details>
                  <Link
                    href="/artikel"
                    className="text-lg font-semibold"
                    onClick={() => setIsOpen(false)}
                  >
                    Artikel
                  </Link>
                  <Link
                    href="/tentang-kami"
                    className="text-lg font-semibold"
                    onClick={() => setIsOpen(false)}
                  >
                    Tentang Kami
                  </Link>
                  <div className="relative w-full mt-4">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Cari dokter atau artikel..."
                      className="pl-8 w-full"
                    />
                  </div>
                  {status === "unauthenticated" ? (
                    <Button
                      className="w-full mt-4 "
                      variant={"outline"}
                      onClick={() => (
                        setIsOpenDialogSignin(true), setIsOpen(false)
                      )}
                    >
                      Masuk
                    </Button>
                  ) : null}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </TooltipProvider>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${className}`}
          href={props.href ?? "/"} // add a default value
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
