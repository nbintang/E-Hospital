import React from "react";
import { findArticlesBySlug } from "@/repositories/articles.repository";
import { Params } from "@/types/params";
import { notFound } from "next/navigation";
import PostDetail from "@/components/sections/post/detail";
import { TooltipProvider } from "@/components/ui/tooltip";
import { findCategories } from "@/repositories/categories.repository";
import UpdatePostForm from "@/components/sections/post/create-update-form/update";
export default async function ArticlesDetail({ params }: { params: Params }) {
  const { slug } = await params;
  if (!slug) return null;
  const article = await findArticlesBySlug({ slug });
  const categories = await findCategories();
  if (!article) {
    notFound();
  }

  return (
    <>
      <div className="mx-auto space-y-10 ">
        <TooltipProvider>
          <div className="">
            <div className="flex justify-between mb-4">
              <h1 className="text-3xl font-bold">Update Post</h1>
              <PostDetail id={article.id} status={article.status} />
            </div>
            <UpdatePostForm article={article} categories={categories} />
          </div>
        </TooltipProvider>
      </div>
    </>
  );
}
