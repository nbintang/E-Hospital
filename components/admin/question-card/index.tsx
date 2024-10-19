import { Question } from "@/types/question";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const statusColors = {
  Open: "bg-green-500",
  Closed: "bg-red-500",
  "In Progress": "bg-yellow-500",
};

export default function QuestionsCard({questions}: {questions: Question[]}) {
  return questions.map((question) => (
    <Card key={question.id} className="flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-2 mb-2">
          <Avatar className="w-6 h-6">
            <AvatarImage src={question.user.avatar} alt={question.user.name} />
            <AvatarFallback>{question.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-muted-foreground">{question.user.name}</span>
        </div>
        <CardTitle className="text-base font-medium leading-tight">{question.text}</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="flex flex-wrap gap-2 items-center">
          <Badge className={`${statusColors[question.status]} text-white text-xs`}>
            {question.status}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {question.category}
          </Badge>
        </div>
      </CardContent>
    </Card>
  ))
}
