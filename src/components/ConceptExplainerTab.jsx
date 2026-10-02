// Module B: Interactive BhashaGuru STEM Chatbot & Learning Console
// Features: Direct Conversational Answer to user's exact query + 4-Layer Pedagogical Deep-Dive + 2-Way Ongoing Follow-Up Doubt Thread

import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Sparkles, BookOpen, Layers, Cog, Award, 
  Zap, Code2, Crown, HelpCircle, ArrowRight, CheckCircle2,
  Bot, Send, MessageSquareQuote, ShieldCheck, PlayCircle,
  RotateCcw, Compass, Atom, FlaskConical, Infinity as InfinityIcon,
  MessageSquare, User, Volume2
} from 'lucide-react';
import Layer1CoreConcept from './Layer1CoreConcept';
import Layer2RealWorld from './Layer2RealWorld';
import Layer3OriginStory from './Layer3OriginStory';
import Layer4BeyondHorizon from './Layer4BeyondHorizon';
import InteractiveLab from './InteractiveLab';
import MathRenderer from './MathRenderer';
import AvatarDisplay from './AvatarDisplay';
import AudioPlayer from './AudioPlayer';
import DynamicConceptDiagram from './DynamicConceptDiagram';
import { sendFollowUpChat } from '../services/geminiService';

