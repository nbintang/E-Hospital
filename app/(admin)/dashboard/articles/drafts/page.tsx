import { createPost } from "@/actions/post/upload-post";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import PostDrafts from "@/components/admin/post/post-draft";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { findArticles } from "@/repositories/article.repository";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function ArticlesDrafts() {

  // console.log(img);
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
