"use server";
import { formatTitleToSlug } from "@/helper/common";
import { uploadToCloudinary } from "@/helper/server";
import db from "@/lib/db";
import { findUserByEmail } from "@/repositories/users.repository";
import { Gender, Prisma } from "@prisma/client";
import { hashPassword } from '../../../helper/server/hash-password';

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
  const profileImg = profileUrl
    ? await uploadToCloudinary({
        file: profileUrl,
        folder: "user-profle",
        isBase64: true,
      })
    : null;

  const existingUser = await findUserByEmail(email);
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await hashPassword(password);

  const newUser = await db.users.create({
    data: {
      email,
      password: hashedPassword,
      termAccepted,
      profile: {
        create: {
          fullname,
          profileUrl: profileImg ? profileImg.url : null,
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
  return newUser;
}
