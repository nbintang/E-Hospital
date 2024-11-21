import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export function useQueryData({
  tags,
  fetcher,
}: {
  tags: string;
  fetcher: (dataInput?: any) => Promise<any>;
}) {
  const { data, isError, isPending, isSuccess, ...rest } = useQuery({
    queryKey: [tags],
    queryFn: fetcher,
    placeholderData: [],
  });

  return { data, isError, isPending, isSuccess, ...rest };
}
