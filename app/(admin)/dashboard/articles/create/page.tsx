import CreatePostForm from "@/components/admin/sections/post/create-update-form/create";
import { findCategories } from "@/repositories/categories.repository";
import { TooltipProvider } from "@radix-ui/react-tooltip";

export default async function CreatePostPage() {
  const categories = await findCategories();
  return (
    <div className="mx-auto space-y-10 ">
      <h1 className="text-3xl font-bold">Create New Post</h1>
      <TooltipProvider>
        <CreatePostForm categories={categories} />
      </TooltipProvider>
    </div>
  );
}
