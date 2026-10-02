// Sidebar Component
// Profile summary with chosen STEM avatar, academic track, 6-tier roadmap standing, and "Doubt Vault" query history log

import React from 'react';
import { 
  User, Award, History, Trophy, Sparkles, BookOpen, 
  HelpCircle, ChevronRight, Layers, Trash2, ArrowUpRight, Flame, X 
} from 'lucide-react';
import AvatarDisplay from './AvatarDisplay';
import { MASTERY_TIERS, getTierForXp } from '../data/masteryTiers';

export default function Sidebar({
  profile,
  currentXp = 0,
  doubtVault = [],
  activeTopicTitle = '',
  onSelectVaultTopic,
  onOpenProfile,
  onOpenRoadmap,
  onClearHistory,
  isMobileDrawerOpen = false,
  onCloseMobileDrawer
}) {
  const currentTierInfo = getTierForXp(currentXp);

  const academicTag = profile.educationLevel === 'B.Tech'
    ? `${profile.btechYear || '1st Yr'} • ${profile.branch || 'CSE'}`
    : `${profile.educationLevel || 'Class 11'} ${profile.stream ? `(${profile.stream})` : ''}`;

  const handleSelectTopic = (topic) => {
    onSelectVaultTopic(topic);
    if (onCloseMobileDrawer) onCloseMobileDrawer();
  };

  const handleProfileClick = () => {
    onOpenProfile();
    if (onCloseMobileDrawer) onCloseMobileDrawer();
  };

  const handleRoadmapClick = () => {
    onOpenRoadmap();
    if (onCloseMobileDrawer) onCloseMobileDrawer();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileDrawerOpen && (
        <div 
          className="mobile-drawer-backdrop" 
          onClick={onCloseMobileDrawer}
          aria-hidden="true" 
        />
      )}

      <aside className={`app-sidebar glass-panel ${isMobileDrawerOpen ? 'mobile-drawer-open' : ''}`}>
        {/* Mobile Close Button */}
        <div className="mobile-drawer-close-row">
          <span className="drawer-title">Doubt Vault &amp; Standing</span>
          <button 
            type="button" 
            className="drawer-close-btn" 
            onClick={onCloseMobileDrawer}
            title="Close Drawer"
            aria-label="Close Drawer"
          >
            <X size={18} />
          </button>
        </div>
      {/* 1. Profile Summary Card with Avatar */}
      <div className="sidebar-section profile-summary-box">
        <div className="profile-header">
          <AvatarDisplay
            avatarId={profile.avatarId || 'einstein'}
            customUrl={profile.customAvatarUrl}
            size={46}
          />
          <div className="profile-meta">
            <h3 className="profile-name">{profile.name}</h3>
            <span className="profile-user-handle">@{profile.username || 'student'}</span>
            <span className="profile-grade">{academicTag}</span>
          </div>
          <button 
            type="button" 
            className="profile-edit-btn" 
            onClick={handleProfileClick}
            title="Edit Diagnostic Profile & Re-evaluate"
          >
            Edit
          </button>
        </div>

        <div className="profile-score-grid mt-3">
          <div className="score-stat-cell">
            <span className="stat-label">Academic Score:</span>
            <span className="stat-value">
              {profile.calculatedPercentage || 70}%
              <span className="stat-sub"> (Normalized)</span>
            </span>
          </div>
          <div className="score-stat-cell">
            <span className="stat-label">Pedagogy Tier:</span>
            <span className={`stat-tier tier-${profile.tier?.toLowerCase() || 'intermediate'}`}>
              {profile.tier}
            </span>
          </div>
        </div>
      </div>

      {/* 2. 6-Tier Mastery Standing Widget */}
      <div className="sidebar-section mastery-standing-widget">
        <div className="section-title-row">
          <div className="flex-row items-center gap-2">
            <Trophy size={16} className="text-gold" />
            <h4 className="section-heading">Mastery Standing</h4>
          </div>
          <button 
            type="button" 
            className="view-all-link"
            onClick={handleRoadmapClick}
          >
            Roadmap <ArrowUpRight size={13} />
          </button>
        </div>

        <div className="standing-current-pill" style={{ borderColor: currentTierInfo.color }}>
          <div className="standing-tier-icon" style={{ backgroundColor: currentTierInfo.color }}>
            <Award size={14} className="text-white" />
          </div>
          <div className="standing-tier-text">
            <span className="standing-tier-rank">Rank {currentTierInfo.tierNumber}: {currentTierInfo.name}</span>
            <span className="standing-tier-title">{currentTierInfo.title}</span>
          </div>
        </div>

        {/* Mini 6-Tier Indicator Dots */}
        <div className="mini-tiers-ladder mt-2">
          {MASTERY_TIERS.map((tier) => {
            const isUnlocked = currentXp >= tier.minXp;
            const isCurrent = currentTierInfo.id === tier.id;
            return (
              <div 
                key={tier.id}
                className={`mini-tier-step ${isUnlocked ? 'unlocked' : 'locked'} ${isCurrent ? 'current' : ''}`}
                title={`Rank ${tier.tierNumber}: ${tier.name} (${tier.minXp} XP)`}
                onClick={handleRoadmapClick}
              >
                <div 
                  className="mini-step-dot" 
                  style={{ backgroundColor: isUnlocked ? tier.color : '#334155' }} 
                />
                <span className="mini-step-label">{tier.name.split(' ')[0]}</span>
              </div>
            );
          })}
        </div>

        <div className="xp-bar-container mt-3">
          <div className="flex-between text-xs mb-1">
            <span className="text-muted">{currentXp} XP Total</span>
            <span className="text-cyan font-bold">{currentTierInfo.progressInTier}%</span>
          </div>
          <div className="xp-track">
            <div 
              className="xp-fill" 
              style={{ width: `${currentTierInfo.progressInTier}%` }} 
            />
          </div>
          {currentTierInfo.nextTier && (
            <span className="next-rank-hint">
              {currentTierInfo.xpNeeded} XP to {currentTierInfo.nextTier.name}
            </span>
          )}
        </div>
      </div>

      {/* 3. Doubt Vault: Query History Log */}
      <div className="sidebar-section doubt-vault-section">
        <div className="section-title-row">
          <div className="flex-row items-center gap-2">
            <History size={16} className="text-cyan" />
            <h4 className="section-heading">Doubt Vault</h4>
            <span className="vault-count-badge">{doubtVault.length}</span>
          </div>
          {doubtVault.length > 0 && (
            <button 
              type="button" 
              className="clear-history-btn" 
              onClick={onClearHistory}
              title="Clear Doubt Vault history"
            >
              <Trash2 size={13} />
            </button>
          )}
        </div>

        <p className="vault-subtext">Past queried STEM concepts & diagnostic records:</p>

        <div className="vault-list-scroll">
          {doubtVault.length === 0 ? (
            <div className="empty-vault-state">
              <BookOpen size={24} className="text-muted mb-1" />
              <span>No doubts logged yet. Ask any STEM concept to store it in your Vault.</span>
            </div>
          ) : (
            doubtVault.map((item) => {
              const isActive = activeTopicTitle.toLowerCase() === item.topic.toLowerCase();
              return (
                  <div 
                    key={item.id}
                    className={`vault-item-card ${isActive ? 'active' : ''}`}
                    onClick={() => handleSelectTopic(item.topic)}
                  >
                    <div className="vault-item-header">
                      <span className="vault-topic-name">{item.topic}</span>
                      <ChevronRight size={14} className="vault-arrow" />
                    </div>

                    <div className="vault-item-meta">
                      <span className="vault-lang-pill">{item.language || 'English'}</span>
                      {item.quizzed && (
                        <span className="vault-quiz-pill">
                          Quiz: {item.bestQuizScore || 'Complete'}
                        </span>
                      )}
                      <span className="vault-time">
                        {new Date(item.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
