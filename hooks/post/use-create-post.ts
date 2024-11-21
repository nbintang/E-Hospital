"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCallback, useRef } from "react";
import { Editor } from "@tiptap/core";
import { PostSchema, PostValues } from "@/types/schemas/post";
import { createPost } from "@/actions/post/create-post";
import { useMutateData } from "../react-query-fn/use-mutate-data";

export default function useCreatePostForm() {
  const editorRef = useRef<Editor | null>(null);
  const form = useForm<PostValues>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      title: "",
      category: [],
      image: undefined,
      content: "",
    },
  });

  const handleCreate = useCallback(
    ({ editor }: { editor: Editor }) => {
      if (form.getValues("content") && editor.isEmpty) {
        editor.commands.setContent(form.getValues("content"));
      }
      editorRef.current = editor;
    },
    [form]
  );

  const result = useMutateData({
    toastSuccess: "Post created",
    toastId: "create-post",
    toastLoading: "Creating post...",
    fetcher: async (data?: FormData) => {
      if (!data) return;
      await createPost(data);
    },
    tags: "posts",
    redirectUrl: "/dashboard/articles",
  });

  const onSubmit = async (values: PostValues) => {
    if (!values.image) {
      throw new Error("Image is required");
    }

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("image", values.image);
    values.category.forEach((category) => {
      formData.append("category", category);
    });

    result.mutate(formData);
  };

  return {
    form,
    handleCreate,
    onSubmit,
    editorRef,
    isSubmitting: result.isPending,
  };
}
