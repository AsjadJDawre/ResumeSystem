/**
 * Simple debug test to check if the integration simulation works
 */

console.log("🚀 Starting debug test...");

try {
  // Test basic import
  console.log("📦 Testing import...");
  const { simulateIntegration } = await import('./models/integrationSimulation.js');
  console.log("✅ Import successful");
  
  // Test the simulation
  console.log("🔄 Running simulation...");
  const results = await simulateIntegration('debug_user_123');
  console.log("✅ Simulation completed");
  
  // Show basic results
  console.log("\n📊 Basic Results:");
  console.log(`Skills: ${results.skills.length}`);
  console.log(`Experiences: ${results.experiences.length}`);
  console.log(`Achievements: ${results.achievements.length}`);
  console.log(`Projects: ${results.projects.length}`);
  
} catch (error) {
  console.error("❌ Error occurred:", error.message);
  console.error("Stack trace:", error.stack);
}
