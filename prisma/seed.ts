import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const randomText = `Amidst the shimmering stars in the endless night sky filled with a profound silence, the soft whisper of the wind...`;

async function main() {
  // Create sample address
  const address = await db.address.create({
    data: {
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
      name: "Aspirin",
      price: 10.0,
      description: "Used to treat pain, fever, or inflammation",
    },
  });

  // Create sample doctor user with related profile and doctor data
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
        },
      },
    },
  });

  // Create sample patient user with related profile
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

  // Create sample question
  const question = await db.question.create({
    data: {
      title: "How important is health for the brain?",
      slug: "how-important-is-health-for-the-brain",
      isAnswered: true,
      textContent: randomText,
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
        "Health is vital for brain function as it impacts cognitive ability and mood.",
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
      imageUrl: "tes",
      slug: "how-important-health-is",
      doctorId: doctor.id,
      categories: {
        connect: { id: category.id },
      },
      isPublished: true,
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
