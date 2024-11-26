import { formatTitleToSlug } from "@/helper/common";
import db from "@/lib/db";
import { Gender, Prisma } from "@prisma/client";

type NewUserProps = Prisma.UsersCreateInput & {
  profileUrl: string;
  gender: Gender;
  fullname: string;
  latitude: number;
  longitude: number;
  name: string;
};

export async function CreateRegistrationUser({
  email,
  password,
  profileUrl,
  gender,
  fullname,
  longitude,
  latitude,
  name,
}: NewUserProps) {
  const newUser = await db.users.create({
    data: {
      email,
      password,
      profile: {
        create: {
          fullname,
          profileUrl,
          gender,
          address: {
            create: {
              name,
              latitude,
              longitude,
              slug: formatTitleToSlug(name),
            },
          },
        },
      },
    },
  });
  return newUser;
}
