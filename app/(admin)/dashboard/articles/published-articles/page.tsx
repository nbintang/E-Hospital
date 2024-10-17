import { ContentLayout } from "@/components/admin-panel/content-layout";
import Post from "@/components/admin/post";
export default function Articles() {
  return (
    <ContentLayout title="Articles">
  <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-center gap-4 ">
  {Array.from({length: 5}).map((_, i) => <Post key={i} />)}
  </div>
    </ContentLayout>
  );
}
