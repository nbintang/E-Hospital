import PostCard from "@/components/admin/sections/post";
import { SkeletonCard } from "@/components/admin/sections/post/skeleton";
import { Button } from "@/components/ui/button";
import getAuthenticatedUserSession from "@/helper/server/get-authenticated-user-seesion";
import { findArticlesByDoctorId, findDoctorByUserId } from "@/repositories/articles.repository";
import Link from "next/link";
export default async function ArticlesPage() {
  const session = await getAuthenticatedUserSession()
  const doctor = await findDoctorByUserId(session?.user.id!) ;
  const articles = await findArticlesByDoctorId({createdBy: doctor?.id});

  return (
    <>
      <div className="flex justify-end mb-5 ">
        <Link href={"/dashboard/articles/create"}>
          <Button variant={"blue"}>Create +</Button>
        </Link>
      </div>
      {articles && articles.length > 0 ? (
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((article, i) =>
            articles && articles.length > 0 ? (
              <PostCard key={i} article={article} />
            ) : (
              <SkeletonCard key={i} />
            )
          )}
        </div>
      ) : (
        <div className="text-center flex justify-center items-center h-[50vh] xl:text-9xl lg:text-7xl md:text-5xl sm:text-3xl text-2xl font-bold text-muted-foreground/30">
          <p> No Articles</p>
        </div>
      )}
    </>
  );
}
