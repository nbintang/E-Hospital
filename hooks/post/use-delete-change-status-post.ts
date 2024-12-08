import { changeStatusArticles } from "@/actions/post/change-status-post";
import React, { useState } from "react";
import { useMutateData } from "@/hooks/react-query-fn/use-mutate-data";
import { deletePost } from "@/actions/post/delete-post";
import { useSession } from "next-auth/react";

export default function useDeleteAndChangeStatusPost({ id: articleId }: { id: string }) {
  const [isPublishAlertOpen, setIsPublishAlertOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const { data: session } = useSession();
  const publishResult = useMutateData({
    toastId: "change-status",
    toastLoading: "Changing status...",
    toastSuccess: "Status changed",
    fetcher: async (data?: FormData) => {
      try {
        await changeStatusArticles({ id: articleId, status: "PUBLISHED" });
        return { success: true };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    redirectUrl: "/dashboard/articles",
    tags: "posts",
  });
  const handlePublish = () => {
    const data = new FormData();
    publishResult.mutate(data);
  };

  const deleteResult = useMutateData({
    toastId: "delete-post",
    toastLoading: "Deleting post...",
    toastSuccess: "Post deleted",
    fetcher: async (data?: FormData) => {
      try {
        await deletePost(articleId);
        return { success: true };
      } catch (error) {
        console.log(error);
        throw error;
        
      }
    },
    redirectUrl:
      session?.user?.role === "ADMIN"
        ? "/dashboard/articles"
        : "/doctor/dashboard/articles",
    tags: "posts",
  });

  const handleDelete = () => {
    const data = new FormData();
    deleteResult.mutate(data);
  };

  return {
    isPublishAlertOpen,
    setIsPublishAlertOpen,
    isDeleteAlertOpen,
    setIsDeleteAlertOpen,
    handlePublish,
    handleDelete,
  };
}
