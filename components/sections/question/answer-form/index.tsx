"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useAnswerQuest from "@/hooks/use-answer-quest";
import { MinimalTiptapEditor } from "@/components/extensions/minimal-tiptap";

export function AnswerForm({ id }: { id: string }) {
  const { form, handleCreate, onSubmit, editorRef, isSubmitting } =
    useAnswerQuest({ id });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full mt-4 space-y-6"
      >
        <FormField
          control={form.control}
          name="textContent"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" font-bold text-2xl my-3 ml-1">
                Your Answer
              </FormLabel>
              <FormControl>
                <MinimalTiptapEditor
                  {...field}
                  throttleDelay={0}
                  className={cn("w-full", {
                    "border-destructive focus-within:border-destructive":
                      form.formState.errors.textContent,
                  })}
                  editorContentClassName="some-class"
                  output="html"
                  placeholder="Type your answer here..."
                  onCreate={handleCreate}
                  autofocus={true}
                  immediatelyRender={true}
                  editable={true}
                  injectCSS={true}
                  editorClassName="focus:outline-none p-5"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          variant={"blue"}
          className="font-semibold "
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
