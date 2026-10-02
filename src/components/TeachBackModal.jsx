// Teach-Back Synthesis Modal
// Powers Tier 6 ("Beyond Explaining - Guru Rank"): Student teaches the concept in their own words

import React, { useState } from 'react';
import { Crown, Sparkles, Send, CheckCircle2, AlertCircle, X, Award } from 'lucide-react';
import { evaluateTeachBackSubmission } from '../services/geminiService';
import { soundService } from '../services/soundService';

export default function TeachBackModal({
  isOpen,
  onClose,
  topic,
  profile,
  onMasterGuru
}) {
  const [explanation, setExplanation] = useState('');
  const [evaluating, setEvaluating] = useState(false);
  const [result, setResult] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!explanation.trim() || explanation.trim().length < 20) {
      alert('Please write at least a few sentences explaining the concept in your own words.');
      return;
    }

    setEvaluating(true);
    try {
      const evaluation = await evaluateTeachBackSubmission({
        topicTitle: topic.title,
        studentExplanation: explanation,
        profile
      });
      setResult(evaluation);
      soundService.playLevelUp();
      if (evaluation.score >= 70) {
        onMasterGuru(100);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setEvaluating(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container teach-back-modal glass-panel">
        <div className="modal-header">
          <div className="modal-title-wrap">
            <div className="icon-badge glow-gold">
              <Crown size={22} className="text-gold" />
            </div>
            <div>
              <h2 className="modal-title">Teach-Back Challenge: The Guru Synthesis</h2>
              <p className="modal-subtitle">Rank 6 Mastery: Can you teach "{topic.shortName || topic.title}" simply?</p>
            </div>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body space-y-4">
          <div className="teach-back-intro-card">
            <p>
              Richard Feynman once noted: <em>"If you can't explain it simply, you don't understand it."</em> 
              Synthesize this concept as if you are explaining it to a fellow intermediate student using your chosen dialect (<strong>{profile.language}</strong>).
            </p>
            <div className="scientific-reminder">
              <Sparkles size={14} className="text-cyan" />
              <span>Feel free to use everyday analogies, but preserve formal technical laws and equations!</span>
            </div>
          </div>

          {!result ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-group">
                <label className="form-label">Your Synthesis & Analogy Explanation:</label>
                <textarea
                  className="form-textarea teach-back-input"
                  rows={6}
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  placeholder={`Explain ${topic.title} in your own words (${profile.language}). E.g.: "Jab koi body fluid me jati hai to bottom surface par high hydrostatic pressure hota hai..." or "Think of water wanting to reclaim its space..."`}
                  required
                />
                <span className="char-count">{explanation.trim().split(/\s+/).filter(Boolean).length} words</span>
              </div>

              <button
                type="submit"
                className="primary-btn w-full btn-glow"
                disabled={evaluating}
              >
                {evaluating ? (
                  <span className="flex-row items-center justify-center gap-2">
                    <Sparkles className="animate-spin" size={18} />
                    Evaluating Synthesis with AI Pedagogical Engine...
                  </span>
                ) : (
                  <span className="flex-row items-center justify-center gap-2">
                    <Send size={18} /> Submit for Guru Certification (+100 XP)
                  </span>
                )}
              </button>
            </form>
          ) : (
            <div className="evaluation-result-panel animate-fade-in">
              <div className="score-hero-box">
                <div className="score-circle">
                  <span className="score-num">{result.score}</span>
                  <span className="score-max">/100</span>
                </div>
                <div className="score-meta">
                  <h3 className="verdict-title">{result.verdict}</h3>
                  <p className="verdict-summary">{result.feedback}</p>
                </div>
              </div>

              <div className="strengths-box">
                <h4 className="strengths-title">Demonstrated Pedagogical Strengths:</h4>
                <ul className="strengths-list">
                  {result.strengths?.map((str, i) => (
                    <li key={i}>
                      <CheckCircle2 size={15} className="text-green flex-shrink-0" />
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {result.improvementTip && (
                <div className="improvement-box">
                  <div className="flex-row items-center gap-2 mb-1">
                    <AlertCircle size={15} className="text-amber" />
                    <span className="improvement-title">Guru Polishing Advice:</span>
                  </div>
                  <p className="improvement-text">{result.improvementTip}</p>
                </div>
              )}

              <button
                type="button"
                className="primary-btn w-full mt-3"
                onClick={onClose}
              >
                Accept Guru Honors & Return to Hub
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
