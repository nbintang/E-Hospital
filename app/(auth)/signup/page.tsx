"use client";

import { useCallback, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import dynamic from "next/dynamic";
import MapInput from "@/components/extensions/map-input";
import { FileWithPath, useDropzone } from "react-dropzone";
import { ImageCropper } from "@/components/extensions/uange-cropper";
import { useMutateData } from "@/hooks/react-query-fn/use-mutate-data";
import { useQueryData } from "@/hooks/react-query-fn/use-query-data";
const formSchema = z.object({
  profileUrl: z.instanceof(File).or(z.string()).optional(),
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  fullname: z.string().min(2, "Full name must be at least 2 characters"),
  gender: z.enum(["male", "female", "other"]),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

export type FileWithPreview = FileWithPath & {
  preview: string;
};

const accept = {
  "image/*": [".jpg", ".jpeg", ".png"],
};

export default function SignUpPage() {
  const [location, setLocation] = useState({ lat: -6.2088, lng: 106.8456 }); // Default to Jakarta
  const [selectedFile, setSelectedFile] = useState<FileWithPreview | null>(
    null
  );
  const [isDialogOpen, setDialogOpen] = useState(false);

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
    setDialogOpen(true);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      fullname: "",
      gender: undefined,
      latitude: 51.505,
      longitude: -0.09,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${values.latitude}&lon=${values.longitude}`
      );
      const data = await response.json();
      console.log(values, data, selectedFile);
    } catch (error) {
      console.log(error);
    }
  }

  const handleLocationChange = (lat: number, lng: number) => {
    console.log("New location:", { lat, lng }); // Debugging log
    form.setValue("latitude", lat);
    form.setValue("longitude", lng);
    setLocation({ lat, lng });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Register</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-8 col-span-1">
              {selectedFile ? (
                <ImageCropper
                  dialogOpen={isDialogOpen}
                  setDialogOpen={setDialogOpen}
                  selectedFile={selectedFile}
                  setSelectedFile={setSelectedFile}
                />
              ) : (
                <Avatar
                  {...getRootProps()}
                  className="size-36 cursor-pointer ring-offset-2 ring-2 ring-slate-200"
                >
                  <input {...getInputProps()} />
                  <AvatarImage src={"/img/no-image.jpg"} alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              )}

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-8 col-span-1">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="z-20">
                    <FormLabel>Gender</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(value)} // Explicitly pass the value
                      value={field.value || ""} // Fallback to an empty string if undefined
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent position="popper">
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <h1 className="my-4">Choose your Location</h1>
                <div className="h-96 w-full rounded-lg overflow-hidden ">
                  <MapInput
                    location={location}
                    onLocationChange={handleLocationChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <Button
            className=" mt-4"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            Register
          </Button>
        </form>
      </Form>
    </div>
  );
}
