import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { QuestionProps } from '@/types/question';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from '@/components/ui/badge';
export  function CardQuestionLists({questions}: {questions: QuestionProps[]}) {
  return (
    <Card className="h-full row-span-3 col-span-2 lg:col-span-1  w-full min-w-sm">
    <CardHeader>
      <CardTitle>Recent Questions</CardTitle>
    </CardHeader>
    <CardContent>
      <ScrollArea>
        <ul className="space-y-4">
         {questions.map((question: QuestionProps) => (
              <li
              key={question.id}
              className="flex justify-between items-center"
            >
              <span className="text-sm">{question.title}</span>
              <Badge
                variant={
                  question.status === "ANSWERED"
                    ? "success"
                    : "secondary"
                }
              >
                {question.status}
              </Badge>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </CardContent>
  </Card>
  )
}
