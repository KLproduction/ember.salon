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
  const { data, isFetching } = useQuery({
    queryKey: ["upcoming-Booking"],
    queryFn: async () => {
      return await onLoadUpcomingBookings();
    },
    enabled: false,
  });
  return { data, isFetching };
};

export const useTodayBooking = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["today-Booking"],
    queryFn: async () => {
      return await onLoadTodayBooking();
    },
    enabled: false,
  });
  return { data, isFetching };
};

export const useTomorrowBooking = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["tomorrow-Booking"],
    queryFn: async () => {
      return await onLoadTomorrowBooing();
    },
    enabled: false,
  });
  return { data, isFetching };
};

export const useCategoryData = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["category-Data"],
    queryFn: async () => {
      return await onLoadCategoryData();
    },
  });
  return { data, isFetching };
};

export const useBookingChartData = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["chartData"],
    queryFn: async () => {
      return await bookingChartData();
    },
  });
  return { data, isFetching };
};
