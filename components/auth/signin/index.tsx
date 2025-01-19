import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SigninFormValues, signinSchema } from "@/schemas/signin-schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
interface SigninDialogProps {
  setIsOpen: (isOpen: boolean) => void;
}

export default function SigninForm({ setIsOpen }: SigninDialogProps) {
  const form = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {data: session} = useSession()
  const isLoading = form.formState.isSubmitting;
  async function onSubmit(values: SigninFormValues) {
    toast.promise(
      signIn("credentials", {
        email: values.email,
        password: values.password,
        callbackUrl:
        session?.user?.role === "admin"
          ? "/dashboard"
          : session?.user?.role === "doctor"
          ? "/doctor/dashboard"
          : "/",
      }),
      {
        loading: "Memproses...",
        success: "Berhasil Masuk",
        error: "Terjadi kesalahan, silahkan coba lagi",
      }
    );
    setIsOpen(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4 pt-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alamat Email</FormLabel>
                <FormControl>
                  <Input placeholder="nama@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full"
            size="lg"
            variant={"blue"}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Memproses..." : "Masuk"}
          </Button>
          <div className="text-center">
            <Button variant="link" className="text-sm text-muted-foreground">
              Lupa Password
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
