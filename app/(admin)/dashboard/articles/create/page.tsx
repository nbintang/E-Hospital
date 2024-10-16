import { createPost } from "@/actions/post/upload-post";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { ExampleForm } from "@/components/admin/post/post-draft";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CreatePostPage() {
  return (
    <ContentLayout title="Create Post">
      <div className="mx-auto space-y-10">
        <h1 className="text-3xl font-bold">Create New Post</h1>
        <ExampleForm />
      </div>
    </ContentLayout>
  );
}
