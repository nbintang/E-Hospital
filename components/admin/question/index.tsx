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
