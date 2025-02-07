import React, { useState, useEffect } from 'react';
import { LiveChart } from './components/LiveChart';
import { DensityIndicator } from './components/DensityIndicator';
import { Settings } from './components/Settings';
import { VideoUpload } from './components/VideoUpload';
import { ThemeToggle } from './components/ThemeToggle';
import { CrowdData, SettingsConfig, Theme } from './types';
import { AlertTriangle, Github, Building2 } from 'lucide-react';

function App() {
  const [crowdData, setCrowdData] = useState<CrowdData[]>([]);
  const [settings, setSettings] = useState<SettingsConfig>({
    sensitivity: 0.5,
    threshold: 0.7
  });
  const [theme, setTheme] = useState<Theme>('light');
  const [wsStatus, setWsStatus] = useState<'connected' | 'disconnected'>('disconnected');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Generate mock data influenced by sensitivity and threshold
  useEffect(() => {
    const generateMockData = () => {
      const now = Date.now();
      
      // Use sensitivity to affect the range of crowd count
      const baseCount = 50; // Base crowd count
      const variationRange = 80; // Maximum variation
      const sensitivity_factor = settings.sensitivity * 2; // Convert 0-1 to 0-2 range
      const crowdCount = Math.floor(
        baseCount + (Math.random() - 0.5) * variationRange * sensitivity_factor
      );

      // Use threshold to influence density calculations
      const rawDensity = crowdCount / 200; // Convert count to 0-1 range
      const density = Math.min(
        1,
        rawDensity * (1 + (settings.threshold - 0.5))
      );

      const newData: CrowdData = {
        timestamp: now,
        crowdCount: Math.max(0, Math.min(200, crowdCount)), // Clamp between 0-200
        density: Math.max(0, Math.min(1, density)) // Clamp between 0-1
      };
      setCrowdData(prev => [...prev, newData].slice(-50));
    };

    // Generate initial data
    const initialData = Array.from({ length: 10 }, (_, i) => {
      const baseCount = 50;
      const crowdCount = Math.floor(
        baseCount + (Math.random() - 0.5) * 80 * (settings.sensitivity * 2)
      );
      return {
        timestamp: Date.now() - (10 - i) * 1000,
        crowdCount: Math.max(0, Math.min(200, crowdCount)),
        density: Math.max(0, Math.min(1, crowdCount / 200 * (1 + (settings.threshold - 0.5))))
      };
    });
    setCrowdData(initialData);

    // Update every second
    const interval = setInterval(generateMockData, 1000);
    return () => clearInterval(interval);
  }, [settings]); // Re-run effect when settings change

  const handleVideoFrame = async (frame: Blob) => {
    // Mock video frame processing with settings influence
    const mockCount = Math.floor(
      50 + (Math.random() - 0.5) * 80 * (settings.sensitivity * 2)
    );
    const mockDensity = Math.min(
      1,
      (mockCount / 200) * (1 + (settings.threshold - 0.5))
    );
    
    setCrowdData(prev => [...prev, {
      timestamp: Date.now(),
      crowdCount: Math.max(0, Math.min(200, mockCount)),
      density: Math.max(0, Math.min(1, mockDensity))
    }].slice(-50));
  };

  const handleDownloadReport = async () => {
    const csvContent = [
      'Timestamp,Crowd Count,Density,Sensitivity,Threshold',
      ...crowdData.map(data => 
        `${new Date(data.timestamp).toISOString()},${data.crowdCount},${data.density},${settings.sensitivity},${settings.threshold}`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `crowd-analytics-report-${new Date().toISOString()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <header className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center space-x-2">
                <Building2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">CrowdSense AI</h1>
              </div>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Real-time venue analytics powered by artificial intelligence
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                  Demo Mode
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                  Nx Venue Innovation Hackathon 2025
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200">
                  HackerEarth
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle theme={theme} onThemeChange={setTheme} />
              <div className="flex items-center space-x-4">
                <a 
                  href="https://github.com/footcricket05" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors flex items-center space-x-1"
                >
                  <span className="text-sm">by Shaurya Singh Srinet</span>
                </a>
                <a 
                  href="https://github.com/footcricket05/CrowdSense-AI" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                  <Github className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <LiveChart data={crowdData} theme={theme} />
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

        <footer className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
          <p>Built with ❤️ for Nx Venue Innovation Hackathon 2025</p>
          <p className="mt-1">Powered by React, TailwindCSS, and Recharts</p>
          <p className="mt-1">A HackerEarth hackathon project by Shaurya Singh Srinet</p>
        </footer>
      </div>
    </div>
  );
}

export default App;