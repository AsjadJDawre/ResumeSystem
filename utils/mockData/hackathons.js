/**
 * Mock data for Hackathon Platforms
 * Simulates data from platforms like Devpost, HackerEarth, etc.
 */

export const HackathonPlatformData = [
  {
    id: "hack_001",
    platform: "Devpost",
    title: "AI Innovation Challenge",
    hackathonName: "TechFest 2024",
    organization: "TechFest Global",
    duration: "48 hours",
    startDate: "2024-03-15",
    endDate: "2024-03-17",
    status: "completed",
    position: "1st Place",
    prize: "$5000",
    certificateURL: "https://devpost.com/certificates/winner_ai_challenge",
    verifiedBy: "Devpost",
    skillsGained: ["Machine Learning", "Python", "TensorFlow", "Computer Vision", "API Development"],
    projectTitle: "SmartVision - AI-Powered Accessibility Tool",
    projectDescription: "Developed an AI-powered mobile app that helps visually impaired users navigate their environment using computer vision and voice guidance.",
    technologies: ["Python", "TensorFlow", "OpenCV", "React Native", "Firebase"],
    teamSize: 4,
    githubLink: "https://github.com/team/smartvision",
    demoLink: "https://smartvision-demo.com",
    judges: ["Dr. Emily Watson", "Mark Johnson", "Sarah Lee"],
    completionDate: "2024-03-17"
  },
  {
    id: "hack_002",
    platform: "HackerEarth",
    title: "Blockchain Hackathon",
    hackathonName: "CryptoBuild 2024",
    organization: "Blockchain Foundation",
    duration: "72 hours",
    startDate: "2024-02-10",
    endDate: "2024-02-13",
    status: "completed",
    position: "2nd Place",
    prize: "$3000",
    certificateURL: "https://hackerearth.com/certificates/blockchain_runner_up",
    verifiedBy: "HackerEarth",
    skillsGained: ["Solidity", "Web3.js", "Ethereum", "Smart Contracts", "DApp Development"],
    projectTitle: "DeFiYield - Decentralized Yield Farming Platform",
    projectDescription: "Built a decentralized finance platform that allows users to stake cryptocurrencies and earn yield through automated farming strategies.",
    technologies: ["Solidity", "Web3.js", "React", "Node.js", "IPFS"],
    teamSize: 3,
    githubLink: "https://github.com/team/defiyield",
    demoLink: "https://defiyield-demo.vercel.app",
    judges: ["Vitalik Buterin", "Andreas Antonopoulos", "Linda Xie"],
    completionDate: "2024-02-13"
  },
  {
    id: "hack_003",
    platform: "Devpost",
    title: "Sustainability Hackathon",
    hackathonName: "GreenTech 2024",
    organization: "Environmental Tech Initiative",
    duration: "24 hours",
    startDate: "2024-04-22",
    endDate: "2024-04-23",
    status: "completed",
    position: "3rd Place",
    prize: "$1500",
    certificateURL: "https://devpost.com/certificates/sustainability_third",
    verifiedBy: "Devpost",
    skillsGained: ["IoT", "Arduino", "Environmental Data", "Data Visualization", "Sensor Integration"],
    projectTitle: "EcoMonitor - Real-time Environmental Tracking",
    projectDescription: "Created an IoT-based system that monitors air quality, temperature, and humidity in real-time with data visualization dashboard.",
    technologies: ["Arduino", "Python", "React", "Chart.js", "MQTT"],
    teamSize: 2,
    githubLink: "https://github.com/team/ecomonitor",
    demoLink: "https://ecomonitor-demo.netlify.app",
    judges: ["Dr. Green", "Tech Environmentalist", "IoT Expert"],
    completionDate: "2024-04-23"
  }
];

/**
 * Simulates fetching hackathon data from external platform API
 * @param {string} userId - User ID to fetch data for
 * @returns {Promise<Array>} Array of hackathon records
 */
export const fetchFromHackathonAPI = async (userId) => {
  console.log(`🔍 Fetching hackathon data for user: ${userId}`);
  console.log(`🏆 Found ${HackathonPlatformData.length} hackathon records`);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return HackathonPlatformData;
};
