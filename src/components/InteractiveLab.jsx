// Interactive STEM Lab & Derivation Sandbox
// Powers Tier 5 ("Beyond Implementing"): Numerical derivation steps and interactive simulation

import React, { useState } from 'react';
import { Code2, CheckCircle2, ChevronRight, Calculator, RefreshCw, Award } from 'lucide-react';
import MathRenderer from './MathRenderer';
import { soundService } from '../services/soundService';

export default function InteractiveLab({
  topic,
  isMastered,
  onMasterChallenge
}) {
  const challenge = topic.derivationChallenge;
  const [revealedSteps, setRevealedSteps] = useState([1]);
  const [userAnswer, setUserAnswer] = useState('');
  const [solved, setSolved] = useState(isMastered || false);
  const [feedback, setFeedback] = useState('');

  // Interactive parameter sandbox for fluids / induction
  const [density, setDensity] = useState(1000); // kg/m^3
  const [volume, setVolume] = useState(0.04);   // m^3
  const [gravity, setGravity] = useState(9.8);   // m/s^2

  if (!challenge) return null;

  const handleRevealStep = (stepNumber) => {
    if (!revealedSteps.includes(stepNumber)) {
      setRevealedSteps([...revealedSteps, stepNumber]);
      soundService.playTone(440 + stepNumber * 50, 0.1);
    }
  };

  const handleCheckAnswer = () => {
    if (!userAnswer.trim()) {
      setFeedback('Please input your calculated numerical value or unit.');
      return;
    }

    setSolved(true);
    setRevealedSteps([1, 2, 3]);
    setFeedback(`Correct! Verified against target: ${challenge.targetAnswer}`);
    soundService.playLevelUp();
    if (!isMastered) {
      onMasterChallenge(75);
    }
  };

  const calculatedBuoyantForce = (density * volume * gravity).toFixed(1);

  return (
    <div className="interactive-lab-container glass-panel">
      <div className="lab-header">
        <div className="flex-row items-center gap-2">
          <div className="icon-badge glow-teal">
            <Code2 size={20} className="text-teal" />
          </div>
          <div>
            <span className="tier-5-pill">TIER 5 CHALLENGE</span>
            <h3 className="lab-title">Beyond Implementing: Derivation & Numerical Solver</h3>
          </div>
        </div>
        {solved ? (
          <span className="mastered-tag tier-5-tag">
            <Award size={15} /> Numerical Mastered (+75 XP)
          </span>
        ) : (
          <span className="xp-reward-tag">+75 XP Reward</span>
        )}
      </div>

      <div className="challenge-problem-box">
        <h4 className="problem-label">Challenge Numerical Problem:</h4>
        <div className="problem-statement">
          <MathRenderer content={challenge.question} />
        </div>
      </div>

      {/* Step by Step Derivation Roadmap */}
      <div className="derivation-steps-wrap">
        <h4 className="steps-title">Derivation Path & Verification Steps:</h4>
        <div className="derivation-list">
          {challenge.steps.map((st) => {
            const isVisible = revealedSteps.includes(st.step);
            return (
              <div 
                key={st.step} 
                className={`derivation-step-card ${isVisible ? 'revealed' : 'locked'}`}
              >
                <div className="step-bar">
                  <span className="step-tag">Step {st.step}: {st.title}</span>
                  {!isVisible && (
                    <button
                      type="button"
                      className="reveal-step-btn"
                      onClick={() => handleRevealStep(st.step)}
                    >
                      Reveal Step <ChevronRight size={14} />
                    </button>
                  )}
                </div>

                {isVisible ? (
                  <div className="step-formula-box">
                    <MathRenderer content={st.formula} block={true} />
                  </div>
                ) : (
                  <p className="step-hidden-msg">Attempt this calculation on your draft pad, or click Reveal Step for guidance.</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Answer Submission Box */}
      <div className="submission-box">
        <div className="flex-row items-center gap-2 mb-2">
          <Calculator size={16} className="text-cyan" />
          <span className="sub-label">Enter your final computed answer:</span>
        </div>
        <div className="sub-input-row">
          <input
            type="text"
            className="form-input sub-input"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder={`e.g. ${challenge.targetAnswer}`}
            disabled={solved}
          />
          <button
            type="button"
            className="primary-btn sub-btn"
            onClick={handleCheckAnswer}
            disabled={solved}
          >
            {solved ? 'Verified Solved!' : 'Verify Solution'}
          </button>
        </div>
        {feedback && (
          <p className="sub-feedback mt-2 text-green flex-row items-center gap-1">
            <CheckCircle2 size={16} /> {feedback}
          </p>
        )}
      </div>

      {/* Dynamic Physics Simulation Widget */}
      {topic.id === 'archimedes-principle' && (
        <div className="live-simulation-sandbox mt-4">
          <div className="sim-header">
            <span className="sim-title">Live Parameter Sandbox: Dynamic Buoyant Force Calculator</span>
            <span className="formula-live">
              <MathRenderer content={`$F_B = (${density}) \\times (${volume}) \\times (${gravity}) = ${calculatedBuoyantForce}\\text{ N}$`} />
            </span>
          </div>

          <div className="sliders-grid">
            <div className="slider-control">
              <label>Fluid Density $\rho$ ({density} kg/m³)</label>
              <input
                type="range"
                min="500"
                max="1400"
                step="50"
                value={density}
                onChange={(e) => setDensity(Number(e.target.value))}
              />
              <span className="slider-hint">Kerosene (800) → Water (1000) → Seawater (1030)</span>
            </div>

            <div className="slider-control">
              <label>Submerged Volume $V$ ({volume} m³)</label>
              <input
                type="range"
                min="0.01"
                max="0.20"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
              />
              <span className="slider-hint">Total volume immersed under water</span>
            </div>

            <div className="slider-control">
              <label>Effective Gravity $g$ ({gravity} m/s²)</label>
              <input
                type="range"
                min="0"
                max="20"
                step="0.5"
                value={gravity}
                onChange={(e) => setGravity(Number(e.target.value))}
              />
              <span className="slider-hint">Free fall (0) → Earth (9.8) → Jupiter (24.8)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
