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
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";
import useCreatePostForm from "@/hooks/use-create-post";
import AnswerEditor from './editor';
import useAnswerForm from "@/hooks/use-answers-editor";

export const AnswerForm: React.FC = () => {
  const { form, handleCreate, onSubmit, editorRef } = useAnswerForm();
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-4 space-y-6">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" font-bold text-2xl my-3 ml-1">Your Answer</FormLabel>
              <FormControl>
                <AnswerEditor
                  {...field}
                  throttleDelay={0}
                  className={cn("w-full", {
                    "border-destructive focus-within:border-destructive":
                      form.formState.errors.content,
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
          variant={"blue"}
          className="font-semibold "
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};
