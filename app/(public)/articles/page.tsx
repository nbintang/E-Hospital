import ClientPaginations from "@/components/client/panel/client-paginations";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { sanitizeContent } from "@/helper/common/sanitize-content";
import {
  findArticlesByPage,
  findTotalArticles,
} from "@/repositories/articles.repository";
import { Params } from "@/types/params";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Articles({
  searchParams,
}: {
  searchParams: Params;
}) {
  const page = (await searchParams).page;
  const currentPage = parseInt(page || "1", 10); // Default to page 1
  const itemsPerPage = 5;
  const articles = await findArticlesByPage({
    currentPage,
    itemsPerPage,
    status: "PUBLISHED",
  });
  const totalArticles = await findTotalArticles();
  const totalPages = Math.ceil(totalArticles / itemsPerPage);
  const visibleArticles = articles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <h1 className="text-3xl text-center md:text-left font-bold">
        Artikel Kesehatan Terkini
      </h1>
      <div className="grid gap-6">
        {articles.length > 0 ? (
          visibleArticles.map((article) => (
            <Link key={article.id} href={`/articles/${article.slug}`}>
              <Card  className="overflow-hidden">
                <div className="grid md:grid-cols-[300px_1fr] gap-6">
                  <div className="relative aspect-[4/3] md:aspect-auto">
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      width={1000}
                      height={1000}
                      priority
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-6">
                    <CardHeader className="p-0">
                      <CardTitle className="text-xl md:text-2xl line-clamp-2">
                        {article.title}
                      </CardTitle>
                      <CardDescription className="flex gap-2 text-sm">
                        {article.categories.map((category) => (
                          <Badge key={category.id} variant={"secondary"}>
                            {category.name}
                          </Badge>
                        ))}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 mt-4">
                      <div
                        className=" line-clamp-3 prose-sm md:prose font-medium leading-snug text-muted-foreground"
                        dangerouslySetInnerHTML={{
                          __html:
                            sanitizeContent(article.content)
                              .replace(/<img[^>]*>/g, "")
                              .slice(0, 200) + "...",
                        }}
                      />
                    </CardContent>
                  </div>
                </div>
              </Card>
            </Link>
          ))
        ) : (
          <p className="text-center text-accent-foreground font-bold text-5xl">
            Tidak ada artikel
          </p>
        )}
      </div>

      <ClientPaginations
        currentData={currentPage - 1}
        setTotalPages={totalPages}
      />
    </>
  );
}
