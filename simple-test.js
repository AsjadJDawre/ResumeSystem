// Simple test to verify the integration simulation works
console.log("Testing integration simulation...");

try {
  const { simulateIntegration } = await import('./models/integrationSimulation.js');
  console.log("Import successful!");
  
  const result = await simulateIntegration('test_user');
  console.log("Simulation completed!");
  console.log(`Skills found: ${result.skills.length}`);
  console.log(`Experiences: ${result.experiences.length}`);
  console.log(`Achievements: ${result.achievements.length}`);
  console.log(`Projects: ${result.projects.length}`);
  
} catch (error) {
  console.error("Error:", error.message);
}
