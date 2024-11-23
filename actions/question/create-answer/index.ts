"use server";
import { createAnswerByQuestionId } from "@/repositories/answers.repository";
import { revalidatePath } from "next/cache";
export async function createAnswer(formData: FormData, questionId: string) {
  const textContent = formData.get("textContent") as string;
  if (!textContent || !questionId) return;
  const answer = await createAnswerByQuestionId({
    textContent,
    questionId,
    doctorId: "84c025d2-fa87-482b-a661-3e9fdf86f024",
  });
  if (!answer.doctorId) throw new Error("Unauthorized");

  revalidatePath("/dashboard/questions");
}
