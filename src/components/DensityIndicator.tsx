import React from 'react';
import { Users } from 'lucide-react';

interface DensityIndicatorProps {
  density: number;
}

export function DensityIndicator({ density }: DensityIndicatorProps) {
  const getColorClass = () => {
    if (density < 0.3) return 'bg-green-100 text-green-800';
    if (density < 0.7) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getMessage = () => {
    if (density < 0.3) return 'Low Occupancy';
    if (density < 0.7) return 'Moderate Occupancy';
    return 'High Occupancy';
  };

  return (
    <div className={`rounded-lg p-6 ${getColorClass()}`}>
      <div className="flex items-center space-x-3">
        <Users className="w-8 h-8" />
        <div>
          <h3 className="text-lg font-semibold">{getMessage()}</h3>
          <p className="text-sm opacity-75">Current Density: {(density * 100).toFixed(1)}%</p>
        </div>
      </div>
    </div>
  );
}