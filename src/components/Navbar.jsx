import React from 'react';
import { 
  Atom, Trophy, Languages, Volume2, VolumeX, 
  Sparkles, Sun, Moon, Menu, LogOut 
} from 'lucide-react';
import AvatarDisplay from './AvatarDisplay';
import { getTierForXp } from '../data/masteryTiers';

export default function Navbar({
  profile,
  currentXp,
  onOpenProfile,
  onOpenRoadmap,
  onChangeLanguage,
  soundMuted,
  onToggleSound,
  onGoToLanding,
  theme = 'dark',
  onToggleTheme,
  isMobileDrawerOpen,
  onToggleMobileDrawer,
  currentUser = null,
  onSignInGoogle,
  onOpenAuthModal,
  onSignOut
}) {
  const tierInfo = getTierForXp(currentXp);

  // Derive class/branch tag string
  let academicTag = profile.educationLevel || 'Class 11';
  if (profile.educationLevel === 'B.Tech') {
    academicTag = `${profile.btechYear || '1st Yr'} • ${profile.branch || 'CSE'}`;
  } else if (profile.educationLevel === 'Diploma') {
    academicTag = `Diploma • ${profile.branch || 'Mech'}`;
  } else if (profile.educationLevel === 'Pharmacy') {
    academicTag = `Pharmacy • ${profile.specialization?.slice(0, 10) || 'Pharm'}`;
  } else if (profile.stream) {
    academicTag = `${profile.educationLevel} (${profile.stream})`;
  }

  return (
    <header className="top-navbar glass-nav">
      <div className="navbar-container">
        {/* Mobile Drawer Hamburger Menu Button */}
        {onToggleMobileDrawer && (
          <button
            type="button"
            className="mobile-drawer-toggle-btn"
            onClick={onToggleMobileDrawer}
            title="Open Doubt Vault & Mastery Standing"
            aria-label="Open Doubt Vault & Roadmap"
          >
            <Menu size={20} className="text-cyan" />
          </button>
        )}

        {/* Brand Logo & Name */}
        <div className="brand-wrap" onClick={onGoToLanding} title="BhashaGuru - Home">
          <img 
            src="/logo.jpeg" 
            alt="BhashaGuru Logo" 
            className="brand-img-logo" 
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div className="brand-text">
            <div className="brand-title-row">
              <span className="brand-title">BhashaGuru</span>
              <span className="brand-version-tag">AI STEM</span>
            </div>
            <span className="brand-subtitle">Adaptive Pedagogy Engine</span>
          </div>
        </div>

        {/* Center Indicators: Academic Tag, Pedagogy Tier Badge, Language Selector */}
        <div className="center-badges">
          {/* Academic Stream / Class Tag */}
          <button 
            type="button" 
            className="nav-badge class-nav-badge"
            onClick={onOpenProfile}
            title="Current Academic Track (Click to edit)"
          >
            <span className="badge-dot" />
            <span>{academicTag}</span>
          </button>

          {/* Pedagogy Tier Badge */}
          <button 
            type="button" 
            className={`nav-badge pedagogy-nav-badge tier-${profile.tier?.toLowerCase() || 'intermediate'}`}
            onClick={onOpenProfile}
            title={`Assigned Pedagogy: ${profile.tier} (${profile.calculatedPercentage || 80}%)`}
          >
            <Sparkles size={13} />
            <span>{profile.tier} Tier</span>
          </button>

          {/* Language Selector Dropdown (5 Languages) */}
          <div className="language-selector-wrap">
            <Languages size={15} className="text-cyan lang-icon" />
            <select
              aria-label="Teaching Language"
              className="lang-select"
              value={profile.language}
              onChange={(e) => onChangeLanguage(e.target.value)}
            >
              <option value="English">English</option>
              <option value="Hinglish">Hinglish (Hindi+Eng)</option>
              <option value="Tenglish">Tenglish (Telugu+Eng)</option>
              <option value="Hindi">Hindi (Pure)</option>
              <option value="Telugu">Telugu (Pure)</option>
            </select>
          </div>
        </div>

        {/* Right Section: Compact XP Bar, Sound, Dark/Light Mode, Avatar Profile */}
        <div className="nav-right-actions">
          {/* Active XP Progress Pill */}
          <button 
            type="button" 
            className="xp-pill-button glass-panel"
            onClick={onOpenRoadmap}
            title="Click to view 6-Tier Mastery Roadmap"
          >
            <div className="xp-icon-circle" style={{ backgroundColor: tierInfo.color }}>
              <Trophy size={14} className="text-white" />
            </div>
            <div className="xp-details">
              <div className="xp-text-line">
                <span className="xp-val">{currentXp} XP</span>
                <span className="xp-rank-name">{tierInfo.name.split(' ')[0]}</span>
              </div>
              <div className="xp-mini-track">
                <div 
                  className="xp-mini-fill" 
                  style={{ width: `${tierInfo.progressInTier}%` }} 
                />
              </div>
            </div>
          </button>

          {/* Theme Toggler (Dark & Light Mode) */}
          {onToggleTheme && (
            <button
              type="button"
              className="nav-icon-btn theme-toggle-btn"
              onClick={onToggleTheme}
              title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Color Theme"
            >
              {theme === 'dark' ? (
                <Sun size={18} className="text-amber animate-spin-slow" />
              ) : (
                <Moon size={18} className="text-cyan" />
              )}
            </button>
          )}

          {/* Audio Sound Toggle */}
          <button
            type="button"
            className="nav-icon-btn"
            onClick={onToggleSound}
            title={soundMuted ? "Unmute Sound" : "Mute Sound"}
          >
            {soundMuted ? <VolumeX size={18} className="text-muted" /> : <Volume2 size={18} className="text-cyan" />}
          </button>

          {/* Firebase Google Auth Button */}
          {currentUser ? (
            <button
              type="button"
              className="google-signout-btn glass-panel"
              onClick={onSignOut}
              title={`Signed in as ${currentUser.displayName || currentUser.email}. Click to Sign Out`}
            >
              <LogOut size={15} className="text-rose" />
              <span className="auth-btn-label">Sign Out</span>
            </button>
          ) : (
            <button
              type="button"
              className="google-signin-btn glass-panel"
              onClick={onOpenAuthModal || onSignInGoogle}
              title="Sign in to BhashaGuru"
            >
              <svg className="google-icon-svg" viewBox="0 0 24 24" width="16" height="16">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span className="auth-btn-label">Sign In</span>
            </button>
          )}

          {/* Student Profile & Avatar Pill */}
          <button
            type="button"
            className="nav-profile-btn"
            onClick={onOpenProfile}
            title={`Logged in as ${profile.name || 'Student'} (@${profile.username || 'student'})`}
          >
            <AvatarDisplay 
              avatarId={profile.avatarId || 'einstein'}
              customUrl={currentUser?.photoURL || profile.customAvatarUrl}
              size={34}
            />
            <div className="profile-btn-texts">
              <span className="profile-name-text">{(currentUser?.displayName || profile.name)?.split(' ')[0] || 'Student'}</span>
              <span className="profile-user-tag">@{profile.username || 'student'}</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
