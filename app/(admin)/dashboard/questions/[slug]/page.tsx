import QuestionsCard, {
  questionsExample,
} from "@/components/sections/question";
import React from "react";
import { AnswerForm } from "@/components/sections/question/answer-form";
import { findQuestionBySlug } from "@/repositories/questions.repository";
type Params = Promise<{ slug: string }>;
export default async function Question({ params }: { params: Params }) {
  const { slug } = await params;
  const question = await findQuestionBySlug(slug);

  return (
    <div>
      {" "}
      {question && <QuestionsCard question={question} />}
      <AnswerForm />
    </div>
  );
}
