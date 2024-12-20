import { onLoadThumbnail } from "@/action/thumbnail";
import { useQuery } from "@tanstack/react-query";

export const useThumbnail = () => {
  const { data, isFetching, isFetched } = useQuery({
    queryKey: ["thumbnail"],
    queryFn: async () => {
      return await onLoadThumbnail();
    },
    enabled: false,
  });

  return {
    isFetched,
    isFetching,
    data,
  };
};
