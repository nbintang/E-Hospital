import { Question } from "@/types/question";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

const statusColors = {
  Open: "bg-green-500",
  Closed: "bg-fusion-red",
  "In Progress": "bg-don-juan",
};
export const questionsExample: Question[] = [
  {
    id: 1,
    slug: "apa-gejala-umum-dari-diabetes",
    text: "Apa gejala umum dari diabetes?",
    status: "Open",
    category: "Penyakit Dalam",
    user: {
      name: "Ahmad Setiawan",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  },
  {
    id: 2,
    slug: "bagaimana-menangani-demam-tinggi-pada-anak",
    text: "Bagaimana menangani demam tinggi pada anak?",
    status: "Closed",
    category: "Pediatri",
    user: {
      name: "Siti Aisyah",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  },
  {
    id: 3,
    slug: "apa-saja-tanda-awal-dari-kanker-payudara",
    text: "Apa saja tanda awal dari kanker payudara?",
    status: "In Progress",
    category: "Onkologi",
    user: {
      name: "Rina Kartini",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  },
  {
    id: 4,
    slug: "bagaimana-cara-mencegah-infeksi-covid-19",
    text: "Bagaimana cara mencegah infeksi COVID-19?",
    status: "Open",
    category: "Infeksi",
    user: {
      name: "Joko Susanto",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  },
  {
    id: 5,
    slug: "apa-penyebab-dan-cara-mengobati-maag",
    text: "Apa penyebab dan cara mengobati maag?",
    status: "Open",
    category: "Gastroenterologi",
    user: {
      name: "Budi Hartono",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  },
  {
    id: 6,
    slug: "apakah-stroke-bisa-dicegah-dengan-diet-sehat",
    text: "Apakah stroke bisa dicegah dengan diet sehat?",
    status: "Closed",
    category: "Kardiologi",
    user: {
      name: "Sari Dewi",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  },
];

export default function QuestionsCard({ questions }: { questions: Question }) {
  return (
    <Card key={questions.id} className="flex flex-col ">
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
  );
}
