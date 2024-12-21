import Questions from "@/components/public/questions";
import { findCategories } from "@/repositories/categories.repository";
import { findQuestionsPublic } from "@/repositories/questions.repository";

export default async function QuestionsPage() {
  const questions = await findQuestionsPublic();
  const categories = await findCategories();
  categories.push({
    name: "All",
    slug: "all",
    id: "all",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return <Questions questions={questions} categories={categories} />;
}
