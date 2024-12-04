import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCallback, useRef } from "react";
import { Editor } from "@tiptap/core";
import { createAnswer } from "@/actions/question/create-answer";
import { useMutateData } from "./react-query-fn/use-mutate-data";
import { useSession } from "next-auth/react";
import { SchemaValues, AnswerSchema } from "@/schemas/answer-schema";

export default function useAnswerQuest({ id }: { id: string }) {
  const editorRef = useRef<Editor | null>(null);
  const form = useForm<SchemaValues>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      textContent: "",
    },
  });

  const { data: session } = useSession();
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
    redirectUrl:
      session?.user?.role === "ADMIN"
        ? "/dashboard/questions"
        : "/doctor/dashboard/questions",
  });

  const onSubmit = async (values: SchemaValues) => {
    const formData = new FormData();
    formData.append("textContent", values.textContent);
    answerResult.mutate(formData);
  };

  return {
    form,
    handleCreate,
    onSubmit,
    editorRef,
    isSubmitting: answerResult.isPending,
  };
}
