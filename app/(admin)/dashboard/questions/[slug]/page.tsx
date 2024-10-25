import QuestionsCard, { questionsExample } from "@/components/admin/question";
import React from "react";
import { AnswerForm } from "@/components/admin/question/answer-form";
import { findQuestionBySlug } from "@/repositories/questions.repository";

export default async  function Question({ params }: { params: { slug: string } }) {
  const question = await findQuestionBySlug(params.slug)

  return (
    <div>
      {" "}
      {question && <QuestionsCard question={question} />}
      <AnswerForm />
    </div>
  );
}
