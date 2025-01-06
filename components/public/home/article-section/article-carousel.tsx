"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import useCarousel from "@/hooks/use-carousel";
import { ArticleProps } from "@/types/article";
import { sanitizeContent } from "@/helper/common/sanitize-content";
import { useRouter } from "next/navigation";

const options = {
  slidesToScroll: 1,
  breakpoints: {
    "(min-width: 640px)": { slidesToScroll: 2 },
    "(min-width: 1024px)": { slidesToScroll: 3 },
  },
};

export default function ArticleCarousel({
  articles,
}: {
  articles: ArticleProps[];
}) {
  const { plugin, api, setApi } = useCarousel();
  const [isClientArticle, setIsClientArticle] = React.useState<ArticleProps[]>(
    []
  );
  React.useEffect(() => {
    setIsClientArticle(articles);
  });
  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-full mx-auto"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      setApi={setApi}
      opts={options}
    >
      <CarouselContent className="-ml-4">
        {isClientArticle.map((article, index) => (
          <CarouselItem key={index} className="pl-4 sm:basis-1/2 lg:basis-1/3">
            <Card>
              <div className="relative aspect-video overflow-hidden rounded-t-lg">
                <Image
                  src={article.imageUrl}
                  alt={`${article.title} thumbnail`}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-2">{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className=" prose-p:text-muted-foreground prose-p:text-thin prose line-clamp-3"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeContent(article.content)
                      .replace(/<img[^>]*>/g, "")
                      .slice(0, 300),
                  }}
                />

                <Link
                  href={`/articles/${article.slug}`}
                  className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-700"
                >
                  Baca Selengkapnya
                  <svg
                    className="ml-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
