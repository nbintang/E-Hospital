import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCallback, useRef } from "react";
import { Editor } from "@tiptap/core";
import { PostSchema, PostValues } from "@/types/schemas/post";
import { createPost } from "@/actions/post/create-post";

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

  const onSubmit = async (values: PostValues) => {
    console.log("Submitted values", values);
    if (!values.image) {
      return;
    }
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("image", values.image);
    await createPost(formData);
  };

  return {
    form,
    handleCreate,
    onSubmit,
    editorRef,
  };
}
