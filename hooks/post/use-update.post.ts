"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCallback, useEffect, useRef, useState } from "react";
import { Editor } from "@tiptap/core";
import { PostSchema, PostValues } from "@/schemas/post";
import { toast } from "sonner";
import { ArticleProps } from "@/types/article";
import { updatePost } from "@/actions/post/update-post";
import { replaceImageUrlToBase64 } from "@/helper/client";
import { CategoryProps } from "@/types/categories";
import { useMutateData } from "../react-query-fn/use-mutate-data";

export default function useUpdatePostForm({
  article,
  categories,
}: {
  article: ArticleProps;
  categories: CategoryProps[];
}) {
  const editorRef = useRef<Editor | null>(null);
  const [isContentReady, setIsContentReady] = useState(false);
  const form = useForm<PostValues>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      title: article.title,
      category: article.categories.map((category) => category.name),
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
        const base64 = await replaceImageUrlToBase64(src);
        img.setAttribute("src", base64);
      }
    }

    return doc.body.innerHTML;
  };
  useEffect(() => {
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

    initializeContent();
  }, [article.content, form]);

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
      if(!data) return
      await updatePost(data);
    },
    tags: "posts",
    redirectUrl: "/dashboard/articles",
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
    values.category.forEach((category) => {
      formData.append("category", category);
    });
    result.mutate(formData);
  };

  return {
    form,
    handleUpdate,
    onSubmit,
    editorRef,
    isSubmitting: result.isPending,
    isContentReady,
  };
}
