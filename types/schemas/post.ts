import { z } from "zod";

const MAX_IMAGE_SIZE = 5000000;
const ALLOWED_IMAGE_TYPES = ["image/jpg", "image/jpeg", "image/png"];
export const PostSchema = z.object({
  title: z.string(),
  image: z
    .instanceof(File).optional(),
  content: z
    .string({
      required_error: "Description is required",
    })
    .min(1, "Description is required"),
});

export type PostValues = z.infer<typeof PostSchema>;
