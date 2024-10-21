import QuestionsCard from "@/components/admin/question";
import React from "react";
import { questions } from "../page";
import { AnswerForm } from "@/components/admin/question/answer-form";

export default function Question({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const question = questions.find((question) => question.slug === slug);

  return (
    <div>
      {" "}
      {question && <QuestionsCard questions={question} />}
      <AnswerForm />
    </div>
  );
}
