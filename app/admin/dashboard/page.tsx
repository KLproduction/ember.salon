import DashboardTodayBookingCard from "../_components/dashboard/DashboardTodayBookingCard";
import DashboardTomorrowBookingCard from "../_components/dashboard/DashboardTomorrowBookingCard ";
import BookingChart from "../_components/dashboard/BookingChart";
import bookingChartData from "@/data/bookingChartData";
import CategoryData from "../_components/dashboard/CategoryData";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import DashboardUpcomingBookingCard from "../_components/dashboard/DashboardUpcomingBookingCard";
import { AdminPageShell, AdminPanel } from "../_components/AdminShell";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AdminPage = async () => {
  const queryClient = new QueryClient();

  // await queryClient.prefetchQuery({
  //   queryKey: ["service"],
  //   queryFn: () => getProduct(),
  // });

  await queryClient.prefetchQuery({
    queryKey: ["chartData"],
    queryFn: () => bookingChartData(),
    staleTime: 60 * 1000 * 60,
  });
  // await queryClient.prefetchQuery({
  //   queryKey: ["booking"],
  //   queryFn: () => getAllBooking(),
  // });

  // await queryClient.prefetchQuery({
  //   queryKey: ["upcoming-Booking"],
  //   queryFn: () => onLoadUpcomingBookings(),
  // });

  // await queryClient.prefetchQuery({
  //   queryKey: ["tomorrow-Booking"],
  //   queryFn: () => onLoadTomorrowBooing(),
  // });

  // await queryClient.prefetchQuery({
  //   queryKey: ["today-Booking"],
  //   queryFn: () => onLoadTodayBooking(),
  // });

  // await queryClient.prefetchQuery({
  //   queryKey: ["category-Data"],
  //   queryFn: () => onLoadCategoryData(),
  // });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminPageShell
        title="Dashboard"
        badge="Overview"
        description="Track daily appointments, spot workload changes, and keep the salon schedule under control from one consistent workspace."
        breadcrumbs={[{ label: "Admin" }, { label: "Dashboard" }]}
        actions={
          <Button
            asChild
            className="rounded-2xl bg-zinc-900 px-5 text-white hover:bg-zinc-800"
          >
            <Link href="/admin/services/add-service">Add Service</Link>
          </Button>
        }
      >
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-4">
          <div className="xl:col-span-2">
            <DashboardUpcomingBookingCard />
          </div>
          <DashboardTodayBookingCard />
          <DashboardTomorrowBookingCard />
        </div>

        <AdminPanel
          title="Monthly booking trend"
          description="Daily booking volume for the current month."
          contentClassName="pt-2"
        >
          <BookingChart />
        </AdminPanel>

        <AdminPanel
          title="Service category mix"
          description="Which categories are taking the biggest share of current demand."
        >
          <CategoryData />
        </AdminPanel>
      </AdminPageShell>
    </HydrationBoundary>
  );
};

export default AdminPage;
