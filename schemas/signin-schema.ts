import * as z from "zod"

export const signinSchema = z.object({
  email: z.string().email({
    message: "Masukkan alamat email yang valid.",
  }),
  password: z.string().min(8, {
    message: "Password harus minimal 8 karakter.",
  }),
})

export type SigninFormValues = z.infer<typeof signinSchema>
