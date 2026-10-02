// Stage 1: Landing Page - BhashaGuru
// Tailored for Class 11 & 12 Intermediate (AP/Telangana, CBSE, JEE/NEET)
// Simple, student-friendly copy, Live Dialect Demo, Misconception Buster, and 4-step stepper

import React, { useState } from 'react';
import { 
  Sparkles, ArrowRight, CheckCircle2, ChevronRight, 
  HelpCircle, Trophy, Check, X, Lock, RotateCcw, 
  BookOpen, Brain, Zap, Compass, Lightbulb,
  Languages, Sigma, TrendingUp
} from 'lucide-react';
import MathRenderer from './MathRenderer';
import { MASTERY_TIERS } from '../data/masteryTiers';
import StemParticleCanvas from './StemParticleCanvas';

export default function LandingPage({ onStartLearning, onExploreDemo }) {
  // 1. Live Dialect Demo State
  const [demoLanguage, setDemoLanguage] = useState('English'); // 'English' | 'Hindi' | 'Telugu' | 'Hinglish' | 'Tenglish'

  // 2. How It Works 4-Step Stepper State
  const [activeStep, setActiveStep] = useState(1);

  // 3. Misconception Buster Sample Quiz State
  const [quizAnswer, setQuizAnswer] = useState(null); // 'Steel' | 'Cork' | 'Same for both'

  // 4. Adaptability Tier State (Simplified, no engineering jargon)
  const [selectedTier, setSelectedTier] = useState('Intermediate');

  // 5 Supported Dialect Options in exact order
  const DEMO_LANGUAGES = [
    { id: 'English', label: 'English' },
    { id: 'Hindi', label: 'हिन्दी' },
    { id: 'Telugu', label: 'తెలుగు' },
    { id: 'Hinglish', label: 'Hinglish' },
    { id: 'Tenglish', label: 'Tenglish' }
  ];

  // Dialect explanation copy for Buoyancy across all 5 languages
  const DIALECT_EXPLANATIONS = {
    English: "When an object is placed in a fluid, the fluid pushes it upward. This upward push is called the buoyant force.",
    Hindi: "जब कोई वस्तु किसी द्रव में डूबती है, तो द्रव उसे ऊपर की ओर धकेलता है। इस ऊपर के बल को उत्प्लावन बल कहते हैं।",
    Telugu: "ఒక వస్తువు ద్రవంలో మునిగినప్పుడు, ద్రవం దానిని పైకి నెడుతుంది. ఈ పైకి నెట్టే బలాన్ని ఉత్ప్లావక బలం అంటారు.",
    Hinglish: "Jab koi object fluid mein immerse hota hai, fluid usse upar ki taraf push karta hai. Is upward force ko buoyant force kehte hain.",
    Tenglish: "Oka object fluid lo immerse ainappudu, fluid daanini paiki push chestundi. Ee upward force ni buoyant force antaru."
  };

  // 4 Student-Facing Steps (Rewritten without engineering jargon)
  const HOW_IT_WORKS_STEPS = [
    {
      num: 1,
      title: "Tell us your level",
      subtitle: "30-second quick check",
      desc: "A short, quick check to match your speed and syllabus (Class 11 or 12, MPC or BiPC) so explanations aren't too simple or too complex.",
      highlight: "Personalized to You"
    },
    {
      num: 2,
      title: "Ask any doubt",
      subtitle: "Physics, Chemistry, or Maths",
      desc: "Type your exact question, paste a problem from your textbook, or pick any topic you find difficult.",
      highlight: "Any Question or Formula"
    },
    {
      num: 3,
      title: "Learn it your way",
      subtitle: "English, Hindi, Telugu, Hinglish or Tenglish",
      desc: "Get crystal-clear explanations in your everyday dialect with practical real-world uses and the Eureka story behind the concept.",
      highlight: "5 Everyday Languages"
    },
    {
      num: 4,
      title: "Get quizzed so it sticks",
      subtitle: "3 tricky retention questions",
      desc: "Lock in what you learned with 3 quick questions, including one that tests the most common mistake students make in exams.",
      highlight: "Misconception Traps"
    }
  ];

  // Simplified student tiers
  const TIER_GUIDES = {
    Foundation: {
      name: "Foundation Tier",
      scoreHint: "For students building confidence",
      color: "#FF7A00",
      description: "More visual everyday analogies, step-by-step math breakdowns, and zero skipped steps.",
      quote: "Think of pushing a beach ball deep down into a swimming pool. The moment you let go, it shoots right up! That upward push is Buoyant Force."
    },
    Intermediate: {
      name: "Intermediate Tier",
      scoreHint: "For students preparing for board exams & JEE Main",
      color: "#00F0FF",
      description: "Balanced mix of physical intuition, step-by-step derivations, and common board exam traps.",
      quote: "Buoyant force comes from the pressure difference between the top and bottom of the object: F_B = (P_bottom - P_top) × Area = ρ × V × g."
    },
    Advanced: {
      name: "Advanced Tier",
      scoreHint: "For students targeting top ranks in JEE/NEET",
      color: "#00E599",
      description: "Rapid conceptual proofs, challenging edge cases, and non-inertial frame problems.",
      quote: "Buoyant force is the net upward surface integral of hydrostatic pressure. In accelerated frames, effective gravity g_eff shifts the direction of buoyant thrust."
    }
  };

  const handleSmoothScrollToHowItWorks = (e) => {
    e.preventDefault();
    const el = document.getElementById('how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="landing-page-container">
      {/* Ambient Particle Canvas */}
      <StemParticleCanvas />

      {/* 1. HERO SECTION */}
      <section className="landing-hero-section">
        <div className="hero-content">
          <div className="hero-badge animate-fade-in">
            <Sparkles size={14} className="text-cyan animate-pulse" />
            <span>AI-POWERED STEM TUTOR • CLASSES 11 & 12</span>
          </div>

          <h1 className="hero-headline">
            Learn STEM in Your Own Way.
          </h1>

          <p className="hero-subheadline">
            Class 11 & 12 physics, chemistry and maths explained in English, Hindi, Telugu, Hinglish or Tenglish. Formulas always stay exact.
          </p>

          <div className="hero-cta-group">
            <button
              type="button"
              className="primary-btn hero-cta-btn btn-glow"
              onClick={onStartLearning}
            >
              <span>Try a Free Doubt</span>
              <ArrowRight size={18} />
            </button>

            <a
              href="#how-it-works"
              className="hero-text-link"
              onClick={handleSmoothScrollToHowItWorks}
            >
              <span>See how it works</span>
              <ChevronRight size={15} />
            </a>
          </div>

          {/* Student Benefits Stats Strip (1 Row of 4 Columns on Desktop, 2x2 Grid on Mobile) */}
          <div className="hero-stats-strip glass-panel">
            <div className="stat-pill stat-cyan">
              <div className="stat-icon-box stat-icon-cyan">
                <Languages size={20} />
              </div>
              <span className="stat-num text-cyan">5 languages</span>
              <span className="stat-lbl">English, Hindi, Telugu, Hinglish & Tenglish</span>
            </div>

            <div className="stat-divider stat-divider-1" />

            <div className="stat-pill stat-emerald">
              <div className="stat-icon-box stat-icon-emerald">
                <Sigma size={20} />
              </div>
              <span className="stat-num text-emerald">Exact formulas</span>
              <span className="stat-lbl">Standard SI units & derivations</span>
            </div>

            <div className="stat-divider stat-divider-2" />

            <div className="stat-pill stat-amber">
              <div className="stat-icon-box stat-icon-amber">
                <Zap size={20} />
              </div>
              <span className="stat-num text-amber">Instant quizzes</span>
              <span className="stat-lbl">Twisted misconception traps</span>
            </div>

            <div className="stat-divider stat-divider-3" />

            <div className="stat-pill stat-purple">
              <div className="stat-icon-box stat-icon-purple">
                <TrendingUp size={20} />
              </div>
              <span className="stat-num text-purple">Track your progress</span>
              <span className="stat-lbl">6 mastery levels from Novice to Guru</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LIVE DIALECT DEMO (New Section Directly Under Hero) */}
      <section className="landing-section dialect-demo-section">
        <div className="section-header-center">
          <div className="section-tag">
            <Sparkles size={14} className="text-cyan" />
            <span>MULTILINGUAL TUTORING ENGINE</span>
          </div>
          <h2 className="section-title">Same concept. Your language.</h2>
          <p className="section-desc">
            Switch between English, Hindi, Telugu, Hinglish, or Tenglish. The explanation changes to match the language you think in, but formulas and physics laws stay 100% exact.
          </p>
        </div>

        <div className="dialect-demo-card glass-panel">
          {/* 5-Way Dialect Toggle Pill */}
          <div className="dialect-toggle-bar">
            <div className="dialect-toggle-group">
              {DEMO_LANGUAGES.map((lang) => {
                const isActive = demoLanguage === lang.id;
                return (
                  <button
                    key={lang.id}
                    type="button"
                    className={`dialect-toggle-btn ${isActive ? 'active' : ''}`}
                    onClick={() => setDemoLanguage(lang.id)}
                  >
                    <span>{lang.label}</span>
                  </button>
                );
              })}
            </div>
            <div className="concept-topic-tag">
              <span className="topic-dot" />
              <span>Concept: Buoyancy & Archimedes' Principle</span>
            </div>
          </div>

          {/* Dynamic Explanation Text with 200ms Transition */}
          <div className="dialect-text-container">
            <div key={demoLanguage} className="dialect-text-box animate-fade-slide">
              <div className="dialect-quote-mark">“</div>
              <p className="dialect-explanation-text">
                {DIALECT_EXPLANATIONS[demoLanguage]}
              </p>
            </div>
          </div>

          {/* Unchanged Exact Formula Block */}
          <div className="dialect-formula-card">
            <div className="formula-header-line">
              <div className="flex-row items-center gap-2">
                <span className="formula-lock-badge">
                  <Lock size={12} className="text-cyan" />
                  <span>Exact Formula (Universal in all dialects)</span>
                </span>
              </div>
              <span className="formula-subject-badge">Physics • Hydrostatics</span>
            </div>

            <div className="formula-math-display">
              <MathRenderer content="F_B = \rho V g" block={true} />
            </div>

            <div className="formula-variables-grid">
              <div className="variable-item">
                <span className="var-math"><MathRenderer content="F_B" /></span>
                <span className="var-desc">= buoyant force (N)</span>
              </div>
              <div className="variable-item">
                <span className="var-math"><MathRenderer content="\rho" /></span>
                <span className="var-desc">= fluid density (kg/m³)</span>
              </div>
              <div className="variable-item">
                <span className="var-math"><MathRenderer content="V" /></span>
                <span className="var-desc">= volume displaced (m³)</span>
              </div>
              <div className="variable-item">
                <span className="var-math"><MathRenderer content="g" /></span>
                <span className="var-desc">= acceleration due to gravity (m/s²)</span>
              </div>
            </div>

            <div className="formula-note-footer">
              <Lightbulb size={14} className="text-amber flex-shrink-0" />
              <span>Formulas and SI units never change, only the explanation does.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS (4 Student-Facing Steps) */}
      <section id="how-it-works" className="landing-section how-it-works-section">
        <div className="section-header-center">
          <div className="section-tag">
            <Brain size={14} className="text-cyan" />
            <span>SIMPLE 4-STEP LEARNING LOOP</span>
          </div>
          <h2 className="section-title">How It Works</h2>
          <p className="section-desc">
            No endless 2-hour video lectures. Ask what you're stuck on, get an intuitive breakdown, and verify it with a quick check.
          </p>
        </div>

        <div className="how-it-works-container glass-panel">
          {/* 4 Interactive Step Cards */}
          <div className="how-it-works-grid">
            {HOW_IT_WORKS_STEPS.map((step) => {
              const isActive = activeStep === step.num;
              return (
                <div
                  key={step.num}
                  className={`how-step-card ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveStep(step.num)}
                >
                  <div className="how-step-header">
                    <span className="how-step-badge">Step 0{step.num}</span>
                    <span className="how-step-highlight">{step.highlight}</span>
                  </div>
                  <h4 className="how-step-title">{step.title}</h4>
                  <p className="how-step-sub">{step.subtitle}</p>
                </div>
              );
            })}
          </div>

          {/* Active Step Details Panel */}
          <div className="active-how-step-box">
            <div className="how-step-details-header">
              <div className="step-circle-badge">
                {HOW_IT_WORKS_STEPS[activeStep - 1].num}
              </div>
              <div>
                <h3 className="how-detail-title">
                  {HOW_IT_WORKS_STEPS[activeStep - 1].title}
                </h3>
                <p className="how-detail-subtitle">
                  {HOW_IT_WORKS_STEPS[activeStep - 1].subtitle}
                </p>
              </div>
            </div>
            <p className="how-detail-desc">
              {HOW_IT_WORKS_STEPS[activeStep - 1].desc}
            </p>
          </div>
        </div>
      </section>

      {/* 4. MISCONCEPTION BUSTER (In Place of the Removed STEM Infographic Section) */}
      <section className="landing-section quiz-sample-section">
        <div className="section-header-center">
          <div className="section-tag">
            <Zap size={14} className="text-amber" />
            <span>MISCONCEPTION BUSTER</span>
          </div>
          <h2 className="section-title">See a Sample Quiz Question</h2>
          <p className="section-desc">
            BhashaGuru quizzes test your true conceptual understanding, targeting the traps students commonly fall into.
          </p>
        </div>

        <div className="sample-quiz-card glass-panel">
          <div className="sample-quiz-header">
            <div className="sample-quiz-badge">
              <HelpCircle size={14} className="text-cyan" />
              <span>Conceptual Trap Test • Physics: Fluids</span>
            </div>
            {quizAnswer && (
              <button 
                type="button" 
                className="quiz-reset-btn"
                onClick={() => setQuizAnswer(null)}
                title="Reset question"
              >
                <RotateCcw size={13} />
                <span>Try Again</span>
              </button>
            )}
          </div>

          <h3 className="sample-quiz-question">
            A steel ball and a cork ball have the same volume and are fully submerged in water. Which one feels a greater buoyant force?
          </h3>

          {/* 3 Clickable Options */}
          <div className="sample-quiz-options">
            {['Steel', 'Cork', 'Same for both'].map((option) => {
              const isSelected = quizAnswer === option;
              const isCorrect = option === 'Same for both';
              let btnClass = 'quiz-option-btn';

              if (quizAnswer) {
                if (isCorrect) {
                  btnClass += ' option-correct';
                } else if (isSelected) {
                  btnClass += ' option-wrong';
                } else {
                  btnClass += ' option-faded';
                }
              }

              return (
                <button
                  key={option}
                  type="button"
                  className={btnClass}
                  onClick={() => setQuizAnswer(option)}
                  disabled={quizAnswer !== null}
                >
                  <span className="option-bullet">
                    {quizAnswer && isCorrect ? <Check size={14} /> : quizAnswer && isSelected ? <X size={14} /> : option.charAt(0)}
                  </span>
                  <span className="option-label">{option}</span>
                </button>
              );
            })}
          </div>

          {/* 2-Line Explanation using F_B = rho * V * g */}
          {quizAnswer && (
            <div className="sample-quiz-explanation animate-fade-slide">
              <div className="explanation-header">
                <CheckCircle2 size={16} className="text-emerald flex-shrink-0" />
                <h4 className="explanation-title">
                  {quizAnswer === 'Same for both' ? 'Correct! Here is why:' : 'Common trap! Here is why it is the same:'}
                </h4>
              </div>
              <p className="explanation-body">
                By Archimedes' formula <MathRenderer content="F_B = \rho V g" />, buoyant force depends <strong>only on fluid density (<MathRenderer content="\rho" />) and displaced volume (<MathRenderer content="V" />)</strong>.
              </p>
              <p className="explanation-body">
                Since both balls have the exact same volume and are fully submerged in water, both feel the <strong>exact same buoyant force</strong>, regardless of their weight or material!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 5. ADAPTIVE PEDAGOGY MATRIX (Simplified for students, zero engineering jargon) */}
      <section className="landing-section pedagogy-section">
        <div className="section-header-center">
          <div className="section-tag">
            <Compass size={14} className="text-cyan" />
            <span>ADAPTS TO HOW YOU LEARN</span>
          </div>
          <h2 className="section-title">Explanations Tuned to Your Comfort</h2>
          <p className="section-desc">
            Whether you want visual analogies to get the intuition first, or step-by-step derivations for exams, BhashaGuru tunes the balance to your comfort level.
          </p>
        </div>

        {/* 3 Tier Selector Buttons */}
        <div className="tier-pills-row">
          {Object.keys(TIER_GUIDES).map((tierKey) => {
            const isSelected = selectedTier === tierKey;
            const tierData = TIER_GUIDES[tierKey];
            return (
              <button
                key={tierKey}
                type="button"
                className={`tier-switch-btn ${isSelected ? 'active' : ''}`}
                onClick={() => setSelectedTier(tierKey)}
              >
                <span className="tier-switch-name">{tierData.name}</span>
                <span className="tier-switch-score">{tierData.scoreHint}</span>
              </button>
            );
          })}
        </div>

        {/* Tier Details Card */}
        <div className="tier-details-card glass-panel">
          <div className="tier-card-header-row">
            <div>
              <h3 className="tier-display-name" style={{ color: TIER_GUIDES[selectedTier].color }}>
                {TIER_GUIDES[selectedTier].name}
              </h3>
              <p className="tier-display-desc">
                {TIER_GUIDES[selectedTier].description}
              </p>
            </div>
            <span className="tier-active-badge" style={{ borderColor: TIER_GUIDES[selectedTier].color, color: TIER_GUIDES[selectedTier].color }}>
              Active Preview
            </span>
          </div>

          <div className="tier-sample-quote-box glass-panel">
            <span className="quote-label">Sample Tutor Explanation:</span>
            <p className="quote-text">"{TIER_GUIDES[selectedTier].quote}"</p>
          </div>
        </div>
      </section>

      {/* 6. 6-TIER MASTERY PROGRESSION FUNNEL */}
      <section className="landing-section mastery-funnel-section">
        <div className="section-header-center">
          <div className="section-tag">
            <Trophy size={14} className="text-gold" />
            <span>GAMIFIED MASTERY</span>
          </div>
          <h2 className="section-title">Your Learning Journey</h2>
          <p className="section-desc">
            Earn XP as you clear doubts and solve quizzes. Level up from Bronze all the way to becoming a "Guru" who can teach the topic back.
          </p>
        </div>

        <div className="mastery-funnel-grid">
          {MASTERY_TIERS.map((tier) => (
            <div 
              key={tier.tierNumber}
              className="funnel-tier-card glass-panel"
              style={{ borderTop: `3px solid ${tier.color}` }}
            >
              <div className="funnel-rank-badge" style={{ backgroundColor: `${tier.color}22`, color: tier.color }}>
                Rank 0{tier.tierNumber}
              </div>
              <h4 className="funnel-name" style={{ color: tier.color }}>{tier.name}</h4>
              <p className="funnel-title">{tier.title}</p>
              <div className="funnel-xp-range">
                <span>{tier.minXp} - {tier.maxXp === Infinity ? '1000+' : tier.maxXp} XP</span>
              </div>
              <p className="funnel-desc">{tier.description}</p>
              <div className="funnel-perk-box">
                <Sparkles size={12} className="text-gold flex-shrink-0" />
                <span className="funnel-perk-text">{tier.perk}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CALL TO ACTION BANNER */}
      <section className="landing-cta-banner glass-panel">
        <div className="cta-banner-inner">
          <div className="cta-text">
            <h2 className="cta-title">Ready to Clear Your Doubts?</h2>
            <p className="cta-desc">
              Ask your toughest Class 11 & 12 physics, chemistry, or maths questions and get instant explanations in English, Hindi, Telugu, Hinglish, or Tenglish.
            </p>
          </div>
          <button
            type="button"
            className="primary-btn cta-large-btn btn-glow"
            onClick={onStartLearning}
          >
            <span>Try a Free Doubt Now</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}
