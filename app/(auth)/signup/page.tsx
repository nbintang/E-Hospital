"use client";
import SignUpForm from "@/components/auth/signup";
import { useOpenDialog } from "@/hooks/use-open-auth-dialog";
import { ChevronLeft, LogInIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function SignUpPage() {
  const { setShowSignIn: setIsOpenDialogSignin } = useOpenDialog();
  return (
    <div className=" grid place-items-center min-h-screen mx-auto p-6 w-full lg:w-3/4">
      <div className="">
        <Button variant={"ghost"} asChild>
          <Link href="/">
            <ChevronLeft className="h-6 w-6" />
          <p>Kembali</p>
          </Link>
        </Button>
        <div className="flex items-start my-4 space-x-3">
          <LogInIcon className="h-5 w-5 mt-1" />
          <div>
            <h1 className="text-2xl  font-bold text-clean-pool">Register</h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Sudah punya akun?{" "}
              <span
                className="text-blue-400 hover:underline cursor-pointer"
                onClick={() => setIsOpenDialogSignin(true)}
              >
                Masuk
              </span>
            </p>
          </div>
        </div>

        <SignUpForm />
      </div>
    </div>
  );
}
