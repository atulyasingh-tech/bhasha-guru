// Authentication Modal for BhashaGuru
// Supports Google OAuth & Try as a demo student with session persistence

import React, { useState } from 'react';
import { 
  X, Sparkles, CheckCircle2, AlertCircle, ArrowRight, 
  User, ShieldCheck, Zap, GraduationCap, Cpu, FlaskConical, Atom
} from 'lucide-react';
import AvatarDisplay from './AvatarDisplay';
import { loginWithGoogle, loginStudentDemo } from '../services/firebaseAuthService';
import { soundService } from '../services/soundService';

const PRESET_STUDENT_PERSONAS = [
  {
    id: 'arjun',
    name: 'Arjun Sharma',
    avatarId: 'einstein',
    educationLevel: 'Class 11',
    stream: 'MPC',
    branch: 'Mechanical',
    specialization: 'Pharmaceutics',
    tier: 'Intermediate',
    score: 78,
    calculatedPercentage: 78,
    selectedSubject: 'Physics',
    badge: 'Class 11 MPC • JEE Aspirant',
    desc: 'Targeting Physics & Math derivations with balanced intuition.',
    color: '#00F0FF'
  },
  {
    id: 'priya',
    name: 'Priya Patel',
    avatarId: 'curie',
    educationLevel: 'Class 12',
    stream: 'BiPC',
    branch: 'Mechanical',
    specialization: 'Pharmaceutics',
    tier: 'Advanced',
    score: 89,
    calculatedPercentage: 89,
    selectedSubject: 'Biology',
    badge: 'Class 12 BiPC • NEET Aspirant',
    desc: 'Focusing on molecular biology, chemical equilibria & high-rigor proofs.',
    color: '#00E599'
  }
];

