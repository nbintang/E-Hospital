import QuestionsCard, { questionsExample } from "@/components/admin/question";
import { findQuestions } from "@/repositories/questions.repository";

import Link from "next/link";

export default async function QuestionsPage() {
  const questions = await findQuestions();
  console.log(questions);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {questions.map((question) => (
        <Link
        key={question.id}
          className="hover:scale-105 transition-all duration-200 hover:opacity-90"
          href={`/dashboard/questions/${question.slug}`}
        >
          <QuestionsCard question={question} />
        </Link>
      ))}
    </div>
  );
}
