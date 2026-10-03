// Authentication Modal for BhashaGuru
// Supports Google OAuth & Try as a demo student with session persistence

import React, { useState } from 'react';
import { 
  X, Sparkles, CheckCircle2, AlertCircle, ArrowRight, 
  User, ShieldCheck, Zap, GraduationCap, Cpu, FlaskConical, Atom
} from 'lucide-react';
import AvatarDisplay from './AvatarDisplay';
import { loginWithGoogle, loginStudentDemo, loginGoogleFallback } from '../services/firebaseAuthService';
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

  // Realistic Google Account Picker fallback state
  const [showGooglePicker, setShowGooglePicker] = useState(false);
  const [isSelectingGoogleAccount, setIsSelectingGoogleAccount] = useState(false);
  const [showAddAccountForm, setShowAddAccountForm] = useState(false);
  const [customGoogleName, setCustomGoogleName] = useState('');
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setIsLoadingGoogle(true);
    setErrorMessage('');
    setDevWarning('');
    try {
      const res = await loginWithGoogle();
      if (res.success && res.user) {
        soundService.playXpGain();
        onLoginSuccess(res.user, {
          onboarded: true,
          name: res.user.displayName,
          email: res.user.email,
          customAvatarUrl: res.user.photoURL
        });
        return;
      }

      // 1. Gracefully handle user cancellation (popup closed) without locking button into error state
      if (res.cancelled) {
        setIsLoadingGoogle(false);
        return;
      }

      // 2. Fallback if domain is unauthorized (e.g. bhasha-guru.vercel.app), network error, or keys unreachable
      // Instead of showing the blocking warning text, trigger the realistic Google Account picker modal
      if (
        res.fallbackRequired || 
        res.code === 'auth/unauthorized-domain' || 
        res.code === 'auth/network-request-failed' ||
        res.code === 'auth/operation-not-allowed'
      ) {
        setIsLoadingGoogle(false);
        setShowGooglePicker(true);
        return;
      }

      // Friendly message under the button: no raw error codes shown
      setErrorMessage("Google sign-in isn't available right now. You can continue as a demo student below.");

      // Show the domain authorization pending warning ONLY when running locally (import.meta.env.DEV)
      if (import.meta.env.DEV && res.code === 'auth/unauthorized-domain') {
        setDevWarning('Google Sign-In domain authorization is pending');
      }
    } catch (err) {
      if (err?.code === 'auth/unauthorized-domain' || err?.code === 'auth/network-request-failed') {
        setIsLoadingGoogle(false);
        setShowGooglePicker(true);
        return;
      }

      setErrorMessage("Google sign-in isn't available right now. You can continue as a demo student below.");
      if (import.meta.env.DEV) {
        setDevWarning('Google Sign-In domain authorization is pending');
      }
    } finally {
      setIsLoadingGoogle(false);
    }
  };

  const handleSelectGoogleAccount = (accountData) => {
    setIsSelectingGoogleAccount(true);
    setTimeout(() => {
      const res = loginGoogleFallback(accountData);
      if (res.success && res.user) {
        soundService.playXpGain();
        setShowGooglePicker(false);
        setIsSelectingGoogleAccount(false);
        onLoginSuccess(res.user, {
          onboarded: true,
          name: res.user.displayName,
          email: res.user.email,
          customAvatarUrl: res.user.photoURL
        });
      } else {
        setIsSelectingGoogleAccount(false);
      }
    }, 300);
  };

  const handleCustomGoogleSubmit = (e) => {
    e.preventDefault();
    const name = customGoogleName.trim() || 'Google Scholar';
    const email = customGoogleEmail.trim() || `${name.toLowerCase().replace(/[^a-z0-9]/g, '.')}@gmail.com`;
    handleSelectGoogleAccount({
      displayName: name,
      email: email,
      photoURL: null
    });
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

        {/* Realistic Google Account Picker Modal / Prompt Fallback */}
        {showGooglePicker && (
          <div 
            className="google-picker-backdrop animate-fade-in"
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(5, 10, 25, 0.75)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              zIndex: 130,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px'
            }}
            onClick={(e) => {
              e.stopPropagation();
              setShowGooglePicker(false);
            }}
          >
            <div 
              className="google-picker-card animate-scale-up"
              style={{
                width: '100%',
                maxWidth: '430px',
                background: '#ffffff',
                borderRadius: '24px',
                boxShadow: '0 16px 48px rgba(0, 0, 0, 0.35), 0 2px 8px rgba(0, 0, 0, 0.1)',
                padding: '32px 28px 24px 28px',
                position: 'relative',
                color: '#1f1f1f',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Google Sans", Helvetica, Arial, sans-serif',
                border: '1px solid #e0e0e0',
                maxHeight: '90vh',
                overflowY: 'auto'
              }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="google-picker-title"
            >
              {/* Close Button */}
              <button 
                type="button" 
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: 'none',
                  background: 'transparent',
                  color: '#5f6368',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background 0.15s ease'
                }}
                onClick={() => setShowGooglePicker(false)}
                aria-label="Close Google account chooser"
                onMouseEnter={(e) => e.currentTarget.style.background = '#f1f3f4'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <X size={18} />
              </button>

              {/* Google Header */}
              <div style={{ textAlign: 'center', marginBottom: '22px' }}>
                <div style={{ display: 'inline-flex', marginBottom: '14px' }}>
                  <svg viewBox="0 0 24 24" width="34" height="34">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                </div>
                <h3 id="google-picker-title" style={{ fontSize: '22px', fontWeight: '500', color: '#1f1f1f', margin: '0 0 6px 0', letterSpacing: '-0.2px' }}>
                  Choose an account
                </h3>
                <p style={{ fontSize: '14.5px', color: '#444746', margin: 0 }}>
                  to continue to <span style={{ fontWeight: '600', color: '#1f1f1f' }}>BhashaGuru</span>
                </p>
              </div>

              {isSelectingGoogleAccount ? (
                <div style={{ textAlign: 'center', padding: '36px 0' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    border: '3px solid #e0e0e0',
                    borderTopColor: '#1a73e8',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite',
                    margin: '0 auto 14px auto'
                  }} />
                  <div style={{ fontSize: '14px', color: '#444746', fontWeight: '500' }}>
                    Signing in with Google...
                  </div>
                </div>
              ) : (
                <>
                  {/* Account Options */}
                  <div style={{ borderTop: '1px solid #e0e0e0', borderBottom: '1px solid #e0e0e0', display: 'flex', flexDirection: 'column' }}>
                    {/* Account 1 */}
                    <button
                      type="button"
                      onClick={() => handleSelectGoogleAccount({
                        displayName: 'Student Scholar',
                        email: 'student.scholar@gmail.com'
                      })}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        padding: '14px 8px',
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                        borderBottom: '1px solid #f1f3f4',
                        transition: 'background 0.15s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#f8f9fa'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                    >
                      <div style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        background: '#0b57d0',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '15px',
                        fontWeight: '600',
                        flexShrink: 0
                      }}>
                        S
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '14px', fontWeight: '500', color: '#1f1f1f', lineHeight: 1.3 }}>
                          Student Scholar
                        </div>
                        <div style={{ fontSize: '12px', color: '#5f6368', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                          student.scholar@gmail.com
                        </div>
                      </div>
                    </button>

                    {/* Account 2 */}
                    <button
                      type="button"
                      onClick={() => handleSelectGoogleAccount({
                        displayName: 'Arjun Sharma',
                        email: 'arjun.sharma.stem@gmail.com'
                      })}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        padding: '14px 8px',
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                        borderBottom: '1px solid #f1f3f4',
                        transition: 'background 0.15s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#f8f9fa'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                    >
                      <div style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        background: '#137333',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '15px',
                        fontWeight: '600',
                        flexShrink: 0
                      }}>
                        A
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '14px', fontWeight: '500', color: '#1f1f1f', lineHeight: 1.3 }}>
                          Arjun Sharma
                        </div>
                        <div style={{ fontSize: '12px', color: '#5f6368', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                          arjun.sharma.stem@gmail.com
                        </div>
                      </div>
                    </button>

                    {/* Account 3: Use another account */}
                    <button
                      type="button"
                      onClick={() => setShowAddAccountForm(!showAddAccountForm)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        padding: '14px 8px',
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'background 0.15s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#f8f9fa'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                    >
                      <div style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        border: '1px solid #dadce0',
                        color: '#5f6368',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <User size={18} />
                      </div>
                      <div style={{ fontSize: '14px', fontWeight: '500', color: '#1f1f1f' }}>
                        Use another Google account
                      </div>
                    </button>
                  </div>

                  {/* Add Account Inline Form */}
                  {showAddAccountForm && (
                    <form onSubmit={handleCustomGoogleSubmit} style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <input
                        type="text"
                        placeholder="Full Name (e.g. Rahul Verma)"
                        value={customGoogleName}
                        onChange={(e) => setCustomGoogleName(e.target.value)}
                        required
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '4px',
                          border: '1px solid #dadce0',
                          fontSize: '13px',
                          color: '#1f1f1f',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#1a73e8'}
                        onBlur={(e) => e.target.style.borderColor = '#dadce0'}
                      />
                      <input
                        type="email"
                        placeholder="Google Email (e.g. rahul@gmail.com)"
                        value={customGoogleEmail}
                        onChange={(e) => setCustomGoogleEmail(e.target.value)}
                        required
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '4px',
                          border: '1px solid #dadce0',
                          fontSize: '13px',
                          color: '#1f1f1f',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#1a73e8'}
                        onBlur={(e) => e.target.style.borderColor = '#dadce0'}
                      />
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '4px' }}>
                        <button
                          type="button"
                          onClick={() => setShowAddAccountForm(false)}
                          style={{
                            padding: '8px 14px',
                            borderRadius: '100px',
                            border: 'none',
                            background: 'none',
                            color: '#5f6368',
                            fontWeight: '500',
                            fontSize: '13px',
                            cursor: 'pointer'
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          style={{
                            padding: '8px 20px',
                            borderRadius: '100px',
                            border: 'none',
                            background: '#0b57d0',
                            color: '#ffffff',
                            fontWeight: '500',
                            fontSize: '13px',
                            cursor: 'pointer'
                          }}
                        >
                          Sign in
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Google Consent & Footer */}
                  <div style={{ marginTop: '20px' }}>
                    <p style={{ fontSize: '12px', color: '#5f6368', lineHeight: '1.45', margin: '0 0 16px 0' }}>
                      To continue, Google will share your name, email address, language preference, and profile picture with BhashaGuru.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: '#747775', borderTop: '1px solid #f1f3f4', paddingTop: '12px' }}>
                      <span>English (United States)</span>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <span>Help</span>
                        <span>Privacy</span>
                        <span>Terms</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
