"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCallback, useRef } from "react";
import { Editor } from "@tiptap/core";
import { PostSchema, PostValues } from "@/types/schemas/post";
import { createPost } from "@/actions/post/create-post";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function useCreatePostForm() {
  const editorRef = useRef<Editor | null>(null);
  const queryClient = useQueryClient();
  const router = useRouter();
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

  const createMutation = useMutation({
    mutationFn: async (values: PostValues) => {
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

      const result = await createPost(formData);

      if (!result.success) {
        throw new Error(result.error);
      } else {
        router.push("/dashboard/articles");
        form.reset();
      }

      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });

      toast.success("Post created successfully", {
        position: "bottom-right",
        description: "Your post has been published",
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create post", {
        position: "bottom-right",
      });
    },
  });
  const onSubmit = async (values: PostValues) => {
    await createMutation.mutateAsync(values);
  };

  return {
    form,
    handleCreate,
    onSubmit,
    editorRef,
    isSubmitting: createMutation.isPending,
  };
}
