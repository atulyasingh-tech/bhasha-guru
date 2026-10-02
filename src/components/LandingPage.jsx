// Stage 1: Landing & Methodology Showcase Page
// Futuristic STEM Educational Landing with Interactive Visual Architecture & Dynamic Charts

import React, { useState } from 'react';
import { 
  Atom, Sparkles, ArrowRight, Layers, Trophy, 
  CheckCircle2, Compass, Cpu, BookOpen, Brain, 
  Zap, Award, ChevronRight, BarChart3, HelpCircle,
  FlaskConical, Infinity as InfinityIcon
} from 'lucide-react';
import { MASTERY_TIERS } from '../data/masteryTiers';
import StemParticleCanvas from './StemParticleCanvas';

export default function LandingPage({ onStartLearning, onExploreDemo }) {
  // Interactive states for landing page charts
  const [activeFlowStep, setActiveFlowStep] = useState(2); // Step 3 by default
  const [selectedPedagogyTier, setSelectedPedagogyTier] = useState('Intermediate');

  // Flowchart steps
  const FLOW_STEPS = [
    {
      num: 1,
      title: "Diagnostic Profiling",
      subtitle: "Academic Stream & Score Normalization",
      desc: "Analyzes student's Class 11, Class 12, or B.Tech performance across 10th SSC, 11th Inter, or CGPA metrics to establish baseline capability.",
      metric: "0% - 100% Normalized Percentile"
    },
    {
      num: 2,
      title: "Dynamic Scaffolding",
      subtitle: "Foundation / Intermediate / Advanced",
      desc: "Assigns one of 3 distinct pedagogical engines. Calibrates analogy ratio, algebraic step granularity, and mathematical rigor.",
      metric: "3 Dynamic Calibration Tiers"
    },
    {
      num: 3,
      title: "3-Layer Concept Engine",
      subtitle: "Exam Derivations -> Real World -> Origin",
      desc: "Breaks concepts into structured cognitive tiers: Core exam proofs, cutting-edge modern engineering applications, and historical Eureka discoveries.",
      metric: "100% Syllabus Derivations"
    },
    {
      num: 4,
      title: "Beyond the Horizon",
      subtitle: "Edge-Case Paradoxes & Physics Limits",
      desc: "Presents provocative thought experiments (e.g. buoyancy in free-fall orbit, infinite induction) to test conceptual limits beyond textbooks.",
      metric: "JEE Advanced & Olympiad Rigor"
    },
    {
      num: 5,
      title: "Retention Module",
      subtitle: "Twisted 3-Question Diagnostic Quizzes",
      desc: "Tests direct retrieval, variable alteration, and popular misconception traps with instant explanations and adaptive XP progression.",
      metric: "Active Recall & Spaced Revision"
    }
  ];

  // Pedagogical adaptation data
  const PEDAGOGY_DATA = {
    Foundation: {
      name: "Foundation Tier",
      scoreRange: "Score < 60%",
      color: "#FF7A00",
      accentBg: "rgba(255, 122, 0, 0.12)",
      intuitionPct: 80,
      rigorPct: 20,
      focus: "High Intuitive Scaffolding & Everyday Analogies",
      tone: "Relatable, comforting, eliminating STEM anxiety",
      bulletPoints: [
        "80% Intuition & Scaffolding: Visual metaphors (e.g. beach balls submerged in water pools)",
        "20% Formula application: No skipped intermediate algebraic steps",
        "Bilingual conversational bridges with colloquial everyday examples",
        "Demystifies fear points before introducing formal mathematical symbols"
      ],
      sampleQuote: "Think of pushing a beach ball deep down into a swimming pool. The moment you let go, it shoots right up! That upward push is Buoyant Force."
    },
    Intermediate: {
      name: "Intermediate Tier",
      scoreRange: "Score 60% – 80%",
      color: "#00F0FF",
      accentBg: "rgba(0, 240, 255, 0.12)",
      intuitionPct: 50,
      rigorPct: 50,
      focus: "Balanced Conceptual Intuition & Exam Derivations",
      tone: "Targeted, structured, pinpointing board traps & JEE Main tips",
      bulletPoints: [
        "50% Conceptual intuition: Hydrostatic pressure differential ΔP = ρgh",
        "50% Exam derivations & traps: Step-by-step Free Body Diagrams (FBD)",
        "Apparent weight in fluids: W' = W - F_B with sign convention mastery",
        "Structured for top State Board (IPE/CBSE) marks and JEE/NEET clearing"
      ],
      sampleQuote: "Buoyant force originates from the hydrostatic pressure gradient: P(h) = P₀ + ρgh. Since bottom depth exceeds top depth, net upward thrust F_B = ΔP · A = ρ_fluid · V · g."
    },
    Advanced: {
      name: "Advanced Tier",
      scoreRange: "Score > 80%",
      color: "#00E599",
      accentBg: "rgba(0, 229, 153, 0.12)",
      intuitionPct: 20,
      rigorPct: 80,
      focus: "High Mathematical Rigor & Differential Laws",
      tone: "Rapid, fundamental, tensor & vector calculus driven",
      bulletPoints: [
        "20% Fast intuition: Quick geometric intuition & symmetry arguments",
        "80% Mathematical rigor & limits: Surface integrals of stress tensor ∮ P n̂ dA",
        "Gauss Divergence Theorem: F_B = -∫ ∇P dV = -ρ_fluid · V · g_eff",
        "Non-inertial frames with fictitious forces and effective gravity g_eff = g - a"
      ],
      sampleQuote: "In continuum mechanics, F_B is the closed surface integral -∮ P n̂ dA. By the Divergence Theorem, F_B = -ρ_fluid · V · g_eff, tilting antiparallel to acceleration in non-inertial frames."
    }
  };

  const currentPedagogy = PEDAGOGY_DATA[selectedPedagogyTier];

  return (
    <div className="landing-page-container">
      {/* Full-Viewport Ambient STEM Particle Canvas */}
      <StemParticleCanvas />

      {/* 1. HERO SECTION (Clean, Unobstructed Desk Background) */}
      <section className="landing-hero-section">
        <div className="hero-content">
          <div className="hero-badge animate-fade-in">
            <Sparkles size={15} className="text-cyan animate-pulse" />
            <span>AI-POWERED ADAPTIVE STEM PEDAGOGY • CLASSES 11, 12 & B.TECH</span>
          </div>

          <h1 className="hero-headline">
            Learn STEM in Your Own Way.
          </h1>

          <p className="hero-subheadline">
            Clear your toughest physics, chemistry, and math doubts with an AI tutor that adapts to your speed and explains concepts in simple language.
          </p>

          <div className="hero-cta-group">
            <button
              type="button"
              className="primary-btn hero-cta-btn btn-glow"
              onClick={onStartLearning}
            >
              <span>Start Learning Now</span>
              <ArrowRight size={20} />
            </button>

            <button
              type="button"
              className="secondary-btn hero-demo-btn glass-panel"
              onClick={onExploreDemo}
            >
              <Atom size={18} className="text-cyan" />
              <span>Explore Interactive Workspace</span>
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="hero-stats-strip glass-panel">
            <div className="stat-pill">
              <span className="stat-num">3-Layer</span>
              <span className="stat-lbl">Concept Architecture</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-pill">
              <span className="stat-num">3 Dialects</span>
              <span className="stat-lbl">English, Hinglish, Tenglish</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-pill">
              <span className="stat-num">100% Strict</span>
              <span className="stat-lbl">Formulas Kept in English</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-pill">
              <span className="stat-num">6 Tiers</span>
              <span className="stat-lbl">From Bronze to Guru</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VISUAL ARCHITECTURE FLOWCHART */}
      <section className="landing-section flowchart-section">
        <div className="section-header-center">
          <div className="section-tag">
            <Cpu size={15} className="text-cyan" />
            <span>SYSTEM ARCHITECTURE</span>
          </div>
          <h2 className="section-title">How BhashaGuru Works</h2>
          <p className="section-desc">
            A continuous loop from diagnostic score ingestion to adaptive scaffolding, 
            multimodal real-world simulations, and twisted misconception retention.
          </p>
        </div>

        {/* Interactive Flowchart Container */}
        <div className="flowchart-container glass-panel">
          <div className="flowchart-steps-grid">
            {FLOW_STEPS.map((step, idx) => {
              const isActive = activeFlowStep === step.num;
              return (
                <div
                  key={step.num}
                  className={`flowchart-step-card ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveFlowStep(step.num)}
                >
                  <div className="step-header-row">
                    <span className="step-badge-num">Step 0{step.num}</span>
                    {idx < FLOW_STEPS.length - 1 && (
                      <ChevronRight size={16} className="step-arrow-indicator" />
                    )}
                  </div>
                  <h4 className="step-title">{step.title}</h4>
                  <p className="step-sub">{step.subtitle}</p>
                  <span className="step-metric-chip">{step.metric}</span>
                </div>
              );
            })}
          </div>

          {/* Active Step Detailed Showcase Panel */}
          <div className="active-step-details-box">
            <div className="step-details-header">
              <div className="flex-row items-center gap-3">
                <div className="step-number-disc">
                  {FLOW_STEPS[activeFlowStep - 1].num}
                </div>
                <div>
                  <h3 className="step-active-heading">
                    {FLOW_STEPS[activeFlowStep - 1].title}
                  </h3>
                  <p className="step-active-subtitle text-muted">
                    {FLOW_STEPS[activeFlowStep - 1].subtitle}
                  </p>
                </div>
              </div>
              <span className="step-live-tag">
                <CheckCircle2 size={14} className="text-cyan" /> Stage Active
              </span>
            </div>
            <p className="step-active-explanation">
              {FLOW_STEPS[activeFlowStep - 1].desc}
            </p>
          </div>
        </div>
      </section>

      {/* 2.5 "WHAT DOES STEM STAND FOR?" INFOGRAPHIC SECTION */}
      <section className="landing-section stem-infographic-section">
        <div className="section-header-center">
          <div className="section-tag">
            <Atom size={15} className="text-cyan" />
            <span>FOUNDATIONAL KNOWLEDGE PILLARS</span>
          </div>
          <h2 className="section-title">What Does STEM Stand For?</h2>
          <p className="section-desc">
            The foundational pillars powering modern innovation, critical thinking, and competitive entrance exams.
          </p>
        </div>

        {/* 4-Column Responsive Grid (1 col on mobile, 2 on tablet, 4 on desktop) */}
        <div className="stem-infographic-grid">
          {/* S - Science */}
          <div className="stem-pillar-card glass-panel stem-pillar-s">
            <div className="stem-card-glow-bg glow-cyan" />
            <div className="stem-pillar-header">
              <div className="stem-letter-badge stem-letter-s">
                <span>S</span>
              </div>
              <div className="stem-icon-orbit">
                {/* Science / Atom SVG Icon */}
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00F0FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="2.5" fill="#00F0FF" />
                  <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)" />
                  <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-30 12 12)" />
                </svg>
              </div>
            </div>

            <div className="stem-pillar-body">
              <div className="stem-pillar-title-wrap">
                <h3 className="stem-pillar-name text-cyan">Science</h3>
                <span className="stem-pillar-subtag">Empirical Natural Laws</span>
              </div>
              <p className="stem-pillar-desc">
                Physics, Chemistry, and Biology (Class 11 & 12 state & entrance syllabus).
              </p>
              
              <ul className="stem-pillar-bullets">
                <li><span className="stem-bullet-dot dot-cyan" /><strong>Physics:</strong> Classical mechanics, thermodynamics & electromagnetism</li>
                <li><span className="stem-bullet-dot dot-cyan" /><strong>Chemistry:</strong> Molecular orbital geometry, kinetics & electrochem</li>
                <li><span className="stem-bullet-dot dot-cyan" /><strong>Biology:</strong> Bioenergetics, genetics & human physiology</li>
              </ul>
            </div>

            <div className="stem-pillar-footer">
              <span className="stem-domain-chip chip-cyan">IPE • CBSE • JEE • NEET</span>
            </div>
          </div>

          {/* T - Technology */}
          <div className="stem-pillar-card glass-panel stem-pillar-t">
            <div className="stem-card-glow-bg glow-purple" />
            <div className="stem-pillar-header">
              <div className="stem-letter-badge stem-letter-t">
                <span>T</span>
              </div>
              <div className="stem-icon-orbit">
                {/* Technology / Microchip & Neural Nodes SVG Icon */}
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="4" width="16" height="16" rx="3" />
                  <rect x="8" y="8" width="8" height="8" rx="1.5" fill="rgba(168, 85, 247, 0.2)" />
                  <path d="M1 9h3M1 15h3M20 9h3M20 15h3M9 1v3M15 1v3M9 20v3M15 20v3" />
                </svg>
              </div>
            </div>

            <div className="stem-pillar-body">
              <div className="stem-pillar-title-wrap">
                <h3 className="stem-pillar-name text-purple">Technology</h3>
                <span className="stem-pillar-subtag">Computation & AI Systems</span>
              </div>
              <p className="stem-pillar-desc">
                Computer Science, Artificial Intelligence, and Modern Digital Tools.
              </p>

              <ul className="stem-pillar-bullets">
                <li><span className="stem-bullet-dot dot-purple" /><strong>Algorithms:</strong> Trees, graphs, asymptotic complexity & optimization</li>
                <li><span className="stem-bullet-dot dot-purple" /><strong>Artificial Intelligence:</strong> Neural architectures & language models</li>
                <li><span className="stem-bullet-dot dot-purple" /><strong>Digital Tools:</strong> Cloud fabrics, cyber-security & data analytics</li>
              </ul>
            </div>

            <div className="stem-pillar-footer">
              <span className="stem-domain-chip chip-purple">CSE • Data Science • ML</span>
            </div>
          </div>

          {/* E - Engineering */}
          <div className="stem-pillar-card glass-panel stem-pillar-e">
            <div className="stem-card-glow-bg glow-emerald" />
            <div className="stem-pillar-header">
              <div className="stem-letter-badge stem-letter-e">
                <span>E</span>
              </div>
              <div className="stem-icon-orbit">
                {/* Engineering / Cogwheel & Circuits SVG Icon */}
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </div>
            </div>

            <div className="stem-pillar-body">
              <div className="stem-pillar-title-wrap">
                <h3 className="stem-pillar-name text-emerald">Engineering</h3>
                <span className="stem-pillar-subtag">Applied Real-World Systems</span>
              </div>
              <p className="stem-pillar-desc">
                B.Tech core branches (CSE, ECE, EEE, Mechanical, Civil).
              </p>

              <ul className="stem-pillar-bullets">
                <li><span className="stem-bullet-dot dot-emerald" /><strong>Circuit Networks:</strong> Kirchhoff's laws, Thevenin & RLC resonance</li>
                <li><span className="stem-bullet-dot dot-emerald" /><strong>Solid & Fluid Mechanics:</strong> Stress-strain tensors & Navier-Stokes</li>
                <li><span className="stem-bullet-dot dot-emerald" /><strong>Structures & Systems:</strong> Embedded microcontrollers & statics</li>
              </ul>
            </div>

            <div className="stem-pillar-footer">
              <span className="stem-domain-chip chip-emerald">B.Tech 1st & 2nd Year Core</span>
            </div>
          </div>

          {/* M - Mathematics */}
          <div className="stem-pillar-card glass-panel stem-pillar-m">
            <div className="stem-card-glow-bg glow-gold" />
            <div className="stem-pillar-header">
              <div className="stem-letter-badge stem-letter-m">
                <span>M</span>
              </div>
              <div className="stem-icon-orbit">
                {/* Mathematics / Integral & Infinity SVG Icon */}
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 4h-2a3.5 3.5 0 0 0-3.5 3.5V16a3.5 3.5 0 0 1-3.5 3.5H4" />
                  <path d="M18.5 8a3.5 3.5 0 0 1 0 7 3.5 3.5 0 0 1-3.5-3.5 3.5 3.5 0 0 0-3.5-3.5 3.5 3.5 0 0 0-3.5 3.5 3.5 3.5 0 0 0 0 7" />
                </svg>
              </div>
            </div>

            <div className="stem-pillar-body">
              <div className="stem-pillar-title-wrap">
                <h3 className="stem-pillar-name text-gold">Mathematics</h3>
                <span className="stem-pillar-subtag">The Universal Language</span>
              </div>
              <p className="stem-pillar-desc">
                Calculus, Vectors, Coordinate Geometry, and Differential Equations.
              </p>

              <ul className="stem-pillar-bullets">
                <li><span className="stem-bullet-dot dot-gold" /><strong>Calculus:</strong> Limits, derivatives, definite integrals & series</li>
                <li><span className="stem-bullet-dot dot-gold" /><strong>Linear Algebra:</strong> Matrices, eigenvalues, determinants & spaces</li>
                <li><span className="stem-bullet-dot dot-gold" /><strong>Vector Geometry:</strong> Dot & cross products, planes in 3D</li>
              </ul>
            </div>

            <div className="stem-pillar-footer">
              <span className="stem-domain-chip chip-gold">JEE Main & Adv • Gate • EAMCET</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PEDAGOGICAL ADAPTATION GRAPH (INTERACTIVE BAR CHART) */}
      <section className="landing-section pedagogy-graph-section">
        <div className="section-header-center">
          <div className="section-tag">
            <BarChart3 size={15} className="text-cyan" />
            <span>ADAPTIVE CURRICULUM CALIBRATION</span>
          </div>
          <h2 className="section-title">Pedagogical Adaptation Matrix</h2>
          <p className="section-desc">
            BhashaGuru does not deliver a generic lecture. The system dynamically adjusts the ratio 
            of everyday physical intuition versus mathematical rigor based on past examination performance.
          </p>
        </div>

        {/* Tier Selector Buttons */}
        <div className="tier-pills-row">
          {['Foundation', 'Intermediate', 'Advanced'].map(tierName => {
            const isSelected = selectedPedagogyTier === tierName;
            return (
              <button
                key={tierName}
                type="button"
                className={`tier-switch-btn ${isSelected ? 'active' : ''}`}
                onClick={() => setSelectedPedagogyTier(tierName)}
              >
                <span className="tier-switch-name">{tierName} Tier</span>
                <span className="tier-switch-score">{PEDAGOGY_DATA[tierName].scoreRange}</span>
              </button>
            );
          })}
        </div>

        {/* Comparative Visual Graph Card */}
        <div className="pedagogy-chart-card glass-panel">
          <div className="chart-legend-row">
            <div className="legend-item">
              <span className="legend-indicator legend-intuition" />
              <span>Intuition & Everyday Analogies (%)</span>
            </div>
            <div className="legend-item">
              <span className="legend-indicator legend-rigor" />
              <span>Exam Derivations & Mathematical Rigor (%)</span>
            </div>
          </div>

          {/* Interactive Stacked Ratio Bars */}
          <div className="stacked-bars-container">
            {Object.keys(PEDAGOGY_DATA).map(tierKey => {
              const item = PEDAGOGY_DATA[tierKey];
              const isCurrent = selectedPedagogyTier === tierKey;
              return (
                <div 
                  key={tierKey} 
                  className={`tier-bar-row ${isCurrent ? 'selected-row' : ''}`}
                  onClick={() => setSelectedPedagogyTier(tierKey)}
                >
                  <div className="tier-bar-label">
                    <span className="bar-tier-name">{item.name}</span>
                    <span className="bar-tier-range">{item.scoreRange}</span>
                  </div>

                  <div className="dual-progress-bar-track">
                    <div 
                      className="bar-segment bar-segment-intuition"
                      style={{ width: `${item.intuitionPct}%` }}
                    >
                      <span className="bar-val-text">{item.intuitionPct}% Intuition</span>
                    </div>
                    <div 
                      className="bar-segment bar-segment-rigor"
                      style={{ width: `${item.rigorPct}%` }}
                    >
                      <span className="bar-val-text">{item.rigorPct}% Rigor</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Breakdown for the active tier */}
          <div 
            className="tier-inspect-panel"
            style={{ borderLeft: `4px solid ${currentPedagogy.color}` }}
          >
            <div className="inspect-header-row">
              <div className="flex-row items-center gap-2">
                <Sparkles size={18} style={{ color: currentPedagogy.color }} />
                <h4 className="inspect-title" style={{ color: currentPedagogy.color }}>
                  {currentPedagogy.name}: {currentPedagogy.focus}
                </h4>
              </div>
              <span className="inspect-tone-badge">Tone: {currentPedagogy.tone}</span>
            </div>

            <div className="grid grid-2 gap-4 mt-3">
              <ul className="inspect-bullets">
                {currentPedagogy.bulletPoints.map((pt, i) => (
                  <li key={i} className="inspect-bullet-item">
                    <CheckCircle2 size={15} style={{ color: currentPedagogy.color }} className="flex-shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              <div className="sample-quote-box glass-panel">
                <span className="sample-quote-label">Sample Explanation Excerpt:</span>
                <p className="sample-quote-text">"{currentPedagogy.sampleQuote}"</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 6-TIER MASTERY PROGRESSION FUNNEL */}
      <section className="landing-section mastery-funnel-section">
        <div className="section-header-center">
          <div className="section-tag">
            <Trophy size={15} className="text-gold" />
            <span>PROGRESSION ARCHITECTURE</span>
          </div>
          <h2 className="section-title">6-Tier Mastery Funnel</h2>
          <p className="section-desc">
            Students climb from baseline knowledge to becoming a "Guru" capable of teaching concepts back to the AI.
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
                <Sparkles size={13} className="text-gold flex-shrink-0" />
                <span className="funnel-perk-text">{tier.perk}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CALL TO ACTION BANNER */}
      <section className="landing-cta-banner glass-panel">
        <div className="cta-banner-inner">
          <div className="cta-text">
            <h2 className="cta-title">Ready to Experience Adaptive STEM Mastery?</h2>
            <p className="cta-desc">
              Complete your 30-second academic profiling and unlock tailored derivations, 
              interactive labs, and twisted retention quizzes today.
            </p>
          </div>
          <button
            type="button"
            className="primary-btn cta-large-btn btn-glow"
            onClick={onStartLearning}
          >
            <span>Launch Adaptive Profiling</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </section>
    </div>
  );
}
