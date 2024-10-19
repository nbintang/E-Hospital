
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { getArticles } from "@/services/article.service";
import { findArticles } from "@/repositories/article.repository";
import { createPost } from "@/actions/post/upload-post";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useCallback, useRef } from "react";
import { Editor } from "@tiptap/core";
const formSchema = z.object({
    title: z.string(),
    content: z
      .string({
        required_error: "Description is required",
      })
      .min(1, "Description is required"),
  });
  
  type FormValues = z.infer<typeof formSchema>;
  
export default function useCreatePostForm() {
    const editorRef = useRef<Editor | null>(null);
    const form = useForm<FormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        title: "",
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
  
    const onSubmit = (values: FormValues) => {
      console.log("==Getting values from form==");
      console.log(values);
      console.log("Success: Values retrieved from form");
  
      setTimeout(() => {
        console.log("==Clearing form==");
        form.reset();
        console.log("Success: Form cleared");
      }, 1000);
  
      setTimeout(() => {
        console.log("==Clearing editor==");
        editorRef.current?.commands.clearContent();
        console.log("Success: Editor cleared");
      }, 2000);
  
      setTimeout(() => {
        console.log("==Resetting editor==");
        editorRef.current?.commands.setContent("");
        console.log("Success: Editor reset");
      }, 3000);
  
      setTimeout(() => {
        console.log("==Setting editor content==");
        editorRef.current?.commands.setContent(values.content);
        console.log("Success: Editor content set");
      }, 4000);
    };
    return {
      form,
      handleCreate,
      onSubmit,
      editorRef
    }
  
}