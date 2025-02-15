import { Prisma } from "@prisma/client";

// Question type with included user, categories, and answers
export type QuestionProps = Prisma.QuestionGetPayload<{
  include: {
    user: {
      select: {
        id: true;
        email: true;
        profile: {
          select: {
            fullname: true;
          };
        };
      };
    };
    categories: true;
    answers: {
      select: {
        id: true;
        textContent: true;
        doctorId: true;
        questionId: true;
      };
    };
  };
}>;

export type QuestionBySlug = Prisma.QuestionGetPayload<{
  include: { user: true; categories: true; answers: true };
}> | null;

export type QuestionsPublic = Prisma.QuestionGetPayload<{
  include: {
    user: {
      include: {
        profile: {
          select: {
            fullname: true;
          };
        };
      };
    };
    categories: true;
    answers: {
      include: {
        doctor: {
          include: {
            specialization: true;
            user: {
              select: {
                profile: {
                  select: {
                    fullname: true;
                  };
                };
              };
            };
          };
        };
      };
    };
  };
}>;

export type SpecificQuestionPublic = Prisma.QuestionGetPayload<{
  include: {
    user: {
      include: {
        profile: true;
      };
    };
    categories: true;
    answers: {
      include: {
        doctor: {
          include: {
            hospital: true;
            specialization: true;
            user: {
              include: {
                profile: true;
              };
            };
          };
        };
      };
    };
  };
}> | null;
