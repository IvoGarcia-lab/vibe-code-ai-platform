import axios from 'axios';

async function testRealGeminiAPI() {
  console.log('🧪 Testing Real Gemini API Integration...\n');
  
  try {
    // Test AI generation with different categories
    const testCases = [
      { prompt: 'Write a short poem about artificial intelligence and creativity', category: 'writing' },
      { prompt: 'Design a modern logo for a tech startup', category: 'design' },
      { prompt: 'Generate a Python function to calculate fibonacci numbers', category: 'code' },
      { prompt: 'Create a catchy melody for a pop song', category: 'music' },
      { prompt: 'Write compelling copy for a new coffee shop', category: 'marketing' }
    ];

    for (const [index, testCase] of testCases.entries()) {
      console.log(`Test ${index + 1}: ${testCase.category}`);
      console.log(`Prompt: ${testCase.prompt}`);
      
      try {
        const response = await axios.post('http://localhost:3001/api/ai/generate', testCase);
        console.log('✅ Response received:', response.data.message);
        console.log('📝 Generated content preview:', response.data.data.response.substring(0, 150) + '...');
        console.log('');
      } catch (error) {
        console.log('❌ Error:', error.response?.data?.error || error.message);
        console.log('');
      }
      
      // Add small delay between requests
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log('🎉 All tests completed!');
    
  } catch (error) {
    console.error('🚨 Test suite failed:', error.message);
  }
}

testRealGeminiAPI();