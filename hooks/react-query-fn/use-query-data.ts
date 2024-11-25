import {
  useQuery,
} from "@tanstack/react-query";

export function useQueryData({
  tags,
  fetcher,
  placeholderData
}: {
  tags: string;
  fetcher: (dataInput?: any) => Promise<void>;
  placeholderData?: any;
}) {
  const { data, isError, isPending, isSuccess, ...partials } = useQuery({
    queryKey: [tags],
    queryFn: fetcher,
    placeholderData,
    
  });

  return { data, isError, isPending, isSuccess, partials };
}

