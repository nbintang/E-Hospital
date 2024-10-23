
import QuestionsCard, { questionsExample } from "@/components/admin/question";

import Link from "next/link";

export default function QuestionsPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {questionsExample.map((question) => (
        <Link
          className="hover:scale-105 transition-all duration-200 hover:opacity-90"
          href={`/dashboard/questions/${question.slug}`}
        >
          <QuestionsCard questions={question} />
        </Link>
      ))}
    </div>
  );
}
