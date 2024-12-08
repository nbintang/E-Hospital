"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Send, Trash2 } from "lucide-react";
import { ArticleStatus } from "@prisma/client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useDeleteAndChangeStatusPost from "@/hooks/post/use-delete-change-status-post";
export default function PostActionsComponents({
  id: articleId,
  status,
}: {
  id: string;
  status: ArticleStatus;
}) {
  const {
    isDeleteAlertOpen,
    handleDelete,
    setIsDeleteAlertOpen,
    isPublishAlertOpen,
    setIsPublishAlertOpen,
    handlePublish,
  } = useDeleteAndChangeStatusPost({ id: articleId });

  return (
    <div className="flex space-x-2">
      <AlertDialog
        open={isPublishAlertOpen}
        onOpenChange={setIsPublishAlertOpen}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="inline-block">
              {" "}
              {/* Wrapper div to receive hover events */}
              <AlertDialogTrigger asChild>
                <Button
                  variant="blue"
                  disabled={status === "PUBLISHED"}
                  className="space-x-2 flex items-center"
                >
                  <Send className="h-4 w-4" />
                  <span>
                    {status === "DRAFT" ? "Publish item" : "Has been published"}
                  </span>
                </Button>
              </AlertDialogTrigger>
            </div>
          </TooltipTrigger>
          <TooltipContent side="top">
            {status === "PUBLISHED"
              ? "Item has been published"
              : "Click to publish item"}
          </TooltipContent>
        </Tooltip>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to publish?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action will make the item visible to the public, and it will cannot be undone or edited after.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-clean-pool hover:bg-clean-pool/80" onClick={handlePublish}>
              Publish
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogTrigger asChild>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="inline-block">
              {" "}
              {/* Wrapper div to receive hover events */}
              <AlertDialogTrigger asChild>
              <Button variant="destructive" size="icon">
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete item</span>
          </Button>
              </AlertDialogTrigger>
            </div>
          </TooltipTrigger>
          <TooltipContent side="top">
            Delete item
          </TooltipContent>
        </Tooltip>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              item from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