export default function AuthModal({
  isOpen,
  onClose,
  onLoginSuccess
}) {
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [devWarning, setDevWarning] = useState('');
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customTrack, setCustomTrack] = useState('Class 11');
  const [customStream, setCustomStream] = useState('MPC');

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setIsLoadingGoogle(true);
    setErrorMessage('');
    setDevWarning('');
    try {
      const res = await loginWithGoogle();
      if (res.success && res.user) {
        soundService.playXpGain();
        onLoginSuccess(res.user, null);
      } else {
        // Friendly message under the button: no raw error codes shown
        setErrorMessage("Google sign-in isn't available right now. You can continue as a demo student below.");

        // Show the domain authorization pending warning ONLY when running locally (import.meta.env.DEV)
        if (import.meta.env.DEV && res.code === 'auth/unauthorized-domain') {
          setDevWarning('Google Sign-In domain authorization is pending');
        }
      }
    } catch (err) {
      setErrorMessage("Google sign-in isn't available right now. You can continue as a demo student below.");
      if (import.meta.env.DEV) {
        setDevWarning('Google Sign-In domain authorization is pending');
      }
    } finally {
      setIsLoadingGoogle(false);
    }
  };

  const handleSelectPersona = (persona) => {
    const res = loginStudentDemo({
      name: persona.name,
      avatarId: persona.avatarId,
      educationLevel: persona.educationLevel,
      stream: persona.stream,
      branch: persona.branch,
      specialization: persona.specialization,
      tier: persona.tier
    });

    if (res.success && res.user) {
      soundService.playXpGain();
      onLoginSuccess(res.user, {
        name: persona.name,
        username: persona.name.toLowerCase().replace(/[^a-z0-9]/g, '_'),
        avatarId: persona.avatarId,
        educationLevel: persona.educationLevel,
        stream: persona.stream,
        branch: persona.branch,
        specialization: persona.specialization,
        btechYear: persona.btechYear || '1st Year',
        score: persona.score,
        calculatedPercentage: persona.calculatedPercentage,
        tier: persona.tier,
        selectedSubject: persona.selectedSubject,
        onboarded: true
      });
    }
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    const trimmed = customName.trim() || 'Student Scholar';
    const res = loginStudentDemo({
      name: trimmed,
      avatarId: 'einstein',
      educationLevel: customTrack,
      stream: customStream,
      tier: 'Intermediate'
    });

    if (res.success && res.user) {
      soundService.playXpGain();
      onLoginSuccess(res.user, {
        name: trimmed,
        username: trimmed.toLowerCase().replace(/[^a-z0-9]/g, '_'),
        avatarId: 'einstein',
        educationLevel: customTrack,
        stream: customStream,
        tier: 'Intermediate',
        score: 80,
        calculatedPercentage: 80,
        onboarded: true
      });
    }
  };

  return (
    <div className="auth-modal-backdrop animate-fade-in" onClick={onClose}>
      <div 
        className="auth-modal-card glass-panel animate-scale-up"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button 
          type="button" 
          className="auth-modal-close-btn"
          onClick={onClose}
          aria-label="Close Authentication Modal"
        >
          <X size={20} />
        </button>

        {/* Modal Brand Header */}
        <div className="auth-modal-header text-center">
          <div className="auth-logo-badge">
            <img 
              src="/logo.jpeg" 
              alt="BhashaGuru Logo" 
              className="brand-img-logo auth-modal-logo"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
          <h2 className="auth-modal-title">Welcome to BhashaGuru</h2>
          <p className="auth-modal-subtitle">
            AI-Powered Adaptive STEM Pedagogy Platform
          </p>
        </div>

        {/* Primary Action: Continue with Google */}
        <div className="auth-google-section">
          <button
            type="button"
            className="auth-google-btn glass-panel"
            onClick={handleGoogleSignIn}
            disabled={isLoadingGoogle}
          >
            {isLoadingGoogle ? (
              <div className="auth-btn-spinner" />
            ) : (
              <svg className="google-icon-svg" viewBox="0 0 24 24" width="20" height="20">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
            )}
            <span className="auth-btn-text">
              {isLoadingGoogle ? 'Connecting with Google...' : 'Continue with Google'}
            </span>
          </button>

          {/* Friendly message under the button without raw error codes */}
          {errorMessage && (
            <p className="auth-friendly-notice animate-fade-in">
              {errorMessage}
            </p>
          )}

          {/* Warning only shown when running locally (import.meta.env.DEV), hidden in production */}
          {import.meta.env.DEV && devWarning && (
            <div className="auth-dev-warning animate-fade-in">
              <AlertCircle size={14} className="text-amber flex-shrink-0" />
              <span>{devWarning}</span>
            </div>
          )}
        </div>

        {/* Divider with Demo Access Heading */}
        <div className="auth-divider-wrap">
          <div className="auth-divider-line" />
          <span className="auth-divider-text">OR TRY AS A DEMO STUDENT</span>
          <div className="auth-divider-line" />
        </div>

        {/* Demo Student Profiles Grid (Class 11 & 12: Arjun & Priya) */}
        <div className="auth-personas-grid">
          {PRESET_STUDENT_PERSONAS.map((persona) => (
            <button
              key={persona.id}
              type="button"
              className="auth-persona-card glass-panel"
              onClick={() => handleSelectPersona(persona)}
              title={`Try as a demo student: ${persona.name}`}
            >
              <div className="persona-card-header">
                <AvatarDisplay 
                  avatarId={persona.avatarId} 
                  size={42} 
                />
                <div className="persona-card-titles">
                  <h4 className="persona-card-name">{persona.name}</h4>
                  <span className="persona-card-badge" style={{ color: persona.color, borderColor: persona.color }}>
                    {persona.badge}
                  </span>
                </div>
              </div>
              <p className="persona-card-desc">{persona.desc}</p>
              <div className="persona-card-action">
                <span>Enter Workspace</span>
                <ArrowRight size={14} />
              </div>
            </button>
          ))}
        </div>

        {/* Custom Student Quick Access Accordion */}
        <div className="auth-custom-access-wrap">
          {!showCustomForm ? (
            <button
              type="button"
              className="auth-custom-toggle-btn text-cyan"
              onClick={() => setShowCustomForm(true)}
            >
              <Sparkles size={14} />
              <span>Or enter your own custom name & track</span>
            </button>
          ) : (
            <form onSubmit={handleCustomSubmit} className="auth-custom-form animate-fade-in glass-panel">
              <div className="custom-form-row">
                <input
                  type="text"
                  placeholder="Your Name (e.g. Rahul Verma)"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="auth-input-field"
                  required
                  autoFocus
                />
                <select
                  value={customTrack}
                  onChange={(e) => setCustomTrack(e.target.value)}
                  className="auth-select-field"
                >
                  <option value="Class 11">Class 11</option>
                  <option value="Class 12">Class 12</option>
                </select>
                <select
                  value={customStream}
                  onChange={(e) => setCustomStream(e.target.value)}
                  className="auth-select-field"
                >
                  <option value="MPC">MPC</option>
                  <option value="BiPC">BiPC</option>
                </select>
                <button
                  type="submit"
                  className="primary-btn btn-glow custom-submit-btn"
                >
                  <span>Start</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Trust & Safe Privacy Footer */}
        <div className="auth-modal-footer">
          <ShieldCheck size={14} className="text-emerald" />
          <span>Zero passwords needed. Instant session auto-saved locally.</span>
        </div>
      </div>
    </div>
  );
}
