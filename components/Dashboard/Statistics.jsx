import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, CartesianGrid, Tooltip, XAxis, ResponsiveContainer,
} from 'recharts';
import resolveConfig from 'tailwindcss/resolveConfig';
import { duration } from '../../constants/constants';
import Menu from '../Modal/Menu';
import tailwindConfig from '../../tailwind.config';

const tailwind = resolveConfig(tailwindConfig);

function ActiveDot(props) {
  const {
    cx, cy, color,
  } = props;
  return (
    <circle
      r="3"
      stroke={color}
      strokeWidth="6"
      fill={color}
      strokeOpacity="0.3"
      cx={cx}
      cy={cy}
    />
  );
}

function Statistics({ data }) {
  const [filter, setFilter] = useState({ label: 'All Time', value: 'alltime' });

  return (
    <section className="mt-10">
      <div className="flex items-end justify-between">
        <div className="text-lg font-extrabold">
          Sales and Purchases Statistics
        </div>
        <div className="flex items-center">
          <div className="flex items-center justify-center text-sm font-semibold mr-3">
            <div className="h-2 w-2 bg-main-900 rounded-full mr-2" />
            Sales
          </div>
          <div className="flex items-center justify-center text-sm font-semibold ">
            <div className="h-2 w-2 bg-dark-400 rounded-full mr-2" />
            Purchases
          </div>
          <div className="h-5 border-l border-dark-300 mx-3" />
          <Menu filter={filter} setFilter={setFilter} options={duration} />
        </div>
      </div>
      <div className={`mt-1 py-5 bg-dark-100 rounded-lg ${data.length === 0 && 'animate-pulse h-[240px]'}`}>
        {data.length > 0 && (
        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            data={data}
            id="test"
            margin={{
              right: 20, left: 20,
            }}
          >
            <CartesianGrid
              stroke={tailwind.theme.colors.dark[300]}
              strokeDasharray={5}
              horizontal={false}
            />
            <Line
              animationEasing="ease-in-out"
              type="monotone"
              dataKey="purchases"
              stroke={tailwind.theme.colors.dark[400]}
              strokeWidth={2.5}
              dot={false}
              activeDot={(props) => (
                <ActiveDot
                  {...props}
                  color={tailwind.theme.colors.dark[400]}
                />
              )}
            />
            <Line
              animationEasing="ease-in-out"
              type="monotone"
              dataKey="sales"
              stroke={tailwind.theme.colors.main[900]}
              strokeWidth={2.5}
              dot={false}
              activeDot={(props) => (
                <ActiveDot
                  {...props}
                  color={tailwind.theme.colors.main[900]}
                />
              )}
            />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tickMargin={14}
              tick={({ x, y, payload }) => (
                <g transform={`translate(${x + 10},${y - 3})`}>
                  <text
                    x={0}
                    y={0}
                    dy={10}
                    textAnchor="end"
                    fill={tailwind.theme.colors.dark[500]}
                    className="text-sm font-semibold"
                  >
                    {payload.value}
                  </text>
                </g>
              )}
            />
            <Tooltip
              content={(props) => {
                const { active, payload } = props;
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white border border-dark-300 p-3 text-sm">
                      <p className="font-semibold">{`${payload[0].payload.month}`}</p>
                      <p className="mt-3">
                        Sales:
                        {' '}
                        <span className="text-main-900 font-semibold">
                          {payload[1].value.toLocaleString(undefined, { minimumFractionDigits: 0 })}
                        </span>
                      </p>
                      <p className="">
                        Purchases:
                        {' '}
                        <span className="text-dark-500 font-semibold">
                          {payload[0].value.toLocaleString(undefined, { minimumFractionDigits: 0 })}
                        </span>
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
          </LineChart>
        </ResponsiveContainer>
        )}
      </div>
    </section>
  );
}

export default Statistics;
