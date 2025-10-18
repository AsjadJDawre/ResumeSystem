/**
 * Test script for OpenRouter DeepSeek V3.1 Summary Generator
 * Run with: node test-openrouter.js
 */

import dotenv from "dotenv";
import { generateResumeSummary, generateSummaryVariations } from "./utils/ai-service.js";

// Load environment variables
dotenv.config();

// Sample resume data for testing
const sampleResumeData = {
  projects: [
    {
      title: "E-commerce Platform",
      description: "Full-stack e-commerce application with React and Node.js",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      verified: true
    },
    {
      title: "Task Management App",
      description: "Collaborative task management tool with real-time updates",
      technologies: ["Vue.js", "Express", "Socket.io"],
      verified: false
    }
  ],
  achievements: [
    {
      type: "course",
      title: "Full Stack Web Development",
      organization: "freeCodeCamp",
      verified: true
    },
    {
      type: "hackathon",
      title: "Best UI/UX Design",
      organization: "TechCrunch Disrupt",
      verified: true
    }
  ],
  skills: [
    { name: "JavaScript", level: "advanced" },
    { name: "Python", level: "intermediate" },
    { name: "React", level: "advanced" },
    { name: "Node.js", level: "intermediate" },
    { name: "MongoDB", level: "intermediate" }
  ],
  education: [
    {
      degree: "Bachelor of Computer Science",
      institute: "University of Technology",
      startYear: 2020,
      endYear: 2024
    }
  ],
  experience: [
    {
      title: "Software Developer Intern",
      company: "TechCorp",
      duration: "Summer 2023",
      description: "Developed web applications using React and Node.js"
    }
  ]
};

async function testAISummary() {
  console.log("🧪 Testing OpenRouter DeepSeek V3.1 Summary Generator\n");
  
  // Check if API key is configured
  if (!process.env.OPENROUTER_API_KEY) {
    console.error("❌ OPENROUTER_API_KEY not found in environment variables");
    console.log("Please add OPENROUTER_API_KEY to your .env file");
    return;
  }
  
  console.log("✅ OpenRouter API key found");
  console.log("📊 Sample resume data loaded\n");
  
  try {
    // Test single summary generation
    console.log("🔄 Generating single AI summary...");
    const startTime = Date.now();
    
    const summary = await generateResumeSummary(sampleResumeData);
    
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    console.log("✅ Summary generated successfully!");
    console.log(`⏱️  Time taken: ${duration}ms`);
    console.log(`📝 Generated summary (${summary.length} characters):`);
    console.log(`"${summary}"\n`);
    
    // Test multiple variations
    console.log("🔄 Generating multiple variations...");
    const variationsStartTime = Date.now();
    
    const variations = await generateSummaryVariations(sampleResumeData, 2);
    
    const variationsEndTime = Date.now();
    const variationsDuration = variationsEndTime - variationsStartTime;
    
    console.log(`✅ Generated ${variations.length} variations successfully!`);
    console.log(`⏱️  Time taken: ${variationsDuration}ms`);
    
    variations.forEach((variation, index) => {
      console.log(`\n📝 Variation ${variation.id} (${variation.summary.length} characters):`);
      console.log(`"${variation.summary}"`);
    });
    
    console.log("\n🎉 All tests completed successfully!");
    
  } catch (error) {
    console.error("❌ Test failed:", error.message);
    
    if (error.message.includes("API key not configured")) {
      console.log("\n💡 Solution: Add OPENROUTER_API_KEY to your .env file");
    } else if (error.message.includes("rate limit")) {
      console.log("\n💡 Solution: Wait a moment and try again, or check your API usage");
    } else if (error.message.includes("model")) {
      console.log("\n💡 Solution: The model might be loading, try again in a few minutes");
    } else if (error.message.includes("unauthorized")) {
      console.log("\n💡 Solution: Check your OpenRouter API key is valid and has sufficient credits");
    } else {
      console.log("\n💡 Check the error details above and ensure your API key is valid");
    }
  }
}

// Run the test
testAISummary().catch(console.error);

