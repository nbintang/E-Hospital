import { createPost } from "@/actions/post/upload-post";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function ArticlesDrafts() {
  return (
    <ContentLayout title="Drafts">
      <div className="flex justify-end ">
        <Link href={"/dashboard/articles/create"}>
          <Button variant={"blue"} >Create +</Button>
        </Link>
      </div>
    </ContentLayout>
  );
}
