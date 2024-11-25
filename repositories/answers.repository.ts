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
        include: {
          user: {
            select: {
              email: true,
              profile: {
                select: {
                  fullname: true,
                  profileUrl: true,
                },
              },
            },
          },
          specialization: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  if (!answer) {
    throw new Error("No answer found");
  }
  return answer;
}
