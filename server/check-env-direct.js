import { config } from 'dotenv';
import { join } from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from the .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');
config({ path: join(__dirname, '..', '.env') });

console.log('Environment Check:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('Gemini API Key configured:', !!process.env.GEMINI_API_KEY);
console.log('API Key length:', process.env.GEMINI_API_KEY?.length || 0);
console.log('First 10 chars:', process.env.GEMINI_API_KEY?.substring(0, 10) + '...');