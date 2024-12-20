import { getProduct } from "@/data/getProduct";
import { useQuery } from "@tanstack/react-query";

export const useService = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["service"],
    queryFn: async () => {
      return await getProduct();
    },
    enabled: false,
  });

  return {
    isFetching,
    data,
  };
};
