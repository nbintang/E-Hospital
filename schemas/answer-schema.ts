import * as z from "zod";

export const AnswerSchema = z.object({
    textContent: z
      .string({
        required_error: "Description is required",
      })
      .min(1, "Description is required"),
  });
export  type SchemaValues = z.infer<typeof AnswerSchema>;
  