import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Marketing",
    profit: 3000,
  },
  {
    name: "Fashion",
    profit: 1740,
  },
  {
    name: "Tech Startup",
    profit: 7000,
  },
  {
    name: "Restaurant App",
    profit: 1120,
  },
  {
    name: "Education",
    profit: 4400,
  },
  {
    name: "Freelance",
    profit: 9000,
  },
  {
    name: "Fitness",
    profit: 2500,
  },
];

const InComeChart = () => {
  return (
    <ResponsiveContainer width="100%" height={330}>
      <BarChart
        data={data}
        margin={{
          top: 40,
          right: 30,
          left: 30,
          bottom: 40,
        }}
        barSize={30}
      >
        <XAxis
          angle={-35}
          textAnchor="end"
          interval={0}
          fontSize={10}
          dataKey="name"
          scale="point"
          padding={{ left: 20, right: 20 }}
        />

        <Tooltip
          formatter={(value, name) => [
            new Intl.NumberFormat("en-US").format(value),
            "Profit",
          ]}
          labelStyle={{ fontWeight: "medium" }}
        />

        <Bar
          dataKey="profit"
          fill="#98ccfd"
          background={{ fill: "#dff0fe", radius: [15, 15, 0, 0] }}
          radius={[15, 15, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default InComeChart;
