"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/extensions/multi-select";
import { useState } from "react";
import { Paperclip, PlusIcon, Trash2Icon } from "lucide-react";
import { TagsInput } from "@/components/extensions/input-tags";
import useUpdatePostForm from "@/hooks/post/use-update.post";
import { ArticleProps } from "@/types/article";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
} from "@/components/extensions/image-upload";
import Image from "next/image";
import { MinimalTiptapEditor } from "@/components/extensions/minimal-tiptap";
import { CategoryProps } from "@/types/categories";
const UpdatePostForm = ({
  article,
  categories,
}: {
  article: ArticleProps;
  categories: CategoryProps[];
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const { form, handleUpdate, onSubmit, isSubmitting, isContentReady } =
    useUpdatePostForm({ article, categories });
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
                {article.imageUrl.startsWith("http") ? (
                  <FileUploader
                    value={field.value instanceof File ? [field.value] : []}
                    onValueChange={(files) => files && field.onChange(files[0])}
                    dropzoneOptions={{
                      maxFiles: 1,
                      maxSize: 1024 * 1024 * 4,
                      accept: {
                        "image/*": [".png", ".jpeg", ".jpg"],
                      },
                    }}
                    className="relative rounded-lg p-2 bg-secondary min-w-0"
                  >
                    {field.value ? (
                      <FileUploaderContent>
                        <div className="flex relative items-center justify-center flex-col pt-3 pb-4 w-full">
                          {field.value instanceof File ? (
                            <Image
                              src={URL.createObjectURL(field.value)}
                              alt="Book Cover"
                              width={200}
                              height={400}
                              className="object-cover rounded-lg"
                            />
                          ) : (
                            <Image
                              src={field.value} // Use the pre-existing image URL
                              alt="Book Cover"
                              width={200}
                              height={400}
                              className="object-cover rounded-lg"
                            />
                          )}
                          <Trash2Icon
                            onClick={() => field.onChange("")}
                            className="mt-2 w-5 h-5 text-red-500 hover:text-red-600 cursor-pointer"
                          />
                        </div>
                      </FileUploaderContent>
                    ) : (
                      <FileInput className="outline-dashed outline-1 outline-black h-96">
                        <div className="flex items-center justify-center flex-col pt-3 pb-4 h-full w-full">
                          <Paperclip className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400" />
                          <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            PNG, JPEG, or JPG images only, max size 3MB
                          </p>
                        </div>
                      </FileInput>
                    )}
                  </FileUploader>
                ) : (
                  <div>No Images from sources</div>
                )}
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
                {isContentReady ? (
                  <MinimalTiptapEditor
                    {...field}
                    throttleDelay={0}
                    className={cn("w-full", {
                      "border-destructive focus-within:border-destructive bg-white":
                        form.formState.errors.content,
                    })}
                    editorContentClassName="some-class"
                    output="html"
                    placeholder="Type your description here..."
                    onCreate={handleUpdate}
                    autofocus={true}
                    immediatelyRender={true}
                    editable={true}
                    injectCSS={true}
                    editorClassName="focus:outline-none p-5"
                  />
                ) : (
                  <div>Loading the Content...</div>
                )}
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
export default UpdatePostForm;
