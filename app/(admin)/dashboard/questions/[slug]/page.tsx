import QuestionsCard from "@/components/sections/question";
import React from "react";
import { AnswerForm } from "@/components/sections/question/answer-form";
import { findQuestionBySlug } from "@/repositories/questions.repository";
import { Params } from "@/types/params";
import { TooltipProvider } from "@/components/ui/tooltip";
import { findAnswerByQuestionId } from "@/repositories/answers.repository";
import Answer from "@/components/sections/question/anwer";

export default async function Question({ params }: { params: Params }) {
  const { slug } = await params;
  if (!slug) return null;
  const question = await findQuestionBySlug(slug);
  if (!question) return null;
  const answer = await findAnswerByQuestionId({ questionId: question.id });

  return (
    <div>
      {question && <QuestionsCard question={question} />}
      {question.status === "PENDING" && (
        <TooltipProvider>
          <AnswerForm id={question.id} />
        </TooltipProvider>)}

        <Answer answer={answer} />
    </div>
  );
}
