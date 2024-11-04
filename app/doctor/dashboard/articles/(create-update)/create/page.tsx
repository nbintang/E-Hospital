
import { CreateForm } from "@/components/sections/post/create-update-form/create";

export default function CreatePostPage() {
  return (
    <div className="mx-auto space-y-10">
      <h1 className="text-3xl font-bold">Create New Post</h1>
      <CreateForm />
    </div>
  );
}
