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
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SigninFormValues, signinSchema } from "@/schemas/signin-schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import handleSignIn from "@/actions/auth/signin";

export default function SigninForm() {
  const form = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: SigninFormValues) {
    toast.promise(handleSignIn(values), {
      loading: "Memproses...",
      success: "Berhasil Masuk",
      error: "Terjadi kesalahan, silahkan coba lagi",
    });
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
                  <Input type="password" {...field} />
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
