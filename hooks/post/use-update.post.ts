"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCallback, useEffect, useRef, useState } from "react";
import { Editor } from "@tiptap/core";
import { PostSchema, PostValues } from "@/schemas/post-schema";
import { toast } from "sonner";
import { ArticleByIdProps, ArticleProps } from "@/types/article";
import { updatePost } from "@/actions/post/update-post";
import { CategoryProps } from "@/types/categories";
import { useMutateData } from "@/hooks/react-query-fn/use-mutate-data";
import { useSession } from "next-auth/react";
import { blobUrlToBase64 } from "@/lib/file-utils";

export default function useUpdatePostForm({
  article,
  categories,
}: {
  article: ArticleByIdProps;
  categories: CategoryProps[];
}) {
  const editorRef = useRef<Editor | null>(null);
  const [isContentReady, setIsContentReady] = useState(false);
  const form = useForm<PostValues>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      title: article.title,
      categories: article.categories.map((category) => category.name),
      image: article.imageUrl || undefined,
    },
  });

  const processContent = async (html: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const images = doc.getElementsByTagName("img");

    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      const src = img.getAttribute("src");
      if (src && !src.startsWith("data:")) {
        const base64 = await blobUrlToBase64(src);
        img.setAttribute("src", base64);
      }
    }

    return doc.body.innerHTML;
  };
  const initializeContent = async () => {
    try {
      const processedHtml = await processContent(article.content);
      form.setValue("content", processedHtml);
      setIsContentReady(true);
    } catch (error) {
      form.setValue("content", article.content);
      setIsContentReady(true);
    }
  };
  useEffect(() => {
    initializeContent();
  }, [article.content, form]);

  const { data: session } = useSession();
  const handleUpdate = useCallback(
    ({ editor }: { editor: Editor }) => {
      if (isContentReady && form.getValues("content") && editor.isEmpty) {
        editor.commands.setContent(form.getValues("content"));
      }
      editorRef.current = editor;
    },
    [form, isContentReady]
  );
  const result = useMutateData({
    toastId: "update-post",
    toastSuccess: "Post updated",
    toastLoading: "Updating post...",
    fetcher: async (data?: FormData) => {
      try {
        if (!data) throw new Error("No data provided"); // Add this line
        const response = await updatePost(data);
        if (!response.success) {
          return { success: false, error: response.error };
        }

        return { success: true };
      } catch (error) {
        console.log(error);
        return { success: false, error: "Failed to update post" };
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
      toast.error("Image is required");
      return;
    }
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("image", values.image);
    formData.append("articleId", article.id);
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
    handleUpdate,
    toggleCategory,
    onSubmit,
    editorRef,
    isSubmitting: result.isPending,
    isContentReady,
  };
}
