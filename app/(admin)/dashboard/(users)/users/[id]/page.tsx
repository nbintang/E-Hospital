import ProfileForm from "@/components/admin/sections/user/details";
import { findProfileByUserId } from "@/repositories/profile.repository";
import { Params } from "@/types/params";
import React from "react";

export default async function UserPage({ params }: { params: Params }) {
  const { id } = await params;
  const userDetail = await findProfileByUserId({ userId: id });
  if (!userDetail) return null;

  return <ProfileForm profile={userDetail} />;
}
