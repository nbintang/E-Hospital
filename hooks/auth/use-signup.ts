import { useCallback, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FileWithPath, useDropzone } from "react-dropzone";
import { FileWithPreview, SignUpSchema, accept } from "@/schemas/signup-schema";
import { toast } from "sonner";
import CreateRegistrationUser from "@/actions/auth/signup";
import { Gender } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { fileToBase64 } from "@/lib/file-utils";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
export default function useSignUp() {
  const [location, setLocation] = useState({ lat: -6.2088, lng: 106.8456 });
  const [selectedFile, setSelectedFile] = useState<FileWithPreview | null>(
    null
  );
  const [addressName, setAddressName] = useState<string>("");
  const [croppedImage, setCroppedImage] = useState<string>("");
  const router = useRouter();
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      fullname: "",
      gender: undefined,
      latitude: undefined,
      longitude: undefined,
      addressName: "",
      termAccepted: false,
    },
  });
  const [isDialogCropOpen, setIsDialogCropOpen] = useState(false);

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    const file = acceptedFiles[0];
    if (!file) {
      alert("Selected image is too large!");
      return;
    }
    const fileWithPreview = Object.assign(file, {
      preview: URL.createObjectURL(file),
    });
    setSelectedFile(fileWithPreview);
    setIsDialogCropOpen(true);
  }, []);

  const res = useQuery({
    queryKey: ["location", location], // Add location to the query key
    queryFn: async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${location.lat}&lon=${location.lng}`
        );
        if (!response.ok) throw new Error("Failed to fetch address");
        const data = await response.json();
        return {
          address: data.display_name,
          lng: parseFloat(data.lon),
          lat: parseFloat(data.lat),
        };
      } catch (error) {
        console.log(error);
      }
    },
    enabled: !!location.lat && !!location.lng,
  });

  useEffect(() => {
    if (res.isSuccess) {
      form.setValue("addressName", res.data?.address || "");
      setAddressName(res.data?.address || "");
    }
  }, [res.isSuccess, res.data, form]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
  });

  async function onSubmit(values: z.infer<typeof SignUpSchema>) {
    try {
      const newUser = await CreateRegistrationUser({
        ...values,
        name: values.addressName,
        gender: values.gender.toUpperCase() as Gender,
        profileUrl: croppedImage,
      });
      new Promise((resolve) => setTimeout(resolve, 500));
      toast.promise(
        Promise.resolve(signIn("credentials", { ...values, redirect: false })),
        {
          loading: "Signing up...",
          success: "Signup successfully",
          error: "Failed to Signup, please try again later",
        }
      );

      if (newUser) {
        router.push("/");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }

  const handleLocationChange = (lat: number, lng: number) => {
    form.setValue("latitude", lat);
    form.setValue("longitude", lng);
    setLocation({ lat, lng });
  };

  return {
    isAddressLoading: res.isLoading || res.isFetching || res.isPending,
    addressName,
    setCroppedImage,
    form,
    onSubmit,
    selectedFile,
    setSelectedFile,
    location,
    isDialogCropOpen,
    setIsDialogCropOpen,
    handleLocationChange,
    getRootProps,
    getInputProps,
  };
}
