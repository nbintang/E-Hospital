import ProfileForm from "@/components/sections/user/details";
import { findProfileByUserId } from "@/repositories/profile.repository";
import React from "react";

export default async function UserPage({ params }: { params: { id: string } }) {
  const userDetail = await findProfileByUserId({ userId: params.id });
  console.log(userDetail)
  if (!userDetail) return null;

  return <ProfileForm profile={userDetail} />;
}
