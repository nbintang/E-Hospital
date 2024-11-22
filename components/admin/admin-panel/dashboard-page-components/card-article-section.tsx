import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { DoubleArrowRightIcon } from "@radix-ui/react-icons";
import React, { Fragment } from "react";
import CardArticlesSm from "./card-articles-sm";
import { CardArticle } from "./card-article";
import { ArticleProps } from "@/types/article";
export function CardArticlesSection({
  articles,
}: {
  articles: ArticleProps[];
}) {
  return (
    <>
      <CardArticle article={articles[articles.length - 1]} />
      <div className="justify-items-end ">
        <Button
          variant={"ghost"}
          size={"sm"}
          className="flex text-muted-foreground gap-2 my-1"
        >
          <p className="text-sm">See More</p>
          <DoubleArrowRightIcon className="h-5  w-5" />
        </Button>
      </div>
      <div className="col-span-1 md:col-span-2 lg:col-span-3">
        <ScrollArea>
          <div className="flex gap-3">
            {articles.slice(0, -1).map((article, i) => (
              <Fragment key={i}>
                <CardArticlesSm article={article} />
              </Fragment>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
}
