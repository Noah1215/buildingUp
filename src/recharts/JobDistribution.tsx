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
      style={{ position: "relative", top: "-5%" }}
    >
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={45}
          outerRadius={80}
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
            bottom: "10px",
          }}
          iconType="circle"
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default JobDistribution;
