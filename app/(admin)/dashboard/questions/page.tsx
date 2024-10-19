import { ContentLayout } from "@/components/admin/admin-panel/content-layout";
import QuestionsCard from "@/components/admin/question-card";
import { Question } from "@/types/question";

export default function QuestionsPage() {
  return (
    <ContentLayout title="Questions">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <QuestionsCard questions={questions} />
      </div>
    </ContentLayout>
  );
}
const questions: Question[] = [
  {
    id: 1,
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
    text: "What is the difference between props and state?",
    status: "Closed",
    category: "React",
    user: { name: "Bob Smith", avatar: "/placeholder.svg?height=32&width=32" },
  },
  {
    id: 3,
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
    text: "How do I implement authentication in a Node.js app?",
    status: "Open",
    category: "Node.js",
    user: { name: "Ethan Hunt", avatar: "/placeholder.svg?height=32&width=32" },
  },
  {
    id: 6,
    text: "What are the new features in ES2022?",
    status: "Closed",
    category: "JavaScript",
    user: {
      name: "Fiona Apple",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  },
];
