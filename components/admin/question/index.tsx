import { Question } from "@/types/question";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

const statusColors  = {
  Open: "bg-green-500",
  Closed: "bg-fusion-red",
  "In Progress": "bg-don-juan",
};
export const questionsExample: Question[] = [
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


export default function QuestionsCard({
  questions,
}: {
  questions: Question;
}) {
  return <Card key={questions.id} className="flex flex-col ">
        <CardHeader className="pb-2">
          <div className="flex items-center space-x-2 mb-2">
            <Avatar className="w-6 h-6">
              <AvatarImage
                src={questions.user.avatar}
                alt={questions.user.name}
              />
              <AvatarFallback>
                {questions.user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-muted-foreground">
              {questions.user.name}
            </span>
          </div>
          <CardTitle className="text-base font-medium leading-tight">
            {questions.text}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="flex flex-wrap gap-2 items-center">
            <Badge
              className={`${statusColors[questions.status]} text-white text-xs`}
            >
              {questions.status}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {questions.category}
            </Badge>
          </div>
        </CardContent>
      </Card>

  
}
