import { Calendar, MessageCircle, Pill } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'

export function HeroSection() {
  return (
    <section className="relative min-h-[80dvh]  grid place-items-center overflow-hidden">
      <div className="absolute inset-0  bg-gradient-to-r from-gray-400/80 to-[#B1E0DF]/90 z-10" />
      <Image src={"/img/doctor-hero.jpg"} alt="Doctor Hero"  className="object-cover w-full h-full absolute object-bottom" width={1920} height={1080} />
      <div className="container relative px-2 z-10">
        <div className="grid lg:grid-cols-2 gap-8 py-12">
          <div className="flex flex-col justify-center space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white xl:text-6xl/none">
              Kesehatan Anda Prioritas Kami
            </h1>
            <p className="max-w-[600px] text-secondary md:text-xl">
              Konsultasi dengan dokter terpercaya, beli obat, dan buat janji temu kapan saja dan dimana saja.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant={"blue"}>Mulai Konsultasi</Button>
              <Button size="lg" variant="outline">Pelajari Lebih Lanjut</Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className='opacity-70 hover:opacity-100 transition-opacity'>
              <CardHeader>
                <MessageCircle className="h-8 w-8 text-primary" />
                <CardTitle>Tanya Dokter</CardTitle>
                <CardDescription>Konsultasi online 24/7</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Dapatkan saran medis dari dokter terpercaya kapan saja dan di mana saja.
                </p>
              </CardContent>
            </Card>
            <Card className='opacity-70 hover:opacity-100 transition-opacity'>
              <CardHeader>
                <Pill className="h-8 w-8 text-primary" />
                <CardTitle>Toko Obat</CardTitle>
                <CardDescription>Beli obat dengan resep</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Pesan obat dengan atau tanpa resep dan terima di rumah Anda.
                </p>
              </CardContent>
            </Card>
            <Card className="md:col-span-2 opacity-70 hover:opacity-100 transition-opacity">
              <CardHeader>
                <Calendar className="h-8 w-8 text-primary" />
                <CardTitle>Buat Janji</CardTitle>
                <CardDescription>Jadwalkan kunjungan</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Atur jadwal kunjungan ke dokter atau rumah sakit dengan mudah dan cepat.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

