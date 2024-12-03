"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import Company from "@/components/icons/company";

import SigninForm from "@/components/auth/signin";
import Google from "@/components/icons/google";
import { useOpenDialog } from "@/hooks/use-open-auth-dialog";
import Link from "next/link";
import { useHandleLoadingNavigate } from "@/hooks/use-handle-loading-navigate";
import { usePathname } from "next/navigation";

export function SigninDialog() {
  const pathname = usePathname();
  const { showSignIn: open, setShowSignIn: setIsOpen } = useOpenDialog();
  const handleLoadingClick = useHandleLoadingNavigate({ pathname });
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <div className="flex justify-center pt-8">
              <div className="flex items-start gap-2">
                <Company className="h-8 w-8" />
                <div>
                  <h3 className="font-semibold text-fusion-red">Rumah Sakit</h3>
                  <p className="text-sm text-soft-clean-pool">Inovasi</p>
                </div>
              </div>
            </div>
          </DialogTitle>
          <div className="text-center space-y-1.5">
            <div className="font-semibold text-lg text-blue-600">
              Masuk ke Akun Anda
            </div>
            <div className="text-sm text-muted-foreground text-soft-clean-pool">
              Silakan masuk untuk melanjutkan
            </div>
          </div>
        </DialogHeader>
        <SigninForm setIsOpen={setIsOpen}/>
        <div className="flex items-center gap-2 w-full">
          <Separator className="flex-1" />
          <span className="text-xs text-muted-foreground">atau</span>
          <Separator className="flex-1" />
        </div>
        <div>
          <Button variant="outline" className="w-full" size="lg">
            <Google className="w-5 h-5 mr-2" />
            Masuk Menggunakan Google
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            Belum punya akun?{" "}
            <Button
              variant="link"
              onClick={() => {
                setIsOpen(false);
                handleLoadingClick("/signup");
              }}
              className="text-primary p-0"
              asChild
            >
              <Link href={"/signup"}>Daftar akun baru</Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
