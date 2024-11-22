import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ArticleProps } from "@/types/article";
import Image from "next/image";
import { formatDate } from "@/helper/client";
import { sanitizeContent } from "@/helper/common/sanitize-content";
export function CardArticle({
  article: recentPost,
}: {
  article: ArticleProps;
}) {
  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-3 overflow-hidden relative ">
      <CardContent>
        <div className="absolute inset-0">
          <Image
            src={recentPost.imageUrl}
            alt={recentPost.title}
            className=" object-cover"
            fill
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-don-juan/50" />
        <div className=" relative  h-full flex flex-col justify-end md:p-6 p-4">
          <h3 className="text-lg md:text-xl font-semibold text-white">
            {recentPost.title}
          </h3>
          <p className="text-sm text-secondary/70 mt-2">
            {" "}
            <span
              className=""
              dangerouslySetInnerHTML={{
                __html:
                  sanitizeContent(recentPost.content).slice(0, 200) + "...",
              }}
            />
          </p>
          <div className="flex justify-between items-end mt-4 text-sm text-secondary/60">
            <span>{recentPost.doctor?.user?.profile?.fullname || ""}</span>
            <span>{formatDate({ date: recentPost.createdAt, format: "DD/MM/YYYY" })}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
