"use client";
import { useState } from "react";
import moment from "moment";
import { MessageCircle, PenSquare, Tag } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { QuestionsPublic } from "@/types/question";
import { CategoryProps } from "@/types/categories";
import { Button } from "@/components/ui/button";

export default function Questions({
  questions,
  categories,
}: {
  questions: QuestionsPublic[];
  categories: CategoryProps[];
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const filteredQuestions =
    selectedCategory === "All"
      ? questions
      : questions.filter((question) =>
          question.categories.some((cat) => cat.name === selectedCategory)
        );

  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Ask a Doctor</h1>
        <Button size="lg" variant={"blue"} className="gap-2" asChild>
          <Link href="/questions/new">
            <PenSquare className="w-4 h-4" />
            Ask a Question
          </Link>
        </Button>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">
          Latest Health Discussions
        </h2>
        <div className="flex gap-2 mb-4 flex-wrap">
          {[...categories].reverse().map((category) => (
            <Badge
              key={category.id}
              variant={
                category.name === selectedCategory ? "blue" : "secondary"
              }
              className="cursor-pointer"
              onClick={() => setSelectedCategory(category.name)}
            >
              {category.name}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {filteredQuestions.map((question) => (
          <Card key={question.id}>
            <CardHeader>
              <div className="flex items-start gap-4">
                <Avatar className="w-10 h-10">
                  <AvatarFallback>
                    {question.user.email.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold">
                    <Link
                      href={`/questions/${question.slug}`}
                      className="hover:underline"
                    >
                      {question.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <span>By: {question.user.profile?.fullname}</span>
                    <span>•</span>
                    <span>{moment(question.createdAt).fromNow()}</span>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground line-clamp-2">
                {question.textContent}
              </p>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">
                    {question.answers.length > 0
                      ? `replied by Dr.${question.answers[0].doctor.user.profile?.fullname.replace(
                          "doctor",
                          ""
                        )}`
                      : "Not yet answered"}
                  </span>
                </div>
                <Separator className="h-5" orientation="vertical" />
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Tag className="w-4 h-4" />
                  <span className="text-sm">
                    {question.categories.map((cat) => cat.name).join(", ")}
                  </span>
                </div>
              </div>
              <Badge
                variant={
                  question.status === "ANSWERED" ? "success" : "secondary"
                }
              >
                {question.status === "ANSWERED" ? "Answered" : "Pending"}
              </Badge>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
