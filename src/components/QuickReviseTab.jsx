// Module D: Retention Module ("Twisted" Quick Revision Quiz)
// Generates a 3-question diagnostic quiz:
// Q1: Direct Retrieval, Q2: Twisted Real-World Scenario, Q3: Misconception Buster

import React, { useState, useEffect } from 'react';
import { 
  HelpCircle, CheckCircle2, XCircle, AlertTriangle, 
  RotateCcw, Sparkles, BookOpen, ArrowRight, Award, Trophy, ChevronRight 
} from 'lucide-react';
import MathRenderer from './MathRenderer';
import { soundService } from '../services/soundService';
import { updateDoubtVaultQuizScore } from '../services/storageService';

export default function QuickReviseTab({
  activeTopic,
  allTopics = [],
  doubtVault = [],
  onSelectTopic,
  onAwardXp,
  onSwitchToExplainer
}) {
  const [selectedTopicId, setSelectedTopicId] = useState(activeTopic?.id || allTopics[0]?.id);
  const currentTopic = allTopics.find(t => t.id === selectedTopicId) || activeTopic || allTopics[0];
  const questions = currentTopic?.twistedQuiz || [];

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { 0: 'A', 1: 'C' }
  const [isSubmitted, setIsSubmitted] = useState({}); // { 0: true }
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [earnedXp, setEarnedXp] = useState(0);

  // Reset quiz state when topic changes
  useEffect(() => {
    setCurrentQIndex(0);
    setUserAnswers({});
    setIsSubmitted({});
    setQuizCompleted(false);
    setEarnedXp(0);
  }, [selectedTopicId]);

  const currentQ = questions[currentQIndex];

  const handleSelectOption = (optionLabel) => {
    if (isSubmitted[currentQIndex]) return;
    setUserAnswers(prev => ({
      ...prev,
      [currentQIndex]: optionLabel
    }));
  };

  const handleCheckAnswer = () => {
    if (!userAnswers[currentQIndex] || isSubmitted[currentQIndex]) return;

    const chosenOption = currentQ.options.find(o => o.label === userAnswers[currentQIndex]);
    const isCorrect = chosenOption?.isCorrect;

    setIsSubmitted(prev => ({
      ...prev,
      [currentQIndex]: true
    }));

    if (isCorrect) {
      soundService.playCorrect();
      setEarnedXp(prev => prev + 20);
      onAwardXp(20);
    } else {
      soundService.playIncorrect();
    }
  };

  const handleNext = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
    } else {
      // Finish quiz
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setQuizCompleted(true);
    let correctCount = 0;
    questions.forEach((q, idx) => {
      const selected = userAnswers[idx];
      const opt = q.options.find(o => o.label === selected);
      if (opt?.isCorrect) correctCount++;
    });

    const scoreString = `${correctCount}/${questions.length}`;
    updateDoubtVaultQuizScore(currentTopic.title, scoreString);

    if (correctCount === questions.length) {
      soundService.playLevelUp();
      // Bonus XP for perfect 3/3
      setEarnedXp(prev => prev + 15);
      onAwardXp(15);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQIndex(0);
    setUserAnswers({});
    setIsSubmitted({});
    setQuizCompleted(false);
    setEarnedXp(0);
  };

  if (!questions || questions.length === 0) {
    return (
      <div className="empty-quiz-state glass-panel text-center p-8">
        <HelpCircle size={40} className="text-muted mx-auto mb-3" />
        <h3>No Diagnostic Questions Available for this Topic</h3>
        <p className="text-muted">Select an intermediate topic from the list to test your recall.</p>
      </div>
    );
  }

  return (
    <div className="quick-revise-container">
      {/* Quiz Header & Topic Picker */}
      <div className="quiz-top-bar glass-panel">
        <div className="flex-row items-center gap-3">
          <div className="icon-badge glow-purple">
            <HelpCircle size={20} className="text-purple" />
          </div>
          <div>
            <h2 className="quiz-heading">Twisted Diagnostic Revision</h2>
            <p className="quiz-subheading">Retention Engine: Rapid 3-Question Misconception Diagnostic</p>
          </div>
        </div>

        {/* Topic Selector Dropdown */}
        <div className="topic-select-wrap">
          <label htmlFor="quiz-topic-select" className="topic-select-label">Select Concept:</label>
          <select
            id="quiz-topic-select"
            className="form-select topic-dropdown"
            value={selectedTopicId}
            onChange={(e) => {
              setSelectedTopicId(e.target.value);
              const found = allTopics.find(t => t.id === e.target.value);
              if (found) onSelectTopic(found);
            }}
          >
            {allTopics.map(t => (
              <option key={t.id} value={t.id}>
                {t.title} ({t.grade})
              </option>
            ))}
          </select>
        </div>
      </div>

      {!quizCompleted ? (
        <div className="quiz-active-card glass-panel mt-4">
          {/* Progress Indicator */}
          <div className="quiz-progress-header">
            <div className="question-counter">
              <span className="current-q-num">Question {currentQIndex + 1}</span> of {questions.length}
            </div>
            <div className="question-type-badge">
              {currentQ.type}
            </div>
            <div className="xp-meter-badge">
              <Sparkles size={14} className="text-gold" />
              <span>Earned: +{earnedXp} XP</span>
            </div>
          </div>

          <div className="quiz-step-dots">
            {questions.map((_, i) => (
              <div 
                key={i} 
                className={`step-dot ${i === currentQIndex ? 'active' : ''} ${isSubmitted[i] ? 'answered' : ''}`}
              />
            ))}
          </div>

          {/* Question Text */}
          <div className="quiz-question-box">
            <h3 className="quiz-question-text">
              <MathRenderer content={currentQ.question} />
            </h3>
          </div>

          {/* Options Grid */}
          <div className="quiz-options-list">
            {currentQ.options.map((option) => {
              const isSelected = userAnswers[currentQIndex] === option.label;
              const hasAnswered = isSubmitted[currentQIndex];
              let optionClass = '';

              if (hasAnswered) {
                if (option.isCorrect) {
                  optionClass = 'correct-opt';
                } else if (isSelected && !option.isCorrect) {
                  optionClass = 'wrong-opt';
                }
              } else if (isSelected) {
                optionClass = 'selected-opt';
              }

              return (
                <button
                  key={option.label}
                  type="button"
                  className={`quiz-option-card ${optionClass}`}
                  onClick={() => handleSelectOption(option.label)}
                  disabled={hasAnswered}
                >
                  <div className="option-label-circle">{option.label}</div>
                  <div className="option-text-wrap">
                    <MathRenderer content={option.text} />
                  </div>
                  {hasAnswered && option.isCorrect && (
                    <CheckCircle2 size={20} className="text-green flex-shrink-0" />
                  )}
                  {hasAnswered && isSelected && !option.isCorrect && (
                    <XCircle size={20} className="text-red flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanatory Feedback (after submit) */}
          {isSubmitted[currentQIndex] && (
            <div className={`answer-feedback-box ${currentQ.options.find(o => o.label === userAnswers[currentQIndex])?.isCorrect ? 'fb-correct' : 'fb-wrong'} animate-fade-in`}>
              <div className="fb-header">
                {currentQ.options.find(o => o.label === userAnswers[currentQIndex])?.isCorrect ? (
                  <>
                    <CheckCircle2 size={18} className="text-green" />
                    <strong>Correct! +20 XP Awarded</strong>
                  </>
                ) : (
                  <>
                    <AlertTriangle size={18} className="text-amber" />
                    <strong>Concept Trap Detected</strong>
                  </>
                )}
              </div>
              <div className="fb-explanation">
                <MathRenderer content={currentQ.explanation} />
              </div>
            </div>
          )}

          {/* Navigation / Action Bar */}
          <div className="quiz-actions-footer">
            {!isSubmitted[currentQIndex] ? (
              <button
                type="button"
                className="primary-btn submit-answer-btn btn-glow"
                onClick={handleCheckAnswer}
                disabled={!userAnswers[currentQIndex]}
              >
                Submit & Verify Answer
              </button>
            ) : (
              <button
                type="button"
                className="primary-btn next-question-btn"
                onClick={handleNext}
              >
                {currentQIndex < questions.length - 1 ? (
                  <>Next Question <ChevronRight size={16} /></>
                ) : (
                  <>View Final Diagnostic Report <Trophy size={16} /></>
                )}
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Completed Results Card */
        <div className="quiz-results-card glass-panel mt-4 animate-scale-up">
          <div className="results-trophy-badge glow-gold">
            <Trophy size={48} className="text-gold" />
          </div>

          <h2 className="results-title">Diagnostic Quiz Complete!</h2>
          <p className="results-subtitle">
            Concept: <strong>{currentTopic.title}</strong>
          </p>

          <div className="results-score-pill">
            <span className="score-big">
              {Object.keys(userAnswers).filter(idx => {
                const q = questions[idx];
                const sel = userAnswers[idx];
                return q?.options.find(o => o.label === sel)?.isCorrect;
              }).length} / {questions.length} Correct
            </span>
            <span className="score-xp">+{earnedXp} Total XP Earned</span>
          </div>

          <div className="retention-diagnostic-summary">
            <h4>Diagnostic Breakdown:</h4>
            <div className="summary-list">
              {questions.map((q, idx) => {
                const chosen = userAnswers[idx];
                const opt = q.options.find(o => o.label === chosen);
                const isCorrect = opt?.isCorrect;
                return (
                  <div key={idx} className="summary-row">
                    <span className="q-tag">Q{idx + 1}: {q.type.split('(')[0]}</span>
                    {isCorrect ? (
                      <span className="status-badge status-pass">
                        <CheckCircle2 size={14} /> Mastered
                      </span>
                    ) : (
                      <span className="status-badge status-fail">
                        <AlertTriangle size={14} /> Needs Review
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="results-buttons">
            <button
              type="button"
              className="secondary-btn"
              onClick={handleRestartQuiz}
            >
              <RotateCcw size={16} /> Retake Diagnostic
            </button>
            <button
              type="button"
              className="primary-btn btn-glow"
              onClick={onSwitchToExplainer}
            >
              <BookOpen size={16} /> Review Concept in Explainer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
