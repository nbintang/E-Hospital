import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ArticleCarousel from "./article-carousel";
import { ArticleProps } from "@/types/article";
import { sanitizeContent } from "@/helper/common/sanitize-content";
import { ChevronRight } from "lucide-react";

export function ArticleSection({
  articles,
  latestArticle,
}: {
  articles: ArticleProps[];
  latestArticle: ArticleProps;
}) {
  return (
    <section className="container py-12 px-2 ">
      <h2 className="text-2xl font-bold tracking-tight text-center md:text-left mb-8">
        Artikel Kesehatan
      </h2>
      <div className="grid  gap-6 justify-items-center">
        <Card className="overflow-hidden ">
          <div className="grid md:grid-cols-2 gap-6 ">
            <div className="relative aspect-video md:aspect-square lg:aspect-video h-full overflow-hidden ">
              <Image
                src={latestArticle.imageUrl}
                alt="Coffee cup on wooden table"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center p-6 space-y-4">
              <CardHeader className="p-0">
                <CardTitle className="text-2xl">
                  {latestArticle.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-4">
                <div
                  className="text-gray-500 prose"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeContent(latestArticle.content)
                      .replace(/<img[^>]*>/g, "")
                      .slice(0, 200),
                  }}
                />
                <Link
                  href={`/articles/${latestArticle.slug}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700"
                >
                  Baca Selengkapnya
                  <ChevronRight className="w-4 h-4 ml-2" aria-hidden="true" />
                </Link>
              </CardContent>
            </div>
          </div>
        </Card>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-center md:text-left mb-8">
            Artikel Lainnya
          </h1>
          <div className="max-w-xs sm:max-w-[600px] lg:max-w-none">
            <ArticleCarousel articles={articles} />
          </div>
        </div>
      </div>
    </section>
  );
}
