import PostCard from "@/components/sections/post";
import { SkeletonCard } from "@/components/sections/post/skeleton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { filterTextContent } from "@/helper";
import { cn } from "@/lib/utils";
import { findArticles } from "@/repositories/articles.repository";
import Link from "next/link";
export default async function ArticlesPage() {
  const articles = await findArticles();
  return (
    <>
      <div className="flex justify-end mb-5 ">
        <Link href={"/dashboard/articles/create"}>
          <Button variant={"blue"}>Create +</Button>
        </Link>
      </div>
      {articles && articles.length > 0 ? (
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((article, i) =>
            articles && articles.length > 0 ? (
              <PostCard key={i} article={article} />
            ) : (
              <SkeletonCard key={i} />
            )
          )}
        </div>
      ) : (
        <div className="text-center flex justify-center items-center h-[50vh] xl:text-9xl lg:text-7xl md:text-5xl sm:text-3xl text-2xl font-bold text-muted-foreground/30">
          <p> No Articles</p>
        </div>
      )}
    </>
  );
}

