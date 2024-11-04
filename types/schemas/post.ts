import { z } from "zod";

const MAX_IMAGE_SIZE = 5 * 1000000;
const ALLOWED_IMAGE_TYPES = ["image/jpg", "image/jpeg", "image/png"];
export const PostSchema = z.object({
  title: z.string().min(10, {
    message: "Title input is required ",
  }),
  category: z.array(z.string()),
  image: z
    .instanceof(File, { message: "Image input is required" })
    .superRefine((f, ctx) => {
      if (!ALLOWED_IMAGE_TYPES.includes(f.type)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Only ${ALLOWED_IMAGE_TYPES.join(", ")} but got ${f.type}`,
        });
      }
      if (f.size > MAX_IMAGE_SIZE) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_big,
          type: "array",
          message: `the file is too Big, you file size is ${f.size}, but requires ${MAX_IMAGE_SIZE}`,
          maximum: MAX_IMAGE_SIZE,
          inclusive: true,
        });
      }
    }),
  content: z
    .string({
      required_error: "Description is required",
    })
    .min(1, "Description is required"),
});

export type PostValues = z.infer<typeof PostSchema>;
