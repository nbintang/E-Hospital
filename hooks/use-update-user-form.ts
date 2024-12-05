import { formatStrToNum } from "@/helper/common/format-str-to-number";
import { ProfileProps } from "@/types/profile";
import { ProfileSchema, ProfileFormValues } from "@/schemas/profile-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function useUpdateUserForm({
  profile,
}: {
  profile: ProfileProps;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      fullname: profile.fullname,
      height: profile.height ? parseInt(profile.height) : undefined,
      gender: profile.gender,
      phoneNumber: profile.phoneNumber || "",
      weight: profile.weight ? parseInt(profile.weight) : undefined,
      email: profile.user.email,
      profileUrl: profile.profileUrl || null,
    },
  });

  function onSubmit(values: ProfileFormValues) {
    console.log(values);
    setIsEditing(false);
  }

  return {
    form,
    isEditing,
    setIsEditing,
    onSubmit,
  };
}
