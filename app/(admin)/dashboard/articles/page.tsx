import PostCard from "@/components/sections/post";
import { Button } from "@/components/ui/button";
import { filterTextContent } from "@/helper";
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
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article, i) => (
          <PostCard key={i} article={article} />
        ))}
      </div>
    </>
  );
}
