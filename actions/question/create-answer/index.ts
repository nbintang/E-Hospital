"use server";
import { createAnswerByQuestionId } from "@/repositories/answers.repository";
import { revalidatePath } from "next/cache";
export async function createAnswer(formData: FormData, questionId: string) {
  const textContent = formData.get("textContent") as string;
  if (!textContent || !questionId) return;
  const answer = await createAnswerByQuestionId({
    textContent,
    questionId,
    doctorId: "dc419940-2b71-41e4-a560-2ce7d3427386",
  });
  if (!answer.doctorId) throw new Error("Unauthorized");

  revalidatePath("/dashboard/questions");
}
