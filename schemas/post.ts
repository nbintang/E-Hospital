import { z } from "zod";

const MAX_IMAGE_SIZE = 5 * 1000000;
const ALLOWED_IMAGE_TYPES = ["image/jpg", "image/jpeg", "image/png"];
export const PostSchema = z.object({
  title: z.string().min(10, {
    message: "Minimum 10 characters",
  }),
  category: z.array(z.string()).nonempty("Please select at least one Category"),

  image: z
  .union([
    z.instanceof(File).superRefine((f, ctx) => {
      if (!ALLOWED_IMAGE_TYPES.includes(f.type)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Only ${ALLOWED_IMAGE_TYPES.join(", ")} are allowed but got ${f.type}`,
        });
      }
      if (f.size > MAX_IMAGE_SIZE) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_big,
          type: "array",
          message: `The file is too big. Your file size is ${f.size}, but the limit is ${MAX_IMAGE_SIZE}`,
          maximum: MAX_IMAGE_SIZE,
          inclusive: true,
        });
      }
    }),
    z.string().url({ message: "Image must be a valid URL" }),
  ]),
  content: z
    .string({
      required_error: "Description is required",
    })
    .min(1, "Description is required"),
});

export type PostValues = z.infer<typeof PostSchema>;
