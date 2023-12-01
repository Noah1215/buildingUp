"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

type JobData = {
  name: string;
  value: number;
  color: string;
};

const data: JobData[] = [
  { name: "Carpenter", value: 400, color: "#024761" },
  { name: "Plumber", value: 300, color: "#689A9E" },
  { name: "Cable Technician", value: 300, color: "#9BC4BD" },
  { name: "Construction Manager", value: 200, color: "#B5D9CC" },
  { name: "Construction worker", value: 500, color: "#CEEDDB" },
];

const JobDistribution = () => {
  return (
    <ResponsiveContainer
      width="80%"
      height="100%"
      style={{ position: "relative" }}
    >
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Legend
          align="center"
          verticalAlign="bottom"
          wrapperStyle={{
            position: "absolute",
            bottom: "25px",
          }}
          iconType="circle"
          formatter={(value) => (
            <span style={{ color: "#024761" }}>{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default JobDistribution;
