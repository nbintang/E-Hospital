import { ContentLayout } from "@/components/admin/admin-panel/content-layout";
import { CreateForm } from "@/components/admin/post/create-update-form/create";

export default function CreatePostPage() {
  return (
    <ContentLayout title="Create Post">
      <div className="mx-auto space-y-10">
        <h1 className="text-3xl font-bold">Create New Post</h1>
        <CreateForm />
      </div>
    </ContentLayout>
  );
}
