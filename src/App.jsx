// BhashaGuru (AI-Powered Adaptive STEM Learning Platform)
// Complete 3-Stage User Journey:
// Stage 1: Landing & Methodology Showcase Page (with Ambient Particle Canvas)
// Stage 2: Dynamic Multi-Track Onboarding & Profile Customizer
// Stage 3: Subject Selection & Interactive BhashaGuru AI STEM Chatbot

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, BookOpen, HelpCircle, Layers, Trophy, 
  Crown, CheckCircle2, AlertCircle, RefreshCw, Sun, Moon, LogOut 
} from 'lucide-react';

import LandingPage from './components/LandingPage';
import AdaptiveOnboardingModal from './components/AdaptiveOnboardingModal';
import SubjectSelectorBar from './components/SubjectSelectorBar';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ConceptExplainerTab from './components/ConceptExplainerTab';
import QuickReviseTab from './components/QuickReviseTab';
import MasteryRoadmapModal from './components/MasteryRoadmapModal';
import TeachBackModal from './components/TeachBackModal';
import ApiKeyModal from './components/ApiKeyModal';
import WelcomeRewardModal from './components/WelcomeRewardModal';
import AuthModal from './components/AuthModal';

import { DEMO_TOPICS, getTopicById, getTopicsForSubject } from './data/demoCurriculum';
import { getTierForXp } from './data/masteryTiers';
import { 
  getProfile, saveProfile, getXp, saveXp, 
  getMasteredItems, saveMasteredItem, 
  getDoubtVaultHistory, addDoubtVaultEntry,
  getCurrentStage, saveCurrentStage, getSubjectsForTrack,
  getSavedTheme, saveTheme,
  hasSeenWelcomeReward, markWelcomeRewardSeen
} from './services/storageService';
import { soundService } from './services/soundService';
import { explainConceptWithGemini, formatTopicForProfile } from './services/geminiService';
import { 
  loginWithGoogle, 
  logoutUser, 
  subscribeToAuthChanges 
} from './services/firebaseAuthService';

