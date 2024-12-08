import React from "react";
import { Params } from "@/types/params";
import { notFound } from "next/navigation";
import PostActionsComponents from "@/components/admin/sections/post/detail";
import { TooltipProvider } from "@/components/ui/tooltip";
import UpdatePostForm from "@/components/admin/sections/post/create-update-form/update";
import { findArticlesBySlugOrId } from "@/repositories/articles.repository";
import { findCategories } from "@/repositories/categories.repository";
export default async function ArticlesDetail({ params }: { params: Params }) {
  const id = (await params).id!;
  const article = await findArticlesBySlugOrId({ id });
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
              <PostActionsComponents id={article.id} status={article.status} />
            </div>
            <UpdatePostForm article={article} categories={categories} />
          </div>
        </TooltipProvider>
      </div>
    </>
  );
}
