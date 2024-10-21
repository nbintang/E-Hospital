import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface ArticleProps {
  title: string;
  description: string;
  status: "published" | "not published";
  category: CategoryDetails[];
  imageUrl?: string;
}
interface CategoryDetails {
  name: string;
}

export default function PostCard({
  title = "Untitled",
  description = "",
  status = "not published",
  category,
  imageUrl = "/img/surgery.jpg",
}: ArticleProps) {
  const truncateText = (text: string, maxLength: number) => {
    if (!text || typeof text !== "string") return "";
    return text.length <= maxLength ? text : `${text.slice(0, maxLength)}...`;
  };

  return (
    <Card className="w-full max-w-sm rounded-md">
      <div className="overflow-hidden relative rounded-t-md  h-48">
        <Image
          src={"/img/surgery.jpg"}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="object-cover "
        />
        <Badge
          className={`absolute top-2 left-2`}
          variant={status === "published" ? "blue" : "secondary"}
        >
          {status}
        </Badge>
      </div>
      <div className="flex flex-col justify-between">
        <CardHeader>
          <h3 className="text-lg font-semibold line-clamp-2">{title}</h3>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {truncateText(description, 100)}
          </p>
        </CardContent>
        <CardFooter className="flex justify-end items-center gap-2">
          {category.map((category, i) => (
            <Badge variant="outline" key={i}>{category.name}</Badge>
          ))}
        </CardFooter>
      </div>
    </Card>
  );
}
