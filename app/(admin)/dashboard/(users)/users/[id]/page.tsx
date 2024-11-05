import ProfileForm from "@/components/sections/user/details";
import { findProfileByUserId } from "@/repositories/profile.repository";
import React from "react";
type Params = Promise<{ id: string }>;
export default async function UserPage({ params }: { params: Params }) {
  const { id } = await params;
  const userDetail = await findProfileByUserId({ userId: id });
  console.log(userDetail);
  if (!userDetail) return null;

  return <ProfileForm profile={userDetail} />;
}
