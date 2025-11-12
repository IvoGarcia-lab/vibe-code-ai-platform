// Test script for Vibe Code API
const API_BASE_URL = 'http://localhost:3001/api';

async function testAPI() {
  console.log('🧪 Testing Vibe Code API...\n');

  // Test health endpoint
  try {
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch(`${API_BASE_URL}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData);
  } catch (error) {
    console.error('❌ Health check failed:', error);
  }

  // Test AI generation endpoint
  try {
    console.log('\n2. Testing AI generation endpoint...');
    const aiResponse = await fetch(`${API_BASE_URL}/ai/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: 'Write a short poem about artificial intelligence and creativity',
        category: 'writing'
      })
    });
    const aiData = await aiResponse.json();
    console.log('✅ AI Response:', aiData);
  } catch (error) {
    console.error('❌ AI generation failed:', error);
  }

  // Test history endpoint
  try {
    console.log('\n3. Testing history endpoint...');
    const historyResponse = await fetch(`${API_BASE_URL}/ai/history`);
    const historyData = await historyResponse.json();
    console.log('✅ History:', historyData);
  } catch (error) {
    console.error('❌ History check failed:', error);
  }

  console.log('\n🎉 API testing complete!');
}

// Run the tests
testAPI().catch(console.error);