import React from 'react';
import { BarChart, Bar, ResponsiveContainer, ReferenceLine, XAxis, Tooltip } from 'recharts';

const getCurrentDate = () => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  return months.map((month, index) => ({
    name: month,
    users: Math.floor(Math.random() * 2000) + 1000, 
  }));
};

const data = getCurrentDate();
const maxValue = Math.max(...data.map((item) => item.users));

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{ 
        backgroundColor: '#dff0fe', 
        padding: '10px', 
        border: '1px solid #98ccfd',
        borderRadius: '8px'
      }}>
        <span>

        <p className="label font-poppins">{`${label} :`}</p>
        <p className="label font-inter">{` ${payload[0].value} Users`}</p>
        </span>
      </div>
    );
  }
  return null;
};

const UserChart = () => {
  return (
    <ResponsiveContainer width="100%" height={360}>
      <BarChart data={data}>
        <ReferenceLine y={maxValue} stroke="red" strokeDasharray="5 5" />
        <XAxis 
          dataKey="name" 
          interval={0}
          tick={{
            fontSize: 12,
            fontFamily: 'Inter',
            fill: '#6B7280'
          }}
        />
        <Tooltip 
          content={<CustomTooltip />}
          cursor={false}
        />
        <Bar 
          dataKey="users" 
          fill="#dff0fe"
          activeBar={{
            fill: '#98ccfd'
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default UserChart;