export default function App() {
  // 1. Persistent State
  const [profile, setProfile] = useState(() => getProfile());
  const [currentUser, setCurrentUser] = useState(null);
  const [theme, setTheme] = useState(() => getSavedTheme());
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [currentStage, setCurrentStage] = useState(() => {
    // ALWAYS open from the Landing Page (Stage 1) by default when opening the link!
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const stageParam = params.get('stage');
      if (stageParam) return parseInt(stageParam, 10);
      if (window.location.hash === '#workspace') return 3;
      if (window.location.hash === '#onboarding') return 2;
    }
    return 1; // Default to Stage 1 (Landing Page)
  });
  const [xp, setXp] = useState(() => getXp());
  const [masteredLayers, setMasteredLayers] = useState(() => getMasteredItems());
  const [doubtVault, setDoubtVault] = useState(() => getDoubtVaultHistory());
  const [soundMuted, setSoundMuted] = useState(false);
  const [isWelcomeRewardOpen, setIsWelcomeRewardOpen] = useState(() => !hasSeenWelcomeReward());
  const [conceptXpToast, setConceptXpToast] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Subscribe to Firebase Authentication State Changes
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((user) => {
      setCurrentUser(user);
      if (user) {
        setProfile((prev) => {
          const updated = {
            ...prev,
            name: prev.name && prev.name !== 'Arjun Sharma' ? prev.name : (user.displayName || prev.name),
            email: user.email || prev.email,
            customAvatarUrl: user.photoURL || prev.customAvatarUrl
          };
          saveProfile(updated);
          return updated;
        });

        // Trigger post-login onboarding if student hasn't completed onboarding yet
        const currentProf = getProfile();
        if (!currentProf.onboarded) {
          setIsOnboardingModalOpen(true);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleOpenAuth = () => {
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = (user, suggestedProfile = null) => {
    setCurrentUser(user);
    soundService.playXpGain();
    setIsAuthModalOpen(false);

    if (suggestedProfile) {
      const updated = saveProfile({
        ...profile,
        ...suggestedProfile,
        name: suggestedProfile.name || user.displayName || profile.name,
        email: user.email || profile.email,
        customAvatarUrl: user.photoURL || profile.customAvatarUrl,
        onboarded: true
      });
      setProfile(updated);

      const trackSubjects = getSubjectsForTrack(updated.educationLevel, updated.stream, updated.branch, updated.specialization);
      if (trackSubjects && trackSubjects.length > 0) {
        setActiveSubject(suggestedProfile.selectedSubject || trackSubjects[0].name);
      }
      handleTransitionStage(3); // Enter workspace immediately
    } else {
      setProfile((prev) => {
        const updated = {
          ...prev,
          name: user.displayName || prev.name,
          email: user.email || prev.email,
          customAvatarUrl: user.photoURL || prev.customAvatarUrl
        };
        saveProfile(updated);
        return updated;
      });

      const currentProf = getProfile();
      if (!currentProf.onboarded) {
        setIsOnboardingModalOpen(true);
      }
    }
  };

  const handleSignInGoogle = async () => {
    handleOpenAuth();
  };

  const handleSignOut = async () => {
    await logoutUser();
    setCurrentUser(null);
  };

  // Synchronize theme to document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.add('light-theme');
      document.body.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
      document.body.classList.remove('light-theme');
    }
    saveTheme(theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // 2. Active Subject & Topic State (Clean state by default, no pre-loaded Archimedes)
  const availableSubjects = getSubjectsForTrack(profile.educationLevel, profile.stream);
  const [activeSubject, setActiveSubject] = useState(
    profile.selectedSubject || availableSubjects[0]?.name || 'Physics'
  );
  const [activeTopic, setActiveTopic] = useState(null); // Clean state by default!
  const [activeTab, setActiveTab] = useState('explainer'); // 'explainer' | 'quiz'
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  // 3. Modal Controls
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);
  const [isRoadmapOpen, setIsRoadmapOpen] = useState(false);
  const [isTeachBackOpen, setIsTeachBackOpen] = useState(false);
  const [isApiKeyOpen, setIsApiKeyOpen] = useState(false);

  // 4. Milestone Level-up Toast
  const [milestoneToast, setMilestoneToast] = useState(null);

  // Synchronize sound preferences
  useEffect(() => {
    soundService.setMuted(soundMuted);
  }, [soundMuted]);

  // Synchronize stage to localStorage
  const handleTransitionStage = (stageNum) => {
    saveCurrentStage(stageNum);
    setCurrentStage(stageNum);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Check for rank progression whenever XP changes
  const handleAwardXp = (amount) => {
    const prevTier = getTierForXp(xp);
    const nextXp = xp + amount;
    saveXp(nextXp);
    setXp(nextXp);
    soundService.playXpGain();

    const newTier = getTierForXp(nextXp);
    if (newTier.tierNumber > prevTier.tierNumber) {
      triggerLevelUpCelebration(newTier);
    }
  };

  const triggerLevelUpCelebration = (tier) => {
    soundService.playLevelUp();
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    setMilestoneToast({
      title: `LEVEL UP! Rank ${tier.tierNumber}: ${tier.name}`,
      subtitle: tier.title,
      perk: tier.perk,
      color: tier.color
    });

    setTimeout(() => {
      setMilestoneToast(null);
    }, 6000);
  };

  // Master an explanation layer (records mastery without layer micro-increments)
  const handleMasterLayer = (topicTitle, layerKey) => {
    const updated = saveMasteredItem(topicTitle, layerKey);
    setMasteredLayers({ ...updated });
    soundService.playXpGain();
  };

  // Profile Save / Update Handler (From Stage 2 Onboarding or Profile modal)
  const handleSaveProfile = (newProfile) => {
    const saved = saveProfile(newProfile);
    setProfile(saved);
    setIsOnboardingModalOpen(false);

    // Make sure active subject belongs to the track
    const trackSubjects = getSubjectsForTrack(saved.educationLevel, saved.stream, saved.branch, saved.specialization);
    const validSubject = trackSubjects.find(s => s.name === activeSubject) 
      ? activeSubject 
      : trackSubjects[0].name;
    setActiveSubject(validSubject);

    // If new user hasn't seen welcome reward, open welcome modal
    if (!hasSeenWelcomeReward()) {
      setIsWelcomeRewardOpen(true);
    }

    // Refresh active topic for updated tier/dialect if active
    if (activeTopic) {
      handleQueryTopic(activeTopic.title, saved);
    }
    handleTransitionStage(3); // Enter Stage 3
  };

  // Subject Selection Handler (Does not force-load any topic; lets student explore)
  const handleSelectSubject = (subjectName) => {
    setActiveSubject(subjectName);
  };

  // Language Change Handler from Navbar
  const handleChangeLanguage = (newLang) => {
    const updated = saveProfile({ ...profile, language: newLang });
    setProfile(updated);
    if (activeTopic) {
      handleQueryTopic(activeTopic.title, updated);
    }
  };

  // Query or Search a STEM Topic (Consults Gemini or Local Curriculum)
  const handleQueryTopic = async (topicTitle, activeProfile = profile) => {
    setIsLoading(true);
    setLoadingMessage(`Consulting BhashaGuru engine for "${topicTitle}"...`);

    try {
      const result = await explainConceptWithGemini({
        topicQuery: topicTitle,
        profile: { ...activeProfile, selectedSubject: activeSubject },
        onProgress: (msg) => setLoadingMessage(msg)
      });

      setActiveTopic(result);

      // Award exactly +5 XP per unique concept explored
      const isUnique = !doubtVault.some(
        d => (d.topic || '').toLowerCase() === (result.title || '').toLowerCase()
      );
      if (isUnique) {
        handleAwardXp(5);
        setConceptXpToast({
          title: '+5 XP Awarded',
          topic: result.title
        });
        setTimeout(() => setConceptXpToast(null), 3500);
      }

      const updatedVault = addDoubtVaultEntry({
        topic: result.title,
        subject: result.subject || activeSubject || 'Physics',
        scoreTier: activeProfile.tier,
        language: activeProfile.language
      });
      setDoubtVault(updatedVault);
      soundService.playLayerUnlock();
    } catch (err) {
      console.error('Error fetching concept:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear Vault History
  const handleClearHistory = () => {
    if (window.confirm('Clear all past queries from your Doubt Vault?')) {
      localStorage.removeItem('bhashaguru_doubt_vault');
      setDoubtVault([]);
    }
  };

  // ----------------------------------------------------------------
  // STAGE 1: LANDING & METHODOLOGY SHOWCASE PAGE
  // ----------------------------------------------------------------
  if (currentStage === 1) {
    return (
      <div className="bhashaguru-app-root landing-view-root" data-theme={theme}>
        {/* Top Clean Nav without Clipping or Overlap */}
        <header className="top-navbar glass-nav landing-header-nav">
          <div className="landing-nav-container">
            <div className="brand-wrap" onClick={() => handleTransitionStage(1)}>
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

            <div className="landing-nav-actions">
              {/* Theme Toggler in Landing Nav */}
              <button
                type="button"
                className="nav-icon-btn theme-toggle-btn glass-panel"
                onClick={handleToggleTheme}
                title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
                aria-label="Toggle Color Theme"
              >
                {theme === 'dark' ? <Sun size={18} className="text-amber" /> : <Moon size={18} className="text-cyan" />}
              </button>

              {/* Firebase Google Auth Button in Landing Header */}
              {currentUser ? (
                <button
                  type="button"
                  className="google-signout-btn glass-panel landing-nav-btn"
                  onClick={handleSignOut}
                  title={`Signed in as ${currentUser.displayName || currentUser.email}. Click to Sign Out`}
                >
                  <LogOut size={15} className="text-rose" />
                  <span className="auth-btn-label">Sign Out</span>
                </button>
              ) : (
                <button
                  type="button"
                  className="google-signin-btn glass-panel landing-nav-btn landing-signin-btn"
                  onClick={handleOpenAuth}
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

              <button
                type="button"
                className="secondary-btn glass-panel landing-nav-btn landing-nav-workspace-btn"
                onClick={() => handleTransitionStage(3)}
              >
                <span>Live Workspace</span>
              </button>

              <button
                type="button"
                className="primary-btn btn-glow landing-nav-btn landing-nav-start-btn"
                onClick={() => handleTransitionStage(2)}
              >
                <span>Start Learning</span>
              </button>
            </div>
          </div>
        </header>

        {/* Landing Page Content with Ambient Canvas */}
        <LandingPage
          onStartLearning={() => handleTransitionStage(2)}
          onExploreDemo={() => handleTransitionStage(3)}
        />

        {/* Auth Modal for Stage 1 */}
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onLoginSuccess={handleAuthSuccess}
        />

        {/* Adaptive Onboarding for Stage 1 if triggered by sign in */}
        <AdaptiveOnboardingModal
          isOpen={isOnboardingModalOpen}
          onClose={() => setIsOnboardingModalOpen(false)}
          initialProfile={profile}
          onSaveProfile={handleSaveProfile}
          onGoToLanding={() => {
            setIsOnboardingModalOpen(false);
            handleTransitionStage(1);
          }}
        />
      </div>
    );
  }

  // ----------------------------------------------------------------
  // STAGE 2: ADAPTIVE ONBOARDING WIZARD VIEW
  // ----------------------------------------------------------------
  if (currentStage === 2) {
    return (
      <div className="bhashaguru-app-root" data-theme={theme}>
        <AdaptiveOnboardingModal
          isOpen={true}
          onClose={() => handleTransitionStage(3)}
          initialProfile={profile}
          onSaveProfile={handleSaveProfile}
          onGoToLanding={() => handleTransitionStage(1)}
        />
      </div>
    );
  }

  // ----------------------------------------------------------------
  // STAGE 3: SUBJECT SELECTION & INTERACTIVE STEM CHATBOT WORKSPACE
  // ----------------------------------------------------------------
  return (
    <div className="bhashaguru-app-root" data-theme={theme}>
      {/* Level-Up Milestone Notification Banner */}
      {milestoneToast && (
        <div className="milestone-toast-banner animate-slide-down">
          <div className="toast-crest glow-gold">
            <Trophy size={24} className="text-gold animate-bounce" />
          </div>
          <div className="toast-body">
            <h4 className="toast-title" style={{ color: milestoneToast.color }}>
              {milestoneToast.title}
            </h4>
            <p className="toast-subtitle">{milestoneToast.subtitle}</p>
            <div className="toast-perk">
              <Sparkles size={12} className="text-gold" />
              <span>Unlocked: {milestoneToast.perk}</span>
            </div>
          </div>
          <button 
            type="button" 
            className="toast-close"
            onClick={() => setMilestoneToast(null)}
          >
            ×
          </button>
        </div>
      )}

      {/* Dynamic +5 XP Concept Toast */}
      {conceptXpToast && (
        <div className="concept-xp-toast glass-panel animate-slide-in">
          <div className="flex-row items-center gap-2">
            <div className="xp-gain-badge glow-gold">
              <Sparkles size={16} className="text-gold" />
            </div>
            <div>
              <span className="toast-headline text-gold font-bold">{conceptXpToast.title}</span>
              <p className="toast-subtext text-xs text-muted">Explored: {conceptXpToast.topic}</p>
            </div>
          </div>
        </div>
      )}

      {/* Streamlined Stage 3 Header: Avatar, Username, Class/Branch, Pedagogy Badge, Dialect, XP Bar */}
      <Navbar
        profile={profile}
        currentXp={xp}
        onOpenProfile={() => setIsOnboardingModalOpen(true)}
        onOpenRoadmap={() => setIsRoadmapOpen(true)}
        onChangeLanguage={handleChangeLanguage}
        soundMuted={soundMuted}
        onToggleSound={() => setSoundMuted(!soundMuted)}
        onGoToLanding={() => handleTransitionStage(1)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        isMobileDrawerOpen={isMobileDrawerOpen}
        onToggleMobileDrawer={() => setIsMobileDrawerOpen(prev => !prev)}
        currentUser={currentUser}
        onSignInGoogle={handleOpenAuth}
        onOpenAuthModal={handleOpenAuth}
        onSignOut={handleSignOut}
      />

      {/* Tailored Subject Selector Bar */}
      <div className="workspace-subject-bar-wrap">
        <SubjectSelectorBar
          profile={profile}
          activeSubject={activeSubject}
          onSelectSubject={handleSelectSubject}
          onSelectPromptTopic={(prompt) => handleQueryTopic(prompt)}
        />
      </div>

      {/* Main Workspace Layout: Sidebar + Main Interactive Chatbot Console */}
      <div className="workspace-layout">
        {/* Left Sidebar (Desktop or Mobile Drawer) */}
        <Sidebar
          profile={profile}
          currentXp={xp}
          doubtVault={doubtVault}
          activeTopicTitle={activeTopic?.title || ''}
          onSelectVaultTopic={(topicName) => handleQueryTopic(topicName)}
          onOpenProfile={() => setIsOnboardingModalOpen(true)}
          onOpenRoadmap={() => setIsRoadmapOpen(true)}
          onClearHistory={handleClearHistory}
          isMobileDrawerOpen={isMobileDrawerOpen}
          onCloseMobileDrawer={() => setIsMobileDrawerOpen(false)}
        />

        {/* Center Main Content Panel */}
        <main className="main-content-panel">
          {/* Dual-Tab Navigation Bar */}
          <div className="dual-tab-nav glass-panel">
            <button
              type="button"
              className={`tab-btn ${activeTab === 'explainer' ? 'active' : ''}`}
              onClick={() => setActiveTab('explainer')}
            >
              <div className="tab-icon-wrap">
                <BookOpen size={18} />
              </div>
              <div className="tab-meta">
                <span className="tab-name">3-Layer Concept Explainer</span>
                <span className="tab-desc">Adaptive Scaffolding & Origin Stories</span>
              </div>
            </button>

            <button
              type="button"
              className={`tab-btn ${activeTab === 'quiz' ? 'active' : ''}`}
              onClick={() => setActiveTab('quiz')}
            >
              <div className="tab-icon-wrap">
                <HelpCircle size={18} />
              </div>
              <div className="tab-meta">
                <span className="tab-name">Twisted Diagnostic Quiz</span>
                <span className="tab-desc">3-Question Rapid Misconception Buster</span>
              </div>
            </button>
          </div>

          {/* Active Tab Views */}
          <div className="tab-view-content mt-4">
            {activeTab === 'explainer' ? (
              <ConceptExplainerTab
                topic={activeTopic}
                activeSubject={activeSubject}
                profile={profile}
                masteredLayers={masteredLayers}
                onMasterLayer={handleMasterLayer}
                onOpenTeachBack={() => setIsTeachBackOpen(true)}
                onOpenQuiz={() => setActiveTab('quiz')}
                onQueryTopic={handleQueryTopic}
                onClearTopic={() => setActiveTopic(null)}
                isLoading={isLoading}
                loadingMessage={loadingMessage}
              />
            ) : (
              <QuickReviseTab
                activeTopic={activeTopic}
                allTopics={DEMO_TOPICS}
                doubtVault={doubtVault}
                onSelectTopic={(t) => setActiveTopic(t)}
                onAwardXp={handleAwardXp}
                onSwitchToExplainer={() => setActiveTab('explainer')}
              />
            )}
          </div>
        </main>
      </div>

      {/* Modals */}
      <AdaptiveOnboardingModal
        isOpen={isOnboardingModalOpen}
        onClose={() => setIsOnboardingModalOpen(false)}
        initialProfile={profile}
        onSaveProfile={handleSaveProfile}
        onGoToLanding={() => {
          setIsOnboardingModalOpen(false);
          handleTransitionStage(1);
        }}
      />

      <MasteryRoadmapModal
        isOpen={isRoadmapOpen}
        onClose={() => setIsRoadmapOpen(false)}
        currentXp={xp}
      />

      <TeachBackModal
        isOpen={isTeachBackOpen}
        onClose={() => setIsTeachBackOpen(false)}
        topic={activeTopic}
        profile={profile}
        onMasterGuru={() => activeTopic && handleMasterLayer(activeTopic.title, 'guru')}
      />

      {/* Welcome Reward Pop-Up Modal */}
      <WelcomeRewardModal
        isOpen={isWelcomeRewardOpen}
        onConfirm={() => {
          markWelcomeRewardSeen();
          setIsWelcomeRewardOpen(false);
        }}
      />

      {/* Auth Modal for Stage 3 */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleAuthSuccess}
      />
    </div>
  );
}
