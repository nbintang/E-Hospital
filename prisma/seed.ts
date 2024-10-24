import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const random = `Amidst the shimmering stars in the endless night sky filled with a profound silence, the soft whisper of the wind carries the sweet scent of wildflowers from a distant valley, evoking a deep sense of nostalgia for an infinite journey across rugged mountain ranges, where each step feels like it brings one closer to a profound understanding of the meaning of life, while the fading shadows of dusk slowly transition into the calm embrace of twilight.`;

async function main() {
  // Create sample addresses with unique slugs
  const address1 = await db.address.create({
    data: {
      slug: `address-1-${Date.now()}`,
      name: "123 Main St, City, Country",
    },
  });

  const address2 = await db.address.create({
    data: {
      slug: `address-2-${Date.now() + 1}`,
      name: "456 Elm St, City, Country",
    },
  });

  // Create a sample hospital with a unique slug
  const hospital = await db.hospital.create({
    data: {
      slug: `hospital-1-${Date.now() + 2}`,
      name: "General Hospital",
      addressId: address1.id,
    },
  });

  // Create a sample category
  const category = await db.category.create({
    data: {
      slug: "cardiology",
      name: "Cardiology",
    },
  });

  // Create sample users
  const user1 = await db.users.create({
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
          specialize: category.id, // Use the category ID here
        },
      },
    },
  });

  const user2 = await db.users.create({
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

  // Create a sample question
  const question = await db.question.create({
    data: {
      title: "How important is health for the brain?",
      textContent: random,
      categoryId: category.id,
      userId: user2.id,
    },
  });

  // Create a sample doctor and appointment
  const doctor = await db.doctor.findFirst({ where: { userId: user1.id } });
  if (doctor) {
    const appointment = await db.appointment.create({
      data: {
        userId: user2.id,
        hospitalId: hospital.id,
        doctorId: doctor.id,
        dateTime: new Date(),
        status: "PENDING",
      },
    });

    // Create a sample article
    const article = await db.article.create({
      data: {
        title: "How important health is",
        textContent: random,
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
    user1,
    user2,
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
