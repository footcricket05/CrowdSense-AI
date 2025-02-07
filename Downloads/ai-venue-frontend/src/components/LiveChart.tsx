import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CrowdData } from '../types';

interface LiveChartProps {
  data: CrowdData[];
}

export function LiveChart({ data }: LiveChartProps) {
  return (
    <div className="w-full h-[400px] bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Live Crowd Analytics</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="timestamp" 
            tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()}
          />
          <YAxis />
          <Tooltip 
            labelFormatter={(timestamp) => new Date(timestamp).toLocaleString()}
            formatter={(value) => [value, 'Crowd Count']}
          />
          <Line 
            type="monotone" 
            dataKey="crowdCount" 
            stroke="#2563eb" 
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}