// 6-Tier Gamified Mastery System Roadmap Modal
// Module C: Visualizes student rank advancement across the 6 Mastery Tiers

import React from 'react';
import { 
  Trophy, ShieldAlert, Cog, Award, Zap, Code2, Crown, 
  CheckCircle2, Lock, ArrowUpRight, X, Sparkles 
} from 'lucide-react';
import { MASTERY_TIERS, getTierForXp } from '../data/masteryTiers';

export default function MasteryRoadmapModal({
  isOpen,
  onClose,
  currentXp = 0
}) {
  if (!isOpen) return null;

  const currentTierInfo = getTierForXp(currentXp);

  const getTierIcon = (tierId, isUnlocked) => {
    const props = { size: 22, className: isUnlocked ? 'text-cyan' : 'text-muted' };
    switch (tierId) {
      case 'bronze': return <ShieldAlert {...props} />;
      case 'silver': return <Cog {...props} />;
      case 'gold': return <Award {...props} />;
      case 'platinum': return <Zap {...props} />;
      case 'diamond': return <Code2 {...props} />;
      case 'master': default: return <Crown {...props} />;
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container roadmap-modal glass-panel">
        <div className="modal-header">
          <div className="modal-title-wrap">
            <div className="icon-badge glow-gold">
              <Trophy size={22} className="text-gold" />
            </div>
            <div>
              <h2 className="modal-title">6-Tier STEM Mastery Roadmap</h2>
              <p className="modal-subtitle">Current Standing: <strong>{currentTierInfo.name}</strong> ({currentXp} XP)</p>
            </div>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body space-y-4">
          {/* Active XP Progress Banner */}
          <div className="current-standing-card glass-panel">
            <div className="standing-meta">
              <div>
                <span className="standing-tier-badge" style={{ backgroundColor: currentTierInfo.color }}>
                  Rank {currentTierInfo.tierNumber}: {currentTierInfo.name}
                </span>
                <h3 className="standing-title">{currentTierInfo.title}</h3>
              </div>
              <div className="text-right">
                <div className="xp-total-display">{currentXp} <span className="xp-sub">Total XP</span></div>
                {currentTierInfo.nextTier && (
                  <span className="xp-needed-hint">
                    {currentTierInfo.xpNeeded} XP to {currentTierInfo.nextTier.name}
                  </span>
                )}
              </div>
            </div>

            <div className="xp-progress-track mt-3">
              <div 
                className="xp-progress-fill" 
                style={{ width: `${currentTierInfo.progressInTier}%` }}
              />
            </div>
            <div className="flex-between progress-subtext mt-1">
              <span>{currentTierInfo.minXp} XP</span>
              <span>{currentTierInfo.progressInTier}% in Current Tier</span>
              <span>{currentTierInfo.nextTier ? `${currentTierInfo.nextTier.minXp} XP` : 'MAX RANK'}</span>
            </div>
          </div>

          {/* 6 Tiers Ladder */}
          <div className="tiers-ladder-wrap">
            {MASTERY_TIERS.map((tier, idx) => {
              const isUnlocked = currentXp >= tier.minXp;
              const isCurrent = currentTierInfo.id === tier.id;

              return (
                <div 
                  key={tier.id} 
                  className={`tier-ladder-row ${isUnlocked ? 'unlocked' : 'locked'} ${isCurrent ? 'current' : ''}`}
                >
                  <div className="tier-col-icon">
                    <div className="tier-circle" style={{ borderColor: isUnlocked ? tier.color : '#334155' }}>
                      {getTierIcon(tier.id, isUnlocked)}
                    </div>
                    {idx < MASTERY_TIERS.length - 1 && <div className="tier-connector-line" />}
                  </div>

                  <div className="tier-col-content">
                    <div className="tier-header-line">
                      <div className="flex-row items-center gap-2">
                        <span className="tier-num-tag">Rank {tier.tierNumber}</span>
                        <h4 className="tier-name">{tier.name}</h4>
                        {isCurrent && <span className="current-badge">YOU ARE HERE</span>}
                      </div>
                      <span className="tier-xp-threshold">{tier.minXp} XP</span>
                    </div>

                    <p className="tier-core-title">{tier.title}</p>
                    <p className="tier-desc">{tier.description}</p>

                    <div className="tier-perk-badge">
                      <Sparkles size={12} className="text-gold" />
                      <span>{tier.perk}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Simplified XP Economy Guide */}
          <div className="xp-guide-box glass-panel">
            <h4 className="guide-title">BhashaGuru XP Economy:</h4>
            <div className="grid grid-2 gap-2 mt-2">
              <div className="guide-item">
                <span className="guide-xp text-gold font-bold">+20 XP</span>
                <span className="guide-text">Welcome Milestone Bonus awarded upon student registration</span>
              </div>
              <div className="guide-item">
                <span className="guide-xp text-cyan font-bold">+5 XP</span>
                <span className="guide-text">Awarded for every unique STEM concept or doubt asked</span>
              </div>
              <div className="guide-item col-span-2">
                <span className="guide-xp text-emerald font-bold">Progressive Ranks:</span>
                <span className="guide-text">Bronze (0) &rarr; Silver (200) &rarr; Gold (500) &rarr; Platinum (1000) &rarr; Diamond (2000) &rarr; Master (3000+)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
