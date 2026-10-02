// LocalStorage State Persistence for BhashaGuru
// Multi-Track Onboarding Schema for Class 11, Class 12, and B.Tech

const PROFILE_KEY = 'bhashaguru_student_profile';
const XP_KEY = 'bhashaguru_student_xp';
const HISTORY_KEY = 'bhashaguru_doubt_vault';
const MASTERED_ITEMS_KEY = 'bhashaguru_mastered_items';
const GEMINI_KEY = 'bhashaguru_gemini_key';
const SARVAM_KEY = 'bhashaguru_sarvam_key';
const THEME_KEY = 'bhashaguru_theme';
const STAGE_KEY = 'bhashaguru_current_stage'; // 1 (Landing), 2 (Onboarding), 3 (Chat/Workspace)

export const DEFAULT_SARVAM_KEY = 'sk_817l98xx_sLaUpXJhvrCwv5IRPKbYRGWl';
const WELCOME_REWARD_SEEN_KEY = 'bhashaguru_welcome_reward_seen';

export const DEFAULT_PROFILE = {
  name: '',
  username: '',
  educationLevel: 'Class 11', // 'Class 11' | 'Class 12' | 'Diploma' | 'Pharmacy' | 'B.Tech'
  stream: 'MPC',              // 'MPC' | 'BiPC' (For Class 11 & 12)
  branch: 'Mechanical',       // For Diploma (Mech, Civil, EEE, ECE, Comp) or B.Tech (CSE, ECE, EEE, Mech, Civil, AI/DS)
  specialization: 'Pharmaceutics', // For Pharmacy (Pharmaceutics, Pharmacology, Pharmaceutical Chemistry, Pharmacognosy)
  btechYear: '1st Year',      // '1st Year' | '2nd Year' | '3rd Year' | '4th Year' (For B.Tech)
  scoreType: 'percentage',    // 'percentage' | 'cgpa' | 'marks470' | 'marks600' | 'marks1000'
  score: 80,                  // raw input
  totalScale: 100,            // 100, 470, 10, etc.
  calculatedPercentage: 80,   // normalized 0 - 100
  tier: 'Intermediate',       // 'Foundation' | 'Intermediate' | 'Advanced'
  language: 'English',        // 'English' | 'Hindi' | 'Telugu' | 'Hinglish' | 'Tenglish'
  avatarId: 'einstein',       // 'einstein' | 'hypatia' | 'ramanujan' | 'curie' | 'astronaut' | 'atom' | 'robot' | 'neural' | 'custom'
  customAvatarUrl: null,
  selectedSubject: 'Physics',
  soundEnabled: true,
  onboarded: false
};

export function getSubjectsForTrack(educationLevel = 'Class 11', stream = 'MPC', branch = 'CSE', specialization = 'Pharmaceutics') {
  if (educationLevel === 'B.Tech') {
    return [
      { id: 'eng_physics', name: 'Engineering Physics', icon: 'Atom', sampleTopic: "Schrödinger Wave Equation & Quantum Wells" },
      { id: 'circuit_theory', name: 'Circuit Theory', icon: 'Cpu', sampleTopic: "Kirchhoff's Laws & Thevenin's Theorem" },
      { id: 'dsa', name: 'Data Structures & Algorithms', icon: 'Code2', sampleTopic: "Binary Search Trees & Time Complexity" },
      { id: 'mechanics', name: 'Engineering Mechanics', icon: 'Cog', sampleTopic: "Stress-Strain Tensors & Mohr's Circle" },
      { id: 'eng_maths', name: 'Engineering Maths', icon: 'Infinity', sampleTopic: "Eigenvalues, Eigenvectors & Cayley-Hamilton" }
    ];
  }

  if (educationLevel === 'Pharmacy') {
    return [
      { id: 'pharmaceutics', name: 'Pharmaceutics', icon: 'FlaskConical', sampleTopic: "Biopharmaceutics & Drug Absorption Kinetics" },
      { id: 'pharmacology', name: 'Pharmacology', icon: 'Dna', sampleTopic: "Mechanism of Action & Receptor Agonists" },
      { id: 'pharm_chem', name: 'Pharmaceutical Chemistry', icon: 'FlaskConical', sampleTopic: "Stereochemistry & Structure-Activity Relationship" },
      { id: 'pharmacognosy', name: 'Pharmacognosy', icon: 'Dna', sampleTopic: "Plant Alkaloids & Secondary Metabolites" }
    ];
  }

  if (educationLevel === 'Diploma') {
    return [
      { id: 'app_physics', name: 'Applied Physics', icon: 'Atom', sampleTopic: "Thermodynamics & Heat Transfer" },
      { id: 'app_chemistry', name: 'Applied Chemistry', icon: 'FlaskConical', sampleTopic: "Electrochemistry & Corrosion Control" },
      { id: 'app_maths', name: 'Applied Mathematics', icon: 'Infinity', sampleTopic: "Differential Equations & Matrices" },
      { id: 'eng_drawing', name: 'Engineering Mechanics', icon: 'Cog', sampleTopic: "Friction & Force Resolution" }
    ];
  }

  if (stream === 'BiPC') {
    return [
      { id: 'physics', name: 'Physics', icon: 'Atom', sampleTopic: "Archimedes' Principle & Buoyancy" },
      { id: 'chemistry', name: 'Chemistry', icon: 'FlaskConical', sampleTopic: "Chemical Equilibrium & Le Chatelier" },
      { id: 'biology', name: 'Biology', icon: 'Dna', sampleTopic: "Cellular Respiration & ATP Synthase" }
    ];
  }

  // Default MPC (Class 11 & Class 12)
  return [
    { id: 'physics', name: 'Physics', icon: 'Atom', sampleTopic: "Archimedes' Principle & Buoyancy" },
    { id: 'chemistry', name: 'Chemistry', icon: 'FlaskConical', sampleTopic: "Chemical Equilibrium & Le Chatelier" },
    { id: 'mathematics', name: 'Mathematics', icon: 'Infinity', sampleTopic: "Definite Integrals & Areas under Curves" }
  ];
}

