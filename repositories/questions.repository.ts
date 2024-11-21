"use server"
import db from "@/lib/db";
import { QuestionProps } from "@/types/question";

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
            }
          }
        },
      },
      categories: true,
      answers: {
        select:{
          id: true,
          textContent: true,
          doctorId: true,
          questionId: true,
        }
      }, 
    },
  });
  return questions;
}

export async function findQuestionBySlug(slug: string) {
  return await db.question.findUnique({
    where: { slug },
    include: {
      user: true,
      categories: true, // Make sure to include the categories
      answers: true,
    },
  });
}