import { FileWithPath } from "react-dropzone";
import * as z from "zod";
export const SignUpSchema = z.object({
  profileUrl: z.preprocess(
    (v) => (v === "" || v === undefined ? null : v),
    z.instanceof(File).or(z.string().nullable())
  ),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  addressName: z.string(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  fullname: z.string().min(8, "Full name must be at least 8 characters"),
  gender: z.enum(["male", "female"], {
    required_error: "Gender is required",
  }),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  termAccepted: z.boolean().refine((value) => value, {
    message: "You must accept the terms and conditions",
  }),
});

export type FileWithPreview = FileWithPath & {
  preview: string;
};

export const accept = {
  "image/*": [".jpg", ".jpeg", ".png"],
};
