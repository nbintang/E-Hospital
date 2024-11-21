import { QuestionStatus } from "@prisma/client";
import { CategoryProps } from "./categories";
import { UserProps } from "./user";
import { AnswerProps } from "./answers";

export interface QuestionProps {
  id: string;
  slug: string;
  title: string;
  userId: string;
  status: QuestionStatus;
  textContent: string;
  user: UserProps;
  categories: CategoryProps[];
  answers: AnswerProps[];
  createdAt: Date;
  updatedAt: Date;
}



