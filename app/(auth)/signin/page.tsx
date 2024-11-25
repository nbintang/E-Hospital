"use client";
import { ArrowLeft, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Company from "@/components/icons/company";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import SigninForm from "@/components/auth/signin";
import Google from "@/components/icons/google";
export default function SigninPAge() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-400/30">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="space-y-4 relative pb-0">
          <div className="flex justify-between items-center absolute top-2 left-2 right-2">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex justify-center pt-8">
            <div className="flex items-center gap-2">
              <Company className="h-8 w-8" />
              <div>
                <h3 className="font-semibold text-fusion-red">Rumah Sakit</h3>
                <p className="text-sm text-soft-clean-pool">Inovasi</p>
              </div>
            </div>
          </div>
          <div className="text-center space-y-1.5">
            <h2 className="font-semibold text-lg text-clean-pool">
              Masuk ke Akun Anda
            </h2>
            <p className="text-sm text-muted-foreground text-soft-clean-pool">
              Silakan masuk untuk melanjutkan
            </p>
          </div>
        </CardHeader>
        <SigninForm />
        <CardFooter className="flex flex-col gap-4">
          <div className="flex items-center gap-2 w-full">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">atau</span>
            <Separator className="flex-1" />
          </div>
          <Button variant="outline" className="w-full" size="lg">
            <Google className="w-5 h-5 mr-2" />
            Masuk Menggunakan Google
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            Belum punya akun?{" "}
            <Button variant="link" className="text-primary p-0">
              Daftar Baru
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
