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

// const chartData = [
//     { month: "January", desktop: 186 },
//     { month: "February", desktop: 305 },
//     { month: "March", desktop: 237 },
//     { month: "April", desktop: 73 },
//     { month: "May", desktop: 209 },
//     { month: "June", desktop: 214 },
//   ]

const BookingChart = ({ data }: BookingChartProps) => {
  const chartData: TBookingChart[] = [];
  data.map((entry, index) =>
    chartData.push({ date: entry.date, bookings: entry.bookings }),
  );
  const chartConfig = {
    bookings: {
      label: "bookings",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <>
      {/* <Card className="hidden md:block">
        <CardHeader>
          <CardTitle>{`${format(new Date(), "MMMM")} Bookings`}</CardTitle>
          <CardDescription>
            Showing total bookings for the current month
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="bookings"
                type="natural"
                fillOpacity={0.4}
                fill="var(--color-bookings)"
                radius={4}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 font-medium leading-none">
                Trending up by 5.2% this month{" "}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-2 leading-none text-muted-foreground">
                January - June 2024
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
      <Card className="block md:hidden">
        <CardHeader>
          <CardTitle>Bar Chart - Horizontal</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
              layout="vertical"
              margin={{
                left: -20,
              }}
            >
              <XAxis type="number" dataKey="bookings" hide />
              <YAxis
                dataKey="date"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="bookings" fill="var(--color-booking)" radius={5} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total visitors for the last 6 months
          </div>
        </CardFooter>
      </Card> */}
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
                <XAxis dataKey={"date"} />
                <YAxis />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default BookingChart;
