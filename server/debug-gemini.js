import axios from 'axios';

async function debugGeminiAPI() {
  console.log('🔍 Debugging Gemini API Integration...\n');
  
  try {
    const response = await axios.post('http://localhost:3001/api/ai/generate', {
      prompt: 'Write a haiku about coding',
      category: 'writing'
    });
    
    console.log('✅ Success Response:');
    console.log(JSON.stringify(response.data, null, 2));
    
  } catch (error) {
    console.log('❌ Error Details:');
    console.log('Status:', error.response?.status);
    console.log('Status Text:', error.response?.statusText);
    console.log('Error Data:', error.response?.data);
    console.log('Full Error:', error.message);
    
    if (error.response?.data?.error) {
      console.log('\n🚨 Server Error Message:', error.response.data.error);
    }
  }
}

debugGeminiAPI();