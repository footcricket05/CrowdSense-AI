import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CrowdData, Theme } from '../types';

interface LiveChartProps {
  data: CrowdData[];
  theme: Theme;
}

export function LiveChart({ data, theme }: LiveChartProps) {
  const isDark = theme === 'dark';

  return (
    <div className="w-full h-[400px] bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 transition-colors">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Live Crowd Analytics</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke={isDark ? '#374151' : '#e5e7eb'}
          />
          <XAxis 
            dataKey="timestamp" 
            tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()}
            stroke={isDark ? '#9ca3af' : '#4b5563'}
          />
          <YAxis 
            stroke={isDark ? '#9ca3af' : '#4b5563'}
          />
          <Tooltip 
            labelFormatter={(timestamp) => new Date(timestamp).toLocaleString()}
            formatter={(value) => [value, 'Crowd Count']}
            contentStyle={{
              backgroundColor: isDark ? '#1f2937' : '#ffffff',
              borderColor: isDark ? '#374151' : '#e5e7eb',
              color: isDark ? '#ffffff' : '#000000',
            }}
          />
          <Line 
            type="monotone" 
            dataKey="crowdCount" 
            stroke={isDark ? '#60a5fa' : '#2563eb'} 
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}