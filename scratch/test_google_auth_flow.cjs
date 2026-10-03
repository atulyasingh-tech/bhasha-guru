const fs = require('fs');
const path = require('path');

// 1. Verify firebaseAuthService.js contents
const authServicePath = path.join(__dirname, '..', 'src', 'services', 'firebaseAuthService.js');
const authServiceCode = fs.readFileSync(authServicePath, 'utf8');

console.log('--- Verifying firebaseAuthService.js ---');
console.log('1. Instantiates GoogleAuthProvider:', authServiceCode.includes('new GoogleAuthProvider()') || authServiceCode.includes('getGoogleAuthProvider'));
console.log('2. Uses signInWithPopup:', authServiceCode.includes('signInWithPopup(auth, provider)'));
console.log('3. Fallback to signInWithRedirect when blocked:', authServiceCode.includes('signInWithRedirect(auth, provider)') && authServiceCode.includes('auth/popup-blocked'));
console.log('4. Handles popup cancellation without error lock:', authServiceCode.includes('auth/popup-closed-by-user') && authServiceCode.includes('cancelled: true'));
console.log('5. Extracts user profile (displayName, email, photoURL, initials):', authServiceCode.includes('formatAuthUser') && authServiceCode.includes('initials'));
console.log('6. Provides loginGoogleFallback:', typeof authServiceCode.includes('loginGoogleFallback') === 'boolean' && authServiceCode.includes('loginGoogleFallback'));
console.log('7. Checks getRedirectResult:', authServiceCode.includes('getRedirectResult(auth)'));

// 2. Verify AuthModal.jsx contents
const authModalPath = path.join(__dirname, '..', 'src', 'components', 'AuthModal.jsx');
const authModalCode = fs.readFileSync(authModalPath, 'utf8');

console.log('\n--- Verifying AuthModal.jsx ---');
console.log('1. Imports loginGoogleFallback:', authModalCode.includes('loginGoogleFallback'));
console.log('2. Google Account picker state present:', authModalCode.includes('showGooglePicker') && authModalCode.includes('setShowGooglePicker'));
console.log('3. Gracefully handles cancellation without locking error state:', authModalCode.includes('res.cancelled'));
console.log('4. Triggers Google Account picker on fallback/unauthorized domain:', authModalCode.includes('setShowGooglePicker(true)') && authModalCode.includes('auth/unauthorized-domain'));
console.log('5. Realistic Google Account picker UI rendered:', authModalCode.includes('Choose an account') && authModalCode.includes('google-picker-card'));
console.log('6. Has Google profile account choices:', authModalCode.includes('Student Scholar') && authModalCode.includes('student.scholar@gmail.com'));
console.log('7. Has "Use another Google account" option:', authModalCode.includes('Use another Google account'));
console.log('8. Signs in directly into personalized workspace on account selection:', authModalCode.includes('onLoginSuccess(res.user,') && authModalCode.includes('onboarded: true'));
console.log('9. Preserves existing demo student personas:', authModalCode.includes('Arjun Sharma') && authModalCode.includes('Priya Patel'));
console.log('10. Preserves existing styles, classes, and friendly notice fallback:', authModalCode.includes("Google sign-in isn't available right now. You can continue as a demo student below."));

console.log('\n--- ALL VERIFICATIONS COMPLETE ---');
