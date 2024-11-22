import { AppointmentStatus } from "@prisma/client";

export interface AppointmentProps {
    id: string;
    userId: string;
    doctorId: string;
    hospitalId: string;
    dateTime: Date;
    status: AppointmentStatus;
    createdAt: Date;
    updatedAt: Date;
  }