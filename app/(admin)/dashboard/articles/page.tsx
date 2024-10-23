import PostCard from "@/components/admin/post";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function ArticlesPage() {
  return (
    <>
      <div className="flex justify-end mb-5 ">
        <Link href={"/dashboard/articles/create"}>
          <Button variant={"blue"}>Create +</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((_, i) => (
          <PostCard key={i} {..._} />
        ))}
      </div>
    </>
  );
}
const articles = [
  {
    title: "The Future of Artificial Intelligence",
    description:
      "Explore the latest advancements in AI and how they're shaping our world. From machine learning to neural networks, discover the technologies driving the AI revolution.",
    status: "published" as const,
    category: [
      {
        name: "Technology",
      },
      {
        name: "Health",
      },
    ],
    imageUrl: "/placeholder.svg?height=200&width=300&text=AI",
  },
  {
    title: "Sustainable Living: Small Changes, Big Impact",
    description:
      "Learn how small lifestyle adjustments can lead to significant environmental benefits. This article covers easy-to-implement eco-friendly practices for everyday life.",
    status: "not published" as const,
    category: [
      {
        name: "Environment",
      },
      {
        name: "Health",
      },
    ],
    imageUrl: "/placeholder.svg?height=200&width=300&text=Eco",
  },
  {
    title: "The Art of Mindfulness Meditation",
    description:
      "Discover the benefits of mindfulness meditation and how to incorporate it into your daily routine. Reduce stress, improve focus, and enhance overall well-being.",
    status: "published" as const,
    category: [
      {
        name: "Health",
      },
      {
        name: "Meditation",
      },
    ],
    imageUrl: "/placeholder.svg?height=200&width=300&text=Meditation",
  },
];
