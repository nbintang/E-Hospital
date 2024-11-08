import React from "react";
import { findArticlesBySlug } from "@/repositories/articles.repository";
import { Params } from "@/types";
import { notFound } from "next/navigation";
import DOMPurify from "isomorphic-dompurify";
import { Button } from "@/components/ui/button";
import { EllipsisIcon } from "lucide-react";
import InteractPostDetail from "@/components/sections/post/interact";
import PostDetail from "@/components/sections/post/detail";
export default async function ArticlesDetail({ params }: { params: Params }) {
  const { slug } = await params;
  if (!slug) return null;
  const article = await findArticlesBySlug({ slug });
  if (!article) {
    notFound();
  }
  const content = DOMPurify.sanitize(article.content);
  return (
    <>
      <PostDetail article={article} content={content} />
    </>
  );
}
