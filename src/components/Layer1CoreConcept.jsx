// Layer 1: Core Concept & Exam Steps
// Dual format: Intuitive breakdown (Tier + Dialect) + Formal Board Definition, Equations & Variable Keys

import React, { useState } from 'react';
import { BookOpen, CheckCircle, Copy, Check, ChevronRight, Layers, Sparkles } from 'lucide-react';
import MathRenderer from './MathRenderer';
import AudioPlayer from './AudioPlayer';

export default function Layer1CoreConcept({
  data,
  profile,
  isMastered,
  onMasterLayer
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!data) return;
    const equationsText = data.boardEquations?.map(e => `${e.label}: ${e.latex}`).join('\n') || '';
    const text = `${data.formalBoardDefinition}\n\nKey Equations:\n${equationsText}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const intuitiveText = typeof data.intuitiveBreakdown === 'object' && data.intuitiveBreakdown !== null
    ? data.intuitiveBreakdown[profile?.tier]?.[profile?.language] ||
      data.intuitiveBreakdown[profile?.tier]?.English ||
      data.intuitiveBreakdown.Intermediate?.English ||
      ''
    : data.intuitiveBreakdown;

  return (
    <div className="concept-layer-card layer-1-card">
      <div className="layer-header">
        <div className="layer-badge-wrap">
          <span className="layer-pill layer-1-pill">LAYER 1</span>
          <h3 className="layer-heading">Core Concept & Exam Steps</h3>
        </div>
        <div className="layer-header-actions">
          {isMastered && (
            <span className="mastered-tag">
              <CheckCircle size={15} /> Mastered (+25 XP)
            </span>
          )}
        </div>
      </div>

      <p className="layer-summary-lead">{data.summary}</p>

      {/* Audio Narrator for Layer 1 */}
      <AudioPlayer 
        textToRead={intuitiveText}
        title="Listen to Intuitive Concept Breakdown"
        language={profile.language}
      />

      <div className="dual-concept-grid">
        {/* Left Column: Intuitive Breakdown */}
        <div className="intuitive-panel glass-panel">
          <div className="panel-title-bar">
            <div className="flex-row items-center gap-2">
              <Sparkles size={16} className="text-cyan" />
              <span className="panel-title">1A. Intuitive Breakdown</span>
            </div>
            <div className="flex-row gap-2">
              <span className="dialect-mini-badge">{profile.language}</span>
              <span className="tier-mini-badge">{profile.tier} Tier</span>
            </div>
          </div>

          <div className="intuitive-content-box">
            <MathRenderer content={intuitiveText} />
          </div>

          <div className="pedagogy-scaffold-note">
            Scaffolding customized for <strong>{profile.tier} Pedagogy</strong>. Conversational pacing tuned to intermediate mental models.
          </div>
        </div>

        {/* Right Column: Formal Board & Entrance Standard */}
        <div className="formal-panel glass-panel">
          <div className="panel-title-bar">
            <div className="flex-row items-center gap-2">
              <BookOpen size={16} className="text-gold" />
              <span className="panel-title">1B. Formal Board & Entrance Definition</span>
            </div>
            <button
              type="button"
              className="copy-btn"
              onClick={handleCopy}
              title="Copy formal equations to clipboard"
            >
              {copied ? <Check size={14} className="text-green" /> : <Copy size={14} />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>

          <div className="formal-definition-quote">
            <p>"{data.formalBoardDefinition}"</p>
          </div>

          {/* Key Equations in KaTeX */}
          <div className="equations-block">
            <h4 className="equations-title">Governing Equations & Formula Sheet:</h4>
            <div className="equations-list">
              {data.boardEquations?.map((eq, i) => (
                <div key={i} className="equation-row">
                  <span className="equation-label">{eq.label}:</span>
                  <div className="equation-math">
                    <MathRenderer content={eq.latex} block={true} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Variable Key & Units */}
          {data.variableKeys?.length > 0 && (
            <div className="variable-keys-table-wrap">
              <h4 className="equations-title">Variables & SI Units Key:</h4>
              <table className="variable-table">
                <thead>
                  <tr>
                    <th>Symbol</th>
                    <th>Physical Meaning</th>
                    <th>SI Unit</th>
                  </tr>
                </thead>
                <tbody>
                  {data.variableKeys.map((v, idx) => (
                    <tr key={idx}>
                      <td className="symbol-cell"><MathRenderer content={`$${v.symbol}$`} /></td>
                      <td>{v.meaning}</td>
                      <td className="unit-cell">{v.unit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Board & Entrance Exam Steps Guide */}
      {data.examSteps?.length > 0 && (
        <div className="exam-steps-panel glass-panel mt-4">
          <div className="panel-title-bar">
            <div className="flex-row items-center gap-2">
              <Layers size={16} className="text-emerald" />
              <span className="panel-title">Exam Marking Guide: Step-by-Step Derivation & Problem Solving</span>
            </div>
            <span className="board-points-tag">Full Marks Blueprint</span>
          </div>

          <div className="steps-timeline">
            {data.examSteps.map((step, idx) => (
              <div key={idx} className="timeline-step">
                <div className="step-number-bullet">{idx + 1}</div>
                <div className="step-text">
                  <MathRenderer content={step} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
