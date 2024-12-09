import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { findCategories } from "@/repositories/categories.repository";
import { findQuestionsPublic } from "@/repositories/questions.repository";
import { PenSquare } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function QuestionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container min-h-screen mx-auto py-8 px-4">
 
      {children}
    </main>
  );
}
