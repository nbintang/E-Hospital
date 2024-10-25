import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const randomText = `Amidst the shimmering stars in the endless night sky filled with a profound silence, the soft whisper of the wind...`;

async function main() {
  // Buat sample address
  const address = await db.address.create({
    data: {
      slug: `address-${Date.now()}`,
      name: "123 Main St, City, Country",
    },
  });

  // Buat sample hospital
  const hospital = await db.hospital.create({
    data: {
      slug: `hospital-${Date.now()}`,
      name: "General Hospital",
      addressId: address.id,
    },
  });

  // Buat sample category, specialization, and medicine
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

  const medicine = await db.medicine.create({
    data: {
      name: "Aspirin",
      price: 10.0,
      description: "Used to treat pain, fever, or inflammation",
      categoryId: category.id,
    },
  });

  // Buat sample users
  const doctorUser = await db.users.create({
    data: {
      email: "doctor@example.com",
      password: "password123",
      role: "DOCTOR",
      profile: {
        create: {
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
          categoryId: category.id,
        },
      },
    },
  });

  const patientUser = await db.users.create({
    data: {
      email: "patient@example.com",
      password: "password123",
      role: "PATIENT",
      profile: {
        create: {
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

  // Buat sample question and answer
  const question = await db.question.create({
    data: {
      title: "How important is health for the brain?",
      slug: "how-important-is-health-for-the-brain",
      isAnswered: true,
      textContent: randomText,
      categoryId: category.id,
      userId: patientUser.id,
    },
  });

  const doctor = await db.doctor.findUnique({
    where: { userId: doctorUser.id },
  });

  if (!doctor) {
    throw new Error("Doctor not found");
  }

  // Buat sample answer
  const answer = await db.answer.create({
    data: {
      textContent:
        "Health is vital for brain function as it impacts cognitive ability and mood.",
      questionId: question.id,
      doctorId: doctor.id,
    },
  });

  // Buat sample appointment
  const appointment = await db.appointment.create({
    data: {
      userId: patientUser.id,
      hospitalId: hospital.id,
      doctorId: doctor.id,
      dateTime: new Date(),
      status: "PENDING",
    },
  });

  // Buat sample article
  const article = await db.article.create({
    data: {
      title: "How important health is",
      textContent: randomText,
      slug: "how-important-health-is",
      doctorId: doctor.id,
      categoryId: category.id,
      isPublished: true,
    },
  });

  // Buat sample order
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
