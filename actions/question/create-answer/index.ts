"use server";
import { createAnswerByQuestionId } from "@/repositories/answers.repository";
import { revalidatePath } from "next/cache";
export async function createAnswer(formData: FormData, questionId: string) {
  const textContent = formData.get("textContent") as string;
  if (!textContent || !questionId) return;
  const answer = await createAnswerByQuestionId({
    textContent,
    questionId,
    doctorId: "7fe30d5c-3e52-407a-8fe5-331404bd887b",
  });
  if (!answer.doctorId) throw new Error("Unauthorized");

  revalidatePath("/dashboard/questions");
}
