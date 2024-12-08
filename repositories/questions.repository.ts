import db from "@/lib/db";
import { QuestionBySlug, QuestionProps } from "@/types/question";
import { Prisma } from "@prisma/client";

export async function findQuestions(): Promise<QuestionProps[]> {
  const questions = await db.question.findMany({
    include: {
      user: {
        select: {
          id: true,
          email: true,
          profile: {
            select: {
              fullname: true,
            },
          },
        },
      },
      categories: true,
      answers: {
        select: {
          id: true,
          textContent: true,
          doctorId: true,
          questionId: true,
        },
      },
    },
  });
  return questions;
}

export async function findQuestionBySlugOrId(
  slug?: string,
  id?: string
){
  return await db.question.findUnique({
    where: { slug, id },
    include: {
      user: true,
      categories: true, // Make sure to include the categories
      answers: true,
    },
  });
}
