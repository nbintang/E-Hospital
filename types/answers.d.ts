import { Prisma } from "@prisma/client";

// Basic Answer type
export type AnswerProps = Prisma.AnswerGetPayload<{
  select: {
    id: true;
    textContent: true;
    doctorId: true;
    questionId: true;
    createdAt: true;
    updatedAt: true;
  }
}>;

// Extended Answer type with doctor profile
export type AnswerWithDoctorProfileProps = Prisma.AnswerGetPayload<{
  include: {
    doctor: {
      include: {
        user: {
          select: {
            email:true,
            profile: {
              select: {
                fullname: true,
                profileUrl: true,
              },
            },
          },
        },
        specialization: {
          select: {
            name: true,
          },
        },
      },
    },
  },
}>;