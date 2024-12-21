import ContentHTML from "@/components/extensions/content-html";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { capitalizeStr } from "@/helper/common";
import { sanitizeContent } from "@/helper/common/sanitize-content";
import { findSpecificQuestionsPublic } from "@/repositories/questions.repository";
import { Params } from "@/types/params";
import { ArrowLeft, Calendar, MessageCircle, Plus, User } from "lucide-react";
import Link from "next/link";

export default async function QuestionDetail({ params }: { params: Params }) {
  const slug = (await params).slug!;
  const question = await findSpecificQuestionsPublic({ slug });
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };

  if (!question) return <div>Something went wrong</div>;

  return (
    <div className="container max-w-4xl mx-auto py-8 ">
      <div className="flex justify-between items-center mb-8">
        <Link
          href="/questions"
          className="flex items-center text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Questions
        </Link>
        <Button variant={"blue"} className="flex items-center" asChild>
          <Link href="/questions/new">
            <Plus className="w-4 h-4 mr-2" />
            Ask a Question
          </Link>
        </Button>
      </div>

      <Card className="mb-8">
        <CardHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <h1 className="text-2xl font-bold">{question.title}</h1>
            <Badge
              variant={question.status === "ANSWERED" ? "success" : "secondary"}
            >
              {question.status}
            </Badge>
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {formatDate(question.createdAt)}
            </div>
            <div className="flex items-center">
              <MessageCircle className="w-4 h-4 mr-2" />
              Answered by{" "}
              {
                question.answers.find((a) => a.doctor)?.doctor.user.profile
                  ?.fullname
              }
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {question.categories.map((category) => (
              <Badge key={category.id} variant="outline">
                {category.name}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-start space-x-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src={question.user.profile?.profileUrl || ""} />
              <AvatarFallback>
                {question.user.profile?.fullname?.[0] ||
                  question.user.email[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className="font-semibold">
                  {question.user.profile?.fullname || "Anonymous"}
                </span>
              </div>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {question.textContent}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold">
          {question.answers.length} Answers
        </h2>
        {question.answers.map((answer) => (
          <Card key={answer.id}>
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src={answer.doctor.user.profile?.profileUrl || ""}
                  />
                  <AvatarFallback>
                    {answer.doctor.user.profile?.fullname?.[0] || "D"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                 <div className="mb-2">
                 <div className="flex items-center space-x-2 ">
                    <span className="font-semibold">
                      Dr.{" "}
                      {answer.doctor.user.profile?.fullname
                        .replace("Dr. ", "")
                        .replace("dr.", "") || "Anonymous"}
                    </span>
                    <Badge variant="outline">
                      {answer.doctor.specialization.name}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm whitespace-pre-wrap">
                      {answer.doctor.hospital.name}
                    </p>
                  </div>
                 </div>
                  <ContentHTML
                    className="prose-sm md:prose min-w-full"
                    content={answer.textContent}
                  />
                  <div className="flex mt-4 items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                    {formatDate(answer.createdAt)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
