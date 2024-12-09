"use server";
import getAuthenticatedUserSession from "@/helper/server/get-authenticated-user-seesion";
import { createAnswerByQuestionId } from "@/repositories/answers.repository";
import { findDoctorByUserId } from "@/repositories/articles.repository";
import { revalidatePath } from "next/cache";
export async function createAnswer(formData: FormData, questionId: string) {
  const textContent = formData.get("textContent") as string;

  const session = await getAuthenticatedUserSession();
  const doctorExist = await findDoctorByUserId(session?.user.id || "");
  if (!doctorExist) throw new Error("Doctor not authenticated");
  if (!textContent || !questionId) return;
  const answer = await createAnswerByQuestionId({
    textContent,
    questionId,
    doctorId: doctorExist.id,
  });
  if (!answer.doctorId) throw new Error("Unauthorized");

  revalidatePath("/dashboard/questions");
}
