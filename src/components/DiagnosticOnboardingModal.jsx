// Diagnostic Assessment & Student Onboarding Modal
// Module A: Grade capture, Performance scale (600/1000), Dynamic Pedagogy Assignment, Language Dialects

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Award, BookOpen, Layers, CheckCircle2, 
  HelpCircle, Languages, AlertCircle, ArrowRight, X 
} from 'lucide-react';
import { calculatePedagogyTier } from '../services/storageService';
import { soundService } from '../services/soundService';

export default function DiagnosticOnboardingModal({
  isOpen,
  onClose,
  initialProfile,
  onSaveProfile
}) {
  const [name, setName] = useState(initialProfile?.name || '');
  const [grade, setGrade] = useState(initialProfile?.grade || 'Class 11');
  const [totalScale, setTotalScale] = useState(initialProfile?.totalScale || 600);
  const [score, setScore] = useState(initialProfile?.score ?? 410);
  const [language, setLanguage] = useState(initialProfile?.language || 'English');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (initialProfile) {
      setName(initialProfile.name || '');
      setGrade(initialProfile.grade || 'Class 11');
      setTotalScale(initialProfile.totalScale || 600);
      setScore(initialProfile.score ?? 410);
      setLanguage(initialProfile.language || 'English');
    }
  }, [initialProfile, isOpen]);

  if (!isOpen) return null;

  // Calculate live percentage and assigned tier
  const numScore = parseFloat(score) || 0;
  const percentage = Math.min(100, Math.max(0, (numScore / totalScale) * 100));
  const assignedTier = calculatePedagogyTier(numScore, totalScale);

  const getTierDetails = (tier) => {
    switch (tier) {
      case 'Foundation':
        return {
          badgeClass: 'tier-foundation',
          accent: '#FF7A00',
          title: 'Foundation Tier (<60%)',
          strategy: 'High Scaffolding & Physical Analogies',
          description: 'Step-by-step breakdown using relatable everyday physical analogies, explicit intermediate algebraic steps, and conversational spoon-feeding to eliminate fundamental fear.',
          features: [
            'Concrete real-world visual metaphors (e.g. beach balls in water)',
            'Step-by-step arithmetic without skipped lines',
            'Friendly conversational tone addressing common fear points'
          ]
        };
      case 'Intermediate':
        return {
          badgeClass: 'tier-intermediate',
          accent: '#00F0FF',
          title: 'Intermediate Tier (60%–80%)',
          strategy: 'Balanced Conceptual Depth & Board Focus',
          description: 'Balanced conceptual rigor tuned for State Board (IPE), CBSE, and foundational JEE Main/NEET. Pinpoints standard derivations and common examination traps.',
          features: [
            'Dual presentation: Intuitive analogy + Formal board definitions',
            'Full board examination marking step guides',
            'Targeted focus on tricky sign conventions and boundary values'
          ]
        };
      case 'Advanced':
      default:
        return {
          badgeClass: 'tier-advanced',
          accent: '#00E599',
          title: 'Advanced Tier (>80%)',
          strategy: 'High Mathematical Rigor & Law Synthesis',
          description: 'High-rigor competitive problem-solving. Direct derivation from first principles, differential laws, non-inertial frames, and cross-chapter synthesis for JEE Advanced / Top Ranks.',
          features: [
            'Direct fundamental laws & vector/calculus derivations',
            'Non-inertial reference frames and edge-case boundary conditions',
            'Synthesis connecting fluid dynamics, thermodynamics, and fields'
          ]
        };
    }
  };

  const tierInfo = getTierDetails(assignedTier);

  const handleSave = (e) => {
    e.preventDefault();
    if (numScore < 0 || numScore > totalScale) {
      setErrorMsg(`Score must be between 0 and ${totalScale}`);
      return;
    }

    soundService.playLevelUp();
    onSaveProfile({
      name: name.trim() || 'Student',
      grade,
      totalScale,
      score: numScore,
      tier: assignedTier,
      language,
      onboarded: true
    });
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container onboarding-modal glass-panel">
        <div className="modal-header">
          <div className="modal-title-wrap">
            <div className="icon-badge glow-cyan">
              <Sparkles size={22} className="text-cyan" />
            </div>
            <div>
              <h2 className="modal-title">Student Diagnostic & Pedagogy Engine</h2>
              <p className="modal-subtitle">AI-Driven Personalized STEM Architecture for Classes 11 & 12</p>
            </div>
          </div>
          {initialProfile?.onboarded && (
            <button 
              type="button" 
              className="modal-close-btn" 
              onClick={onClose}
              title="Close modal"
            >
              <X size={20} />
            </button>
          )}
        </div>

        <form onSubmit={handleSave} className="modal-body space-y-5">
          {/* Student Name */}
          <div className="form-group">
            <label className="form-label" htmlFor="student-name">Student Full Name</label>
            <input
              id="student-name"
              type="text"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Academic Pathway (5 options) */}
          <div className="form-group">
            <label className="form-label">Target Academic Pathway</label>
            <div className="grid grid-3 gap-2">
              {[
                { id: 'Class 11', title: 'Class 11', desc: 'Inter 1st Year (MPC/BiPC)' },
                { id: 'Class 12', title: 'Class 12', desc: 'Inter 2nd Year (IPE Out of 470)' },
                { id: 'Diploma', title: 'Diploma', desc: 'Polytechnic Engineering' },
                { id: 'Pharmacy', title: 'Pharmacy', desc: 'B.Pharm / D.Pharm' },
                { id: 'B.Tech', title: 'B.Tech', desc: 'Engineering & Applied Sciences' }
              ].map(item => (
                <button
                  key={item.id}
                  type="button"
                  className={`choice-card ${grade === item.id ? 'selected' : ''}`}
                  onClick={() => {
                    setGrade(item.id);
                    if (item.id === 'Class 12') {
                      setTotalScale(470);
                      if (score > 470) setScore(395);
                    } else if (item.id === 'B.Tech' || item.id === 'Diploma') {
                      setTotalScale(100);
                      if (score > 100) setScore(82);
                    }
                  }}
                >
                  <div className="choice-header">
                    <span className="choice-title">{item.title}</span>
                    {grade === item.id && <CheckCircle2 size={16} className="text-cyan" />}
                  </div>
                  <p className="choice-desc">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Performance Scale Selector */}
          <div className="form-group">
            <label className="form-label">Past Performance Scale</label>
            <div className="scale-button-grid">
              <button
                type="button"
                className={`scale-choice-card ${totalScale === 470 ? 'active' : ''}`}
                onClick={() => {
                  setTotalScale(470);
                  if (score > 470) setScore(395);
                }}
              >
                <div className="scale-choice-header">
                  <span className="scale-choice-name">Out of 470 Marks</span>
                  {totalScale === 470 && <CheckCircle2 size={16} className="text-cyan" />}
                </div>
                <span className="scale-choice-hint">11th Intermediate 1st Year (IPE)</span>
              </button>

              <button
                type="button"
                className={`scale-choice-card ${totalScale === 100 ? 'active' : ''}`}
                onClick={() => {
                  setTotalScale(100);
                  if (score > 100) setScore(85);
                }}
              >
                <div className="scale-choice-header">
                  <span className="scale-choice-name">Percentage (%)</span>
                  {totalScale === 100 && <CheckCircle2 size={16} className="text-cyan" />}
                </div>
                <span className="scale-choice-hint">Standard Percentage Scale</span>
              </button>

              <button
                type="button"
                className={`scale-choice-card ${totalScale === 1000 ? 'active' : ''}`}
                onClick={() => {
                  setTotalScale(1000);
                  if (score <= 470) setScore(Math.round((score / 470) * 1000));
                }}
              >
                <div className="scale-choice-header">
                  <span className="scale-choice-name">Out of 1000 Marks</span>
                  {totalScale === 1000 && <CheckCircle2 size={16} className="text-cyan" />}
                </div>
                <span className="scale-choice-hint">2-Year Cumulative IPE Total</span>
              </button>
            </div>
          </div>

          {/* Score Input & Normalized Percentage */}
          <div className="form-group">
            <label className="form-label" htmlFor="academic-score">
              Enter Your Score ({totalScale === 100 ? '0% to 100%' : `Max ${totalScale} Marks`})
            </label>
            <div className="score-stacked-row">
              <div className="score-input-field-wrap">
                <input
                  id="academic-score"
                  type="number"
                  min="0"
                  max={totalScale}
                  className="form-input clean-score-input"
                  value={score}
                  onChange={(e) => {
                    setErrorMsg('');
                    setScore(e.target.value);
                  }}
                  placeholder={`e.g. ${totalScale === 470 ? '410' : totalScale === 100 ? '85' : '780'}`}
                  required
                />
                <span className="score-unit-badge">{totalScale === 100 ? '% Marks' : `/ ${totalScale} Marks`}</span>
              </div>

              <div className="score-percent-card glass-panel">
                <span className="percent-val">{percentage.toFixed(1)}%</span>
                <span className="percent-label">Normalized</span>
              </div>
            </div>

            {errorMsg && (
              <p className="error-text mt-2">
                <AlertCircle size={14} /> {errorMsg}
              </p>
            )}
          </div>

          {/* Live Dynamic Pedagogy Assignment Display */}
          <div className={`dynamic-pedagogy-card ${tierInfo.badgeClass}`}>
            <div className="pedagogy-header">
              <div className="flex-row items-center gap-2">
                <Layers size={18} />
                <span className="pedagogy-tag">Assigned Pedagogy Engine:</span>
                <span className="pedagogy-tier-name">{tierInfo.title}</span>
              </div>
              <span className="strategy-pill">{tierInfo.strategy}</span>
            </div>

            <p className="pedagogy-desc">{tierInfo.description}</p>

            <ul className="pedagogy-features">
              {tierInfo.features.map((feat, i) => (
                <li key={i}>
                  <CheckCircle2 size={14} className="feature-check" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Language Selection (5 options) */}
          <div className="form-group">
            <div className="flex-between mb-2">
              <label className="form-label mb-0 flex-row items-center gap-2">
                <Languages size={16} className="text-cyan" />
                Teaching Language Preference
              </label>
              <span className="dialect-rule-tag">Formulas strictly in English</span>
            </div>

            <div className="grid grid-3 gap-2">
              {[
                { id: 'English', label: 'English', sample: 'Standard formal English' },
                { id: 'Hindi', label: 'Hindi', sample: 'Standard pure Hindi' },
                { id: 'Telugu', label: 'Telugu', sample: 'Standard pure Telugu' },
                { id: 'Hinglish', label: 'Hinglish', sample: 'Hindi + English fusion' },
                { id: 'Tenglish', label: 'Tenglish', sample: 'Telugu + English blend' }
              ].map(d => (
                <button
                  key={d.id}
                  type="button"
                  className={`dialect-card ${language === d.id ? 'active' : ''}`}
                  onClick={() => setLanguage(d.id)}
                >
                  <div className="dialect-name">{d.label}</div>
                  <div className="dialect-sample">{d.sample}</div>
                </button>
              ))}
            </div>

            <div className="scientific-constraint-alert">
              <AlertCircle size={15} className="text-amber flex-shrink-0" />
              <span>
                <strong>Scientific Invariance:</strong> All mathematical formulas, physical laws, variables, and standard SI units strictly remain in English across all languages.
              </span>
            </div>
          </div>

          <div className="modal-footer">
            <button type="submit" className="primary-btn w-full btn-glow">
              Launch BhashaGuru Adaptive Portal <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
