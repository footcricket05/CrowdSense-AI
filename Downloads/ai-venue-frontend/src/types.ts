export interface CrowdData {
  timestamp: number;
  crowdCount: number;
  density: number;
}

export interface SettingsConfig {
  sensitivity: number;
  threshold: number;
}