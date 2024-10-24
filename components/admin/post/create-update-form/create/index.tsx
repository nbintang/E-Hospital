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
import BlogEditor from "../editor";

export const CreateForm: React.FC = () => {
  const { form, handleCreate, onSubmit } = useCreatePostForm();
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="">Title</FormLabel>
              <FormControl>
                <Input
                  className={cn("w-full focus-visible:ring-1 bg-transparent", {
                    "border-destructive  focus-within:border-destructive":
                      form.formState.errors.content,
                  })}
                  placeholder="Type your title here..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="">Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  className={cn("w-full focus-visible:ring-1 bg-transparent", {
                    "border-destructive  focus-within:border-destructive":
                      form.formState.errors.content,
                  })}
                  placeholder="Type your title here..."
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const file = event.target.files?.[0]; // Ensure the file is selected
                    if (file) {
                      form.setValue("image", file); // Manually set the file in the form
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Description</FormLabel>
              <FormControl>
                <BlogEditor
                  {...field}
                  throttleDelay={0}
                  className={cn("w-full", {
                    "border-destructive focus-within:border-destructive":
                      form.formState.errors.content,
                  })}
                  editorContentClassName="some-class"
                  output="html"
                  placeholder="Type your description here..."
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
