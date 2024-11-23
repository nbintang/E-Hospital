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
        specialization: {
          select: {
            name: true;
          }
        };
        user: true;
      }
    };
    doctorProfile: true;
  }
}>;