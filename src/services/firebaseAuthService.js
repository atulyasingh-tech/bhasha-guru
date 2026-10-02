import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { auth, googleProvider } from "./firebase";

const AUTH_USER_KEY = 'bhashaguru_auth_user';

/**
 * Retrieve any locally persisted active student/demo auth user
 */
export function getStoredAuthUser() {
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

/**
 * Sign in user using Firebase Google Auth Popup
 */
export async function loginWithGoogle() {
  try {
    googleProvider.setCustomParameters({ prompt: 'select_account' });
    const result = await signInWithPopup(auth, googleProvider);
    const user = {
      uid: result.user.uid,
      displayName: result.user.displayName,
      email: result.user.email,
      photoURL: result.user.photoURL,
      provider: 'google'
    };
    try {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    } catch (e) {}
    window.dispatchEvent(new CustomEvent('bhashaguru_auth_changed', { detail: { user } }));
    return {
      success: true,
      user
    };
  } catch (error) {
    console.error("Firebase Google Sign-In Error:", error);
    return {
      success: false,
      code: error.code,
      error: error.message || "Failed to sign in with Google"
    };
  }
}

/**
 * Instant Student Access / Demo Persona Sign-In
 * Guarantees 100% working sign-in anywhere without requiring Google OAuth domain whitelisting
 */
export function loginStudentDemo(studentData = {}) {
  const name = studentData.name || 'Arjun Sharma';
  const demoUser = {
    uid: 'student_' + Math.random().toString(36).substring(2, 9),
    displayName: name,
    email: studentData.email || `${name.toLowerCase().replace(/[^a-z0-9]/g, '')}@bhashaguru.edu`,
    photoURL: studentData.photoURL || null,
    avatarId: studentData.avatarId || 'einstein',
    educationLevel: studentData.educationLevel || 'Class 11',
    stream: studentData.stream || 'MPC',
    branch: studentData.branch || 'Mechanical',
    specialization: studentData.specialization || 'Pharmaceutics',
    tier: studentData.tier || 'Intermediate',
    provider: 'student_instant'
  };

  try {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(demoUser));
  } catch (e) {}

  window.dispatchEvent(new CustomEvent('bhashaguru_auth_changed', { detail: { user: demoUser } }));
  return {
    success: true,
    user: demoUser
  };
}

/**
 * Sign out current user (Firebase + Local Storage)
 */
export async function logoutUser() {
  try {
    await signOut(auth);
  } catch (error) {
    console.warn("Firebase Sign-Out non-critical warning:", error);
  }
  try {
    localStorage.removeItem(AUTH_USER_KEY);
  } catch (e) {}
  window.dispatchEvent(new CustomEvent('bhashaguru_auth_changed', { detail: { user: null } }));
  return { success: true };
}

/**
 * Subscribe to Auth State Changes (Firebase + Demo Session + Local Storage)
 * @param {Function} callback (user) => void
 * @returns {Function} Unsubscribe function
 */
export function subscribeToAuthChanges(callback) {
  // 1. Initial check from localStorage immediately
  const initial = getStoredAuthUser();
  if (initial) {
    callback(initial);
  }

  // 2. Window event listener for instant local logins/logouts
  const handleLocalChange = (e) => {
    callback(e.detail?.user || null);
  };
  window.addEventListener('bhashaguru_auth_changed', handleLocalChange);

  // 3. Firebase listener
  const unsubscribeFirebase = onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      const formatted = {
        uid: firebaseUser.uid,
        displayName: firebaseUser.displayName,
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL,
        provider: 'google'
      };
      try {
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(formatted));
      } catch (e) {}
      callback(formatted);
    } else {
      // If Firebase returns null, check if we have an active demo student session
      const stored = getStoredAuthUser();
      if (stored && stored.provider === 'student_instant') {
        callback(stored);
      } else {
        try {
          localStorage.removeItem(AUTH_USER_KEY);
        } catch (e) {}
        callback(null);
      }
    }
  });

  return () => {
    window.removeEventListener('bhashaguru_auth_changed', handleLocalChange);
    unsubscribeFirebase();
  };
}
