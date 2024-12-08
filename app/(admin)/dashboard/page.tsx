
import { findQuestions } from "@/repositories/questions.repository";
import { Charts } from "@/components/admin/panel/charts";
import { findAllArticles, findArticlesByDoctorId } from "@/repositories/articles.repository";
import {CardArticlesSection, CardOrderTable, CardQuestionLists, CardUserTable } from "@/components/admin/sections/home-dashboard";
export default async function Dashboard() {
  const questions = await findQuestions();


  const articles = await findAllArticles();
  const clientQuestions = [
    { id: 1, question: "How do I reset my password?", status: "New" },
    {
      id: 2,
      question: "Can I change my subscription plan?",
      status: "Answered",
    },
    { id: 3, question: "Where can I find the user manual?", status: "New" },
  ];
  const orders = [
    {
      id: 1,
      product: "Premium Widget",
      customer: "John Smith",
      date: "2024-03-14",
      status: "Shipped",
    },
    {
      id: 2,
      product: "Basic Gadget",
      customer: "Alice Johnson",
      date: "2024-03-15",
      status: "Processing",
    },
    {
      id: 3,
      product: "Super Tool",
      customer: "Bob Brown",
      date: "2024-03-13",
      status: "Delivered",
    },
  ];
  const users = [
    { id: 1, name: "John Smith", email: "john@example.com", role: "Customer" },
    { id: 2, name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
    { id: 3, name: "Bob Brown", email: "bob@example.com", role: "Customer" },
  ];
  return (
    <div className="container mx-auto p-4 space-y-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-5">
        <div className="col-span-2 row-span-3">
          <CardArticlesSection articles={articles} />
        </div>
          <CardQuestionLists questions={questions} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 col-span-3 gap-3">
          <CardOrderTable orders={orders} />
          <Charts className="col-span-2 lg:col-span-1 order-1" />
        </div>
        <CardUserTable users={users} />
      </div>
    </div>
  );
}
