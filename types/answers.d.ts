import { ProfileProps } from "./profile";

export interface AnswerProps {
    id: string;
    textContent: string;
    doctorId: string;
    questionId: string;
    createdAt?: Date;
    updatedAt?: Date;
  }

  export interface AnswerWithDoctorProfileProps {
    id: string;
    textContent: string;
    doctor: {
      specialization: {
        name: string;
      };
      userId: string;
    };
    doctorId: string;
    questionId: string;
    createdAt: Date;
    updatedAt: Date;
    doctorProfile: ProfileProps
  };