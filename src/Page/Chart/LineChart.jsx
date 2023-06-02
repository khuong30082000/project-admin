import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Typography } from "antd";
import { Helmet } from "react-helmet";

const data = [
  {
    nameX: "12:00",
    uv: 50,
  },
  { nameX: "1:00", uv: 40 },
  { nameX: "2:00", uv: 60 },
  { nameX: "3:00", uv: 0 },
  { nameX: "4:00", uv: 40 },
  { nameX: "5:00", uv: 50 },
  { nameX: "6:00", uv: 40 },
  { nameX: "7:00", uv: 10 },
  { nameX: "8:00", uv: 50 },
  { nameX: "9:00", uv: 70 },
  { nameX: "10:00", uv: 0 },
  { nameX: "11:00", uv: 60 },
];

const renderLineChart = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Line Chart</title>
      </Helmet>
      <Typography.Title level={2}>Token Price</Typography.Title>
      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          width={500}
          height={200}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorView">
              <stop offset="0%" stopColor="#9747FF" />
              <stop offset="80%" stopColor="#14F4C9 " />
            </linearGradient>
          </defs>
          <CartesianGrid strokeWidth={1} vertical={false} stroke="#DEDEE7" />
          <XAxis
            tickLine={false}
            stroke="#DEDEE7"
            tick={{ fill: "#A4A4B3", fontSize: 12 }}
            dataKey="nameX"
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickCount={5}
            stroke="#DEDEE7"
            tick={{ fill: "#A4A4B3", fontSize: 12 }}
          />
          <Tooltip />
          <Line
            connectNulls
            type="monotone"
            dataKey="uv"
            stroke="url(#colorView)"
            dot={false}
            strokeWidth={4}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default renderLineChart;
