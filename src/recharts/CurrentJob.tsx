"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Level 0",
    Carpenter: 100,
    "Cable Technician": 20,
    "Construction Manager": 20,
  },
  {
    name: "Level 1",
    Carpenter: 95,
    "Cable Technician": 45,
    "Construction Manager": 20,
  },
  {
    name: "Level 2",
    Carpenter: 110,
    "Cable Technician": 30,
    "Construction Manager": 40,
  },
  {
    name: "Level 3",
    Carpenter: 60,
    "Cable Technician": 20,
    "Construction Manager": 40,
  },
];

const CurrentJob = () => {
  return (
    <ResponsiveContainer>
      <BarChart
        data={data}
        margin={{
          top: 30,
          left: 20,
          right: 50,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" fontSize={14} />
        <YAxis domain={[0, 200]} interval={0} tickCount={9} />
        <Bar
          dataKey="Carpenter"
          stackId="currentJob"
          fill="#024761"
          barSize={30}
        />
        <Bar dataKey="Cable Technician" stackId="currentJob" fill="#689A9E" />
        <Bar
          dataKey="Construction Manager"
          stackId="currentJob"
          fill="#9BC4BD"
        />

        <Legend
          align="center"
          layout="horizontal"
          iconType="circle"
          wrapperStyle={{ left: "30px" }}
          formatter={(value) => (
            <span style={{ color: "#024761" }}>{value}</span>
          )}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CurrentJob;
