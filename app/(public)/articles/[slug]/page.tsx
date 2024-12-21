import ContentHTML from "@/components/extensions/content-html";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/helper/client";
import db from "@/lib/db";
import { findArticlesBySlugOrId } from "@/repositories/articles.repository";
import { Params } from "@/types/params";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

export default async function ArticleDetailsPage({
  params,
}: {
  params: Params;
}) {
  const slug = (await params).slug!;
  const article = await findArticlesBySlugOrId({ slug, status: "PUBLISHED" });
  const articles = await db.article.findMany({
    where: {
      status: "PUBLISHED",
      categories: {
        some: {
          id: {
            in: article?.categories.map(({ id }) => id),
          },
        },
      },
    },
  });
  if (!article) {
    notFound();
  }
  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 ">
        <div className="col-span-2">
          <div>
            <h1 className="text-3xl font-bold">{article.title}</h1>
            <p className="text-muted-foreground">
              Created at: {formatDate({ date: article.createdAt })}
            </p>
          </div>
          <div className="my-4">
            <Image
              src={article.imageUrl}
              alt={article.title}
              width={1000}
              height={1000}
            />
          </div>
          <div className="max-w-4xl  ml-4">
            <ContentHTML
              className="sm:prose-lg min-w-full "
              content={article.content}
            />
          </div>
          <div>
            <h1>Created by:</h1>
            <div className="flex gap-3 items-center">
              <Avatar className="w-20 h-20">
                <AvatarImage
                  src={
                    article.doctor.user.profile?.profileUrl ||
                    `https://api.dicebear.com/5.7/initials/svg?seed=${article.doctor.user.email}`
                  }
                  alt={article.title}
                />
                <AvatarFallback>
                  {article.doctor.user.email?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center">
                  <p className="">Dr.{article.doctor.user.profile?.fullname}</p>
                  <Separator orientation="vertical" className="h-4 mx-2" />
                  <p className="text-muted-foreground">
                    {article.doctor.user.email}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {article.doctor.specialization.name}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1  space-y-5">
          <div>
            <h1 className="text-3xl font-bold ">Artikel Lainnya</h1>
            <div>
              {articles &&
              articles.filter(
                (filteredArticle) => filteredArticle.id !== article.id
              ).length > 0 ? (
                articles.slice(0, 5).map((filteredArticle) => (
                  <Card
                    className="w-full border-none shadow-none"
                    key={filteredArticle.id}
                  >
                    <CardHeader>
                      <Image
                        src={filteredArticle.imageUrl}
                        alt={filteredArticle.title}
                        width={200}
                        height={200}
                        className="object-cover rounded-md w-full h-full"
                      />
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {filteredArticle.title}
                        </h3>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-muted-foreground text-xl">
                  Tidak ada artikel lainnya
                </p>
              )}
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold ">Kategori Artikel</h1>
            <div className="flex flex-wrap  my-3 gap-3">
              {article.categories.map((category) => (
                <Link href={`/categories/${category.slug}`} key={category.id}>
                  <Badge className={"text-base"} variant={"outline"}>
                    {category.name}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
