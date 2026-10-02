// Subject Selector Bar for Stage 3
// Tailored dynamically to Class 11 & 12 MPC, BiPC, or B.Tech engineering branches

import React from 'react';
import { 
  Atom, FlaskConical, Infinity as InfinityIcon, 
  Dna, Cpu, Code2, Cog, Sparkles, ChevronRight 
} from 'lucide-react';
import { getSubjectsForTrack } from '../services/storageService';

export default function SubjectSelectorBar({
  profile,
  activeSubject,
  onSelectSubject,
  onSelectPromptTopic
}) {
  const subjects = getSubjectsForTrack(profile.educationLevel, profile.stream, profile.branch, profile.specialization);

  // Suggested high-yield topics map
  const HIGH_YIELD_TOPICS = {
    'Physics': [
      "Archimedes' Principle & Buoyancy",
      "Lenz's Law & Electromagnetic Induction",
      "Bernoulli's Principle & Dynamic Lift"
    ],
    'Chemistry': [
      "Chemical Equilibrium & Le Chatelier's Principle",
      "Nernst Equation & Electrochemical Cells",
      "VSEPR & Hybridization Dynamics"
    ],
    'Mathematics': [
      "Fundamental Theorem of Calculus & Definite Integrals",
      "Mean Value Theorem & Rolle's Theorem",
      "Matrices, Determinants & Inverse Systems"
    ],
    'Biology': [
      "Chemiosmotic ATP Synthesis & Proton Motive Force",
      "DNA Replication & Lagging Strand Okazaki Fragments",
      "Neuron Action Potential & Sodium-Potassium Pumps"
    ],
    'Applied Physics': [
      "Thermodynamics & Heat Transfer Mechanisms",
      "Friction, Viscosity & Poiseuille Flow",
      "Acoustics & Ultrasonic Wave Detection"
    ],
    'Applied Chemistry': [
      "Electrochemistry & Galvanic Corrosion Control",
      "Hardness of Water & EDTA Titrations",
      "Polymers & Industrial Composites"
    ],
    'Applied Mathematics': [
      "Differential Equations of First Order",
      "Matrices, Rank & Linear Systems",
      "Standard Integration & Definite Integrals"
    ],
    'Pharmaceutics': [
      "Biopharmaceutics & First-Pass Metabolism",
      "Sustained Release Dosage Form Kinetics",
      "Dissolution Testing & Noyes-Whitney Equation"
    ],
    'Pharmacology': [
      "Adrenergic Receptors & G-Protein Signalling",
      "Dose-Response Curves & Therapeutic Index",
      "Enzyme Induction & Pharmacokinetics"
    ],
    'Pharmaceutical Chemistry': [
      "Structure-Activity Relationship of Beta-Lactam Antibiotics",
      "Stereochemistry & Enantiomeric Drug Potency",
      "Antineoplastic Alkylating Mechanisms"
    ],
    'Pharmacognosy': [
      "Alkaloid Extraction & Thin Layer Chromatography",
      "Cardiac Glycosides & Terpenoids",
      "Standardization of Herbal Extracts"
    ],
    'Engineering Physics': [
      "Schrödinger Wave Equation & Quantum Wells",
      "Laser Population Inversion & Einstein Coefficients",
      "Superconductivity & Meissner Effect"
    ],
    'Circuit Theory': [
      "Thevenin's & Norton's Equivalent Circuits",
      "Kirchhoff's Laws (KCL/KVL) & Mesh Analysis",
      "RLC Series Resonance & Q-Factor"
    ],
    'Data Structures & Algorithms': [
      "AVL Binary Search Tree Self-Balancing Rotations",
      "Dijkstra's Shortest Path & Adjacency Lists",
      "Dynamic Programming: 0/1 Knapsack"
    ],
    'Engineering Mechanics': [
      "Stress-Strain Tensors & Mohr's Circle",
      "Shear Force & Bending Moment Diagrams (SFD/BMD)",
      "Moment of Inertia & Parallel Axis Theorem"
    ],
    'Engineering Maths': [
      "Eigenvalues, Eigenvectors & Cayley-Hamilton",
      "Fourier Series & Half-Range Expansions",
      "Cauchy-Riemann Equations & Complex Integration"
    ]
  };

  const getSubjectIcon = (name) => {
    const n = name.toLowerCase();
    if (n.includes('physics')) return <Atom size={16} />;
    if (n.includes('chem')) return <FlaskConical size={16} />;
    if (n.includes('math')) return <InfinityIcon size={16} />;
    if (n.includes('bio')) return <Dna size={16} />;
    if (n.includes('circuit')) return <Cpu size={16} />;
    if (n.includes('data') || n.includes('algorithm')) return <Code2 size={16} />;
    if (n.includes('mechanic')) return <Cog size={16} />;
    return <Sparkles size={16} />;
  };

  const currentSubjectObj = subjects.find(s => s.name === activeSubject) || subjects[0];
  const suggestedQueries = HIGH_YIELD_TOPICS[currentSubjectObj?.name] || HIGH_YIELD_TOPICS['Physics'];

  return (
    <div className="subject-selector-bar glass-panel">
      {/* Subject Tabs */}
      <div className="subject-tabs-scroller">
        <span className="subject-track-badge">
          {profile.educationLevel} {profile.stream ? `(${profile.stream})` : profile.branch ? `(${profile.branch})` : ''}
        </span>

        <div className="subject-buttons-row">
          {subjects.map(subj => {
            const isSelected = activeSubject === subj.name;
            return (
              <button
                key={subj.id}
                type="button"
                className={`subject-pill-btn ${isSelected ? 'active' : ''}`}
                onClick={() => onSelectSubject(subj.name)}
              >
                <span className="subject-icon">{getSubjectIcon(subj.name)}</span>
                <span className="subject-name">{subj.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Suggested High-Yield Doubt Prompts */}
      <div className="high-yield-suggestions-row">
        <span className="suggestion-label">High-Yield Doubts:</span>
        <div className="suggestion-chips-scroller">
          {suggestedQueries.map((topicQuery, idx) => (
            <button
              key={idx}
              type="button"
              className="suggestion-chip"
              onClick={() => onSelectPromptTopic(topicQuery)}
              title="Click to consult BhashaGuru on this concept"
            >
              <span>{topicQuery}</span>
              <ChevronRight size={13} className="text-muted" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
