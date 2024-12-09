import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { findCategories } from "@/repositories/categories.repository";
import { findQuestionsPublic } from "@/repositories/questions.repository";
import { PenSquare } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import React from "react";

export default async function QuestionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await findCategories();
  const addAllCategory = categories.push({
    id: "all",
    name: "All",
    slug: "all",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const heads = await headers();
  const pathname = heads.get("next-url") as string;
  console.log(pathname);
  
  
  
  return (
    <main className="container min-h-screen mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Ask a Doctor</h1>
        <Button size="lg" variant={"blue"} className="gap-2">
          <PenSquare className="w-4 h-4" />
          Ask a Question
        </Button>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">
          Latest Health Discussions
        </h2>
        <div className="flex gap-2 mb-4 flex-wrap">
          {categories.reverse().map((category) => (
            <Link
              key={category.id}
              href={`/questions/category/${category.slug}`}
            >
              <Badge
                key={category.id}
                variant={category.id === "all" ? "default" : "secondary"}
                className="cursor-pointer"
              >
                {category.name}
              </Badge>
            </Link>
          ))}
        </div>
      </div>
      {children}
    </main>
  );
}
