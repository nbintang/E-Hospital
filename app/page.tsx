import { SiteHeader } from "@/components/client/panel/site-header";
import { HeroSection } from "@/components/client/home/hero-section";
import { ArticleSection } from "@/components/client/home/article-section";
import getAuthenticatedUserSession from "@/helper/server/get-authenticated-user-seesion";
import { getSession } from "next-auth/react";

export default async function Home() {
return (
  <div className="flex min-h-screen flex-col ">

    <main className="flex-1 ">
      <HeroSection />
      <div className="flex justify-center">
        <ArticleSection />
      </div>
    </main>
  </div>
);
}
