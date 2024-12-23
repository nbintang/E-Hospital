import { findProfileUser } from "@/repositories/profile.repository";

export default async function validateUserProfile(userId: string) {
  const user = await findProfileUser(userId);
  const profile = user?.profile;
  if (
    !profile?.fullname ||
    !profile?.gender ||
    !profile?.phoneNumber ||
    !profile?.bioPdfUrl ||
    !profile.height ||
    !profile.weight ||
    !profile.address
  ) {
    return false;
  }
  return true;
}
