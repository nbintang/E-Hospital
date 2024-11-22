import QuestionsCard from "@/components/sections/question";
import { findQuestions } from "@/repositories/questions.repository";

import Link from "next/link";

export default async function QuestionsPage() {
  const questions = await findQuestions();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {questions.map((question) => (
        <QuestionsCard key={question.id} question={question} />
    
      ))}
    </div>
  );
}
