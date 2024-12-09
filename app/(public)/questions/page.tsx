import { MessageCircle, PenSquare, Tag } from "lucide-react";
import Link from "next/link";
import moment from "moment";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { findQuestionsPublic } from "@/repositories/questions.repository";
import { findCategories } from "@/repositories/categories.repository";

export default async function QuestionsPage() {
  const questions = await findQuestionsPublic();
  return (
    <>
      <div className="grid gap-4">
        {questions.map((question) => (
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
                    <span>By: Anonymous</span>
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
                  <span className="text-sm"> replied by Dr.JohnDoe</span>
                </div>
                <Separator className="w-px h-4" orientation="vertical" />
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
