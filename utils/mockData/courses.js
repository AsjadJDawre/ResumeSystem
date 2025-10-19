/**
 * Mock data for Online Learning & Course Platforms
 * Simulates data from platforms like Coursera, Udemy, edX, etc.
 */

export const CoursePlatformData = [
  {
    id: "course_001",
    platform: "Coursera",
    title: "Machine Learning Specialization",
    organization: "Stanford University",
    instructor: "Andrew Ng",
    duration: "11 weeks",
    startDate: "2024-01-08",
    endDate: "2024-03-25",
    status: "completed",
    grade: "98%",
    certificateURL: "https://coursera.org/verify/ML_SPECIALIZATION_ABC123",
    verifiedBy: "Coursera",
    skillsGained: ["Machine Learning", "Python", "Linear Algebra", "Statistics", "Neural Networks", "Deep Learning"],
    description: "Comprehensive machine learning course covering supervised and unsupervised learning, neural networks, and deep learning fundamentals.",
    modules: [
      "Introduction to Machine Learning",
      "Linear Regression",
      "Logistic Regression",
      "Neural Networks",
      "Support Vector Machines",
      "Unsupervised Learning",
      "Anomaly Detection",
      "Recommender Systems"
    ],
    projects: [
      "Housing Price Prediction",
      "Image Classification",
      "Anomaly Detection System"
    ],
    completionDate: "2024-03-25"
  },
  {
    id: "course_002",
    platform: "Udemy",
    title: "Complete Web Development Bootcamp",
    organization: "The App Brewery",
    instructor: "Dr. Angela Yu",
    duration: "65 hours",
    startDate: "2023-09-15",
    endDate: "2023-11-20",
    status: "completed",
    grade: "95%",
    certificateURL: "https://udemy.com/certificate/UC-WEBDEV-DEF456",
    verifiedBy: "Udemy",
    skillsGained: ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB", "Express", "Bootstrap", "jQuery"],
    description: "Full-stack web development course covering frontend and backend technologies with hands-on projects.",
    modules: [
      "HTML5 Fundamentals",
      "CSS3 and Bootstrap",
      "JavaScript ES6+",
      "React.js",
      "Node.js and Express",
      "MongoDB and Mongoose",
      "RESTful APIs",
      "Authentication and Security"
    ],
    projects: [
      "Personal Portfolio Website",
      "Todo List App",
      "Blog Platform",
      "E-commerce Site"
    ],
    completionDate: "2023-11-20"
  },
  {
    id: "course_003",
    platform: "edX",
    title: "Introduction to Computer Science",
    organization: "MIT",
    instructor: "Prof. John Guttag",
    duration: "9 weeks",
    startDate: "2023-06-01",
    endDate: "2023-08-05",
    status: "completed",
    grade: "92%",
    certificateURL: "https://edx.org/certificates/mit-cs-intro-ghi789",
    verifiedBy: "edX",
    skillsGained: ["Python", "Algorithm Design", "Data Structures", "Computational Thinking", "Problem Solving"],
    description: "Introduction to computer science and programming using Python, covering fundamental concepts and problem-solving techniques.",
    modules: [
      "Introduction to Python",
      "Data Types and Variables",
      "Control Flow",
      "Functions",
      "Recursion",
      "Object-Oriented Programming",
      "Algorithm Analysis",
      "Data Structures"
    ],
    projects: [
      "Calculator Program",
      "Text Processing Tool",
      "Simple Game Development"
    ],
    completionDate: "2023-08-05"
  },
  {
    id: "course_004",
    platform: "Coursera",
    title: "Google Cloud Professional Data Engineer",
    organization: "Google Cloud",
    instructor: "Google Cloud Team",
    duration: "8 weeks",
    startDate: "2024-02-01",
    endDate: "2024-03-30",
    status: "completed",
    grade: "96%",
    certificateURL: "https://coursera.org/verify/GCP_DATA_ENGINEER_JKL012",
    verifiedBy: "Coursera",
    skillsGained: ["Google Cloud Platform", "BigQuery", "Dataflow", "Pub/Sub", "Cloud Storage", "Machine Learning APIs"],
    description: "Professional certification course for Google Cloud Data Engineering, covering data processing, storage, and analytics.",
    modules: [
      "Cloud Data Engineering Fundamentals",
      "BigQuery and Data Warehousing",
      "Data Processing with Dataflow",
      "Streaming Data with Pub/Sub",
      "Machine Learning on GCP",
      "Data Security and Governance"
    ],
    projects: [
      "ETL Pipeline with Dataflow",
      "Real-time Analytics Dashboard",
      "ML Model Deployment"
    ],
    completionDate: "2024-03-30"
  }
];

/**
 * Simulates fetching course data from external platform API
 * @param {string} userId - User ID to fetch data for
 * @returns {Promise<Array>} Array of course records
 */
export const fetchFromCourseAPI = async (userId) => {
  console.log(`🔍 Fetching course data for user: ${userId}`);
  console.log(`📚 Found ${CoursePlatformData.length} course records`);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  return CoursePlatformData;
};
