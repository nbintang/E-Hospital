import { changeStatusArticles } from "@/actions/post/change-status-post";
import React, { useState } from "react";
import { useMutateData } from "../react-query-fn/use-mutate-data";
import { deletePost } from "@/actions/post/delete-post";

export default function useDeleteAndChangeStatusPost({ id }: { id: string }) {
  const [isPublishAlertOpen, setIsPublishAlertOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const publishResult = useMutateData({
    toastId: "change-status",
    toastLoading: "Changing status...",
    toastSuccess: "Status changed",
    fetcher: async (data?: FormData) => {
      await changeStatusArticles({ id, status: "PUBLISHED" });
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
      await deletePost(id);
    },
    redirectUrl: "/dashboard/articles",
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
