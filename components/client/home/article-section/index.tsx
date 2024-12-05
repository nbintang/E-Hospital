import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ArticleCarousel from "./article-carousel";

export function ArticleSection() {
  return (
    <section className="container py-12 px-2 ">
      <h2 className="text-2xl font-bold tracking-tight text-center md:text-left mb-8">
        Artikel Kesehatan
      </h2>
      <div className="grid  gap-6 justify-items-center">
        <Card className="overflow-hidden ">
          <div className="grid md:grid-cols-2 gap-6 ">
            <div className="relative aspect-video md:aspect-square lg:aspect-video h-full overflow-hidden ">
              <Image
                src="/img/coughing.jpg"
                alt="Coffee cup on wooden table"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center p-6 space-y-4">
              <CardHeader className="p-0">
                <CardTitle className="text-2xl">
                  Khasiat Kopi untuk Diet, Ini Faktanya!
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-4">
                <p className="text-gray-500">
                  Pemanfaatan kopi untuk diet dilakukan karena kandungan kafein
                  yang terdapat pada kopi diyakini dapat meningkatkan laju
                  metabolisme dan pembakaran lemak. Lorem ipsum dolor sit amet,
                  consectetur adipisicing elit. Quia ea, dolorem ducimus
                  provident dicta ad atque dignissimos asperiores. Facilis odit
                  tempora animi assumenda!
                </p>
                <Link
                  href="#"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700"
                >
                  Baca Selengkapnya
                  <svg
                    className="ml-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </CardContent>
            </div>
          </div>
        </Card>
       <div >
        <h1 className="text-2xl font-bold tracking-tight text-center md:text-left mb-8">Artikel Lainnya</h1>
       <div className="max-w-xs sm:max-w-[600px] lg:max-w-none">
          <ArticleCarousel />
        </div>
       </div>
      </div>
    </section>
  );
}
