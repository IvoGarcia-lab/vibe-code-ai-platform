import { serverConfig } from './dist/config/environment.js';

console.log('Environment Check:');
console.log('NODE_ENV:', serverConfig.nodeEnv);
console.log('Gemini API Key configured:', !!serverConfig.geminiApiKey);
console.log('API Key length:', serverConfig.geminiApiKey?.length || 0);
console.log('First 10 chars:', serverConfig.geminiApiKey?.substring(0, 10) + '...');