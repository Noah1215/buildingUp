"use client";

import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts";

type AverageWageData = {
  name: string;
  Level0: number;
  Level1: number;
  Level2: number;
  Level3: number;
}

const data: AverageWageData[] = [
  {
    name: "W1",
    Level0: 14,
    Level1: 15,
    Level2: 18,
    Level3: 22
  },
  {
    name: "W5",
    Level0: 15,
    Level1: 16,
    Level2: 20,
    Level3: 24
  },
  {
    name: "W9",
    Level0: 15,
    Level1: 20,
    Level2: 21,
    Level3: 25
  },
  {
    name: "W13",
    Level0: 18,
    Level1: 20,
    Level2: 23,
    Level3: 27
  },
  {
    name: "W17",
    Level0: 19,
    Level1: 20,
    Level2: 19,
    Level3: 29
  },
  {
    name: "W21",
    Level0: 20,
    Level1: 22,
    Level2: 25,
    Level3: 30
  },
  {
    name: "W25",
    Level0: 21,
    Level1: 25,
    Level2: 26,
    Level3: 32
  },
  {
    name: "W29",
    Level0: 23,
    Level1: 28,
    Level2: 29,
    Level3: 31
  },
  {
    name: "W33",
    Level0: 25,
    Level1: 30,
    Level2: 32,
    Level3: 34
  },
  {
    name: "W37",
    Level0: 27,
    Level1: 30,
    Level2: 32,
    Level3: 37
  },
  {
    name: "W41",
    Level0: 30,
    Level1: 28,
    Level2: 30,
    Level3: 38
  },
  {
    name: "W45",
    Level0: 31,
    Level1: 30,
    Level2: 33,
    Level3: 40
  },
  {
    name: "W49",
    Level0: 33,
    Level1: 32,
    Level2: 33,
    Level3: 42
  }
];

const AverageWage = () => {
  return (
    <ResponsiveContainer
      width="95%"
      height="100%"
      style={{ position: "relative" }}
    >
      <LineChart
        data={data}
        margin={{
          top: 10,
          right: 5,
          left: 5,
          bottom: 30
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis tickCount={11} />
        <Legend         
          align="center"
          verticalAlign="bottom"
          wrapperStyle={{
            position: "absolute",
            bottom: "25px",
            fontSize: "0.8rem"
          }}
          iconType="circle"
          formatter={(value) => (
            <span style={{ color: "#024761" }}>{value}</span>
          )}
        />
        <Line
          type="monotone"
          dataKey="Level0"
          stroke="#024761"
          strokeWidth={3}
        />
        <Line
          type="monotone"
          dataKey="Level1"
          stroke="#689A9E"
          strokeWidth={3}
        />
        <Line
          type="monotone"
          dataKey="Level2"
          stroke="#9BC4BD"
          strokeWidth={3}
        />
        <Line
          type="monotone"
          dataKey="Level3"
          stroke="#B5D9CC"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default AverageWage