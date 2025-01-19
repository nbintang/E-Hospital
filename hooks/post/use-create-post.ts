"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCallback, useRef } from "react";
import { Editor } from "@tiptap/core";
import { PostSchema, PostValues } from "@/schemas/post-schema";
import { createPost } from "@/actions/post/create-post";
import { useMutateData } from "@/hooks/react-query-fn/use-mutate-data";
import { useSession } from "next-auth/react";
import { CategoryProps } from "@/types/categories";

export default function useCreatePostForm(
  { categories }: { categories: CategoryProps[] }
) {
  const editorRef = useRef<Editor | null>(null);
  const form = useForm<PostValues>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      title: "",
      categories: [],
      image: undefined,
      content: "",
    },
  });
  const { data: session } = useSession();
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
      try {
        if (!data) {
          return { success: false, error: "No data provided" };
        }
        const response = await createPost(data);
        if (!response.success){
          return { success: false, error: "Failed to create post" };
        }
    
        return { success: true };
      } catch (error) {
        return { success: false, error: "Failed to create post" };
      }
    },
    tags: "posts",
    redirectUrl:
      session?.user?.role === "ADMIN"
        ? "/dashboard/articles"
        : "/doctor/dashboard/articles",
  });

  const onSubmit = async (values: PostValues) => {
    if (!values.image) {
      throw new Error("Image is required");
    }

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("image", values.image);
    values.categories.forEach((categories) => {
      formData.append("categories", categories);
    });

    result.mutate(formData);
  };
  
  const toggleCategory = (categorySlug: string) => {
    const currentCategories = form.getValues("categories");
    const updatedCategories = currentCategories.includes(categorySlug)
      ? currentCategories.filter((slug) => slug !== categorySlug)
      : [...currentCategories, categorySlug];

    form.setValue("categories", updatedCategories);
  };


  return {
    form,
    handleCreate,
    toggleCategory,
    onSubmit,
    editorRef,
    isSubmitting: result.isPending,
  };
}
