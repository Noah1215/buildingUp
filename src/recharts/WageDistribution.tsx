"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

type WageData = {
  name: string;
  value: number;
  color: string;
};

const data: WageData[] = [
  { name: "$16 ~ $20", value: 400, color: "#024761" },
  { name: "$21 ~ $25", value: 300, color: "#689A9E" },
  { name: "$26 ~ $30", value: 300, color: "#9BC4BD" },
  { name: "$31 ~ $35", value: 200, color: "#B5D9CC" },
  { name: "$35 ~", value: 100, color: "#CEEDDB" }
];

const WageDistribution = () => {
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
          align="left"
          verticalAlign="bottom"
          wrapperStyle={{
            position: "absolute",
            bottom: "25px",
            left: "5px",
            fontSize: "0.8rem"
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

export default WageDistribution;
