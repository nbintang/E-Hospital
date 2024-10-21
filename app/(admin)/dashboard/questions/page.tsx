import { ContentLayout } from "@/components/admin/admin-panel/content-layout";
import QuestionsCard from "@/components/admin/question";
import { Question } from "@/types/question";
import Link from "next/link";

export default function QuestionsPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {questions.map((question) => (
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
export const questions: Question[] = [
  {
    id: 1,
    slug: "how-do-i-create-a-react-component",
    text: "How do I create a React component?",
    status: "Open",
    category: "React",
    user: {
      name: "Alice Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  },
  {
    id: 2,
    slug: "what-is-the-difference-between-props-and-state",
    text: "What is the difference between props and state?",
    status: "Closed",
    category: "React",
    user: { name: "Bob Smith", avatar: "/placeholder.svg?height=32&width=32" },
  },
  {
    id: 3,
    slug: "how-can-i-optimize-my-website-performance",
    text: "How can I optimize my website's performance?",
    status: "In Progress",
    category: "Performance",
    user: {
      name: "Charlie Brown",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  },
  {
    id: 4,
    slug: "what-are-the-best-practices-for-responsive-design",
    text: "What are the best practices for responsive design?",
    status: "Open",
    category: "CSS",
    user: {
      name: "Diana Prince",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  },
  {
    id: 5,
    slug: "how-do-i-implement-authentication-in-a-node-js-app",
    text: "How do I implement authentication in a Node.js app?",
    status: "Open",
    category: "Node.js",
    user: { name: "Ethan Hunt", avatar: "/placeholder.svg?height=32&width=32" },
  },
  {
    id: 6,
    slug: "what-are-the-new-features-in-es2022",
    text: "What are the new features in ES2022?",
    status: "Closed",
    category: "JavaScript",
    user: {
      name: "Fiona Apple",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  },
];
