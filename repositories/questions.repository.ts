"use server";
import db from "@/lib/db";
import {
  QuestionBySlug,
  QuestionProps,
  QuestionsPublic,
  SpecificQuestionPublic,
} from "@/types/question";
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

export async function findQuestionBySlugOrId(slug?: string, id?: string) {
  return await db.question.findUnique({
    where: { slug, id },
    include: {
      user: true,
      categories: true, // Make sure to include the categories
      answers: true,
    },
  });
}

export async function createQuestions(input: Prisma.QuestionCreateInput) {
  return await db.question.create({ data: input });
}

export async function findQuestionsPublic(): Promise<QuestionsPublic[]> {
  return await db.question.findMany({
    include: {
      user: {
        include: {
          profile: {
            select: {
              fullname: true,
            },
          },
        },
      },
      categories: true,
      answers: {
        include: {
          doctor: {
            include: {
              specialization: true,
              user: {
                select: {
                  profile: {
                    select: {
                      fullname: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
}

export async function findSpecificQuestionsPublic({
  slug,
}: {
  slug: string;
}): Promise<SpecificQuestionPublic | null> {
  return await db.question.findFirst({
    where: {
      slug,
    },
    include: {
      user: {
        include: {
          profile: true,
        },
      },
      categories: true,
      answers: {
        include: {
          doctor: {
            include: {
              specialization: true,
              user: {
                include: {
                  profile: true,
                },
              },
            },
          },
        },
      },
    },
  });
}
