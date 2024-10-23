import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCallback, useRef } from "react";
import { Editor } from "@tiptap/core";
import { createAnswer } from "@/actions/question/create-answer";
const formSchema = z.object({
  content: z
    .string({
      required_error: "Description is required",
    })
    .min(1, "Description is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function useAnswerForm() {
  const editorRef = useRef<Editor | null>(null);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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

  const onSubmit = async (values: FormValues) => {
    const formData = new FormData();
    formData.append("content", values.content);
    await createAnswer(formData);
  };
  return {
    form,
    handleCreate,
    onSubmit,
    editorRef,
  };
}
