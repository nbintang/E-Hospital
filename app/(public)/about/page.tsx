import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Stethoscope,
  Microscope,
  BadgePlus,
  Bed,
  UserIcon as UserMd,
  PillIcon as Pills,
} from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen
       w-full">
        <Image
          src="/img/hospital.jpg"
          alt="Hospital Building"
          width={1920}
          height={400}
          className=" absolute inset-0 w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-don-juan/50">
          <div className="container mx-auto h-full px-4">
            <div className="flex h-full flex-col items-start justify-center text-white">
              <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
                Tentang Kami
              </h1>
              <p className="max-w-2xl text-lg md:text-xl">
                Memberikan pelayanan kesehatan terbaik dengan inovasi medis
                terkini untuk masyarakat Indonesia
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Vision & Mission */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-800">
            Visi & Misi
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-xl font-semibold text-blue-600">
                  Visi
                </h3>
                <p className="text-gray-600">
                  Menjadi rumah sakit terdepan dalam inovasi medis dan pelayanan
                  kesehatan berkualitas tinggi di Indonesia
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-xl font-semibold text-blue-600">
                  Misi
                </h3>
                <ul className="list-inside list-disc space-y-2 text-gray-600">
                  <li>
                    Memberikan pelayanan kesehatan yang berkualitas dan
                    terjangkau
                  </li>
                  <li>Mengembangkan inovasi dalam bidang medis</li>
                  <li>
                    Meningkatkan kompetensi tenaga medis secara berkelanjutan
                  </li>
                  <li>
                    Membangun kerjasama dengan institusi kesehatan terkemuka
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Facilities */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-800">
            Fasilitas Kami
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((facility, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="mb-4 text-blue-600">{facility.icon}</div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-800">
                    {facility.name}
                  </h3>
                  <p className="text-gray-600">{facility.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* History */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-800">
            Sejarah Kami
          </h2>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-gray-600">
              Rumah Sakit Inovasi Medika didirikan pada tahun 2010 dengan visi
              untuk memberikan pelayanan kesehatan berkualitas tinggi yang
              terjangkau bagi masyarakat Indonesia. Sejak awal berdirinya, kami
              telah berkomitmen untuk terus berinovasi dalam pelayanan
              kesehatan.
            </p>
            <p className="mb-4 text-gray-600">
              Dalam perjalanannya, Rumah Sakit Inovasi Medika telah berkembang
              menjadi salah satu institusi kesehatan terkemuka di Indonesia,
              dengan berbagai pencapaian dan penghargaan di bidang pelayanan
              kesehatan dan inovasi medis.
            </p>
            <p className="text-gray-600">
              Saat ini, kami terus berkembang dan meningkatkan kualitas
              pelayanan dengan mengadopsi teknologi medis terkini dan
              mengembangkan kompetensi tenaga medis kami secara berkelanjutan.
            </p>
            <p className="text-gray-600">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic
              consectetur sequi ad voluptatem officiis quo exercitationem vel
              dignissimos laudantium rerum quae, aliquid quod quia repudiandae
              amet perferendis soluta veniam odio minima. Aspernatur quia
              perferendis est ullam possimus quam obcaecati sed?
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

const facilities = [
  {
    name: "Instalasi Gawat Darurat 24 Jam",
    description: "Pelayanan darurat 24 jam dengan tim medis yang siap siaga",
    icon: <BadgePlus className="h-8 w-8" />,
  },
  {
    name: "Laboratorium Modern",
    description:
      "Dilengkapi peralatan diagnostik terkini untuk hasil yang akurat",
    icon: <Microscope className="h-8 w-8" />,
  },
  {
    name: "Ruang Rawat Inap",
    description: "Kamar rawat inap nyaman dengan perawatan 24 jam",
    icon: <Bed className="h-8 w-8" />,
  },
  {
    name: "Poliklinik Spesialis",
    description: "Berbagai layanan spesialis dengan dokter berpengalaman",
    icon: <UserMd className="h-8 w-8" />,
  },
  {
    name: "Radiologi Digital",
    description: "Pemeriksaan radiologi dengan teknologi digital modern",
    icon: <Stethoscope className="h-8 w-8" />,
  },
  {
    name: "Farmasi",
    description: "Apotek lengkap dengan farmasis profesional",
    icon: <Pills className="h-8 w-8" />,
  },
];
