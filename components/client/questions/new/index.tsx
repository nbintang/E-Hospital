"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Category } from "@prisma/client";
import { TagsInput } from "@/components/extensions/input-tags";
import { createQuestions } from "@/repositories/questions.repository";
import { formatSlugToTitle, formatTitleToSlug } from "@/helper/common";
import { useOpenAuthDialog } from "@/hooks/use-open-auth-dialog";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  textContent: z.string().min(1, "Question content is required"),
  categories: z.array(z.string()).min(1, "At least one category is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateQuestionForm({
  categories,
  session,
}: {
  categories: Category[];
  session: Session | null;
}) {
  const router = useRouter();
  const { setShowSignIn } = useOpenAuthDialog();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      textContent: "",
      categories: [],
    },
  });
  useEffect(() => {
    if (!session) {
      setShowSignIn(true);
    }
  }, [session, setShowSignIn]);

  async function onSubmit(values: FormValues) {
    if (!session) {
      setShowSignIn(true);
      return;
    }
    const result = await createQuestions({
      title: values.title,
      textContent: values.textContent,
      slug: formatTitleToSlug(values.title),
      user: {
        connect: {
          id: session?.user.id,
        },
      },
      categories: {
        connectOrCreate: values.categories.map((slug) => ({
          where: { slug },
          create: {
            name: formatSlugToTitle(slug),
            slug: formatTitleToSlug(slug),
          }, // Add the slug property here
        })),
      },
    });
    toast.promise(Promise.resolve(result), {
      loading: "Memproses...",
      success: "Berhasil Membuat Pertanyaan",
      error: "Terjadi kesalahan, silahkan coba lagi",
    });
    if (result) {
      form.reset();
      router.push("/questions");
    }
  }

  const toggleCategory = (categorySlug: string) => {
    const currentCategories = form.getValues("categories");
    const updatedCategories = currentCategories.includes(categorySlug)
      ? currentCategories.filter((slug) => slug !== categorySlug)
      : [...currentCategories, categorySlug];

    form.setValue("categories", updatedCategories);
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-5">Create a New Question</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the question title" {...field} />
                </FormControl>
                <FormDescription>
                  This will be the main title of your question.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="textContent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter the details of your question"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Provide more context or details about your question.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categories</FormLabel>
                <TagsInput
                  className="mt-2"
                  value={field.value}
                  placeholder="Select or create at least one category for your question."
                  onValueChange={(newValue) => field.onChange(newValue)}
                />
                <div className="flex flex-wrap gap-2">
                  {categories.map((category: Category) => (
                    <Badge
                      key={category.slug}
                      variant={
                        field.value.includes(category.slug) ? "blue" : "outline"
                      }
                      className="cursor-pointer"
                      onClick={() => toggleCategory(category.slug)}
                    >
                      {category.name}
                    </Badge>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant={"blue"}
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Submitting..." : "Submit Question"}
          </Button>
        </form>
      </Form>
    </>
  );
}
