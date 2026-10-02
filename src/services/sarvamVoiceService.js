// Sarvam AI Bulbul V3 Voice Integration for BhashaGuru
// Natural Indic Text-to-Speech (Hindi, Telugu, and English)
// With in-memory audio caching and clean mathematical LaTeX speech normalization

import { getSarvamKey } from './storageService.js';

// Cache generated base64 audio to avoid re-consuming character quota
const audioCache = new Map();

// Active Audio element tracker for global playback control
let currentAudioElement = null;
let currentOnEndCallback = null;

/**
 * Normalizes raw STEM text, stripping LaTeX syntax and symbols
 * so the neural voice model pronounces concepts cleanly.
 */
export function cleanTextForSpeech(rawText) {
  if (!rawText || typeof rawText !== 'string') return '';

  return rawText
    // Display and inline math delimiters
    .replace(/\$\$([\s\S]+?)\$\$/g, ' formula: $1 ')
    .replace(/\$([^\$]+?)\$/g, ' $1 ')
    // Common Greek and physics symbols
    .replace(/\\rho(?:_\{?fluid\}?)?/g, ' density ')
    .replace(/\\mathcal\{E\}/g, ' electromotive force EMF ')
    .replace(/\\Phi_B/g, ' magnetic flux ')
    .replace(/\\Delta/g, ' delta change in ')
    .replace(/\\approx/g, ' approximately ')
    .replace(/\\cdot/g, ' times ')
    .replace(/\\times/g, ' times ')
    .replace(/\\nu/g, ' frequency nu ')
    .replace(/\\lambda/g, ' wavelength lambda ')
    .replace(/\\le/g, ' less than or equal to ')
    .replace(/\\ge/g, ' greater than or equal to ')
    .replace(/\\infty/g, ' infinity ')
    .replace(/\\theta/g, ' theta ')
    .replace(/\\omega/g, ' angular frequency omega ')
    .replace(/\\pi/g, ' pi ')
    .replace(/\\sqrt\{([^}]+)\}/g, ' square root of $1 ')
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, ' $1 divided by $2 ')
    .replace(/\\text\{([^}]+)\}/g, ' $1 ')
    .replace(/\\mathbf\{([^}]+)\}/g, ' $1 ')
    .replace(/\\sum/g, ' sum of ')
    .replace(/\\int/g, ' integral of ')
    // Remove leftover backslashes and brackets
    .replace(/[{}\\_^]/g, ' ')
    // Replace multiple spaces and newlines
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 1480); // Sarvam limit safety margin (< 1500 chars)
}

/**
 * Maps BhashaGuru dialect preferences to Sarvam Bulbul V3 language codes and speakers
 */
export function getSarvamLanguageConfig(dialect) {
  switch (dialect) {
    case 'Telugu':
    case 'Tenglish':
      return { language_code: 'te-IN', speaker: 'shubh' };
    case 'Hindi':
    case 'Hinglish':
      return { language_code: 'hi-IN', speaker: 'shubh' };
    case 'English':
    default:
      return { language_code: 'en-IN', speaker: 'shubh' };
  }
}

/**
 * Calls Sarvam AI Text-to-Speech API (model: bulbul:v3)
 * Returns audio data URL string: 'data:audio/wav;base64,...'
 */
export async function synthesizeSpeechWithSarvam({
  text,
  dialect = 'English',
  pace = 1.0
}) {
  const cleaned = cleanTextForSpeech(text);
  if (!cleaned) {
    throw new Error('No readable text provided for speech synthesis');
  }

  const { language_code, speaker } = getSarvamLanguageConfig(dialect);
  const cacheKey = `${language_code}_${speaker}_${pace}_${cleaned}`;

  // Check cache first
  if (audioCache.has(cacheKey)) {
    return audioCache.get(cacheKey);
  }

  const apiKey = getSarvamKey();
  if (!apiKey) {
    throw new Error('Sarvam AI subscription key is missing');
  }

  const response = await fetch('https://api.sarvam.ai/text-to-speech', {
    method: 'POST',
    headers: {
      'api-subscription-key': apiKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: cleaned,
      language_code,
      speaker,
      model: 'bulbul:v3',
      pace: parseFloat(pace) || 1.0
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData.message || errorData.detail || `Sarvam API error: HTTP ${response.status}`;
    throw new Error(message);
  }

  const data = await response.json();
  const base64Audio = data.audios?.[0];

  if (!base64Audio) {
    throw new Error('No audio returned from Sarvam AI');
  }

  const dataUrl = `data:audio/wav;base64,${base64Audio}`;
  audioCache.set(cacheKey, dataUrl);
  return dataUrl;
}

/**
 * Global audio player manager for Sarvam audio
 */
export function playSarvamAudioUrl(dataUrl, onEnd, onError) {
  stopSarvamPlayback();

  try {
    const audio = new Audio(dataUrl);
    currentAudioElement = audio;
    currentOnEndCallback = onEnd;

    audio.onended = () => {
      currentAudioElement = null;
      if (onEnd) onEnd();
    };

    audio.onerror = (e) => {
      console.warn('Audio playback error:', e);
      currentAudioElement = null;
      if (onError) onError(e);
    };

    audio.play().catch(err => {
      console.warn('Audio play was interrupted or blocked:', err);
      currentAudioElement = null;
      if (onError) onError(err);
    });

    return audio;
  } catch (err) {
    if (onError) onError(err);
    return null;
  }
}

/**
 * Stop any ongoing Sarvam speech audio
 */
export function stopSarvamPlayback() {
  if (currentAudioElement) {
    try {
      currentAudioElement.pause();
      currentAudioElement.currentTime = 0;
    } catch (e) {}
    currentAudioElement = null;
  }

  // Also stop Web Speech API in case it was used as fallback
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }

  if (currentOnEndCallback) {
    currentOnEndCallback();
    currentOnEndCallback = null;
  }
}

/**
 * Pause current audio
 */
export function pauseSarvamPlayback() {
  if (currentAudioElement) {
    currentAudioElement.pause();
  }
}

/**
 * Resume paused audio
 */
export function resumeSarvamPlayback() {
  if (currentAudioElement) {
    currentAudioElement.play().catch(() => {});
  }
}

/**
 * Check if audio is currently playing
 */
export function isSarvamPlaying() {
  return Boolean(currentAudioElement && !currentAudioElement.paused);
}