export default function ConceptExplainerTab({
  topic = null,
  activeSubject = 'Physics',
  profile,
  masteredLayers = {},
  onMasterLayer,
  onOpenTeachBack,
  onOpenQuiz,
  onQueryTopic,
  onClearTopic,
  isLoading,
  loadingMessage
}) {
  const [searchInput, setSearchInput] = useState('');
  const [activeSection, setActiveSection] = useState('all'); // 'all' | 'layer1' | 'layer2' | 'layer3' | 'layer4' | 'lab'
  
  // 2-Way Follow-Up Chat State
  const [chatMessages, setChatMessages] = useState([]);
  const [followUpInput, setFollowUpInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatBottomRef = useRef(null);

  // Sync initial conversation messages when topic loads
  useEffect(() => {
    if (topic) {
      const initial = [];
      if (topic.query) {
        initial.push({
          id: 'q-initial',
          role: 'user',
          text: topic.query,
          timestamp: new Date().toISOString()
        });
      }
      if (topic.directAnswer) {
        initial.push({
          id: 'a-initial',
          role: 'guru',
          text: topic.directAnswer,
          timestamp: new Date().toISOString()
        });
      }
      setChatMessages(initial);
    } else {
      setChatMessages([]);
    }
  }, [topic?.id, topic?.title]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onQueryTopic(searchInput.trim());
      setSearchInput('');
    }
  };

  const handleSendFollowUp = async (userText) => {
    const textToSend = (userText || followUpInput).trim();
    if (!textToSend || !topic || isChatLoading) return;

    const userMsg = {
      id: `usr-${Date.now()}`,
      role: 'user',
      text: textToSend,
      timestamp: new Date().toISOString()
    };

    const updatedMessages = [...chatMessages, userMsg];
    setChatMessages(updatedMessages);
    setFollowUpInput('');
    setIsChatLoading(true);

    try {
      const reply = await sendFollowUpChat({
        topic,
        query: textToSend,
        conversationHistory: updatedMessages.map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          text: m.text
        })),
        profile
      });

      setChatMessages(prev => [
        ...prev,
        {
          id: `guru-${Date.now()}`,
          role: 'guru',
          text: reply.text,
          timestamp: reply.timestamp || new Date().toISOString()
        }
      ]);
    } catch (err) {
      setChatMessages(prev => [
        ...prev,
        {
          id: `guru-${Date.now()}`,
          role: 'guru',
          text: `Regarding **${topic.title}**: This is a key principle in ${topic.subject || 'STEM'}. ${topic.formulaLatex ? `It connects to the governing equation $${topic.formulaLatex}$.` : 'It is governed by foundational qualitative mechanisms.'} (Note: ${err.message})`,
          timestamp: new Date().toISOString()
        }
      ]);
    } finally {
      setIsChatLoading(false);
      setTimeout(() => {
        chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  // Dynamic high-yield topic recommendations per subject
  const SUBJECT_RECOMMENDATIONS = {
    'Physics': [
      { title: "Archimedes' Principle & Buoyancy", chapter: "Fluid Mechanics", desc: "Buoyant force, hydrostatic pressure gradient & law of floatation" },
      { title: "Lenz's Law & Electromagnetic Induction", chapter: "Electromagnetism", desc: "Conservation of energy, induced EMF & eddy current damping" },
      { title: "Bernoulli's Principle & Dynamic Lift", chapter: "Fluids in Motion", desc: "Pressure-velocity tradeoff, aerofoil lift & venturimeter" },
      { title: "Projectile Motion & Trajectory", chapter: "Kinematics", desc: "Parabolic trajectory, range maximization & air resistance limit" }
    ],
    'Chemistry': [
      { title: "Chemical Equilibrium & Le Chatelier's Principle", chapter: "Physical Chemistry", desc: "Dynamic equilibrium shifts under concentration, pressure, and temperature" },
      { title: "Hybridization in PCl5 & Molecular Geometry", chapter: "Chemical Bonding", desc: "sp3d axial vs equatorial bond repulsion and trigonal bipyramidal structure" },
      { title: "Nernst Equation & Electrochemical Cells", chapter: "Electrochemistry", desc: "Cell EMF, standard reduction potentials & reaction quotient Q" },
      { title: "Gibbs Free Energy & Reaction Spontaneity", chapter: "Thermodynamics", desc: "ΔG = ΔH - TΔS, entropy production & equilibrium constant relation" }
    ],
    'Mathematics': [
      { title: "Fundamental Theorem of Calculus & Definite Integrals", chapter: "Integral Calculus", desc: "Connecting antiderivatives to signed area under arbitrary curves" },
      { title: "Mean Value Theorem & Rolle's Theorem", chapter: "Differential Calculus", desc: "Geometric secant slopes, tangent tangents & differentiability bounds" },
      { title: "Matrices, Determinants & System of Equations", chapter: "Linear Algebra", desc: "Cramer's rule, matrix inversion & non-trivial null spaces" }
    ],
    'Biology': [
      { title: "Chemiosmotic ATP Synthesis & Proton Motive Force", chapter: "Cellular Bioenergetics", desc: "Mitchell hypothesis, proton pumping & F0F1 ATP synthase rotor" },
      { title: "DNA Replication Fork & Okazaki Fragments", chapter: "Molecular Genetics", desc: "Leading vs lagging strand synthesis, RNA primers & DNA ligase" },
      { title: "Neuron Action Potential & Sodium-Potassium Pumps", chapter: "Neurophysiology", desc: "Depolarization threshold, voltage-gated ion channels & refractory period" }
    ],
    'Engineering Physics': [
      { title: "Schrödinger Wave Equation & Quantum Wells", chapter: "Quantum Mechanics", desc: "1D particle in a box, quantized energy eigenvalues & wave packet tunneling" },
      { title: "Laser Population Inversion & Stimulated Emission", chapter: "Photonics", desc: "Metastable states, optical resonators & Einstein A/B coefficients" },
      { title: "Superconductivity & Meissner Effect", chapter: "Solid State", desc: "Zero electrical resistivity, magnetic flux expulsion & Cooper pairs" }
    ],
    'Circuit Theory': [
      { title: "Thevenin's & Norton's Equivalent Circuits", chapter: "Network Theorems", desc: "Open-circuit voltage V_th, Norton short-circuit current I_N & R_th" },
      { title: "Kirchhoff's Laws (KCL/KVL) & Mesh Analysis", chapter: "Circuit Fundamentals", desc: "Conservation of charge & energy across multi-loop planar networks" },
      { title: "RLC Series Resonance & Q-Factor", chapter: "AC Analysis", desc: "Resonant frequency ω₀ = 1/√(LC), bandwidth & sharpness of resonance" }
    ],
    'Data Structures & Algorithms': [
      { title: "AVL Binary Search Tree Self-Balancing Rotations", chapter: "Balanced Trees", desc: "Balance factors, single and double tree rotations in guaranteed O(log n)" },
      { title: "Dijkstra's Shortest Path & Priority Queues", chapter: "Graph Algorithms", desc: "Greedy edge relaxation, adjacency lists & single-source shortest paths" },
      { title: "Dynamic Programming: 0/1 Knapsack", chapter: "Algorithm Design", desc: "Optimal substructure, overlapping subproblems & tabulation matrices" }
    ],
    'Engineering Mechanics': [
      { title: "Stress-Strain Tensors & Mohr's Circle", chapter: "Solid Mechanics", desc: "Principal normal stresses, maximum shear & graphical stress transformation" },
      { title: "Shear Force & Bending Moment Diagrams (SFD/BMD)", chapter: "Structures", desc: "Point loads, uniformly distributed loads & inflection points" }
    ],
    'Engineering Maths': [
      { title: "Eigenvalues, Eigenvectors & Cayley-Hamilton", chapter: "Linear Algebra", desc: "Characteristic polynomials, matrix powers & diagonalization" },
      { title: "Fourier Series & Half-Range Expansions", chapter: "Fourier Analysis", desc: "Orthogonal trigonometric basis, Dirichlet conditions & harmonic coefficients" }
    ]
  };

  const currentTopicMastery = topic ? (masteredLayers[topic.title] || {}) : {};
  const currentRecommendations = SUBJECT_RECOMMENDATIONS[activeSubject] || SUBJECT_RECOMMENDATIONS['Physics'];

  return (
    <div className="concept-explainer-view">
      {/* 1. Conversational Chatbot Prompt Console */}
      <div className="chatbot-console-container glass-panel">
        <div className="console-header-row">
          <div className="flex-row items-center gap-2">
            <div className="chatbot-badge glow-cyan">
              <Bot size={18} className="text-cyan" />
            </div>
            <div>
              <span className="console-title">BhashaGuru AI Learning Console</span>
              <span className="console-subtitle">
                Calibrated to {profile.tier} Tier • {profile.language} Dialect
              </span>
            </div>
          </div>

          <div className="strict-math-indicator">
            <ShieldCheck size={14} className="text-emerald" />
            <span>Formulas strictly in English KaTeX</span>
          </div>
        </div>

        {/* Input Form with Clean Spacing & Proper Touch Targets */}
        <form onSubmit={handleSearchSubmit} className="doubt-input-form mt-3">
          <div className="search-input-group">
            <div className="chat-avatar-wrap">
              <AvatarDisplay 
                avatarId={profile.avatarId || 'einstein'}
                customUrl={profile.customAvatarUrl}
                size={34}
              />
            </div>

            <input
              type="text"
              className="doubt-search-field"
              placeholder={`Ask any ${activeSubject || 'STEM'} question in ${profile.language} (e.g. "What is Le Chatelier's principle?", "Explain Hybridization in PCl5")...`}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              disabled={isLoading}
            />

            <button
              type="submit"
              className="primary-btn search-submit-btn btn-glow"
              disabled={isLoading || !searchInput.trim()}
            >
              {isLoading ? (
                <span className="flex-row items-center gap-2">
                  <Sparkles className="animate-spin" size={15} /> Thinking...
                </span>
              ) : (
                <span className="flex-row items-center gap-2">
                  <Send size={15} /> Ask Guru
                </span>
              )}
            </button>
          </div>
        </form>

        {/* Quick Conversational Prompt Chips */}
        <div className="quick-suggestions-row">
          <span className="suggestions-label">Try Asking:</span>
          {[
            activeSubject === 'Chemistry' ? "What is Le Chatelier's principle?" : "Why do airplanes fly (Bernoulli)?",
            activeSubject === 'Chemistry' ? "Explain Hybridization in PCl5" : "Derive Lenz's law step-by-step",
            "Give me a real-world engineering application",
            "Explain this concept in simple words"
          ].map((sample, idx) => (
            <button
              key={idx}
              type="button"
              className="suggestion-chip"
              onClick={() => onQueryTopic(sample)}
              disabled={isLoading}
            >
              <MessageSquareQuote size={12} className="text-cyan flex-shrink-0" />
              <span>{sample}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Loading State */}
      {isLoading && (
        <div className="loading-state-card glass-panel text-center p-8 mt-4 animate-pulse">
          <div className="icon-badge glow-cyan mx-auto mb-3">
            <Sparkles size={32} className="text-cyan animate-spin" />
          </div>
          <h3 className="loading-title">Synthesizing Pedagogical Module...</h3>
          <p className="loading-desc">{loadingMessage || 'Applying dynamic scaffolding and dialect formatting...'}</p>
        </div>
      )}

      {/* 3. CLEAN EMPTY STATE (Shown when no topic is currently queried) */}
      {!isLoading && !topic && (
        <div className="learning-console-empty-state glass-panel mt-4 animate-fade-in">
          <div className="empty-state-crest glow-cyan">
            <Sparkles size={34} className="text-cyan animate-pulse" />
          </div>

          <h2 className="empty-state-title">What do you want to learn today?</h2>
          <p className="empty-state-subtitle">
            Ask any specific doubt in <strong>{activeSubject}</strong> (e.g. <em>"What is Le Chatelier's principle?"</em> or <em>"Explain Hybridization in PCl5"</em>), or explore high-yield curated concepts below.
          </p>

          <div className="recommended-topics-section">
            <div className="recommended-header">
              <span className="recommended-tag">Suggested {activeSubject} Topics:</span>
            </div>

            <div className="recommended-topics-grid">
              {currentRecommendations.map((rec, i) => (
                <button
                  key={i}
                  type="button"
                  className="topic-recommendation-card"
                  onClick={() => onQueryTopic(rec.title)}
                >
                  <div className="rec-card-header">
                    <span className="rec-chapter-tag">{rec.chapter}</span>
                    <ArrowRight size={14} className="rec-arrow" />
                  </div>
                  <h4 className="rec-card-title">{rec.title}</h4>
                  <p className="rec-card-desc">{rec.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. GURU'S DIRECT ANSWER CALLOUT BANNER (Rendered on explicit query) */}
      {!isLoading && topic && topic.directAnswer && (
        <div className="guru-direct-answer-card glass-panel mt-4 animate-fade-in">
          <div className="direct-answer-header flex-between items-center">
            <div className="flex-row items-center gap-2">
              <div className="direct-answer-badge glow-cyan">
                <Bot size={18} className="text-cyan" />
              </div>
              <div>
                <span className="direct-answer-tag">GURU'S DIRECT ANSWER</span>
                <h3 className="student-doubt-title">
                  “{topic.query || topic.title}”
                </h3>
              </div>
            </div>

            <div className="flex-row items-center gap-2">
              {topic.isDynamicHeuristic ? (
                <span className="source-pill heuristic-pill" title="Synthesized by local STEM heuristic engine">
                  Local STEM Engine
                </span>
              ) : (
                <span className="source-pill live-pill" title="Generated by live Gemini 2.5 Flash">
                  <Sparkles size={11} className="text-gold" /> Live Gemini AI
                </span>
              )}
              <AudioPlayer 
                textToRead={topic.directAnswer} 
                title={`Guru's Direct Answer to ${topic.title}`} 
                language={profile.language} 
              />
            </div>
          </div>

          <div className="direct-answer-body mt-3">
            <MathRenderer content={topic.directAnswer} />
          </div>
        </div>
      )}

      {/* 4.5 Dynamic Scientific SVG Diagram / Visual Explanation */}
      {!isLoading && topic && (
        <div className="dynamic-diagram-section mt-4">
          <DynamicConceptDiagram topic={topic} profile={profile} />
        </div>
      )}

      {/* 5. Active STEM Concept Response Hero Card */}
      {!isLoading && topic && (
        <div className="concept-hero-card glass-panel mt-4 animate-fade-in">
          <div className="hero-top-row">
            <div className="topic-meta-tags">
              <span className="grade-badge">{topic.grade || profile.educationLevel || 'Class 11'}</span>
              <span className="subject-badge">{topic.subject || activeSubject || 'STEM'}</span>
              {topic.chapter && <span className="chapter-badge">{topic.chapter}</span>}
            </div>

            <div className="topic-actions-row">
              {onClearTopic && (
                <button
                  type="button"
                  className="clear-topic-nav-btn glass-panel"
                  onClick={onClearTopic}
                  title="Clear and explore other doubts"
                >
                  <RotateCcw size={14} />
                  <span>Explore Other Doubts</span>
                </button>
              )}


              <button
                type="button"
                className="quiz-shortcut-btn"
                onClick={onOpenQuiz}
                title="Test your retention with 3 twisted questions"
              >
                <HelpCircle size={16} className="text-purple" />
                <span>Quick Revise Quiz (+60 XP)</span>
              </button>
            </div>
          </div>

          <div className="hero-title-row">
            <div>
              <span className="topic-focus-tag">ACTIVE STEM CONCEPT</span>
              <h1 className="concept-main-title">{topic.title}</h1>
            </div>
            {Boolean(topic.formulaLatex && topic.hasRelevantFormula !== false && topic.formulaLatex.trim().length > 0) && (
              <div className="hero-formula-box">
                <span className="formula-tag">PRIMARY LAW</span>
                <MathRenderer content={`$$${topic.formulaLatex}$$`} />
              </div>
            )}
          </div>

          {/* Section Filter Tabs */}
          <div className="layer-filter-tabs mt-4">
            {[
              { id: 'all', label: 'All 4 Layers' },
              { id: 'layer1', label: 'Layer 1: Core & Board Steps', icon: BookOpen, mastered: currentTopicMastery.layer1 },
              { id: 'layer2', label: 'Layer 2: Real-World Applications', icon: Cog, mastered: currentTopicMastery.layer2 },
              { id: 'layer3', label: 'Layer 3: Origin Story', icon: Award, mastered: currentTopicMastery.layer3 },
              { id: 'layer4', label: 'Beyond the Horizon Edge-Case', icon: Zap, mastered: currentTopicMastery.layer4 },
              { id: 'lab', label: 'Derivation Challenge Lab', icon: Code2, mastered: currentTopicMastery.derivation }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  className={`layer-filter-pill ${activeSection === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveSection(tab.id)}
                >
                  {Icon && <Icon size={14} />}
                  <span>{tab.label}</span>
                  {tab.mastered && <CheckCircle2 size={13} className="text-green ml-1" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. Structured Output Engine: 4 Layers (Rendered only on explicit query) */}
      {!isLoading && topic && (
        <div className="layers-stack mt-5 space-y-6">
          {/* Layer 1: Core Concept & Exam Steps */}
          {(activeSection === 'all' || activeSection === 'layer1') && topic.layer1 && (
            <Layer1CoreConcept
              data={topic.layer1}
              profile={profile}
              isMastered={currentTopicMastery.layer1}
              onMasterLayer={(key, xp) => onMasterLayer(topic.title, key, xp)}
            />
          )}

          {/* Layer 2: Live Real-World Applications */}
          {(activeSection === 'all' || activeSection === 'layer2') && topic.layer2 && (
            <Layer2RealWorld
              data={topic.layer2}
              profile={profile}
              isMastered={currentTopicMastery.layer2}
              onMasterLayer={(key, xp) => onMasterLayer(topic.title, key, xp)}
            />
          )}

          {/* Layer 3: Origin Story */}
          {(activeSection === 'all' || activeSection === 'layer3') && topic.layer3 && (
            <Layer3OriginStory
              data={topic.layer3}
              profile={profile}
              isMastered={currentTopicMastery.layer3}
              onMasterLayer={(key, xp) => onMasterLayer(topic.title, key, xp)}
            />
          )}

          {/* Layer 4: Beyond the Horizon (Edge Case) */}
          {(activeSection === 'all' || activeSection === 'layer4') && topic.layer4 && (
            <Layer4BeyondHorizon
              data={topic.layer4}
              profile={profile}
              isMastered={currentTopicMastery.layer4}
              onMasterLayer={(key, xp) => onMasterLayer(topic.title, key, xp)}
            />
          )}

          {/* Tier 5: Derivation Challenge Lab */}
          {(activeSection === 'all' || activeSection === 'lab') && topic.derivationChallenge && (
            <InteractiveLab
              topic={topic}
              isMastered={currentTopicMastery.derivation}
              onMasterChallenge={(xp) => onMasterLayer(topic.title, 'derivation', xp)}
            />
          )}
        </div>
      )}

      {/* 7. Dedicated 2-Way Conversational Follow-Up Doubt Clearance Thread */}
      {!isLoading && topic && (
        <div className="topic-followup-chat-section glass-panel mt-6 animate-fade-in">
          <div className="followup-chat-header flex-between items-center">
            <div className="flex-row items-center gap-2">
              <div className="chatbot-badge glow-cyan">
                <MessageSquare size={18} className="text-cyan" />
              </div>
              <div>
                <h3 className="followup-section-title">2-Way Interactive Doubt Clearance</h3>
                <p className="followup-section-subtitle">
                  Ask follow-up questions on <strong>{topic.title}</strong> — Guru maintains conversation context
                </p>
              </div>
            </div>

            <div className="pedagogy-indicator-pill">
              <span>{profile.tier} Tier • {profile.language}</span>
            </div>
          </div>

          {/* Message Stream */}
          <div className="chat-thread-container mt-4 space-y-3">
            {chatMessages.map((msg) => (
              <div 
                key={msg.id} 
                className={`chat-bubble-row ${msg.role === 'user' ? 'student-row' : 'guru-row'}`}
              >
                {msg.role === 'guru' && (
                  <div className="guru-chat-avatar glow-cyan">
                    <Bot size={16} className="text-cyan" />
                  </div>
                )}

                <div className={`chat-bubble ${msg.role === 'user' ? 'student-bubble' : 'guru-bubble glass-panel'}`}>
                  <div className="bubble-header flex-between items-center mb-1">
                    <span className="bubble-sender-name">
                      {msg.role === 'user' ? (profile.name || 'You') : 'BhashaGuru'}
                    </span>
                    <span className="bubble-time text-xs text-muted">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <div className="bubble-content">
                    <MathRenderer content={msg.text} />
                  </div>

                  {msg.role === 'guru' && (
                    <div className="bubble-audio-actions mt-2 flex-row justify-end">
                      <AudioPlayer 
                        textToRead={msg.text} 
                        title="Guru Explanation" 
                        language={profile.language} 
                      />
                    </div>
                  )}
                </div>

                {msg.role === 'user' && (
                  <div className="student-chat-avatar">
                    <AvatarDisplay 
                      avatarId={profile.avatarId || 'einstein'}
                      customUrl={profile.customAvatarUrl}
                      size={30}
                    />
                  </div>
                )}
              </div>
            ))}

            {isChatLoading && (
              <div className="chat-bubble-row guru-row animate-pulse">
                <div className="guru-chat-avatar glow-cyan">
                  <Bot size={16} className="text-cyan animate-spin-slow" />
                </div>
                <div className="chat-bubble guru-bubble glass-panel flex-row items-center gap-2">
                  <Sparkles size={14} className="text-cyan animate-spin" />
                  <span className="text-sm">Guru is analyzing your follow-up doubt...</span>
                </div>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Follow-up Quick Suggestion Chips */}
          <div className="followup-chips-row mt-3">
            <span className="chips-label">Quick Follow-Ups:</span>
            {[
              "Can you give a worked numerical example?",
              "Explain step 2 again in simple words",
              "What is a common trap in board exams?",
              "How is this applied in real industry?"
            ].map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                className="followup-chip"
                onClick={() => handleSendFollowUp(prompt)}
                disabled={isChatLoading}
              >
                <span>{prompt}</span>
              </button>
            ))}
          </div>

          {/* Follow-Up Input Form */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendFollowUp();
            }} 
            className="followup-input-form mt-3"
          >
            <div className="followup-input-group">
              <input
                type="text"
                className="followup-input-field"
                placeholder={`Ask a follow-up doubt about ${topic.shortName || topic.title} in ${profile.language}...`}
                value={followUpInput}
                onChange={(e) => setFollowUpInput(e.target.value)}
                disabled={isChatLoading}
              />
              <button
                type="submit"
                className="primary-btn followup-send-btn btn-glow"
                disabled={isChatLoading || !followUpInput.trim()}
              >
                <Send size={15} />
                <span>Reply</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
