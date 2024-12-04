import React from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import Image from "next/image";
import { ArticleProps } from "@/types/article";
import { sanitizeContent } from "@/helper/common/sanitize-content";
import { formatDate } from "@/helper/client";

export default function CardArticlesSm({
  article: recentPosts,
}: {
  article: ArticleProps;
}) {
  return (
    <Card className="min-w-[300px] max-w-[400px] pt-4 overflow-hidden relative ">
      <CardContent>
        <div className="absolute inset-0">
          {recentPosts.imageUrl.startsWith("http") && (
            <Image
            src={recentPosts.imageUrl}
            alt={recentPosts.title}
            className=" object-cover"
            fill
          />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-don-juan/50" />
        <div className=" relative h-full flex flex-col justify-end ">
          <h3 className="text-lg md:text-xl font-semibold text-white">
            {recentPosts.title}
          </h3>
          
          <div className="text-xs  text-secondary/70 mt-2" dangerouslySetInnerHTML={{ __html: sanitizeContent(recentPosts.content).slice(0, 100) + "..." }} />
          <div className="flex justify-between items-center mt-4 text-xs text-secondary/60">
            <span>{recentPosts.doctor?.user?.profile?.fullname}</span>
            <span>{formatDate({ date: recentPosts.createdAt ,format: "DD/MM/YYYY" })}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
