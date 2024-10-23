import QuestionsCard, { questionsExample } from "@/components/admin/question";
import React from "react";

import { AnswerForm } from "@/components/admin/question/answer-form";

export default function Question({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const question = questionsExample.find((question) => question.slug === slug);

  return (
    <div>
      {" "}
      {question && <QuestionsCard questions={question} />}
      <AnswerForm />
    </div>
  );
}
