
import { z } from "zod"

export const ProfileSchema = z.object({
  email: z.string(),
    fullname: z.string().min(2, {
      message: "Full name must be at least 2 characters.",
    }),
    gender: z.union([z.enum(["MALE", "FEMALE"]), z.null()]),
    height: z.number(),
    phoneNumber: z.string()
      .min(10, {
      message: "Phone number must be at least 10 characters.",
    }),
    weight: z.number(),
    profileUrl : z.string().nullable(),
  })
  
 export type ProfileFormValues = z.infer<typeof ProfileSchema>

