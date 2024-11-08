"use client";
import React, { useState } from "react";
import InteractPostDetail from "../interact";
import { Button } from "@/components/ui/button";
import { Article } from "@prisma/client";

export default function PostDetail({
  article,
  content,
}: {
  article: Article;
  content: string;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<"delete" | "publish" | null>(
    null
  );

  const handleActionClick = (action: "delete" | "publish") => {
    setDialogAction(action);
    setDialogOpen(true);
  };

  const handleConfirm = () => {
    // Implement the actual delete or publish logic here
    console.log(`Confirmed: ${dialogAction}`);
    setDialogOpen(false);
  };

  return (
    <>
      <div className="flex justify-end mb-5 items-center gap-5 ">
        <Button
        size={"sm"}
        className="px-4"
          variant={"default"}
          onClick={() => handleActionClick("publish")}
        >
          Publish
        </Button>
        <InteractPostDetail
          handleActionClick={handleActionClick}
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          dialogAction={dialogAction}
          handleConfirm={handleConfirm}
        />
      </div>
      <div className="w-full  lg:mx-auto  max-w-3xl lg:max-w-5xl xl:max-w-6xl px-4">
        <h1 className="text-2xl lg:text-3xl font-bold">{article.title}</h1>

        {/* Add w-full and prose-wider to remove constraints */}
        <div
          className="prose w-full max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </>
  );
}
