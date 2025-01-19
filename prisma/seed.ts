import { PrismaClient } from "@prisma/client";
import hash from "bcryptjs";

const db = new PrismaClient();

const randomText = `<p class="text-node">Batuk pada lansia seringkali memerlukan penanganan khusus agar tidak berkembang menjadi masalah kesehatan yang lebih serius. Berikut beberapa tips yang aman untuk mengatasi batuk pada orang tua:</p><ol class="list-node"><li><p class="text-node"><strong>Minum Air Hangat</strong></p><p class="text-node"></p><img height="273.6" width="410.40000000000003" title="" alt="" src="https://res.cloudinary.com/da6hciwjn/image/upload/w_410,h_274/articles/qggek2zqrurjkr51gkln.jpg"><p class="text-node"><br>Minum air hangat dapat membantu meredakan tenggorokan dan mengurangi iritasi akibat batuk. Air hangat juga membantu menjaga tubuh tetap terhidrasi, yang sangat penting bagi lansia.</p></li><li><p class="text-node"><strong>Gunakan Humidifier</strong><br>Udara kering dapat memperburuk batuk. Menambahkan humidifier di kamar tidur atau ruangan lain tempat mereka sering berada bisa membantu menjaga kelembaban udara dan meredakan batuk.</p></li><li><p class="text-node"><strong>Konsumsi Madu</strong></p><img height="216" width="324" title="" alt="" src="https://res.cloudinary.com/da6hciwjn/image/upload/w_324,h_216/articles/mjp1ggmu085lnzgiw3ay.jpg"><p class="text-node"><br>Madu memiliki sifat anti-inflamasi dan dapat membantu meredakan tenggorokan yang gatal. Tambahkan satu sendok madu ke dalam teh hangat untuk hasil yang lebih baik.</p></li><li><p class="text-node"><strong>Hindari Pemicu Batuk</strong><br>Pastikan lingkungan sekitar bebas dari asap rokok, debu, atau polusi lainnya. Bahan-bahan ini dapat memicu batuk dan memperburuk kondisi pernapasan.</p></li><li><p class="text-node"><strong>Konsultasi dengan Dokter</strong><br>Batuk yang berkepanjangan atau disertai gejala lain seperti demam atau sesak napas memerlukan perhatian medis segera. Konsultasikan dengan dokter untuk mendapatkan perawatan yang tepat.</p></li></ol><p class="text-node">Ingat, kesehatan lansia perlu dijaga dengan lebih hati-hati, terutama ketika mereka mengalami gejala batuk atau flu. Semoga tips ini bermanfaat dan membantu menjaga kesehatan orang tua Anda.</p>.`;

async function main() {
  const password = await hash.hash("12345678", 10);
  // Create sample address
  const address = await db.address.create({
    data: {
      latitude: 37.7749,
      longitude: -122.4194,
      slug: `address-${Date.now()}`,
      name: "123 Main St, City, Country",
    },
  });

  // Create sample hospital
  const hospital = await db.hospital.create({
    data: {
      slug: `hospital-${Date.now()}`,
      name: "General Hospital",
      addressId: address.id,
    },
  });

  // Create sample category and specialization
  const category = await db.category.create({
    data: {
      slug: "cardiology",
      name: "Cardiology",
    },
  });

  const specialization = await db.specialization.create({
    data: {
      name: "Cardiology Specialist",
    },
  });

  // Create sample medicine
  const medicine = await db.medicine.create({
    data: {
      image:
        "https://res.cloudinary.com/da6hciwjn/image/upload/v1720263591/samples/breakfast.jpg",
      name: "Aspirin",
      price: 10.0,
      description: "Used to treat pain, fever, or inflammation",
    },
  });

  // Create sample doctor user with related profile and doctor data
  const doctorUser = await db.users.create({
    data: {
      email: "doctor@example.com",
      password,
      role: "DOCTOR",
      profile: {
        create: {
          profileUrl:
            "https://res.cloudinary.com/da6hciwjn/image/upload/c_fill,g_auto,h_400,w_400/v1731601886/articles/file_skl1xh.jpg",
          fullname: "Dr. John Doe",
          gender: "MALE",
          height: "180cm",
          weight: "75kg",
          phoneNumber: "1234567890",
          addressId: address.id,
        },
      },
      doctor: {
        create: {
          hospitalId: hospital.id,
          specializationId: specialization.id,
        },
      },
    },
  });

  // Create sample patient user with related profile
  const patientUser = await db.users.create({
    data: {
      email: "patient@example.com",
      password,
      role: "PATIENT",
      profile: {
        create: {
          profileUrl:
            "https://res.cloudinary.com/da6hciwjn/image/upload/c_fill,g_auto,h_400,w_400/v1731601886/bookstore/file_pb5vga.jpg",
          fullname: "Jane Smith",
          gender: "FEMALE",
          height: "165cm",
          weight: "60kg",
          phoneNumber: "0987654321",
          addressId: address.id,
        },
      },
    },
  });

  // Create sample question
  const question = await db.question.create({
    data: {
      title: "How important is health for the brain?",
      slug: "how-important-is-health-for-the-brain",
      status: "PENDING",
      textContent:
        "Health is vital for brain function as it impacts cognitive ability and mood, then why is it so important?",
      userId: patientUser.id,
      categories: {
        connect: { id: category.id },
      },
    },
  });

  // Create doctor instance
  const doctor = await db.doctor.findUnique({
    where: { userId: doctorUser.id },
  });

  if (!doctor) {
    throw new Error("Doctor not found");
  }

  // Create sample answer
  const answer = await db.answer.create({
    data: {
      textContent:
        "<p>Because it is one of the most important organs in the body.</p>",
      questionId: question.id,
      doctorId: doctor.id,
    },
  });

  // Create sample appointment
  const appointment = await db.appointment.create({
    data: {
      userId: patientUser.id,
      hospitalId: hospital.id,
      doctorId: doctor.id,
      dateTime: new Date(),
      status: "PENDING",
    },
  });

  // Create sample article
  const article = await db.article.create({
    data: {
      title: "How important health is",
      content: randomText,
      imageUrl:
        "https://res.cloudinary.com/da6hciwjn/image/upload/v1731601886/file_cqy2fo.jpg",
      slug: "how-important-health-is",
      doctorId: doctor.id,
      categories: {
        connect: { id: category.id },
      },
      status: "DRAFT",
    },
  });

  // Create sample order
  const order = await db.order.create({
    data: {
      userId: patientUser.id,
      medicineId: medicine.id,
      quantity: 2,
      totalPrice: 20.0,
      stock: 100,
      status: "PROCESSING",
    },
  });

  console.log({
    address,
    hospital,
    category,
    specialization,
    doctorUser,
    patientUser,
    question,
    answer,
    appointment,
    article,
    order,
    medicine,
  });
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
