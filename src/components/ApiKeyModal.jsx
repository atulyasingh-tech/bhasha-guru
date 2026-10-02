// Gemini & Sarvam AI API Key Configuration Modal
// Manages AI Studio and Sarvam Bulbul V3 keys, status, and verification

import React, { useState } from 'react';
import { 
  Key, Sparkles, CheckCircle2, AlertCircle, 
  ExternalLink, X, Zap, RefreshCw, ShieldCheck, Volume2 
} from 'lucide-react';
import { 
  getGeminiKey, saveGeminiKey, hasEnvGeminiKey,
  getSarvamKey, saveSarvamKey, DEFAULT_SARVAM_KEY 
} from '../services/storageService';
import { testGeminiConnection } from '../services/geminiService';
import { synthesizeSpeechWithSarvam, playSarvamAudioUrl } from '../services/sarvamVoiceService';

export default function ApiKeyModal({
  isOpen,
  onClose,
  onKeyUpdated
}) {
  const [apiKey, setApiKey] = useState(getGeminiKey());
  const [sarvamKey, setSarvamKey] = useState(getSarvamKey());
  const [statusMsg, setStatusMsg] = useState('');
  const [statusType, setStatusType] = useState('success'); // 'success' | 'error' | 'info'
  const [isTestingGemini, setIsTestingGemini] = useState(false);
  const [isTestingSarvam, setIsTestingSarvam] = useState(false);
  const isEnvConfigured = hasEnvGeminiKey();

  if (!isOpen) return null;

  const handleTestGemini = async () => {
    const keyToTest = apiKey.trim() || (isEnvConfigured ? import.meta.env.VITE_GEMINI_API_KEY : '');
    if (!keyToTest) {
      setStatusType('error');
      setStatusMsg('Please enter or paste a Gemini API key before testing connection.');
      return;
    }

    setIsTestingGemini(true);
    setStatusMsg('');

    try {
      const res = await testGeminiConnection(keyToTest);
      if (res.success) {
        setStatusType('success');
        setStatusMsg(res.message);
      } else {
        setStatusType('error');
        setStatusMsg(res.message);
      }
    } catch (e) {
      setStatusType('error');
      setStatusMsg(`Gemini test error: ${e.message}`);
    } finally {
      setIsTestingGemini(false);
    }
  };

  const handleTestSarvam = async () => {
    const keyToTest = sarvamKey.trim() || DEFAULT_SARVAM_KEY;
    setIsTestingSarvam(true);
    setStatusMsg('');

    try {
      saveSarvamKey(keyToTest);
      const audioUrl = await synthesizeSpeechWithSarvam({
        text: 'Namaste! Sarvam AI Bulbul V3 voice test successful.',
        dialect: 'English',
        pace: 1.0
      });
      playSarvamAudioUrl(audioUrl);
      setStatusType('success');
      setStatusMsg('Sarvam AI Voice Connected! Playing sample audio...');
    } catch (e) {
      setStatusType('error');
      setStatusMsg(`Sarvam Voice test error: ${e.message}`);
    } finally {
      setIsTestingSarvam(false);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const trimmedGemini = apiKey.trim();
    const trimmedSarvam = sarvamKey.trim() || DEFAULT_SARVAM_KEY;
    saveGeminiKey(trimmedGemini);
    saveSarvamKey(trimmedSarvam);
    setStatusType('success');
    setStatusMsg('Settings saved successfully! Gemini 2.5 Flash and Sarvam Voice active.');
    if (onKeyUpdated) onKeyUpdated(trimmedGemini);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const handleClearGemini = () => {
    saveGeminiKey('');
    setApiKey('');
    setStatusType('info');
    setStatusMsg('Gemini API Key cleared. App switched to Preloaded Offline Curriculum mode.');
    if (onKeyUpdated) onKeyUpdated('');
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container api-key-modal glass-panel animate-scale-up">
        <div className="modal-header">
          <div className="modal-title-wrap">
            <div className="icon-badge glow-gold">
              <Key size={22} className="text-gold" />
            </div>
            <div>
              <h2 className="modal-title">AI Engine & Voice Settings</h2>
              <p className="modal-subtitle">Configure Live Gemini 2.5 Flash & Sarvam Bulbul V3 Voice</p>
            </div>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSave} className="modal-body space-y-4">
          {/* Environment Key Notice */}
          {isEnvConfigured && (
            <div className="env-detected-card glass-panel flex-row items-center gap-2 p-3">
              <ShieldCheck size={18} className="text-emerald flex-shrink-0" />
              <div className="text-xs">
                <span className="font-semibold text-emerald">Environment Key Detected: </span>
                <span>An API key was automatically detected from <code>VITE_GEMINI_API_KEY</code>. You can use it as-is or override it below.</span>
              </div>
            </div>
          )}

          {/* 1. Gemini AI Section */}
          <div className="form-group">
            <label className="form-label" htmlFor="gemini-key-input">
              Google AI Studio API Key (For Custom STEM Doubts & 2-Way Chat):
            </label>
            <div className="api-input-wrap">
              <input
                id="gemini-key-input"
                type="password"
                className="form-input"
                placeholder="AIzaSy..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <button
                type="button"
                className="test-key-btn glass-panel"
                onClick={handleTestGemini}
                disabled={isTestingGemini}
                title="Test if this API key is active and responding"
              >
                {isTestingGemini ? (
                  <span className="flex-row items-center gap-1 text-xs text-cyan">
                    <RefreshCw size={12} className="animate-spin" /> Testing...
                  </span>
                ) : (
                  <span className="flex-row items-center gap-1 text-xs text-gold">
                    <Zap size={12} /> Test Ping
                  </span>
                )}
              </button>
            </div>
            <div className="flex-between items-center text-xs text-muted mt-1">
              <a 
                href="https://aistudio.google.com/app/apikey" 
                target="_blank" 
                rel="noopener noreferrer"
                className="link-highlight flex-row items-center gap-1"
              >
                Get a free key from Google AI Studio <ExternalLink size={11} />
              </a>
              {apiKey && (
                <button
                  type="button"
                  className="text-red hover:underline text-xs"
                  onClick={handleClearGemini}
                >
                  Clear Key (Demo Mode)
                </button>
              )}
            </div>
          </div>

          {/* 2. Sarvam AI Voice Section */}
          <div className="form-group pt-2 border-t border-glass">
            <div className="flex-row items-center justify-between mb-1">
              <label className="form-label mb-0" htmlFor="sarvam-key-input">
                Sarvam AI Voice Key (Bulbul V3 Indic TTS):
              </label>
              <span className="text-xs text-cyan font-semibold flex-row items-center gap-1">
                <Volume2 size={12} /> Natural Telugu, Hindi & English
              </span>
            </div>
            <div className="api-input-wrap">
              <input
                id="sarvam-key-input"
                type="password"
                className="form-input"
                placeholder="sk_817l..."
                value={sarvamKey}
                onChange={(e) => setSarvamKey(e.target.value)}
              />
              <button
                type="button"
                className="test-key-btn glass-panel"
                onClick={handleTestSarvam}
                disabled={isTestingSarvam}
                title="Test Sarvam speech synthesis audio playback"
              >
                {isTestingSarvam ? (
                  <span className="flex-row items-center gap-1 text-xs text-cyan">
                    <RefreshCw size={12} className="animate-spin" /> Speaking...
                  </span>
                ) : (
                  <span className="flex-row items-center gap-1 text-xs text-emerald">
                    <Volume2 size={12} /> Test Voice
                  </span>
                )}
              </button>
            </div>
            <span className="form-hint">
              Default active key: <code>sk_817l98xx...</code>. Pre-configured for seamless natural narration.
            </span>
          </div>

          {statusMsg && (
            <div className={`status-toast ${statusType} animate-fade-in flex-row items-center gap-2`}>
              {statusType === 'success' && <CheckCircle2 size={16} className="text-green flex-shrink-0" />}
              {statusType === 'error' && <AlertCircle size={16} className="text-red flex-shrink-0" />}
              {statusType === 'info' && <Sparkles size={16} className="text-cyan flex-shrink-0" />}
              <span className="text-xs">{statusMsg}</span>
            </div>
          )}

          <div className="modal-footer pt-3">
            <button type="button" className="secondary-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="primary-btn btn-glow">
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
