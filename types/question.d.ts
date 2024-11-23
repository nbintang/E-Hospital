import { Prisma } from "@prisma/client";

// Question type with included user, categories, and answers
export type QuestionProps = Prisma.QuestionGetPayload<{
  include: {
    user: true;
    categories: true;
    answers: true;
  }
}>;

