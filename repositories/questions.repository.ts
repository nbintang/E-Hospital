import db from "@/lib/db";

export async function findQuestions() {
  const questions = await db.question.findMany({
    include: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      user: {
        select: {
          id: true,
          email: true,
        },
      },
    },
  });
  return questions;
}

export async function findQuestionBySlug(slug: string) {
  const question = await db.question.findFirst({
    where: {
      slug,
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
        },
      },
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return question
}
