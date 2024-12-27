import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Week 1',
    expenses: 1250,
   
  },
  {
    name: 'Week 2',
    expenses: 3500,
 
  },
  {
    name: 'Week 3',
    expenses: 3000,
  
  },
  {
    name: 'Week 4',
    expenses: 4600,
   
  },
  {
    name: 'Week 5',
    expenses: 2500,
   
  },
  {
    name: 'Week 6',
    expenses: 3000,
   
  },
  {
    name: 'Week 7',
    expenses: 1800,
   
  },
  {
    name: 'Week 8',
    expenses: 3500,
   
  },
];

const SpentChart = () => {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart
        data={data}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 20,
        }}
        
      >
        {/* Define Gradient */}
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#b6dcfe" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#98ccfd" stopOpacity={0} />
          </linearGradient>
        </defs>

       
        <Tooltip />
        <Area type="monotone" dataKey="expenses" stroke="#4318ff" fill="url(#colorUv)" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default SpentChart;
