import axios from 'axios';

async function testFrontendAPI() {
  console.log('🧪 Testing Frontend API Integration with Real Gemini...\n');
  
  try {
    // Test different creative categories through the frontend API
    const testCases = [
      { prompt: 'Write a creative story about a robot learning to paint', category: 'writing' },
      { prompt: 'Design a modern website for a creative agency', category: 'design' },
      { prompt: 'Create a JavaScript function to animate elements', category: 'code' }
    ];

    for (const [index, testCase] of testCases.entries()) {
      console.log(`Test ${index + 1}: ${testCase.category}`);
      console.log(`Prompt: ${testCase.prompt}`);
      
      try {
        const response = await axios.post('http://localhost:3001/api/ai/generate', testCase);
        console.log('✅ Response received:', response.data.message);
        console.log('📝 AI Response:', response.data.data.response.substring(0, 200) + '...');
        console.log('');
      } catch (error) {
        console.log('❌ Error:', error.response?.data?.error || error.message);
        console.log('');
      }
      
      // Add small delay between requests
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    console.log('🎉 Frontend API integration test completed!');
    
  } catch (error) {
    console.error('🚨 Test suite failed:', error.message);
  }
}

testFrontendAPI();