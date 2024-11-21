import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCallback, useRef } from "react";
import { Editor } from "@tiptap/core";
import { createAnswer } from "@/actions/question/create-answer";
import { useMutateData } from "./react-query-fn/use-mutate-data";
const formSchema = z.object({
  textContent: z
    .string({
      required_error: "Description is required",
    })
    .min(1, "Description is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function useAnswerQuest({ id }: { id: string }) {
  const editorRef = useRef<Editor | null>(null);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      textContent: "",
    },
  });

  const handleCreate = useCallback(
    ({ editor }: { editor: Editor }) => {
      if (form.getValues("textContent") && editor.isEmpty) {
        editor.commands.setContent(form.getValues("textContent"));
      }
      editorRef.current = editor;
    },
    [form]
  );
  const answerResult = useMutateData({
    toastSuccess: "Answer created",
    toastId: "create-answer",
    toastLoading: "Creating answer...",
    fetcher: async (data?: FormData) => {
      if (!data) return;
      await createAnswer(data, id);
    },
    redirectUrl: "/dashboard/questions",
  });

  const onSubmit = async (values: FormValues) => {
    const formData = new FormData();
    formData.append("textContent", values.textContent);
    answerResult.mutate(formData);
  };


  return {
    form,
    handleCreate,
    onSubmit,
    editorRef,
    isSubmitting: answerResult.isPending
  };
}
