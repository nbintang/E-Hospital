import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useMutateData({
  toastSuccess,
  toastLoading,
  toastId,
  fetcher,
  tags,
  redirectUrl,
}: {
  toastSuccess?: string;
  toastLoading?: string;
  toastId?: string;
  fetcher: (data?: FormData) => Promise<void>;
  redirectUrl?: string;
  tags?: string;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: [tags],
    mutationFn: fetcher,
    onMutate: () => {
      toast.loading(toastLoading, {
        id: toastId,
        position: "bottom-right",
        description: "Waiting for response",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [tags] });
      toast.success(toastSuccess, {
        id: toastId,
        position: "bottom-right",
        description: "Successfully!",
      });
      router.push(`${redirectUrl}`);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed", {
        id: toastId,
        position: "bottom-right",
        description: "Please try again later",
      });
    },
  });

  return result;
}
