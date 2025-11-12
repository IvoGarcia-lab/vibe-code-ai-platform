const axios = require('axios');

async function testAPI() {
  try {
    // Test health endpoint
    console.log('Testing health endpoint...');
    const healthResponse = await axios.get('http://localhost:3001/api/health');
    console.log('Health:', healthResponse.data);
    
    // Test AI generation endpoint
    console.log('\nTesting AI generation...');
    const aiResponse = await axios.post('http://localhost:3001/api/ai/generate', {
      prompt: 'Write a creative story about AI and art',
      category: 'writing'
    });
    console.log('AI Response:', aiResponse.data);
    
    // Test history endpoint
    console.log('\nTesting history endpoint...');
    const historyResponse = await axios.get('http://localhost:3001/api/ai/history');
    console.log('History:', historyResponse.data);
    
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

testAPI();