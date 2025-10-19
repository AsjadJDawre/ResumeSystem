/**
 * Mock data for Project and Skill Verification Modules
 * Simulates data from internal or third-party validation tools
 */

export const VerificationModuleData = [
  {
    id: "verify_001",
    platform: "GitHub Verified",
    type: "project",
    title: "E-commerce Platform",
    organization: "GitHub",
    verificationDate: "2024-03-20",
    status: "verified",
    verificationMethod: "code_review",
    verifiedBy: "Senior Developer - TechCorp",
    certificateURL: "https://github.com/verified/projects/ecommerce-platform",
    skillsVerified: ["React", "Node.js", "MongoDB", "Express.js", "Payment Integration"],
    projectMetrics: {
      linesOfCode: 15000,
      commits: 245,
      contributors: 1,
      stars: 12,
      forks: 3,
      issuesResolved: 15
    },
    qualityScore: 9.2,
    description: "Full-stack e-commerce platform with advanced features including real-time inventory management, payment processing, and admin dashboard.",
    githubLink: "https://github.com/user/ecommerce-platform",
    liveDemo: "https://ecommerce-demo.vercel.app",
    verificationNotes: "Code quality excellent, proper documentation, follows best practices"
  },
  {
    id: "verify_002",
    platform: "Skill Assessment Pro",
    type: "skill",
    title: "Python Programming",
    organization: "Skill Assessment Pro",
    verificationDate: "2024-02-15",
    status: "verified",
    verificationMethod: "automated_testing",
    verifiedBy: "AI Assessment System",
    certificateURL: "https://skillassessment.pro/certificates/python-expert-xyz789",
    skillsVerified: ["Python", "Data Structures", "Algorithms", "OOP", "Testing"],
    assessmentResults: {
      overallScore: 94,
      codingChallenges: 96,
      theoreticalKnowledge: 92,
      problemSolving: 95,
      codeQuality: 93
    },
    level: "advanced",
    description: "Comprehensive Python programming assessment covering advanced concepts, data structures, algorithms, and best practices.",
    testDuration: "120 minutes",
    questionsAnswered: 45,
    verificationNotes: "Excellent problem-solving skills, clean code practices, strong algorithmic thinking"
  },
  {
    id: "verify_003",
    platform: "Project Validator",
    type: "project",
    title: "AI Chatbot Application",
    organization: "Project Validator Inc",
    verificationDate: "2024-04-10",
    status: "verified",
    verificationMethod: "peer_review",
    verifiedBy: "AI/ML Expert - DataCorp",
    certificateURL: "https://projectvalidator.com/certificates/ai-chatbot-abc123",
    skillsVerified: ["Python", "Machine Learning", "NLP", "Flask", "OpenAI API", "Natural Language Processing"],
    projectMetrics: {
      linesOfCode: 8500,
      commits: 89,
      contributors: 1,
      stars: 8,
      forks: 2,
      issuesResolved: 7
    },
    qualityScore: 8.8,
    description: "Intelligent chatbot application using natural language processing and machine learning to provide contextual responses.",
    githubLink: "https://github.com/user/ai-chatbot",
    liveDemo: "https://ai-chatbot-demo.herokuapp.com",
    verificationNotes: "Innovative use of NLP, good API integration, well-structured codebase"
  },
  {
    id: "verify_004",
    platform: "Code Review Central",
    type: "skill",
    title: "React Development",
    organization: "Code Review Central",
    verificationDate: "2024-01-25",
    status: "verified",
    verificationMethod: "portfolio_review",
    verifiedBy: "Senior React Developer - WebCorp",
    certificateURL: "https://codereviewcentral.com/certificates/react-expert-def456",
    skillsVerified: ["React", "JavaScript", "JSX", "Hooks", "State Management", "Component Design"],
    assessmentResults: {
      overallScore: 91,
      componentDesign: 93,
      stateManagement: 89,
      performanceOptimization: 90,
      testing: 88,
      accessibility: 92
    },
    level: "intermediate",
    description: "React development skills assessment based on portfolio review and practical coding challenges.",
    projectsReviewed: 5,
    verificationNotes: "Strong component architecture, good use of hooks, attention to performance and accessibility"
  }
];

/**
 * Simulates fetching verification data from external platform API
 * @param {string} userId - User ID to fetch data for
 * @returns {Promise<Array>} Array of verification records
 */
export const fetchFromVerificationAPI = async (userId) => {
  console.log(`🔍 Fetching verification data for user: ${userId}`);
  console.log(`✅ Found ${VerificationModuleData.length} verification records`);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 350));
  
  return VerificationModuleData;
};
