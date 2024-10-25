import { Question } from "@/types/question";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

const statusColors = {
  PENDING: "bg-yellow-500",
  IN_PROGRESS: "bg-blue-500",
  CLOSED: "bg-gray-500",
};

// Example data matching the new type
export const questionsExample: Question[] = [
  {
    id: "1",
    title: "Apa gejala umum dari diabetes?",
    slug: "apa-gejala-umum-dari-diabetes",
    categoryId: "1",
    userId: "1",
    isAnswered: true,
    status: "PENDING",
    textContent: "Apa gejala umum dari diabetes?",
    category: {
      id: "1",
      name: "Penyakit Dalam",
    },
    user: {
      id: "1",
      email: "Ahmad Setiawan",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "Bagaimana menangani demam tinggi pada anak?",
    slug: "bagaimana-menangani-demam-tinggi-pada-anak",
    categoryId: "2",
    userId: "2",
    isAnswered: false,
    status: "CLOSED",
    textContent: "Bagaimana menangani demam tinggi pada anak?",
    category: {
      id: "2",
      name: "Pediatri",
    },
    user: {
      id: "2",
      email: "Siti Aisyah",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function QuestionsCard({ question }: { question: Question }) {
  return (
    <Card key={question.id} className="flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Avatar className="w-6 h-6">
              {/* <AvatarImage
                src={question.user.avatar}
                alt={question.user.name}
              /> */}
              <AvatarFallback>
                {question.user.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-muted-foreground">
              {question.user.email}
            </span>
          </div>
          {question.isAnswered && (
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          )}
        </div>
        <CardTitle className="text-base font-medium leading-tight">
          {question.textContent}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="flex flex-wrap gap-2 items-center">
          <Badge
            className={`${statusColors[question.status]} text-white text-xs`}
          >
            {question.status}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {question.category.name}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
