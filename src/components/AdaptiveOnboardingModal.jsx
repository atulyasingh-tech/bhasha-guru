// Stage 2: Adaptive Onboarding & Profile Customizer
// Multi-step Wizard: 
// Step 1: Academic Stream & Grade Classification (Class 11, Class 12, Diploma, Pharmacy, B.Tech)
// Step 2: Pedagogy Tier Computation & 5-Language Preference
// Step 3: Identity & Avatar Customization (8 STEM Presets + Custom File Upload)

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Layers, CheckCircle2, AlertCircle, 
  ArrowRight, ArrowLeft, Upload, User, Check, 
  X, BookOpen, GraduationCap, Cpu, Image as ImageIcon,
  Dices, FlaskConical, Stethoscope, Award
} from 'lucide-react';

import AvatarDisplay from './AvatarDisplay';
import { AVATAR_PRESETS } from '../data/avatarPresets';
import { 
  calculateNormalizedPercentage, 
  calculatePedagogyTierFromPercent 
} from '../services/storageService';
import { soundService } from '../services/soundService';

const RANDOM_STEM_HANDLES = [
  'Curie_11', 'Ramanujan_Pro', 'Tesla_Engineer', 'Fermi_MPC',
  'Aryabhata_7', 'Hypatia_Math', 'Turing_BTech', 'Bohr_Quantum',
  'Newton_12', 'Maxwell_Waves', 'Galileo_Star', 'Ada_Lovelace',
  'Feynman_Path', 'Faraday_Flux', 'Einstein_Rel', 'Planck_Const',
  'Euler_Infinity', 'Noether_Symm', 'Schrodinger_Box', 'Dirac_Spin'
];

function getRandomStemHandle() {
  const idx = Math.floor(Math.random() * RANDOM_STEM_HANDLES.length);
  return RANDOM_STEM_HANDLES[idx];
}

