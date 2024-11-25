'use client'

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import useCarousel from "@/hooks/use-carousel"

const articles = [
  {
    title: "Tips Menjaga Kesehatan di Musim Pancaroba",
    content: "Pelajari cara menjaga kesehatan tubuh saat pergantian musim untuk mencegah berbagai penyakit.",
    image: "/placeholder.svg",
  },
  {
    title: "Manfaat Olahraga Rutin bagi Kesehatan Mental",
    content: "Temukan bagaimana olahraga teratur dapat meningkatkan kesehatan mental dan kesejahteraan Anda.",
    image: "/placeholder.svg",
  },
  {
    title: "Pentingnya Pola Makan Seimbang",
    content: "Pahami mengapa pola makan seimbang penting untuk kesehatan jangka panjang dan bagaimana menerapkannya.",
    image: "/placeholder.svg",
  },
  {
    title: "Teknik Relaksasi untuk Mengurangi Stres",
    content: "Pelajari berbagai teknik relaksasi efektif untuk mengelola stres dan meningkatkan kualitas hidup Anda.",
    image: "/placeholder.svg",
  },
]

const options = {
  slidesToScroll: 1,
  breakpoints: {
    '(min-width: 640px)': { slidesToScroll: 2 },
    '(min-width: 1024px)': { slidesToScroll: 3 },
  },
}

export default function ArticleCarousel() {
  const { plugin, api, setApi } = useCarousel()

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-full mx-auto"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      setApi={setApi}
      opts={options}
    >
      <CarouselContent className="-ml-4">
        {articles.map((article, index) => (
          <CarouselItem key={index} className="pl-4  md:basis-1/2 lg:basis-1/3">
            <Card>
              <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
                <Image
                  src={article.image}
                  alt={`${article.title} thumbnail`}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-2">{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 line-clamp-3">
                  {article.content}
                </p>
                <Link
                  href="#"
                  className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-700"
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
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

