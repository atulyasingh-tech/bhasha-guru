// Layer 4: Beyond the Horizon
// An edge-case "What if?" prompt to test deeper comprehension and unlock rank progression

import React, { useState } from 'react';
import { Zap, HelpCircle, CheckCircle, AlertTriangle, ArrowRight, Sparkles } from 'lucide-react';
import MathRenderer from './MathRenderer';
import AudioPlayer from './AudioPlayer';
import { soundService } from '../services/soundService';

export default function Layer4BeyondHorizon({
  data,
  profile,
  isMastered,
  onMasterLayer
}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(isMastered || false);
  const [attempted, setAttempted] = useState(isMastered || false);

  const handleSelectOption = (opt) => {
    setSelectedOption(opt);
    setAttempted(true);
    setShowExplanation(true);

    if (opt.isCorrect) {
      soundService.playCorrect();
      if (!isMastered) {
        onMasterLayer('layer4', 60);
      }
    } else {
      soundService.playIncorrect();
    }
  };

  const explanationText = typeof data.explanation === 'object' && data.explanation !== null
    ? data.explanation[profile?.language] || data.explanation.English || ''
    : data.explanation;

  return (
    <div className="concept-layer-card layer-4-card">
      <div className="layer-header">
        <div className="layer-badge-wrap">
          <span className="layer-pill layer-4-pill">BEYOND THE HORIZON</span>
          <h3 className="layer-heading">Physical Paradox & Edge-Case Hypothesis</h3>
        </div>
        <div className="layer-header-actions">
          {isMastered ? (
            <span className="mastered-tag tier-4-tag">
              <Zap size={15} /> Beyond Thinking Unlocked (+60 XP)
            </span>
          ) : (
            <span className="rank-unlock-hint">
              <Sparkles size={14} className="text-purple" /> Unlocks Rank 4
            </span>
          )}
        </div>
      </div>

      <div className="paradox-question-box glass-panel">
        <div className="paradox-badge">
          <HelpCircle size={16} className="text-purple" />
          <span>Thought Experiment Challenge</span>
        </div>

        <h4 className="paradox-title">
          <MathRenderer content={data.paradoxQuestion} />
        </h4>

        {data.hint && (
          <div className="paradox-hint">
            <span className="hint-label">Thinking Clue:</span>
            <span className="hint-text"><MathRenderer content={data.hint} /></span>
          </div>
        )}

        {/* Interactive Hypothesis Options */}
        <div className="hypothesis-options-grid">
          {data.interactiveHypothesisOptions?.map((opt) => {
            const isSelected = selectedOption?.id === opt.id;
            let statusClass = '';
            if (attempted) {
              if (opt.isCorrect) statusClass = 'opt-correct';
              else if (isSelected) statusClass = 'opt-incorrect';
            } else if (isSelected) {
              statusClass = 'opt-selected';
            }

            return (
              <button
                key={opt.id}
                type="button"
                className={`hypothesis-btn ${statusClass}`}
                onClick={() => handleSelectOption(opt)}
                disabled={isMastered && opt.isCorrect}
              >
                <div className="opt-marker">{opt.id.toUpperCase()}</div>
                <div className="opt-text">
                  <MathRenderer content={opt.text} />
                </div>
                {attempted && opt.isCorrect && (
                  <CheckCircle size={18} className="text-green flex-shrink-0" />
                )}
                {attempted && isSelected && !opt.isCorrect && (
                  <AlertTriangle size={18} className="text-red flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Immediate Feedback Box */}
        {selectedOption && (
          <div className={`hypothesis-feedback-banner ${selectedOption.isCorrect ? 'banner-success' : 'banner-retry'}`}>
            <div className="feedback-lead">
              {selectedOption.isCorrect ? (
                <>
                  <CheckCircle size={18} className="text-green" />
                  <strong>Brilliant Physical Deduction!</strong>
                </>
              ) : (
                <>
                  <AlertTriangle size={18} className="text-amber" />
                  <strong>Common Mental Trap!</strong>
                </>
              )}
            </div>
            <p className="feedback-detail">{selectedOption.feedback}</p>
          </div>
        )}
      </div>

      {/* Deep Conceptual Resolution */}
      {showExplanation && (
        <div className="paradox-resolution-panel glass-panel mt-4 animate-fade-in">
          <div className="panel-title-bar">
            <span className="panel-title">Deep Conceptual Resolution & Physical Laws</span>
            <span className="dialect-mini-badge">{profile.language}</span>
          </div>

          <div className="resolution-body">
            <MathRenderer content={explanationText} />
          </div>

          <AudioPlayer 
            textToRead={explanationText}
            title="Listen to Paradox Resolution"
            language={profile.language}
          />
        </div>
      )}
    </div>
  );
}
