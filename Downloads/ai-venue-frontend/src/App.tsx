import React, { useState, useEffect, useCallback } from 'react';
import { LiveChart } from './components/LiveChart';
import { DensityIndicator } from './components/DensityIndicator';
import { Settings } from './components/Settings';
import { VideoUpload } from './components/VideoUpload';
import { CrowdData, SettingsConfig } from './types';
import { AlertTriangle } from 'lucide-react';

function App() {
  const [crowdData, setCrowdData] = useState<CrowdData[]>([]);
  const [settings, setSettings] = useState<SettingsConfig>({
    sensitivity: 0.5,
    threshold: 0.7
  });
  const [wsStatus, setWsStatus] = useState<'connected' | 'disconnected'>('disconnected');
  const [error, setError] = useState<string | null>(null);

  // Generate mock data for demonstration
  useEffect(() => {
    const generateMockData = () => {
      const now = Date.now();
      const newData: CrowdData = {
        timestamp: now,
        crowdCount: Math.floor(Math.random() * 100) + 20,
        density: Math.random() * 0.8 + 0.1
      };
      setCrowdData(prev => [...prev, newData].slice(-50));
    };

    // Generate initial data
    const initialData = Array.from({ length: 10 }, (_, i) => ({
      timestamp: Date.now() - (10 - i) * 1000,
      crowdCount: Math.floor(Math.random() * 100) + 20,
      density: Math.random() * 0.8 + 0.1
    }));
    setCrowdData(initialData);

    // Update every second
    const interval = setInterval(generateMockData, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleVideoFrame = async (frame: Blob) => {
    // Mock video frame processing
    const mockDensity = Math.random() * 0.8 + 0.1;
    const mockCount = Math.floor(Math.random() * 100) + 20;
    
    setCrowdData(prev => [...prev, {
      timestamp: Date.now(),
      crowdCount: mockCount,
      density: mockDensity
    }].slice(-50));
  };

  const handleDownloadReport = async () => {
    // Generate mock CSV data
    const csvContent = [
      'Timestamp,Crowd Count,Density',
      ...crowdData.map(data => 
        `${new Date(data.timestamp).toISOString()},${data.crowdCount},${data.density}`
      )
    ].join('\n');

    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'crowd-analytics-report.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900">Venue Analytics Dashboard</h1>
          <p className="text-gray-500 mt-2">Real-time AI-powered crowd analysis</p>
          <div className="mt-2 text-sm text-blue-600">
            Demo Mode: Using simulated data
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <LiveChart data={crowdData} />
            <VideoUpload onVideoFrame={handleVideoFrame} />
          </div>
          
          <div className="space-y-6">
            <DensityIndicator 
              density={crowdData[crowdData.length - 1]?.density ?? 0} 
            />
            <Settings 
              settings={settings}
              onSettingsChange={setSettings}
              onDownloadReport={handleDownloadReport}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;