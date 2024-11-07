import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { filterTextContent, truncateText } from "@/helper";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
}

interface Article {
  id: string;
  slug: string;
  title: string;
  imageUrl: string;
  content: string;
  isPublished: boolean;
  doctorId: string;
  createdAt: Date;
  updatedAt: Date;
  categories: Category[];
}
function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
export default function ArticleCard({ article, className }: { article: Article; className?:string }) {
  const imageUrl = isValidUrl(article.imageUrl) ? article.imageUrl : "/img/akjgmw.jpeg";

  const content = truncateText(filterTextContent(article.content), 100);

  // Limit to first 2 categories and calculate remaining
  const displayedCategories = article.categories.slice(0, 3);
  const remainingCategoriesCount = article.categories.length - displayedCategories.length;

  return (
    <Card className={cn("w-full rounded-md", className)}>
      <div className="overflow-hidden relative rounded-t-md h-48">
        <Image
          src={imageUrl}
          alt={article.title}
          layout="fill"
          objectFit="cover"
          className="object-cover"
        />
        <Badge
          className="absolute top-2 left-2"
          variant={article.isPublished ? "default" : "secondary"}
        >
          {article.isPublished ? "Published" : "Draft"}
        </Badge>
      </div>
      <div className="flex flex-col justify-between">
        <CardHeader>
          <h3 className="text-lg font-semibold line-clamp-2">
            {article.title}
          </h3>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-3">{content}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-end">
          <div className="flex gap-2 flex-wrap">
            {displayedCategories.map((category) => (
              <Badge variant="outline" className="text-xs md:text-sm" key={category.id}>
                {category.name}
              </Badge>
            ))}
            {remainingCategoriesCount > 0 && (
              <Badge variant="secondary" className="text-xs md:text-sm">
                +{remainingCategoriesCount}
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            {article.createdAt.toLocaleDateString()}
          </p>
        </CardFooter>
      </div>
    </Card>
  );
}
