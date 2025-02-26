import React from 'react';
import { Settings as SettingsIcon, Download } from 'lucide-react';
import { SettingsConfig } from '../types';

interface SettingsProps {
  settings: SettingsConfig;
  onSettingsChange: (settings: SettingsConfig) => void;
  onDownloadReport: () => void;
}

export function Settings({ settings, onSettingsChange, onDownloadReport }: SettingsProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors">
      <div className="flex items-center space-x-2 mb-6">
        <SettingsIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Settings</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            AI Sensitivity
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={settings.sensitivity * 100}
            onChange={(e) => onSettingsChange({
              ...settings,
              sensitivity: Number(e.target.value) / 100
            })}
            className="w-full h-2 bg-blue-200 dark:bg-blue-900 rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {(settings.sensitivity * 100).toFixed(0)}%
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Detection Threshold
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={settings.threshold * 100}
            onChange={(e) => onSettingsChange({
              ...settings,
              threshold: Number(e.target.value) / 100
            })}
            className="w-full h-2 bg-blue-200 dark:bg-blue-900 rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {(settings.threshold * 100).toFixed(0)}%
          </div>
        </div>

        <button
          onClick={onDownloadReport}
          className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Download className="w-5 h-5" />
          <span>Download Historical Report</span>
        </button>
      </div>
    </div>
  );
}