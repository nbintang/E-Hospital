import QuestionsCard from "@/components/admin/sections/question";
import React from "react";
import { AnswerForm } from "@/components/admin/sections/question/answer-form";
import { findQuestionBySlugOrId } from "@/repositories/questions.repository";
import { Params } from "@/types/params";
import { TooltipProvider } from "@/components/ui/tooltip";
import { findAnswerByQuestionId } from "@/repositories/answers.repository";
import Answer from "@/components/admin/sections/question/anwer";

export default async function Question({ params }: { params: Params }) {
  const id = (await params).id!;
  const question = await findQuestionBySlugOrId(id);
  if (!question) return null;
  const answer = await findAnswerByQuestionId({ questionId: question.id });

  return (
    <div>
      {question && <QuestionsCard question={question} />}
      {question.status === "PENDING" || !answer ? (
        <TooltipProvider>
          <AnswerForm id={question.id} />
        </TooltipProvider>
      ) : (
        <Answer answer={answer} />
      )}
    </div>
  );
}
