import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { Helmet } from "react-helmet";
import { Typography } from "antd";

const data = [
  {
    name: "06 March",

    pv: 100.0,
  },
  {
    name: "07 March",

    pv: -200.0,
  },
  {
    name: "08 March",

    pv: 300.0,
  },
  {
    name: "09 March",

    pv: -50,
  },
  {
    name: "10 March",

    pv: -20,
  },
  {
    name: "11 March",

    pv: 20,
  },
  {
    name: "12 March",

    pv: 200,
  },
];

export default class Example extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/simple-bar-chart-tpz8r";

  render() {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Bar Chart</title>
        </Helmet>
        <Typography.Title level={2}>Profit</Typography.Title>
        <ResponsiveContainer width="100%" height={500}>
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill={"#4FB5C9"}>
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.pv > 0 ? "#4FB5C9" : "#F05D5E"}
                  radius={[10, 10, 0, 0]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </>
    );
  }
}
