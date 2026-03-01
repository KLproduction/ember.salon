"use client";

import { TBookingChart } from "@/lib/type";
import {
  CartesianGrid,
  XAxis,
  ResponsiveContainer,
  LineChart,
  Line,
  YAxis,
  Tooltip,
} from "recharts";
import { useBookingChartData } from "@/hooks/dashboard";

const BookingChart = () => {
  const { data } = useBookingChartData();
  const chartData: TBookingChart[] = [];
  if (!data) return;
  data.map((entry, index) =>
    chartData.push({ date: entry.date, bookings: entry.bookings }),
  );

  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer>
        <LineChart width={1100} height={320} data={chartData} margin={{ left: 0, right: 12, top: 16, bottom: 0 }}>
          <CartesianGrid stroke="#efe6d9" vertical={false} />
          <XAxis
            dataKey={"date"}
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            className="text-xs"
          />
          <YAxis
            allowDecimals={false}
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            className="text-xs"
          />
          <Tooltip
            cursor={{ stroke: "#d6c1a3", strokeWidth: 1 }}
            contentStyle={{
              borderRadius: "16px",
              border: "1px solid #f2e6d7",
              backgroundColor: "#fffdf9",
              boxShadow: "0 18px 40px -24px rgba(24,24,27,0.3)",
            }}
          />
          <Line
            type={"monotone"}
            dataKey={"bookings"}
            stroke="#b7791f"
            strokeWidth={4}
            dot={{ r: 0 }}
            activeDot={{ r: 6, fill: "#1f2937", stroke: "#fff7ea", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BookingChart;
