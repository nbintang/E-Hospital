import { formatStrToNum } from "@/helper/format-str-to-number";
import { ProfileProps } from "@/types/profile";
import { ProfileSchema, ProfileFormValues } from "@/types/schemas/profile";
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
      height: profile.height ? parseInt(profile.height) : undefined, // Handle null correctly
      gender: profile.gender,
      phoneNumber: profile.phoneNumber || "", // Handle null correctly
      weight: profile.weight ? parseInt(profile.weight) : undefined, // Handle null correctly
      email: profile.user.email || "",
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
