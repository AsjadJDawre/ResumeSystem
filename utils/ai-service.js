import { ApiError } from "./api-error.js";
import OpenAI from "openai";

// console.log("OpenRouter API Key:", process.env.OPENROUTER_API_KEY ? "Loaded" : "Missing");

// OpenRouter configuration
const openRouterApiKey = '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';

if (!openRouterApiKey) {
  throw new Error("OPENROUTER_API_KEY not set in environment variables");
}

// Initialize OpenRouter client
const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: openRouterApiKey,
});

// Rate limiting configuration
const RATE_LIMIT_DELAY = 1000; // 1 second delay between requests
let lastRequestTime = 0;

/**
 * Generate a professional resume summary using OpenRouter DeepSeek V3.1
 * @param {Object} resumeData - Complete resume data with populated references
 * @returns {Promise<string>} Generated professional summary
 */
export const generateResumeSummary = async (resumeData) => {
  try {
    // Validate OpenRouter API key
    // if (!process.env.OPENROUTER_API_KEY) {
    //   throw new ApiError("OpenRouter API key not configured", 500);
    // }

    // Format resume data for AI processing
    const formattedData = formatResumeDataForAI(resumeData);

    // Create the prompt for AI
    const prompt = createSummaryPrompt(formattedData);

    // Add rate limiting delay
    await enforceRateLimit();

    // Call OpenRouter API with DeepSeek V3.1
    const completion = await client.chat.completions.create({
      model: "deepseek/deepseek-chat-v3.1:free",
      messages: [
        {
          role: "system",
          content: "You are a professional resume writer. Generate a compelling, concise professional summary (2-3 sentences, max 150 words) highlighting key strengths, experience, and achievements. Focus on quantifiable results and relevant skills. Use active voice and professional tone."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 200,
      top_p: 1,
      extra_headers: {
        "HTTP-Referer": "https://resumesys.local", // Optional. Site URL for rankings on openrouter.ai
        "X-Title": "Resume System", // Optional. Site title for rankings on openrouter.ai
      }
    });

    const generatedSummary = completion.choices?.[0]?.message?.content?.trim();
    
    if (!generatedSummary) {
      throw new ApiError("Failed to generate summary from AI", 500);
    }

    return generatedSummary;
  } catch (error) {
    console.error("OpenRouter DeepSeek Summary Generation Error:", error);
    
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Handle OpenRouter specific errors
    if (error.message?.includes('rate limit') || error.message?.includes('Rate limit')) {
      throw new ApiError("AI service rate limit exceeded", 429);
    }
    
    if (error.message?.includes('quota') || error.message?.includes('Quota')) {
      throw new ApiError("AI service quota exceeded", 503);
    }
    
    if (error.message?.includes('model') || error.message?.includes('Model')) {
      throw new ApiError("AI model temporarily unavailable", 503);
    }
    
    if (error.message?.includes('unauthorized') || error.message?.includes('Unauthorized')) {
      throw new ApiError("Invalid API key or unauthorized access", 401);
    }
    
    throw new ApiError("Failed to generate AI summary", 500);
  }
};

/**
 * Format resume data for optimal AI processing
 * @param {Object} resumeData - Resume data with populated references
 * @returns {Object} Formatted data for AI
 */
const formatResumeDataForAI = (resumeData) => {
  const { projects = [], achievements = [], skills = [], education = [], experience = [] } = resumeData;

  // Format projects for AI
  const formattedProjects = projects.map(project => ({
    title: project.title,
    description: project.description,
    technologies: project.technologies?.join(', ') || '',
    githubLink: project.githubLink,
    liveLink: project.liveLink,
    verified: project.verified
  }));

  // Format achievements for AI
  const formattedAchievements = achievements.map(achievement => ({
    type: achievement.type,
    title: achievement.title,
    organization: achievement.organization,
    verified: achievement.verified
  }));

  // Format skills for AI
  const formattedSkills = skills.map(skill => ({
    name: skill.name,
    level: skill.level
  }));

  // Format education for AI
  const formattedEducation = education.map(edu => ({
    degree: edu.degree,
    institute: edu.institute,
    duration: `${edu.startYear} - ${edu.endYear || 'Present'}`
  }));

  // Format experience for AI
  const formattedExperience = experience.map(exp => ({
    title: exp.title,
    company: exp.company,
    duration: exp.duration,
    description: exp.description
  }));

  return {
    projects: formattedProjects,
    achievements: formattedAchievements,
    skills: formattedSkills,
    education: formattedEducation,
    experience: formattedExperience
  };
};

/**
 * Create optimized prompt for AI summary generation
 * @param {Object} formattedData - Formatted resume data
 * @returns {string} AI prompt
 */
const createSummaryPrompt = (formattedData) => {
  const { projects, achievements, skills, education, experience } = formattedData;

  let prompt = "Generate a professional resume summary based on the following information:\n\n";

  // Add education information
  if (education.length > 0) {
    prompt += "EDUCATION:\n";
    education.forEach(edu => {
      prompt += `- ${edu.degree} from ${edu.institute} (${edu.duration})\n`;
    });
    prompt += "\n";
  }

  // Add experience information
  if (experience.length > 0) {
    prompt += "EXPERIENCE:\n";
    experience.forEach(exp => {
      prompt += `- ${exp.title} at ${exp.company} (${exp.duration})\n`;
      if (exp.description) {
        prompt += `  Description: ${exp.description}\n`;
      }
    });
    prompt += "\n";
  }

  // Add skills information
  if (skills.length > 0) {
    const skillLevels = skills.reduce((acc, skill) => {
      if (!acc[skill.level]) acc[skill.level] = [];
      acc[skill.level].push(skill.name);
      return acc;
    }, {});

    prompt += "SKILLS:\n";
    Object.entries(skillLevels).forEach(([level, skillNames]) => {
      prompt += `- ${level.charAt(0).toUpperCase() + level.slice(1)}: ${skillNames.join(', ')}\n`;
    });
    prompt += "\n";
  }

  // Add projects information
  if (projects.length > 0) {
    prompt += "PROJECTS:\n";
    projects.forEach(project => {
      prompt += `- ${project.title}`;
      if (project.description) {
        prompt += `: ${project.description}`;
      }
      if (project.technologies) {
        prompt += ` (Technologies: ${project.technologies})`;
      }
      if (project.verified) {
        prompt += " [VERIFIED]";
      }
      prompt += "\n";
    });
    prompt += "\n";
  }

  // Add achievements information
  if (achievements.length > 0) {
    prompt += "ACHIEVEMENTS:\n";
    achievements.forEach(achievement => {
      prompt += `- ${achievement.title}`;
      if (achievement.organization) {
        prompt += ` from ${achievement.organization}`;
      }
      if (achievement.verified) {
        prompt += " [VERIFIED]";
      }
      prompt += ` (${achievement.type})\n`;
    });
    prompt += "\n";
  }

  prompt += "Please generate a professional, compelling summary that highlights the most impressive aspects of this candidate's background. Focus on quantifiable achievements, relevant skills, and professional growth. Keep it concise (2-3 sentences, max 150 words).";

  return prompt;
};

/**
 * Generate multiple summary variations
 * @param {Object} resumeData - Complete resume data
 * @param {number} count - Number of variations to generate (default: 3)
 * @returns {Promise<Array>} Array of generated summaries
 */
export const generateSummaryVariations = async (resumeData, count = 3) => {
  const summaries = [];
  
  for (let i = 0; i < count; i++) {
    try {
      const summary = await generateResumeSummary(resumeData);
      summaries.push({
        id: i + 1,
        summary,
        generatedAt: new Date()
      });
    } catch (error) {
      console.error(`Failed to generate summary variation ${i + 1}:`, error);
      // Continue with other variations even if one fails
    }
  }
  
  return summaries;
};

/**
 * Enforce rate limiting between API calls
 */
const enforceRateLimit = async () => {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  
  if (timeSinceLastRequest < RATE_LIMIT_DELAY) {
    const delay = RATE_LIMIT_DELAY - timeSinceLastRequest;
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  
  lastRequestTime = Date.now();
};

