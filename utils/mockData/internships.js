/**
 * Mock data for Internship & Training Platforms
 * Simulates data from platforms like Internshala, LinkedIn Learning, etc.
 */

export const InternshipPlatformData = [
  {
    id: "int_001",
    platform: "Internshala",
    title: "Full Stack Development Intern",
    organization: "TechCorp Solutions",
    duration: "3 months",
    startDate: "2024-01-15",
    endDate: "2024-04-15",
    status: "completed",
    certificateURL: "https://internshala.com/certificates/abc123",
    verifiedBy: "Internshala",
    skillsGained: ["React", "Node.js", "MongoDB", "Express.js", "Git"],
    description: "Developed a complete e-commerce platform using MERN stack. Worked on both frontend and backend development, implemented user authentication, payment integration, and database optimization.",
    projectDeliverables: [
      "E-commerce platform with 1000+ products",
      "Admin dashboard for inventory management",
      "Payment gateway integration"
    ],
    mentor: "John Smith",
    rating: 4.8,
    completionDate: "2024-04-15"
  },
  {
    id: "int_002",
    platform: "LinkedIn Learning",
    title: "Data Science Internship",
    organization: "DataInsights Inc",
    duration: "6 months",
    startDate: "2023-07-01",
    endDate: "2023-12-31",
    status: "completed",
    certificateURL: "https://linkedin.com/learning/certificates/def456",
    verifiedBy: "LinkedIn Learning",
    skillsGained: ["Python", "Machine Learning", "Pandas", "NumPy", "Scikit-learn", "Jupyter"],
    description: "Worked on machine learning models for customer behavior prediction. Analyzed large datasets and built predictive models that improved customer retention by 15%.",
    projectDeliverables: [
      "Customer churn prediction model",
      "Data visualization dashboard",
      "ML pipeline automation"
    ],
    mentor: "Dr. Sarah Johnson",
    rating: 4.9,
    completionDate: "2023-12-31"
  },
  {
    id: "int_003",
    platform: "Indeed",
    title: "UI/UX Design Intern",
    organization: "CreativeStudio",
    duration: "2 months",
    startDate: "2024-05-01",
    endDate: "2024-06-30",
    status: "completed",
    certificateURL: "https://indeed.com/certificates/ghi789",
    verifiedBy: "Indeed",
    skillsGained: ["Figma", "Adobe XD", "User Research", "Prototyping", "Design Systems"],
    description: "Designed user interfaces for mobile applications. Conducted user research, created wireframes, and developed interactive prototypes.",
    projectDeliverables: [
      "Mobile app UI design",
      "User research report",
      "Design system documentation"
    ],
    mentor: "Alex Chen",
    rating: 4.7,
    completionDate: "2024-06-30"
  }
];

/**
 * Simulates fetching internship data from external platform API
 * @param {string} userId - User ID to fetch data for
 * @returns {Promise<Array>} Array of internship records
 */
export const fetchFromInternshipAPI = async (userId) => {
  console.log(`🔍 Fetching internship data for user: ${userId}`);
  console.log(`📊 Found ${InternshipPlatformData.length} internship records`);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return InternshipPlatformData;
};
