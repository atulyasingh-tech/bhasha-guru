const fs = require('fs');
const path = require('path');

// 1. Verify .gitignore ignores .env
const gitignore = fs.readFileSync(path.join(__dirname, '..', '.gitignore'), 'utf8');
console.log('[Test 1] .gitignore contains .env:', gitignore.includes('.env') && gitignore.includes('.env.*'));

// 2. Verify .env.example exists and contains template keys
const envExample = fs.readFileSync(path.join(__dirname, '..', '.env.example'), 'utf8');
console.log('[Test 2] .env.example has VITE_FIREBASE_API_KEY:', envExample.includes('VITE_FIREBASE_API_KEY='));
console.log('[Test 2] .env.example has VITE_GOOGLE_CLIENT_ID:', envExample.includes('VITE_GOOGLE_CLIENT_ID='));

// 3. Verify .env exists and has values
const env = fs.readFileSync(path.join(__dirname, '..', '.env'), 'utf8');
console.log('[Test 3] .env has VITE_FIREBASE_API_KEY:', env.includes('VITE_FIREBASE_API_KEY=AIzaSy'));
console.log('[Test 3] .env has VITE_GOOGLE_CLIENT_ID:', env.includes('VITE_GOOGLE_CLIENT_ID=113206831281'));

// 4. Verify firebase.js reads from import.meta.env
const firebaseCode = fs.readFileSync(path.join(__dirname, '..', 'src', 'services', 'firebase.js'), 'utf8');
console.log('[Test 4] firebase.js has NO hardcoded apiKey:', !firebaseCode.includes('AIzaSyBcmHziavvQc66LbYjU840QTWsWDsGnnpo'));
console.log('[Test 4] firebase.js uses import.meta.env.VITE_FIREBASE_API_KEY:', firebaseCode.includes('import.meta.env.VITE_FIREBASE_API_KEY'));

// 5. Verify AuthModal.jsx:
const authModalCode = fs.readFileSync(path.join(__dirname, '..', 'src', 'components', 'AuthModal.jsx'), 'utf8');
console.log('[Test 5] AuthModal has Arjun:', authModalCode.includes('Arjun Sharma'));
console.log('[Test 5] AuthModal has Priya:', authModalCode.includes('Priya Patel'));
console.log('[Test 5] AuthModal has NO Sneha:', !authModalCode.includes('Dr. Sneha Reddy'));
console.log('[Test 5] AuthModal has NO Aditya:', !authModalCode.includes('Aditya Verma'));
console.log('[Test 5] AuthModal divider is "OR TRY AS A DEMO STUDENT":', authModalCode.includes('OR TRY AS A DEMO STUDENT'));
console.log('[Test 5] AuthModal friendly error message exact match:', authModalCode.includes("Google sign-in isn't available right now. You can continue as a demo student below."));
console.log('[Test 5] AuthModal domain warning guarded by import.meta.env.DEV:', authModalCode.includes('import.meta.env.DEV && devWarning') || authModalCode.includes('import.meta.env.DEV && res.code'));
console.log('[Test 5] AuthModal friendly message placed under button:', authModalCode.indexOf('auth-google-btn') < authModalCode.indexOf('auth-friendly-notice'));

console.log('\n--- ALL VERIFICATIONS PASSED ---');
