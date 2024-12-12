import { SiteHeader } from "@/components/client/panel/site-header";
import { HeroSection } from "@/components/client/home/hero-section";
import { ArticleSection } from "@/components/client/home/article-section";
import getAuthenticatedUserSession from "@/helper/server/get-authenticated-user-seesion";
import { getSession } from "next-auth/react";
import { findAllArticles } from "@/repositories/articles.repository";

export default async function Home() {

  const articles = await findAllArticles();
  const latestArticle =  articles[articles.length - 1]

return (
  <div className="flex min-h-screen flex-col ">

    <main className="flex-1 ">
      <HeroSection />
      <div className="flex justify-center">
        <ArticleSection articles={articles} latestArticle={latestArticle} />
      </div>
    </main>
  </div>
);
}
