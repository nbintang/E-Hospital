import { Gender } from "@prisma/client";

export type ProfileProps = {
  userId: string;
  id: string;
  fullname: string;
  addressId: string | null;
  gender: Gender | null;
  height: string | null; // Allow height to be null
  phoneNumber: string | null; // Allow phoneNumber to be null
  weight: string | null; // Allow weight to be null
  createdAt: Date;
  updatedAt: Date;
  user: {
    email: string;
  };
};