export default function AdaptiveOnboardingModal({
  isOpen,
  onClose,
  initialProfile,
  onSaveProfile,
  onGoToLanding
}) {
  // Wizard Step (1, 2, or 3)
  const [step, setStep] = useState(1);

  // Form Fields
  const [educationLevel, setEducationLevel] = useState(initialProfile?.educationLevel || 'Class 11');
  const [stream, setStream] = useState(initialProfile?.stream || 'MPC');
  const [branch, setBranch] = useState(initialProfile?.branch || 'Mechanical');
  const [specialization, setSpecialization] = useState(initialProfile?.specialization || 'Pharmaceutics');
  const [btechYear, setBtechYear] = useState(initialProfile?.btechYear || '1st Year');
  
  // Score details
  const [scoreType, setScoreType] = useState(initialProfile?.scoreType || 'percentage');
  const [scoreVal, setScoreVal] = useState(initialProfile?.score ?? '');
  const [totalScale, setTotalScale] = useState(initialProfile?.totalScale || 100);

  // Teaching Language
  const [language, setLanguage] = useState(initialProfile?.language || 'English');

  // Identity & Avatar
  const [name, setName] = useState(initialProfile?.name || '');
  const [username, setUsername] = useState(initialProfile?.username || '');
  const [avatarId, setAvatarId] = useState(initialProfile?.avatarId || 'einstein');
  const [customAvatarUrl, setCustomAvatarUrl] = useState(initialProfile?.customAvatarUrl || null);

  const [errorMsg, setErrorMsg] = useState('');

  // Sync with initialProfile on open
  useEffect(() => {
    if (initialProfile && isOpen) {
      setEducationLevel(initialProfile.educationLevel || 'Class 11');
      setStream(initialProfile.stream === 'BiPC' ? 'BiPC' : 'MPC');
      setBranch(initialProfile.branch || 'Mechanical');
      setSpecialization(initialProfile.specialization || 'Pharmaceutics');
      setBtechYear(initialProfile.btechYear || '1st Year');
      setScoreType(initialProfile.scoreType || (initialProfile.educationLevel === 'Class 12' ? 'marks470' : 'percentage'));
      setScoreVal(initialProfile.score ?? '');
      setTotalScale(initialProfile.totalScale || (initialProfile.educationLevel === 'Class 12' ? 470 : 100));
      setLanguage(initialProfile.language || 'English');
      setName(initialProfile.name || '');
      setUsername(initialProfile.username || '');
      setAvatarId(initialProfile.avatarId || 'einstein');
      setCustomAvatarUrl(initialProfile.customAvatarUrl || null);
      setStep(1);
      setErrorMsg('');
    }
  }, [initialProfile, isOpen]);

  if (!isOpen) return null;

  // Real-time normalized percentage & pedagogy tier
  const calculatedPercentage = calculateNormalizedPercentage(scoreVal, scoreType, totalScale);
  const calculatedTier = calculatePedagogyTierFromPercent(calculatedPercentage);

  // Handle Image Upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setErrorMsg('Image size must be under 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setCustomAvatarUrl(event.target.result);
      setAvatarId('custom');
      setErrorMsg('');
    };
    reader.readAsDataURL(file);
  };

  // Step 1 Validation & Proceed
  const handleNextStep1 = () => {
    const num = parseFloat(scoreVal);
    if (isNaN(num) || num < 0) {
      setErrorMsg('Please enter a valid numeric academic score.');
      return;
    }
    if (scoreType === 'percentage' && num > 100) {
      setErrorMsg('Percentage score cannot exceed 100%.');
      return;
    }
    if (scoreType === 'cgpa' && num > 10) {
      setErrorMsg('CGPA cannot exceed 10.0.');
      return;
    }
    if (scoreType === 'marks470' && num > 470) {
      setErrorMsg('11th IPE marks cannot exceed 470.');
      return;
    }
    if (scoreType === 'marks600' && num > totalScale) {
      setErrorMsg(`Marks cannot exceed total scale of ${totalScale}.`);
      return;
    }

    setErrorMsg('');
    setStep(2);
    soundService.playXpGain();
  };

  // Step 2 Proceed
  const handleNextStep2 = () => {
    setErrorMsg('');
    setStep(3);
    soundService.playXpGain();
  };

  // Final Submission (Step 3)
  const handleFinalSave = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!username.trim()) {
      setErrorMsg('Please enter a display username.');
      return;
    }

    soundService.playLevelUp();

    const finalizedProfile = {
      name: name.trim(),
      username: username.trim().toLowerCase().replace(/\s+/g, '_'),
      educationLevel,
      stream: (educationLevel === 'Class 11' || educationLevel === 'Class 12') ? stream : null,
      btechYear: educationLevel === 'B.Tech' ? btechYear : null,
      branch: (educationLevel === 'B.Tech' || educationLevel === 'Diploma') ? branch : null,
      specialization: educationLevel === 'Pharmacy' ? specialization : null,
      scoreType,
      score: parseFloat(scoreVal) || 0,
      totalScale,
      calculatedPercentage: Math.round(calculatedPercentage * 10) / 10,
      tier: calculatedTier,
      language,
      avatarId,
      customAvatarUrl,
      onboarded: true
    };

    onSaveProfile(finalizedProfile);
    if (onClose) onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container onboarding-wizard-modal glass-panel">
        {/* Wizard Header */}
        <div className="modal-header">
          <div className="modal-title-wrap">
            <div className="modal-icon-badge glow-cyan">
              <GraduationCap size={22} className="text-cyan" />
            </div>
            <div>
              <h2 className="modal-heading">Academic Track & Adaptive Profile</h2>
              <span className="modal-subheading">Step {step} of 3 • Dynamic Pedagogy Engine Calibration</span>
            </div>
          </div>

          <div className="flex-row items-center gap-2">
            {onGoToLanding && (
              <button
                type="button"
                className="btn-text-nav"
                onClick={onGoToLanding}
                title="Return to Landing & Methodology Showcase"
              >
                Back to Showcase
              </button>
            )}
            {initialProfile?.onboarded && onClose && (
              <button 
                type="button" 
                className="modal-close-btn" 
                onClick={onClose}
                title="Close"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Wizard Progress Stepper */}
        <div className="wizard-stepper-bar">
          <div className={`stepper-step ${step >= 1 ? 'completed' : ''} ${step === 1 ? 'active' : ''}`}>
            <span className="step-num-pill">1</span>
            <span className="step-lbl">Stream & Scores</span>
          </div>
          <div className="stepper-line" />
          <div className={`stepper-step ${step >= 2 ? 'completed' : ''} ${step === 2 ? 'active' : ''}`}>
            <span className="step-num-pill">2</span>
            <span className="step-lbl">Pedagogy Tier</span>
          </div>
          <div className="stepper-line" />
          <div className={`stepper-step ${step >= 3 ? 'completed' : ''} ${step === 3 ? 'active' : ''}`}>
            <span className="step-num-pill">3</span>
            <span className="step-lbl">Avatar & Identity</span>
          </div>
        </div>

        {errorMsg && (
          <div className="error-alert-banner">
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* STEP 1: ACADEMIC STREAM & GRADE CLASSIFICATION */}
        {step === 1 && (
          <div className="wizard-step-body animate-fade-in">
            {/* Level selection (5 Pathways) */}
            <div className="form-group">
              <label className="form-label">Select Education Pathway (5 Options)</label>
              <div className="level-cards-5grid">
                {[
                  { id: 'Class 11', title: 'Class 11', tag: 'Inter 1st Yr', desc: 'Physics, Chem, Math / Bio' },
                  { id: 'Class 12', title: 'Class 12', tag: 'Inter 2nd Yr', desc: '11th IPE (Out of 470) & Boards' },
                  { id: 'Diploma', title: 'Diploma', tag: 'Polytechnic', desc: 'Core Applied Sciences & Engg' },
                  { id: 'Pharmacy', title: 'Pharmacy', tag: 'B.Pharm / D.Pharm', desc: 'Pharmaceutics, Pharmacology' },
                  { id: 'B.Tech', title: 'B.Tech', tag: 'Engineering', desc: 'Applied Sciences & Core Tracks' }
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    className={`level-card ${educationLevel === item.id ? 'active' : ''}`}
                    onClick={() => {
                      setEducationLevel(item.id);
                      if (item.id === 'Class 11') {
                        setScoreType('percentage');
                        setTotalScale(100);
                        setScoreVal(scoreVal > 100 ? 85 : scoreVal || 85);
                      } else if (item.id === 'Class 12') {
                        setScoreType('marks470');
                        setTotalScale(470);
                        setScoreVal(scoreVal && scoreVal <= 470 ? scoreVal : 395);
                      } else if (item.id === 'Diploma') {
                        setScoreType('percentage');
                        setTotalScale(100);
                        setScoreVal(scoreVal > 100 ? 80 : scoreVal || 80);
                      } else if (item.id === 'Pharmacy') {
                        setScoreType('percentage');
                        setTotalScale(100);
                        setScoreVal(scoreVal > 100 ? 82 : scoreVal || 82);
                      } else {
                        setScoreType('cgpa');
                        setTotalScale(10);
                        setScoreVal(scoreVal > 10 ? 8.5 : scoreVal || 8.5);
                      }
                    }}
                  >
                    <div className="level-card-header">
                      <span className="level-card-title">{item.title}</span>
                      {educationLevel === item.id && <CheckCircle2 size={16} className="text-cyan" />}
                    </div>
                    <span className="level-card-tag">{item.tag}</span>
                    <p className="level-card-desc">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Conditional Form Logic: Class 11 (Intermediate 1st Year) */}
            {educationLevel === 'Class 11' && (
              <div className="conditional-group-box glass-panel animate-fade-in">
                <div className="form-group">
                  <label className="form-label">Intermediate Stream (MPC / BiPC)</label>
                  <div className="grid grid-2 gap-3">
                    {[
                      { id: 'MPC', label: 'MPC (Mathematics, Physics, Chemistry)' },
                      { id: 'BiPC', label: 'BiPC (Biology, Physics, Chemistry)' }
                    ].map(s => (
                      <button
                        key={s.id}
                        type="button"
                        className={`stream-pill ${stream === s.id ? 'active' : ''}`}
                        onClick={() => setStream(s.id)}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Scale selection (Row 1) */}
                <div className="form-group">
                  <label className="form-label">10th / SSC Score Metric</label>
                  <div className="scale-button-grid">
                    <button
                      type="button"
                      className={`scale-choice-card ${scoreType === 'percentage' ? 'active' : ''}`}
                      onClick={() => {
                        setScoreType('percentage');
                        setTotalScale(100);
                        if (scoreVal <= 10) setScoreVal(85);
                      }}
                    >
                      <div className="scale-choice-header">
                        <span className="scale-choice-name">Percentage (%)</span>
                        {scoreType === 'percentage' && <CheckCircle2 size={16} className="text-cyan" />}
                      </div>
                      <span className="scale-choice-hint">10th SSC Aggregate %</span>
                    </button>

                    <button
                      type="button"
                      className={`scale-choice-card ${scoreType === 'cgpa' ? 'active' : ''}`}
                      onClick={() => {
                        setScoreType('cgpa');
                        setTotalScale(10);
                        if (scoreVal > 10) setScoreVal(8.8);
                      }}
                    >
                      <div className="scale-choice-header">
                        <span className="scale-choice-name">CGPA (out of 10)</span>
                        {scoreType === 'cgpa' && <CheckCircle2 size={16} className="text-cyan" />}
                      </div>
                      <span className="scale-choice-hint">CBSE or State 10-point scale</span>
                    </button>
                  </div>
                </div>

                {/* Score Input & Normalized Percentage (Row 2) */}
                <div className="form-group">
                  <label className="form-label" htmlFor="academic-score-11">
                    Enter Your 10th Score ({scoreType === 'cgpa' ? '0 to 10.0' : '0% to 100%'})
                  </label>
                  <div className="score-stacked-row">
                    <div className="score-input-field-wrap">
                      <input
                        id="academic-score-11"
                        type="number"
                        step={scoreType === 'cgpa' ? '0.1' : '1'}
                        min="0"
                        max={totalScale}
                        className="form-input clean-score-input"
                        value={scoreVal}
                        onChange={(e) => setScoreVal(e.target.value)}
                        placeholder={scoreType === 'cgpa' ? 'e.g. 9.2' : 'e.g. 85'}
                        required
                      />
                      <span className="score-unit-badge">
                        {scoreType === 'cgpa' ? '/ 10.0 CGPA' : '% Aggregate'}
                      </span>
                    </div>

                    <div className="score-percent-card glass-panel">
                      <span className="percent-val">{calculatedPercentage.toFixed(1)}%</span>
                      <span className="percent-label">Normalized</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Conditional Form Logic: Class 12 (Intermediate 2nd Year) */}
            {educationLevel === 'Class 12' && (
              <div className="conditional-group-box glass-panel animate-fade-in">
                <div className="form-group">
                  <label className="form-label">Intermediate Stream (MPC / BiPC)</label>
                  <div className="grid grid-2 gap-3">
                    {[
                      { id: 'MPC', label: 'MPC (Mathematics, Physics, Chemistry)' },
                      { id: 'BiPC', label: 'BiPC (Biology, Physics, Chemistry)' }
                    ].map(s => (
                      <button
                        key={s.id}
                        type="button"
                        className={`stream-pill ${stream === s.id ? 'active' : ''}`}
                        onClick={() => setStream(s.id)}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Scale selection (Row 1) - Out of 470 or Percentage */}
                <div className="form-group">
                  <label className="form-label">11th Intermediate 1st Year (IPE) Score Metric</label>
                  <div className="scale-button-grid">
                    <button
                      type="button"
                      className={`scale-choice-card ${scoreType === 'marks470' ? 'active' : ''}`}
                      onClick={() => {
                        setScoreType('marks470');
                        setTotalScale(470);
                        if (scoreVal <= 100) setScoreVal(390);
                      }}
                    >
                      <div className="scale-choice-header">
                        <span className="scale-choice-name">Out of 470 Marks</span>
                        {scoreType === 'marks470' && <CheckCircle2 size={16} className="text-cyan" />}
                      </div>
                      <span className="scale-choice-hint">11th IPE Total (Maths/Bio + Phy + Chem + Lang)</span>
                    </button>

                    <button
                      type="button"
                      className={`scale-choice-card ${scoreType === 'percentage' ? 'active' : ''}`}
                      onClick={() => {
                        setScoreType('percentage');
                        setTotalScale(100);
                        if (scoreVal > 100) setScoreVal(Math.round((scoreVal / 470) * 100));
                      }}
                    >
                      <div className="scale-choice-header">
                        <span className="scale-choice-name">Percentage (%)</span>
                        {scoreType === 'percentage' && <CheckCircle2 size={16} className="text-cyan" />}
                      </div>
                      <span className="scale-choice-hint">Normalized IPE %</span>
                    </button>
                  </div>
                </div>

                {/* Score Input & Normalized Percentage (Row 2) */}
                <div className="form-group">
                  <label className="form-label" htmlFor="academic-score-12">
                    Enter Your 11th IPE Score ({scoreType === 'marks470' ? '0 to 470 Marks' : '0% to 100%'})
                  </label>
                  <div className="score-stacked-row">
                    <div className="score-input-field-wrap">
                      <input
                        id="academic-score-12"
                        type="number"
                        min="0"
                        max={totalScale}
                        className="form-input clean-score-input"
                        value={scoreVal}
                        onChange={(e) => setScoreVal(e.target.value)}
                        placeholder={scoreType === 'marks470' ? 'e.g. 410' : 'e.g. 85'}
                        required
                      />
                      <span className="score-unit-badge">
                        {scoreType === 'marks470' ? '/ 470 Marks' : '% Marks'}
                      </span>
                    </div>

                    <div className="score-percent-card glass-panel">
                      <span className="percent-val">{calculatedPercentage.toFixed(1)}%</span>
                      <span className="percent-label">Normalized</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Conditional Form Logic: Diploma (Polytechnic) */}
            {educationLevel === 'Diploma' && (
              <div className="conditional-group-box glass-panel animate-fade-in">
                <div className="form-group">
                  <label className="form-label">Polytechnic Branch</label>
                  <select
                    className="form-input clean-select"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                  >
                    <option value="Mechanical">Mechanical Engineering</option>
                    <option value="Civil">Civil Engineering</option>
                    <option value="EEE">Electrical & Electronics (EEE)</option>
                    <option value="ECE">Electronics & Communication (ECE)</option>
                    <option value="Computer Engineering">Computer Engineering</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">10th Board Score Metric</label>
                  <div className="scale-button-grid">
                    <button
                      type="button"
                      className={`scale-choice-card ${scoreType === 'percentage' ? 'active' : ''}`}
                      onClick={() => {
                        setScoreType('percentage');
                        setTotalScale(100);
                        if (scoreVal <= 10) setScoreVal(80);
                      }}
                    >
                      <div className="scale-choice-header">
                        <span className="scale-choice-name">Percentage (%)</span>
                        {scoreType === 'percentage' && <CheckCircle2 size={16} className="text-cyan" />}
                      </div>
                      <span className="scale-choice-hint">10th SSC Aggregate %</span>
                    </button>

                    <button
                      type="button"
                      className={`scale-choice-card ${scoreType === 'cgpa' ? 'active' : ''}`}
                      onClick={() => {
                        setScoreType('cgpa');
                        setTotalScale(10);
                        if (scoreVal > 10) setScoreVal(8.2);
                      }}
                    >
                      <div className="scale-choice-header">
                        <span className="scale-choice-name">CGPA (out of 10)</span>
                        {scoreType === 'cgpa' && <CheckCircle2 size={16} className="text-cyan" />}
                      </div>
                      <span className="scale-choice-hint">10-point scale</span>
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="academic-score-diploma">
                    Enter Your 10th Board Score
                  </label>
                  <div className="score-stacked-row">
                    <div className="score-input-field-wrap">
                      <input
                        id="academic-score-diploma"
                        type="number"
                        step={scoreType === 'cgpa' ? '0.1' : '1'}
                        min="0"
                        max={totalScale}
                        className="form-input clean-score-input"
                        value={scoreVal}
                        onChange={(e) => setScoreVal(e.target.value)}
                        placeholder={scoreType === 'cgpa' ? 'e.g. 8.5' : 'e.g. 82'}
                        required
                      />
                      <span className="score-unit-badge">
                        {scoreType === 'cgpa' ? '/ 10.0 CGPA' : '% Aggregate'}
                      </span>
                    </div>

                    <div className="score-percent-card glass-panel">
                      <span className="percent-val">{calculatedPercentage.toFixed(1)}%</span>
                      <span className="percent-label">Normalized</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Conditional Form Logic: Pharmacy */}
            {educationLevel === 'Pharmacy' && (
              <div className="conditional-group-box glass-panel animate-fade-in">
                <div className="form-group">
                  <label className="form-label">Pharmacy Specialization / Domain</label>
                  <select
                    className="form-input clean-select"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                  >
                    <option value="Pharmaceutics">Pharmaceutics (Drug Formulation & Kinetics)</option>
                    <option value="Pharmacology">Pharmacology (Drug Action & Toxicology)</option>
                    <option value="Pharmaceutical Chemistry">Pharmaceutical Chemistry (Organic & Medicinal)</option>
                    <option value="Pharmacognosy">Pharmacognosy (Natural Products & Phytochem)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Intermediate Aggregate Metric</label>
                  <div className="scale-button-grid">
                    <button
                      type="button"
                      className={`scale-choice-card ${scoreType === 'percentage' ? 'active' : ''}`}
                      onClick={() => {
                        setScoreType('percentage');
                        setTotalScale(100);
                        if (scoreVal > 100) setScoreVal(85);
                      }}
                    >
                      <div className="scale-choice-header">
                        <span className="scale-choice-name">Percentage (%)</span>
                        {scoreType === 'percentage' && <CheckCircle2 size={16} className="text-cyan" />}
                      </div>
                      <span className="scale-choice-hint">Inter Aggregate %</span>
                    </button>

                    <button
                      type="button"
                      className={`scale-choice-card ${scoreType === 'marks470' ? 'active' : ''}`}
                      onClick={() => {
                        setScoreType('marks470');
                        setTotalScale(470);
                        if (scoreVal <= 100) setScoreVal(385);
                      }}
                    >
                      <div className="scale-choice-header">
                        <span className="scale-choice-name">Out of 470 Marks</span>
                        {scoreType === 'marks470' && <CheckCircle2 size={16} className="text-cyan" />}
                      </div>
                      <span className="scale-choice-hint">11th/12th IPE Score</span>
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="academic-score-pharmacy">
                    Enter Your Intermediate Score
                  </label>
                  <div className="score-stacked-row">
                    <div className="score-input-field-wrap">
                      <input
                        id="academic-score-pharmacy"
                        type="number"
                        min="0"
                        max={totalScale}
                        className="form-input clean-score-input"
                        value={scoreVal}
                        onChange={(e) => setScoreVal(e.target.value)}
                        placeholder={scoreType === 'marks470' ? 'e.g. 390' : 'e.g. 84'}
                        required
                      />
                      <span className="score-unit-badge">
                        {scoreType === 'marks470' ? '/ 470 Marks' : '% Aggregate'}
                      </span>
                    </div>

                    <div className="score-percent-card glass-panel">
                      <span className="percent-val">{calculatedPercentage.toFixed(1)}%</span>
                      <span className="percent-label">Normalized</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Conditional Form Logic: B.Tech */}
            {educationLevel === 'B.Tech' && (
              <div className="conditional-group-box glass-panel animate-fade-in">
                <div className="grid grid-2 gap-3">
                  <div className="form-group">
                    <label className="form-label">Engineering Year</label>
                    <select
                      className="form-input clean-select"
                      value={btechYear}
                      onChange={(e) => setBtechYear(e.target.value)}
                    >
                      <option value="1st Year">1st Year (Freshman STEM)</option>
                      <option value="2nd Year">2nd Year (Core Fundamentals)</option>
                      <option value="3rd Year">3rd Year (Advanced Engineering)</option>
                      <option value="4th Year">4th Year (Capstone & Systems)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Branch / Track</label>
                    <select
                      className="form-input clean-select"
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                    >
                      <option value="CSE">Computer Science & Engg (CSE)</option>
                      <option value="ECE">Electronics & Communication (ECE)</option>
                      <option value="EEE">Electrical & Electronics (EEE)</option>
                      <option value="Mechanical">Mechanical Engineering</option>
                      <option value="Civil">Civil Engineering</option>
                      <option value="AI/DS">Artificial Intelligence & Data Science</option>
                    </select>
                  </div>
                </div>

                {/* Scale selection (Row 1) */}
                <div className="form-group">
                  <label className="form-label">Score Metric / Scale</label>
                  <div className="scale-button-grid">
                    <button
                      type="button"
                      className={`scale-choice-card ${scoreType === 'cgpa' ? 'active' : ''}`}
                      onClick={() => {
                        setScoreType('cgpa');
                        setTotalScale(10);
                        if (scoreVal > 10) setScoreVal(8.4);
                      }}
                    >
                      <div className="scale-choice-header">
                        <span className="scale-choice-name">CGPA (out of 10.0)</span>
                        {scoreType === 'cgpa' && <CheckCircle2 size={16} className="text-cyan" />}
                      </div>
                      <span className="scale-choice-hint">College / University CGPA</span>
                    </button>

                    <button
                      type="button"
                      className={`scale-choice-card ${scoreType === 'percentage' ? 'active' : ''}`}
                      onClick={() => {
                        setScoreType('percentage');
                        setTotalScale(100);
                        if (scoreVal <= 10) setScoreVal(82);
                      }}
                    >
                      <div className="scale-choice-header">
                        <span className="scale-choice-name">Intermediate %</span>
                        {scoreType === 'percentage' && <CheckCircle2 size={16} className="text-cyan" />}
                      </div>
                      <span className="scale-choice-hint">Intermediate Board Aggregate %</span>
                    </button>
                  </div>
                </div>

                {/* Score Input & Normalized Percentage (Row 2) */}
                <div className="form-group">
                  <label className="form-label" htmlFor="academic-score-btech">
                    Enter Your Score ({scoreType === 'cgpa' ? '0 to 10.0 CGPA' : '0% to 100%'})
                  </label>
                  <div className="score-stacked-row">
                    <div className="score-input-field-wrap">
                      <input
                        id="academic-score-btech"
                        type="number"
                        step={scoreType === 'cgpa' ? '0.1' : '1'}
                        min="0"
                        max={totalScale}
                        className="form-input clean-score-input"
                        value={scoreVal}
                        onChange={(e) => setScoreVal(e.target.value)}
                        placeholder={scoreType === 'cgpa' ? 'e.g. 8.6' : 'e.g. 85'}
                        required
                      />
                      <span className="score-unit-badge">
                        {scoreType === 'cgpa' ? '/ 10.0 CGPA' : '% Aggregate'}
                      </span>
                    </div>

                    <div className="score-percent-card glass-panel">
                      <span className="percent-val">{calculatedPercentage.toFixed(1)}%</span>
                      <span className="percent-label">Normalized</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="wizard-actions-row">
              <div />
              <button
                type="button"
                className="primary-btn btn-glow"
                onClick={handleNextStep1}
              >
                <span>Continue to Pedagogy Tier</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: PEDAGOGY TIER COMPUTATION & 5-LANGUAGE PREFERENCE */}
        {step === 2 && (
          <div className="wizard-step-body animate-fade-in">
            {/* Auto Categorization Banner */}
            <div className={`tier-computation-banner tier-${calculatedTier.toLowerCase()} glass-panel`}>
              <div className="computation-header">
                <div className="flex-row items-center gap-2">
                  <Sparkles size={20} className="text-cyan animate-pulse" />
                  <span className="computation-tag">Automated Pedagogy Classification:</span>
                </div>
                <span className="score-tag-pill">{calculatedPercentage.toFixed(1)}% Normalized</span>
              </div>

              <div className="tier-result-title">
                {calculatedTier === 'Foundation' && 'Foundation Tier (<60%)'}
                {calculatedTier === 'Intermediate' && 'Intermediate Tier (60%–80%)'}
                {calculatedTier === 'Advanced' && 'Advanced Tier (>80%)'}
              </div>

              <p className="tier-result-desc">
                {calculatedTier === 'Foundation' && 
                  'High scaffolding, everyday relatable physical analogies, and spoon-fed intermediate arithmetic steps to eliminate fundamental fear.'}
                {calculatedTier === 'Intermediate' && 
                  'Balanced conceptual depth and board focus. Pinpoints common derivation traps and entrance exam tips.'}
                {calculatedTier === 'Advanced' && 
                  'High mathematical rigor, direct fundamental laws, differential formulations, and non-inertial reference edge-cases.'}
              </p>
            </div>

            {/* 5-Language Preference Selection */}
            <div className="form-group mt-4">
              <label className="form-label">Teaching Language Preference (5 Options)</label>
              <div className="grid grid-3 gap-2">
                {[
                  { id: 'English', title: 'English', desc: 'Standard formal English conceptual explanations' },
                  { id: 'Hinglish', title: 'Hinglish', desc: 'Natural Hindi-English fusion for everyday intuition' },
                  { id: 'Tenglish', title: 'Tenglish', desc: 'Intuitive Telugu-English blend popular in AP & TS' },
                  { id: 'Hindi', title: 'Hindi', desc: 'Standard conversational Hindi explanations' },
                  { id: 'Telugu', title: 'Telugu', desc: 'Standard conversational Telugu explanations' }
                ].map(d => (
                  <button
                    key={d.id}
                    type="button"
                    className={`dialect-card ${language === d.id ? 'active' : ''}`}
                    onClick={() => setLanguage(d.id)}
                  >
                    <div className="dialect-name">{d.title}</div>
                    <div className="dialect-sample">{d.desc}</div>
                  </button>
                ))}
              </div>

              <div className="scientific-constraint-alert mt-2">
                <AlertCircle size={15} className="text-cyan flex-shrink-0" />
                <span>
                  <strong>Strict Scientific Standard:</strong> All mathematical formulas, chemical equations, physical laws, constants, and SI units remain strictly in formal English across all languages.
                </span>
              </div>
            </div>

            <div className="wizard-actions-row">
              <button
                type="button"
                className="secondary-btn"
                onClick={() => setStep(1)}
              >
                <ArrowLeft size={18} />
                <span>Back</span>
              </button>

              <button
                type="button"
                className="primary-btn btn-glow"
                onClick={handleNextStep2}
              >
                <span>Continue to Avatar Customizer</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: IDENTITY & AVATAR CUSTOMIZATION */}
        {step === 3 && (
          <form onSubmit={handleFinalSave} className="wizard-step-body animate-fade-in">
            {/* Full Name & Username with clean placeholders */}
            <div className="grid grid-2 gap-3">
              <div className="form-group">
                <label className="form-label" htmlFor="student-full-name">Full Name</label>
                <input
                  id="student-full-name"
                  type="text"
                  className="form-input clean-name-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="form-group">
                <div className="flex-between items-center mb-1">
                  <label className="form-label mb-0" htmlFor="student-username">Display Username</label>
                  <button
                    type="button"
                    className="random-handle-btn"
                    onClick={() => {
                      const handle = getRandomStemHandle();
                      setUsername(handle);
                    }}
                    title="Generate cool STEM handle"
                  >
                    <Dices size={13} className="text-cyan animate-spin-slow" />
                    <span>Random Handle</span>
                  </button>
                </div>
                <div className="username-input-wrap">
                  <span className="username-prefix">@</span>
                  <input
                    id="student-username"
                    type="text"
                    className="form-input username-field"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.replace(/[^a-zA-Z0-9_]/g, ''))}
                    placeholder="Choose unique handle"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Avatar Selector Grid */}
            <div className="form-group">
              <div className="flex-between mb-2">
                <label className="form-label mb-0">Choose STEM Persona Avatar (8 Presets)</label>
                <span className="text-muted text-xs">Iconic Scientists & Engineers</span>
              </div>

              <div className="avatar-presets-grid">
                {AVATAR_PRESETS.map((avatar) => {
                  const isSelected = avatarId === avatar.id;
                  return (
                    <button
                      key={avatar.id}
                      type="button"
                      className={`avatar-preset-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => {
                        setAvatarId(avatar.id);
                        setErrorMsg('');
                      }}
                    >
                      <AvatarDisplay 
                        avatarId={avatar.id}
                        size={48}
                      />
                      <span className="preset-name">{avatar.name.split(' ')[0]}</span>
                      <span className="preset-initials">{avatar.initials}</span>
                      {isSelected && (
                        <div className="selected-check-badge">
                          <Check size={12} className="text-white" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Image Upload Option */}
            <div className="custom-upload-box glass-panel">
              <div className="flex-row items-center gap-3">
                <div className="custom-preview-area">
                  {customAvatarUrl ? (
                    <img 
                      src={customAvatarUrl} 
                      alt="Custom Avatar Preview" 
                      className="custom-img-thumb"
                    />
                  ) : (
                    <div className="custom-placeholder-circle">
                      <ImageIcon size={22} className="text-muted" />
                    </div>
                  )}
                </div>

                <div className="custom-upload-content">
                  <span className="upload-title">Or Upload Custom Avatar</span>
                  <p className="upload-subtitle">Support JPG, PNG, or WebP (Max 2MB)</p>
                  
                  <label className="custom-file-label">
                    <Upload size={14} />
                    <span>Choose Image File</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden-file-input" 
                      onChange={handleFileUpload}
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="wizard-actions-row">
              <button
                type="button"
                className="secondary-btn"
                onClick={() => setStep(2)}
              >
                <ArrowLeft size={18} />
                <span>Back</span>
              </button>

              <button
                type="submit"
                className="primary-btn btn-glow"
              >
                <span>Save & Enter STEM Workspace</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
