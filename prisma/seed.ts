import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const randomText = `Amidst the shimmering stars in the endless night sky filled with a profound silence, the soft whisper of the wind...`;

async function main() {
  // Buat sample addresses
  const address1 = await db.address.create({
    data: {
      slug: `address-1-${Date.now()}`,
      name: "123 Main St, City, Country",
    },
  });

  const address2 = await db.address.create({
    data: {
      slug: `address-2-${Date.now()}`,
      name: "456 Elm St, City, Country",
    },
  });

  // Buat sample hospital
  const hospital = await db.hospital.create({
    data: {
      slug: `hospital-${Date.now()}`,
      name: "General Hospital",
      addressId: address1.id,
    },
  });

  // Buat sample category dan specialization
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
          addressId: address1.id,
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
          addressId: address2.id,
        },
      },
    },
  });

  // Buat sample question
  const question = await db.question.create({
    data: {
      title: "How important is health for the brain?",
      textContent: randomText,
      categoryId: category.id,
      userId: patientUser.id,
    },
  });

  // Buat sample appointment
  const doctor = await db.doctor.findFirst({ where: { userId: doctorUser.id } });
  if (doctor) {
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
      },
    });

    console.log({ appointment, article });
  }

  console.log({
    question,
    address1,
    address2,
    hospital,
    category,
    specialization,
    doctorUser,
    patientUser,
    doctor,
  }, "Sample data created successfully.");
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
