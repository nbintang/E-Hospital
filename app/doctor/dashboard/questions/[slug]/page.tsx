import QuestionsCard from "@/components/admin/sections/question";
import React from "react";
import { AnswerForm } from "@/components/admin/sections/question/answer-form";
import { findQuestionBySlugOrId } from "@/repositories/questions.repository";
import { Params } from "@/types/params";
import { findAnswerByQuestionId } from "@/repositories/answers.repository";
import { TooltipProvider } from "@/components/ui/tooltip";
import Answer from "@/components/admin/sections/question/anwer";
export default async function Question({ params }: { params: Params }) {
  const slug = (await params).slug!;
  const question = await findQuestionBySlugOrId(slug);
  if (!question) return null;
  const answer = await findAnswerByQuestionId({ questionId: question.id });

  return (
    <div>
      {question && <QuestionsCard question={question} />}
      {question.status === "PENDING" ? (
        <TooltipProvider>
          <AnswerForm id={question.id} />
        </TooltipProvider>
      ) : (
        <Answer answer={answer} />
      )}
    </div>
  );
}
