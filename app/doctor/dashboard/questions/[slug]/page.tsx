import QuestionsCard, { questionsExample } from "@/components/sections/question";
import React from "react";
import { AnswerForm } from "@/components/sections/question/answer-form";
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
