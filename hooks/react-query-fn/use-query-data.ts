import {
  useQuery,
} from "@tanstack/react-query";

export function useQueryData({
  tags,
  fetcher,
  placeholderData
}: {
  tags: string;
  fetcher: (dataInput?: any) => Promise<any>;
  placeholderData?: any;
}) {
  const { data, isError, isPending, isSuccess, ...rest } = useQuery({
    queryKey: [tags],
    queryFn: fetcher,
    placeholderData,
    
  });

  return { data, isError, isPending, isSuccess, ...rest };
}
