import db from "@/lib/db";
import { findDoctorById } from "./articles.repository";
import { findProfileByUserId } from "./profile.repository";
import { AnswerWithDoctorProfileProps } from "../types/answers";

export async function createAnswerByQuestionId({
  questionId,
  textContent,
  doctorId,
}: {
  doctorId: string;
  questionId: string;
  textContent: string;
}) {
  const doctor = await findDoctorById(doctorId);
  if (!doctor) throw new Error("Doctor Unauthorized");
  const answer = await db.answer.create({
    data: {
      doctorId,
      textContent,
      questionId,
    },
  });

  await db.question.update({
    where: { id: questionId },
    data: {
      status: "ANSWERED",
    },
  });
  return answer;
}

export async function findAnswerByQuestionId({
  questionId,
}: {
  questionId: string;
}): Promise<AnswerWithDoctorProfileProps> {
  const answer = await db.answer.findFirst({
    where: { questionId },
    include: {
      doctor: {
        select: {
          specialization: {
            select: {
              name: true,
            },
          },
          userId: true,
        },
      },
    },
  });
  if (!answer) {
    throw new Error("Doctor Not Authorized");
  }
  const { userId } = answer.doctor;
  const doctorProfile = await findProfileByUserId({ userId });
  if (!doctorProfile) throw new Error("Something went wrong");
  return { ...answer, doctorProfile } as AnswerWithDoctorProfileProps;
}
