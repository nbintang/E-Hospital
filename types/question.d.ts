import { QuestionStatus } from "@prisma/client";

export type Question = {
  id: string;
  title: string;
  slug: string;
  categoryId: string;
  userId: string;
  isAnswered: boolean;
  status: QuestionStatus;
  textContent: string;
  category: {
    id: string;
    name: string;
  };
  user: {
    id: string;
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
};