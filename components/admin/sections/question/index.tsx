"use client";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { QuestionStatus } from "@prisma/client";
import { QuestionBySlug, QuestionProps } from "@/types/question";
import { formatDate } from "@/helper/client";
import { useHandleLoadingNavigate } from "@/hooks/use-handle-loading-navigate";
import { usePathname } from "next/navigation";
const statusColors: Record<QuestionStatus, string> = {
  PENDING: "bg-yellow-500",
  ANSWERED: "bg-green-500",
};

export default function QuestionsCard({
  question,
}: {
  question?: QuestionBySlug | QuestionProps;
}) {
  const pathname = usePathname();
  const handleNavigate = useHandleLoadingNavigate({ pathname });
  if (!question) return null;
  return (
    <div
      onClick={() =>
        pathname === "/doctor/dashboard/questions" ||
        pathname === "/dashboard/questions"
          ? handleNavigate(`/doctor/dashboard/questions/${question.slug}`)
          : null
      }
      className={`${
        pathname !== `/dashboard/questions/${question.slug}` && "hover:scale-95"
      } cursor-pointer transition-all duration-200 hover:opacity-90`}
    >
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
            {question.status === "ANSWERED" && (
              <CheckCircle2 className={`w-5 h-5 text-green-500`} />
            )}
          </div>
          <CardTitle className="text-base font-semibold leading-tight">
            {question.title}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            {question.textContent}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-2 flex justify-between items-end">
          <div className="flex flex-wrap gap-2 items-center">
            <Badge
              className={`${statusColors[question.status]} text-white text-xs`}
            >
              {question.status}
            </Badge>
            {question.categories.map((category) => (
              <Badge key={category.id} variant={"outline"} className="text-xs ">
                {category.name}
              </Badge>
            ))}
          </div>

          <p className="text-xs text-muted-foreground">
            {formatDate({ date: question.createdAt })}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
