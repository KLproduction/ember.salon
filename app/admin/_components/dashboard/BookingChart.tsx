"use client";

import { TBookingChart } from "@/lib/type";
import { TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Bar, BarChart, YAxis } from "recharts";
import { format } from "date-fns";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect } from "react";

type BookingChartProps = {
  data: TBookingChart[];
};

const BookingChart = ({ data }: BookingChartProps) => {
  const chartData: TBookingChart[] = [];
  data.map((entry, index) =>
    chartData.push({ date: entry.date, bookings: entry.bookings }),
  );

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{`${format(new Date(), "MMMM")} Bookings`}</CardTitle>
          <CardDescription> Per Day</CardDescription>
        </CardHeader>
        <CardContent>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <LineChart width={1100} height={300} data={chartData}>
                <Line
                  type={"monotone"}
                  dataKey={"bookings"}
                  stroke="#DAA520"
                  strokeWidth={4}
                />
                <CartesianGrid stroke="#cccc" />
                <XAxis
                  dataKey={"date"}
                  label={{
                    value: "Date",
                    position: "insideBottom",
                    offset: -5,
                  }}
                />
                <YAxis
                  label={{
                    value: "Bookings",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default BookingChart;