export function calculateNormalizedPercentage(score, scoreType, totalScale = 100) {
  const num = parseFloat(score) || 0;
  if (scoreType === 'cgpa') {
    // 10-point scale: score out of 10 -> (score / 10) * 100
    return Math.min(100, Math.max(0, num * 10));
  }
  if (scoreType === 'percentage') {
    return Math.min(100, Math.max(0, num));
  }
  if (scoreType === 'marks470') {
    // Intermediate 1st Year (IPE) scale out of 470
    return Math.min(100, Math.max(0, (num / 470) * 100));
  }
  if (scoreType === 'marks600') {
    return Math.min(100, Math.max(0, (num / 600) * 100));
  }
  if (scoreType === 'marks1000') {
    return Math.min(100, Math.max(0, (num / 1000) * 100));
  }
  // Generic marks out of custom total scale
  const scale = parseFloat(totalScale) || 100;
  return Math.min(100, Math.max(0, (num / scale) * 100));
}

export function calculatePedagogyTierFromPercent(percentage) {
  if (percentage < 60) {
    return 'Foundation';
  } else if (percentage <= 80) {
    return 'Intermediate';
  } else {
    return 'Advanced';
  }
}

// Backwards compatibility alias
export function calculatePedagogyTier(score, totalScale = 100) {
  const pct = (parseFloat(score) / parseFloat(totalScale)) * 100;
  return calculatePedagogyTierFromPercent(pct);
}

export function hasSeenWelcomeReward() {
  try {
    return localStorage.getItem(WELCOME_REWARD_SEEN_KEY) === 'true';
  } catch (e) {
    return false;
  }
}

export function markWelcomeRewardSeen() {
  try {
    localStorage.setItem(WELCOME_REWARD_SEEN_KEY, 'true');
  } catch (e) {}
}

export function getProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return DEFAULT_PROFILE;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_PROFILE, ...parsed };
  } catch (e) {
    return DEFAULT_PROFILE;
  }
}

export function saveProfile(profile) {
  try {
    const calculatedPercentage = calculateNormalizedPercentage(profile.score, profile.scoreType, profile.totalScale);
    const tier = calculatePedagogyTierFromPercent(calculatedPercentage);
    const updated = { 
      ...profile, 
      calculatedPercentage: Math.round(calculatedPercentage * 10) / 10,
      tier 
    };
    localStorage.setItem(PROFILE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to save profile', e);
    return profile;
  }
}

export function getCurrentStage() {
  try {
    const stage = localStorage.getItem(STAGE_KEY);
    return stage ? parseInt(stage, 10) : 1; // Default to Stage 1 (Landing)
  } catch (e) {
    return 1;
  }
}

export function saveCurrentStage(stageNumber) {
  try {
    localStorage.setItem(STAGE_KEY, stageNumber.toString());
    return stageNumber;
  } catch (e) {
    return stageNumber;
  }
}

export function getXp() {
  try {
    const val = localStorage.getItem(XP_KEY);
    return val ? parseInt(val, 10) : 20; // Default 20 Welcome XP awarded!
  } catch (e) {
    return 20;
  }
}

export function saveXp(newXp) {
  try {
    localStorage.setItem(XP_KEY, newXp.toString());
    return newXp;
  } catch (e) {
    return newXp;
  }
}

export function purgeLegacyStorageResidue() {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') return;
  try {
    // 1. Remove any legacy 'archimedes' key variants directly from localStorage
    const toRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.toLowerCase().includes('archimedes') || key.toLowerCase() === 'archimedes_vault')) {
        toRemove.push(key);
      }
    }
    toRemove.forEach(k => localStorage.removeItem(k));

    // 2. Clean out legacy dummy entries from Doubt Vault
    const rawVault = localStorage.getItem(HISTORY_KEY);
    if (rawVault) {
      try {
        const parsed = JSON.parse(rawVault);
        if (Array.isArray(parsed)) {
          // Filter out dummy seed items: 'hist-1', 'hist-2', 'hist-3' or anything containing archimedes
          const cleaned = parsed.filter(item => 
            !['hist-1', 'hist-2', 'hist-3'].includes(item.id) &&
            !(item.topic && item.topic.toLowerCase().includes('archimedes') && item.bestQuizScore === '3/3')
          );
          localStorage.setItem(HISTORY_KEY, JSON.stringify(cleaned));
        }
      } catch (e) {
        localStorage.removeItem(HISTORY_KEY);
      }
    }

    // 3. Clean out legacy dummy entries from Mastered Items
    const rawMastered = localStorage.getItem(MASTERED_ITEMS_KEY);
    if (rawMastered) {
      try {
        const parsed = JSON.parse(rawMastered);
        let modified = false;
        for (const key of Object.keys(parsed)) {
          if (key.toLowerCase().includes('archimedes') || key.toLowerCase().includes("lenz's law")) {
            delete parsed[key];
            modified = true;
          }
        }
        if (modified) {
          localStorage.setItem(MASTERED_ITEMS_KEY, JSON.stringify(parsed));
        }
      } catch (e) {
        localStorage.removeItem(MASTERED_ITEMS_KEY);
      }
    }

    // 4. Reset legacy 'Arjun Reddy' placeholder profile to clean empty profile
    const rawProf = localStorage.getItem(PROFILE_KEY);
    if (rawProf) {
      try {
        const parsed = JSON.parse(rawProf);
        if (parsed.name === 'Arjun Reddy' || parsed.username === 'arjun_stem') {
          parsed.name = '';
          parsed.username = '';
          parsed.onboarded = false;
          localStorage.setItem(PROFILE_KEY, JSON.stringify(parsed));
        }
      } catch (e) {}
    }
  } catch (e) {
    console.warn('Storage migration notice:', e);
  }
}

