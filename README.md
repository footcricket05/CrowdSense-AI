# CrowdSense AI

## Revolutionizing Venue Management with AI-Powered Video Analytics

### Overview
CrowdSense AI is an innovative solution designed to transform the management of public venues through AI-driven video analytics. This system enables real-time crowd monitoring, heatmap generation, and actionable insights to enhance venue operations and user experiences.

### Features
- **Real-time crowd detection and counting**
- **Historical analytics and detailed reports**
- **Configurable system settings** (detection thresholds, venue management)
- **Live video processing with TensorFlow.js**
- **AI-powered heatmaps for optimized layouts**

### Implementation Plan

#### Frontend
- **Built with:** React & TypeScript
- **Pages:** Dashboard, Live Analytics, Reports, Settings
- **Libraries:** Recharts for interactive charts, TensorFlow.js for live video analytics

#### Backend
- **Tech Stack:** Node.js & Express.js
- **Database:** MongoDB / Supabase
- **Integrations:**
  - **Nx Toolkit** for video processing
  - **Nx AI Manager** for AI analytics
  - **Socket.IO** for real-time updates

#### Supabase Integration
- **Handles real-time analytics data storage**
- **Manages historical trends**
- **Ensures user-specific settings with Row-Level Security (RLS)**

### Applications & Benefits
- **Stadiums, concert halls, shopping malls** - Efficient crowd management
- **Venue managers** - Optimized layouts and enhanced security
- **Users** - Improved experience through AI-powered video solutions

### Future Roadmap
- **Enhanced AI models** for queue monitoring & behavior analysis
- **Multi-venue management** for broader applications
- **Predictive analytics & automated alerts** for proactive responses

### Deployment
Live demo: [CrowdSense AI](https://crowdsense-ai.netlify.app/)

### Setup Instructions
#### Prerequisites
- Node.js & npm
- MongoDB / Supabase
- Nx Toolkit

#### Installation
```sh
# Clone the repository
git clone https://github.com/footcricket05/crowdsense-ai.git
cd crowdsense-ai

# Install dependencies
npm install

# Start the backend
npm run server

# Start the frontend
npm start
```

### Contribution
We welcome contributions! Feel free to submit issues and pull requests.

### License
MIT License

