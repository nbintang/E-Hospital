import CreatePostForm from "@/components/sections/post/create-update-form/create";
import { findCategories } from "@/repositories/categories.repository";

export default async function CreatePostPage() {
  const categories = await findCategories();

  return (
    <div className="mx-auto space-y-10">
      <h1 className="text-3xl font-bold">Create New Post</h1>
      <CreatePostForm categories={categories} />
    </div>
  );
}
