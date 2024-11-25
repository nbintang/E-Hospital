import { Calendar, MessageCircle, Pill } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function HeroSection() {
  return (
    <section className="relative flex flex-col items-center">
      <div className="absolute inset-0  bg-gradient-to-r from-blue-100 to-purple-100" />
      <div className="container relative px-2">
        <div className="grid lg:grid-cols-2 gap-8 py-12">
          <div className="flex flex-col justify-center space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              Kesehatan Anda Prioritas Kami
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Konsultasi dengan dokter terpercaya, beli obat, dan buat janji temu kapan saja dan dimana saja.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg">Mulai Konsultasi</Button>
              <Button size="lg" variant="outline">Pelajari Lebih Lanjut</Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
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
            <Card>
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
            <Card className="md:col-span-2">
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

