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
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multi-select";
import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { TagsInput } from "@/components/ui/input-tags";
interface CategoryProps {
  id: string;
  slug: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const CreateForm = ({ categories }: { categories: CategoryProps[] }) => {
  const [open, setOpen] = useState<boolean>(false);
  const { form, handleCreate, onSubmit, isSubmitting } = useCreatePostForm();
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
                  className={cn("w-full focus-visible:ring-1 bg-white", {
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
                  className={cn("w-full focus-visible:ring-1 bg-white", {
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
          name="category"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Select Categories</FormLabel>

              {open ? (
                <div>
                  <TagsInput
                    onValueChange={field.onChange}
                    value={field.value}
                  />
                </div>
              ) : (
                <>
                  <MultiSelector
                    onValuesChange={field.onChange}
                    values={field.value}
                  >
                    <MultiSelectorTrigger>
                      <MultiSelectorInput placeholder="Select Categories" />
                    </MultiSelectorTrigger>
                    <MultiSelectorContent>
                      <MultiSelectorList>
                        {categories.map((category) => (
                          <MultiSelectorItem
                            key={category.id}
                            value={category.name}
                          >
                            <span>{category.name}</span>
                          </MultiSelectorItem>
                        ))}
                      </MultiSelectorList>
                    </MultiSelectorContent>
                  </MultiSelector>
                </>
              )}
              {open ? (
                <Button
                  className=""
                  type="button"
                  onClick={() => setOpen(false)}
                  variant={"secondary"}
                >
                  Back To Select
                </Button>
              ) : (
                <Button
                  onClick={() => setOpen(true)}
                  className="space-x-3"
                  type="button"
                  variant={"secondary"}
                >
                  <p>Add New Category </p> <PlusIcon className="w-5 h-5" />
                </Button>
              )}
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
                    "border-destructive focus-within:border-destructive bg-white":
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
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting || isSubmitting
            ? "Submitting..."
            : "Submit"}
        </Button>
      </form>
    </Form>
  );
};
export default CreateForm;
