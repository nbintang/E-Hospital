import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AnswerWithDoctorProfileProps } from "@/types/answers";
import DOMPurify from "isomorphic-dompurify";
import { formatDate } from "@/helper/client";
export default function Answer({
  answer,
}: {
  answer: AnswerWithDoctorProfileProps;
}) {
  const sanitizedContent = DOMPurify.sanitize(answer.textContent);
  return (
    <Card key={answer.id} className="flex flex-col w-full mt-3">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Avatar className="w-10 h-10">
              <AvatarFallback>
                {answer.doctorProfile.user.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-base font-medium text-primary">
                {answer.doctorProfile.fullname}
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                {answer.doctor.specialization.name}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-5">
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      </CardContent>

      <CardFooter>
        <div className="flex justify-end w-full ">
          <p className="text-xs text-muted-foreground">{formatDate({date: answer.createdAt})}</p>
        </div>
      </CardFooter>
    </Card>
  );
}
