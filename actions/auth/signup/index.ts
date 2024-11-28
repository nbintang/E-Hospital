"use server";
import { formatTitleToSlug } from "@/helper/common";
import { uploadToCloudinary } from "@/helper/server";
import db from "@/lib/db";
import { findUserByEmail } from "@/repositories/users.repository";
import { Gender, Prisma } from "@prisma/client";
import { redirect } from "next/navigation";

type NewUserProps = Prisma.UsersCreateInput & {
  profileUrl: string;
  gender: Gender;
  fullname: string;
  latitude: number;
  longitude: number;
  name: string;
};

export default async function CreateRegistrationUser({
  email,
  password,
  termAccepted,
  profileUrl,
  gender,
  fullname,
  longitude,
  latitude,
  name: addressName,
}: NewUserProps) {
  const { url } = await uploadToCloudinary({
    file: profileUrl,
    folder: "user-profle",
    isBase64: true,
  });

  const existingUser = await findUserByEmail(email);
  if (existingUser) throw new Error("User");

  const newUser = await db.users.create({
    data: {
      email,
      password,
      termAccepted,
      profile: {
        create: {
          fullname,
          profileUrl: url,
          gender,
          address: {
            create: {
              name: addressName,
              latitude,
              longitude,
              slug: formatTitleToSlug(addressName),
            },
          },
        },
      },
    },
  });
return newUser  

}
