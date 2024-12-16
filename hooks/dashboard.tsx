import {
  onLoadCategoryData,
  onLoadTodayBooking,
  onLoadTomorrowBooing,
  onLoadUpcomingBookings,
} from "@/action/booking";
import bookingChartData from "@/data/bookingChartData";
import { getAllBooking } from "@/data/getBooking";
import { getProduct } from "@/data/getProduct";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useUpcomingBooking = () => {
  const { data, isFetching, isFetched } = useQuery({
    queryKey: ["upcoming-Booking"],
    queryFn: async () => {
      return await onLoadUpcomingBookings();
    },
    staleTime: 60 * 1000 * 5,
    refetchInterval: 1000 * 60 * 10,
  });
  return { data, isFetching, isFetched };
};

export const useTodayBooking = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["today-Booking"],
    queryFn: async () => {
      return await onLoadTodayBooking();
    },
    staleTime: 60 * 1000 * 5,
    refetchInterval: 1000 * 60 * 10,
  });
  return { data, isFetching };
};

export const useTomorrowBooking = () => {
  const { data, isFetching, isFetched } = useQuery({
    queryKey: ["tomorrow-Booking"],
    queryFn: async () => {
      return await onLoadTomorrowBooing();
    },
    staleTime: 60 * 1000 * 5,
    refetchInterval: 1000 * 60 * 10,
  });
  return { data, isFetching, isFetched };
};

export const useCategoryData = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["category-Data"],
    queryFn: async () => {
      return await onLoadCategoryData();
    },
    staleTime: 60 * 1000 * 60,
  });
  return { data, isFetching };
};

export const useBookingChartData = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["chartData"],
    queryFn: async () => {
      return await bookingChartData();
    },
    enabled: false,
  });
  return { data, isFetching };
};
