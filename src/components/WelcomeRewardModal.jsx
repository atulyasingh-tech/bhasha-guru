// Welcome Milestone Pop-Up Modal
// Congratulates new students, awards +20 Welcome XP, unlocks Rank 1: Bronze,
// and gates entering the workspace with an interactive acknowledgement checkbox.

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Sparkles, Check, ArrowRight, ShieldCheck, Flame, Zap } from 'lucide-react';
import { soundService } from '../services/soundService';

export default function WelcomeRewardModal({
  isOpen,
  onConfirm
}) {
  const [isAcknowledged, setIsAcknowledged] = useState(false);

  useEffect(() => {
    if (isOpen) {
      soundService.playLevelUp();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.5 }
        });
      } catch (e) {}
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBegin = () => {
    if (!isAcknowledged) return;
    soundService.playXpGain();
    onConfirm();
  };

  return (
    <div className="modal-backdrop animate-fade-in" style={{ zIndex: 1100 }}>
      <div className="welcome-reward-card glass-panel animate-scale-up" role="dialog" aria-modal="true">
        {/* Celebration Halo */}
        <div className="reward-glow-ring" />

        <div className="welcome-modal-header text-center">
          <div className="welcome-trophy-orb glow-bronze">
            <Trophy size={36} className="text-bronze animate-bounce-subtle" />
            <div className="sparkle-orbit">
              <Sparkles size={16} className="text-gold animate-spin-slow" />
            </div>
          </div>

          <h2 className="welcome-modal-title">🎉 Welcome to BhashaGuru!</h2>
          <p className="welcome-modal-subtitle">Your STEM Mastery Journey Begins.</p>
        </div>

        {/* Milestone Achievement Banner */}
        <div className="welcome-milestone-banner glass-panel">
          <div className="flex-row items-center gap-2">
            <span className="welcome-badge-icon">🏅</span>
            <div className="milestone-banner-text">
              <span className="milestone-headline">Rank 1: Bronze Unlocked</span>
              <span className="milestone-subtext">+20 Welcome XP Awarded</span>
            </div>
          </div>
          <div className="welcome-xp-pill">
            <Zap size={14} className="text-gold" />
            <span>20 XP</span>
          </div>
        </div>

        {/* Starter Perks Info Grid */}
        <div className="welcome-perks-list mt-3">
          <div className="welcome-perk-row">
            <div className="perk-bullet-dot" />
            <span><strong>Dynamic AI Tutor:</strong> Solves your exact doubts with tailored 3-layer pedagogy.</span>
          </div>
          <div className="welcome-perk-row">
            <div className="perk-bullet-dot" />
            <span><strong>Simplified XP Economy:</strong> Earn <strong>+5 XP</strong> for every new concept explored.</span>
          </div>
          <div className="welcome-perk-row">
            <div className="perk-bullet-dot" />
            <span><strong>5 Teaching Languages:</strong> English, Hindi, Telugu, Hinglish, and Tenglish with natural voice audio.</span>
          </div>
        </div>

        {/* Interactive Checkbox Gate */}
        <div className="welcome-acknowledgement-box mt-4">
          <label className="ack-checkbox-label">
            <input
              type="checkbox"
              className="ack-checkbox-input"
              checked={isAcknowledged}
              onChange={(e) => setIsAcknowledged(e.target.checked)}
              id="welcome-ack-checkbox"
            />
            <span className="ack-custom-checkbox">
              {isAcknowledged && <Check size={14} className="text-white" />}
            </span>
            <span className="ack-text">
              I'm ready to master STEM concepts
            </span>
          </label>
        </div>

        {/* Action Button */}
        <div className="welcome-modal-actions mt-4">
          <button
            type="button"
            className={`primary-btn welcome-begin-btn btn-glow ${!isAcknowledged ? 'disabled-btn' : ''}`}
            onClick={handleBegin}
            disabled={!isAcknowledged}
          >
            <span>Let's Begin</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