// Execute migration once on module evaluation
purgeLegacyStorageResidue();

export function getMasteredItems() {
  try {
    const raw = localStorage.getItem(MASTERED_ITEMS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

export function saveMasteredItem(topic, layerKey) {
  try {
    const current = getMasteredItems();
    if (!current[topic]) {
      current[topic] = {};
    }
    current[topic][layerKey] = true;
    localStorage.setItem(MASTERED_ITEMS_KEY, JSON.stringify(current));
    return current;
  } catch (e) {
    return {};
  }
}

export function getDoubtVaultHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) {
      return [];
    }
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

export function addDoubtVaultEntry(entry) {
  try {
    const history = getDoubtVaultHistory();
    const existingIndex = history.findIndex(h => h.topic.toLowerCase() === entry.topic.toLowerCase());
    let updated;
    if (existingIndex >= 0) {
      updated = [
        { ...history[existingIndex], ...entry, timestamp: new Date().toISOString() },
        ...history.filter((_, idx) => idx !== existingIndex)
      ];
    } else {
      updated = [
        {
          id: 'hist-' + Date.now(),
          timestamp: new Date().toISOString(),
          quizzed: false,
          bestQuizScore: null,
          ...entry
        },
        ...history
      ];
    }
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated.slice(0, 30)));
    return updated;
  } catch (e) {
    console.error('Failed to add doubt vault entry', e);
    return [];
  }
}

export function updateDoubtVaultQuizScore(topic, scoreText) {
  try {
    const history = getDoubtVaultHistory();
    const updated = history.map(item => {
      if (item.topic.toLowerCase() === topic.toLowerCase()) {
        return { ...item, quizzed: true, bestQuizScore: scoreText };
      }
      return item;
    });
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return [];
  }
}

export function getGeminiKey() {
  try {
    const stored = localStorage.getItem(GEMINI_KEY);
    if (stored && stored.trim()) return stored.trim();
    return (import.meta.env.VITE_GEMINI_API_KEY || '').trim();
  } catch (e) {
    return '';
  }
}

export function hasEnvGeminiKey() {
  try {
    return Boolean(import.meta.env.VITE_GEMINI_API_KEY && import.meta.env.VITE_GEMINI_API_KEY.trim());
  } catch (e) {
    return false;
  }
}

export function saveGeminiKey(key) {
  try {
    localStorage.setItem(GEMINI_KEY, (key || '').trim());
  } catch (e) {
    console.error('Failed to save API key', e);
  }
}

export function getSarvamKey() {
  try {
    const stored = localStorage.getItem(SARVAM_KEY);
    if (stored && stored.trim()) return stored.trim();
    return (import.meta.env.VITE_SARVAM_API_KEY || DEFAULT_SARVAM_KEY).trim();
  } catch (e) {
    return DEFAULT_SARVAM_KEY;
  }
}

export function saveSarvamKey(key) {
  try {
    localStorage.setItem(SARVAM_KEY, (key || '').trim());
  } catch (e) {
    console.error('Failed to save Sarvam key', e);
  }
}

export function getSavedTheme() {
  try {
    return localStorage.getItem(THEME_KEY) || 'dark';
  } catch (e) {
    return 'dark';
  }
}

export function saveTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {
    console.error('Failed to save theme', e);
  }
}
