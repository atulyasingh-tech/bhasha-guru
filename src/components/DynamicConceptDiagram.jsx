// Dynamic Concept Diagram & Visual Aid Component for BhashaGuru
// Generates accurate, customized SVG scientific diagrams tailored to the active STEM concept

import React, { useState } from 'react';
import { Eye, Sparkles, Layers, Maximize2, Minimize2, Compass } from 'lucide-react';

export default function DynamicConceptDiagram({ topic, profile }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!topic) return null;

  const title = (topic.title || '').toLowerCase();
  const query = (topic.query || '').toLowerCase();
  const subject = (topic.subject || '').toLowerCase();
  const tags = (topic.tags || []).map(t => t.toLowerCase()).join(' ');
  const combined = `${title} ${query} ${tags} ${subject}`;

  // Helper renderer to pick the right diagram based on concept signatures
  const renderDiagramContent = () => {
    // =========================================================================
    // 1. BIOLOGY: DNA Replication Fork, Lagging Strand & Okazaki Fragments
    // =========================================================================
    if (
      combined.includes('dna') || combined.includes('okazaki') || combined.includes('replication') || 
      combined.includes('strand') || combined.includes('polymerase') || combined.includes('ligase') || 
      combined.includes('helicase') || (subject.includes('bio') && !combined.includes('photo'))
    ) {
      return (
        <svg viewBox="0 0 600 320" className="concept-svg-diagram">
          <defs>
            <linearGradient id="parentDnaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#818CF8" />
            </linearGradient>
            <linearGradient id="daughterLeadingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="okazakiGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>

          {/* Background Grid Accent */}
          <line x1="40" y1="160" x2="560" y2="160" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />

          {/* 1. Parent Double Helix (Left Side - Unwound by Helicase) */}
          {/* Top Parent Strand (3' -> 5') */}
          <path d="M 40 140 C 90 120 120 160 170 140 L 220 140" fill="none" stroke="url(#parentDnaGrad)" strokeWidth="4" />
          {/* Bottom Parent Strand (5' -> 3') */}
          <path d="M 40 180 C 90 200 120 160 170 180 L 220 180" fill="none" stroke="url(#parentDnaGrad)" strokeWidth="4" />
          
          {/* Base Pair Rungs in Unwound Region */}
          <line x1="60" y1="133" x2="60" y2="187" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
          <line x1="95" y1="123" x2="95" y2="197" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
          <line x1="135" y1="150" x2="135" y2="170" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
          <line x1="180" y1="140" x2="180" y2="180" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
          <line x1="205" y1="140" x2="205" y2="180" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />

          {/* Parent Polarity Labels (Left) */}
          <text x="30" y="135" fill="#38BDF8" fontSize="12" fontWeight="800">3'</text>
          <text x="30" y="195" fill="#818CF8" fontSize="12" fontWeight="800">5'</text>
          <text x="80" y="225" fill="#94A3B8" fontSize="11" fontWeight="700">Parental Double Helix</text>

          {/* 2. Topoisomerase / Gyrase Ahead of Fork */}
          <g transform="translate(130, 95)">
            <rect width="90" height="26" rx="6" fill="rgba(168,85,247,0.2)" stroke="#A855F7" strokeWidth="1.5" />
            <text x="45" y="17" fill="#C084FC" fontSize="10.5" fontWeight="700" textAnchor="middle">Topoisomerase</text>
          </g>

          {/* 3. DNA Helicase Enzyme (Hexamer Ring at Replication Fork Junction) */}
          <g transform="translate(230, 130)">
            <polygon points="15,0 45,0 60,30 45,60 15,60 0,30" fill="#F59E0B" stroke="#FDE68A" strokeWidth="2" filter="drop-shadow(0 0 10px rgba(245,158,11,0.6))" />
            <text x="30" y="35" fill="#0F172A" fontSize="10.5" fontWeight="900" textAnchor="middle">Helicase</text>
          </g>
          {/* Fork Unwinding Arrow */}
          <path d="M 230 160 L 205 160" stroke="#F59E0B" strokeWidth="2" />
          <polygon points="200,160 212,154 212,166" fill="#F59E0B" />
          <text x="215" y="120" fill="#FBBF24" fontSize="10" fontWeight="700">Unwinding →</text>

          {/* 4. Single-Stranded Binding Proteins (SSBs) Coating Exposed Strands */}
          <circle cx="280" cy="85" r="7" fill="#0284C7" stroke="#38BDF8" strokeWidth="1.5" />
          <circle cx="310" cy="75" r="7" fill="#0284C7" stroke="#38BDF8" strokeWidth="1.5" />
          <circle cx="340" cy="65" r="7" fill="#0284C7" stroke="#38BDF8" strokeWidth="1.5" />
          <circle cx="280" cy="235" r="7" fill="#0284C7" stroke="#38BDF8" strokeWidth="1.5" />
          <circle cx="310" cy="245" r="7" fill="#0284C7" stroke="#38BDF8" strokeWidth="1.5" />
          <text x="345" y="48" fill="#38BDF8" fontSize="10" fontWeight="700">SSB Proteins (Prevent re-annealing)</text>

          {/* 5. TOP FORK BRANCH: LEADING STRAND (Continuous 5' -> 3') */}
          {/* Parental Template (Opens upward right) */}
          <path d="M 260 140 Q 300 100 540 60" fill="none" stroke="url(#parentDnaGrad)" strokeWidth="3.5" />
          <text x="548" y="65" fill="#38BDF8" fontSize="12" fontWeight="800">5'</text>

          {/* Continuous Daughter Leading Strand (Synthesized into the fork: 5' to 3') */}
          <path d="M 370 75 Q 320 105 275 130" fill="none" stroke="url(#daughterLeadingGrad)" strokeWidth="4" />
          <polygon points="270,133 285,123 282,137" fill="#10B981" />
          
          {/* DNA Polymerase III on Leading Strand */}
          <g transform="translate(360, 60)">
            <rect width="84" height="24" rx="6" fill="#10B981" stroke="#A7F3D0" strokeWidth="1.5" />
            <text x="42" y="16" fill="#064E3B" fontSize="10.5" fontWeight="800" textAnchor="middle">DNA Pol III</text>
          </g>
          <text x="450" y="95" fill="#10B981" fontSize="11" fontWeight="800">Leading Strand (Continuous 5'→3')</text>

          {/* 6. BOTTOM FORK BRANCH: LAGGING STRAND (Discontinuous Okazaki Fragments) */}
          {/* Parental Template (Opens downward right) */}
          <path d="M 260 180 Q 300 220 540 260" fill="none" stroke="url(#parentDnaGrad)" strokeWidth="3.5" />
          <text x="548" y="265" fill="#818CF8" fontSize="12" fontWeight="800">3'</text>

          {/* Okazaki Fragment 1 (Synthesized away from fork: 5' to 3') */}
          {/* RNA Primer 1 (Green stub) */}
          <line x1="420" y1="230" x2="438" y2="234" stroke="#4ADE80" strokeWidth="5" />
          <text x="420" y="222" fill="#4ADE80" fontSize="9.5" fontWeight="700">Primer 1</text>
          {/* Fragment 1 DNA segment */}
          <line x1="438" y1="234" x2="520" y2="250" stroke="url(#okazakiGrad)" strokeWidth="4" />
          <polygon points="526,252 512,244 516,257" fill="#F59E0B" />
          <text x="450" y="260" fill="#F59E0B" fontSize="10.5" fontWeight="800">Okazaki Fragment 1 (5'→3')</text>

          {/* Okazaki Fragment 2 (Closer to fork) */}
          {/* RNA Primer 2 (Green stub) */}
          <line x1="310" y1="205" x2="328" y2="210" stroke="#4ADE80" strokeWidth="5" />
          <text x="310" y="198" fill="#4ADE80" fontSize="9.5" fontWeight="700">Primer 2</text>
          {/* Fragment 2 DNA segment */}
          <line x1="328" y1="210" x2="400" y2="225" stroke="url(#okazakiGrad)" strokeWidth="4" />
          <polygon points="406,227 392,219 396,232" fill="#F59E0B" />
          <text x="330" y="235" fill="#F59E0B" fontSize="10.5" fontWeight="800">Okazaki Fragment 2</text>

          {/* 7. DNA Ligase Enzyme Sealing Nick */}
          <g transform="translate(405, 205)">
            <circle cx="12" cy="12" r="14" fill="#F43F5E" stroke="#FECDD3" strokeWidth="2" filter="drop-shadow(0 0 8px rgba(244,63,94,0.6))" />
            <text x="12" y="16" fill="#FFFFFF" fontSize="9.5" fontWeight="900" textAnchor="middle">Ligase</text>
          </g>
          <text x="430" y="210" fill="#F43F5E" fontSize="10" fontWeight="700">Seals Nick with ATP</text>

          {/* 8. Summary Callout Legend Box */}
          <g transform="translate(40, 20)">
            <rect width="210" height="66" rx="8" fill="rgba(15,23,42,0.88)" stroke="rgba(255,255,255,0.12)" />
            <text x="10" y="18" fill="#38BDF8" fontSize="11" fontWeight="800">DNA Replication Fork Architecture</text>
            <text x="10" y="36" fill="#10B981" fontSize="10">• Leading: Continuous (5' → 3')</text>
            <text x="10" y="52" fill="#F59E0B" fontSize="10">• Lagging: Discontinuous Okazaki Fragments</text>
          </g>
        </svg>
      );
    }

    // =========================================================================
    // 2. PHYSICS: Kinematics & Projectile Motion Trajectory
    // =========================================================================
    if (
      combined.includes('projectile') || combined.includes('trajectory') || 
      combined.includes('kinematics') || combined.includes('parabola') || 
      combined.includes('range') || combined.includes('flight')
    ) {
      return (
        <svg viewBox="0 0 600 320" className="concept-svg-diagram">
          <defs>
            <linearGradient id="trajectoryGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00F0FF" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
            <linearGradient id="apexGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(245, 158, 11, 0.25)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>

          {/* Axes */}
          <line x1="60" y1="260" x2="560" y2="260" stroke="#64748B" strokeWidth="2.5" />
          <line x1="80" y1="30" x2="80" y2="270" stroke="#64748B" strokeWidth="2" />
          <text x="560" y="280" fill="#94A3B8" fontSize="12" textAnchor="end">Horizontal Range (x) →</text>
          <text x="65" y="35" fill="#94A3B8" fontSize="12" textAnchor="middle">Altitude y</text>

          {/* Shaded Area Under Parabola */}
          <path d="M 80 260 Q 300 40 520 260 Z" fill="url(#apexGrad)" />

          {/* Parabolic Flight Curve */}
          <path d="M 80 260 Q 300 40 520 260" fill="none" stroke="url(#trajectoryGrad)" strokeWidth="4" />

          {/* 1. Launch Origin (80, 260) */}
          <circle cx="80" cy="260" r="6" fill="#00F0FF" />
          
          {/* Launch Velocity Vector u */}
          <line x1="80" y1="260" x2="155" y2="175" stroke="#00F0FF" strokeWidth="3" />
          <polygon points="160,170 148,175 155,185" fill="#00F0FF" />
          <text x="145" y="160" fill="#00F0FF" fontSize="13" fontWeight="800">u (Launch Velocity)</text>

          {/* Launch Angle Theta Arc */}
          <path d="M 120 260 A 40 40 0 0 0 115 225" fill="none" stroke="#FBBF24" strokeWidth="2" />
          <text x="130" y="245" fill="#FBBF24" fontSize="13" fontWeight="800">θ</text>

          {/* Velocity Decomposition */}
          <line x1="80" y1="260" x2="155" y2="260" stroke="#38BDF8" strokeWidth="2" strokeDasharray="4 3" />
          <text x="125" y="278" fill="#38BDF8" fontSize="11" fontWeight="700">u_x = u cos θ</text>
          <line x1="155" y1="260" x2="155" y2="175" stroke="#EC4899" strokeWidth="2" strokeDasharray="4 3" />
          <text x="162" y="220" fill="#EC4899" fontSize="11" fontWeight="700">u_y = u sin θ</text>

          {/* 2. Apex Landmark (300, 95) */}
          <line x1="300" y1="95" x2="300" y2="260" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 4" />
          <circle cx="300" cy="95" r="6" fill="#F59E0B" filter="drop-shadow(0 0 8px rgba(245,158,11,0.8))" />
          
          {/* Velocity at Apex (Strictly Horizontal) */}
          <line x1="300" y1="95" x2="370" y2="95" stroke="#F59E0B" strokeWidth="3" />
          <polygon points="376,95 364,90 364,100" fill="#F59E0B" />
          <text x="382" y="92" fill="#F59E0B" fontSize="11" fontWeight="800">v_x = u cos θ (v_y = 0!)</text>

          {/* Apex Height Callout */}
          <text x="310" y="165" fill="#F59E0B" fontSize="12" fontWeight="800">H_max = (u² sin²θ) / 2g</text>

          {/* 3. Invariant Gravity Vector */}
          <g transform="translate(210, 80)">
            <line x1="0" y1="0" x2="0" y2="35" stroke="#EF4444" strokeWidth="2.5" />
            <polygon points="0,40 -5,28 5,28" fill="#EF4444" />
            <text x="8" y="24" fill="#EF4444" fontSize="11" fontWeight="700">a_y = -g (Constant)</text>
          </g>

          {/* 4. Landing Impact (520, 260) */}
          <circle cx="520" cy="260" r="6" fill="#10B981" />
          <text x="520" y="295" fill="#10B981" fontSize="12" fontWeight="800" textAnchor="middle">Landing (t = T)</text>

          {/* Range Dimension Bracket */}
          <line x1="80" y1="305" x2="520" y2="305" stroke="#E2E8F0" strokeWidth="1.5" />
          <line x1="80" y1="300" x2="80" y2="310" stroke="#E2E8F0" strokeWidth="1.5" />
          <line x1="520" y1="300" x2="520" y2="310" stroke="#E2E8F0" strokeWidth="1.5" />
          <text x="300" y="300" fill="#E2E8F0" fontSize="12" fontWeight="800" textAnchor="middle">
            Horizontal Range R = (u² sin 2θ) / g  (Max at θ = 45°)
          </text>

          {/* Summary Card */}
          <g transform="translate(370, 25)">
            <rect width="210" height="52" rx="8" fill="rgba(15,23,42,0.88)" stroke="rgba(255,255,255,0.12)" />
            <text x="10" y="18" fill="#00F0FF" fontSize="11" fontWeight="800">Trajectory Parabola:</text>
            <text x="10" y="36" fill="#CBD5E1" fontSize="10.5">y = x tan θ - (g x²) / (2 u² cos²θ)</text>
          </g>
        </svg>
      );
    }

    // =========================================================================
    // 3. CHEMISTRY: Reaction Coordinate & Activation Energy Profile
    // =========================================================================
    if (
      combined.includes('reaction coordinate') || combined.includes('activation energy') || 
      combined.includes('arrhenius') || combined.includes('catalyst') || 
      combined.includes('enthalpy') || (subject.includes('chem') && combined.includes('energy'))
    ) {
      return (
        <svg viewBox="0 0 600 320" className="concept-svg-diagram">
          <defs>
            <linearGradient id="barrierGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(244, 63, 94, 0.25)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>

          {/* Coordinate Axes */}
          <line x1="60" y1="270" x2="560" y2="270" stroke="#64748B" strokeWidth="2.5" />
          <line x1="70" y1="30" x2="70" y2="280" stroke="#64748B" strokeWidth="2" />
          <text x="560" y="290" fill="#94A3B8" fontSize="12" textAnchor="end">Reaction Progress →</text>
          <text x="55" y="35" fill="#94A3B8" fontSize="12" textAnchor="middle">Potential Energy (E)</text>

          {/* Uncatalyzed Reaction Path (Solid Rose) */}
          <path d="M 70 180 L 150 180 C 210 180 250 60 300 60 C 350 60 390 230 450 230 L 540 230" fill="none" stroke="#F43F5E" strokeWidth="3.5" />

          {/* Catalyzed Reaction Path (Dashed Emerald) */}
          <path d="M 150 180 C 210 180 250 115 300 115 C 350 115 390 230 450 230" fill="none" stroke="#10B981" strokeWidth="3" strokeDasharray="6 4" />

          {/* Reactants Plateau */}
          <line x1="70" y1="180" x2="170" y2="180" stroke="#38BDF8" strokeWidth="3" />
          <circle cx="120" cy="180" r="5" fill="#38BDF8" />
          <text x="120" y="165" fill="#38BDF8" fontSize="13" fontWeight="800" textAnchor="middle">Reactants [R]</text>

          {/* Transition State (TS‡) Apex */}
          <circle cx="300" cy="60" r="7" fill="#F43F5E" filter="drop-shadow(0 0 10px rgba(244,63,94,0.8))" />
          <text x="300" y="45" fill="#F43F5E" fontSize="13" fontWeight="900" textAnchor="middle">Transition State [TS]‡</text>

          {/* Activation Energy Ea Dimension Arrow */}
          <line x1="230" y1="180" x2="230" y2="65" stroke="#FBBF24" strokeWidth="2.5" />
          <polygon points="230,60 225,72 235,72" fill="#FBBF24" />
          <polygon points="230,180 225,168 235,168" fill="#FBBF24" />
          <text x="215" y="125" fill="#FBBF24" fontSize="12" fontWeight="800" textAnchor="end">E_a (Uncatalyzed)</text>

          {/* Catalyzed Ea Arrow */}
          <line x1="330" y1="180" x2="330" y2="120" stroke="#10B981" strokeWidth="2" />
          <polygon points="330,115 326,125 334,125" fill="#10B981" />
          <text x="345" y="145" fill="#10B981" fontSize="11" fontWeight="700">E_a (Catalyzed)</text>

          {/* Products Plateau */}
          <line x1="450" y1="230" x2="540" y2="230" stroke="#A78BFA" strokeWidth="3" />
          <circle cx="495" cy="230" r="5" fill="#A78BFA" />
          <text x="495" y="215" fill="#A78BFA" fontSize="13" fontWeight="800" textAnchor="middle">Products [P]</text>

          {/* Reaction Enthalpy ΔH Bracket */}
          <line x1="510" y1="180" x2="510" y2="230" stroke="#F59E0B" strokeWidth="2.5" />
          <polygon points="510,180 506,190 514,190" fill="#F59E0B" />
          <polygon points="510,230 506,220 514,220" fill="#F59E0B" />
          <text x="525" y="208" fill="#F59E0B" fontSize="12" fontWeight="800">ΔH &lt; 0 (Exothermic)</text>

          {/* Summary Box */}
          <g transform="translate(70, 210)">
            <rect width="210" height="52" rx="8" fill="rgba(15,23,42,0.9)" stroke="rgba(255,255,255,0.12)" />
            <text x="10" y="18" fill="#10B981" fontSize="11" fontWeight="700">• Catalyst lowers E_a barrier</text>
            <text x="10" y="36" fill="#CBD5E1" fontSize="10.5">• ΔH and equilibrium K_eq remain invariant</text>
          </g>
        </svg>
      );
    }

    // =========================================================================
    // 4. CHEMISTRY: Hybridization / Molecular Geometry (PCl5, VSEPR, sp3d)
    // =========================================================================
    if (combined.includes('pcl5') || combined.includes('hybridization') || combined.includes('vsepr') || combined.includes('geometry') || combined.includes('orbital')) {
      return (
        <svg viewBox="0 0 600 320" className="concept-svg-diagram">
          <defs>
            <radialGradient id="pAtomGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFB800" />
              <stop offset="100%" stopColor="#D97706" />
            </radialGradient>
            <radialGradient id="clAtomGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00F0FF" />
              <stop offset="100%" stopColor="#0284C7" />
            </radialGradient>
            <linearGradient id="planeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(0, 240, 255, 0.08)" />
              <stop offset="100%" stopColor="rgba(123, 97, 255, 0.15)" />
            </linearGradient>
          </defs>

          {/* Equatorial Plane (Horizontal Triangle) */}
          <polygon points="300,160 170,195 430,195" fill="url(#planeGrad)" stroke="rgba(0, 240, 255, 0.4)" strokeDasharray="4 4" />
          <polygon points="300,160 300,110 430,195" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeDasharray="2 2" />
          <polygon points="300,160 300,110 170,195" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeDasharray="2 2" />

          {/* Central Phosphorus Atom */}
          <circle cx="300" cy="160" r="22" fill="url(#pAtomGrad)" stroke="#FFFFFF" strokeWidth="2" filter="drop-shadow(0 0 8px rgba(255,184,0,0.6))" />
          <text x="300" y="166" textAnchor="middle" fill="#FFFFFF" fontWeight="800" fontSize="16">P</text>

          {/* Axial Bonds (Vertical, 90 deg to plane, 180 deg to each other) */}
          <line x1="300" y1="138" x2="300" y2="48" stroke="#FF5757" strokeWidth="3.5" />
          <circle cx="300" cy="40" r="16" fill="url(#clAtomGrad)" stroke="#FFFFFF" strokeWidth="1.5" />
          <text x="300" y="45" textAnchor="middle" fill="#FFFFFF" fontWeight="700" fontSize="12">Cl(ax)</text>

          <line x1="300" y1="182" x2="300" y2="272" stroke="#FF5757" strokeWidth="3.5" />
          <circle cx="300" cy="280" r="16" fill="url(#clAtomGrad)" stroke="#FFFFFF" strokeWidth="1.5" />
          <text x="300" y="285" textAnchor="middle" fill="#FFFFFF" fontWeight="700" fontSize="12">Cl(ax)</text>

          {/* Equatorial Bonds (In plane, 120 deg apart) */}
          <line x1="300" y1="160" x2="300" y2="105" stroke="#00F0FF" strokeWidth="2.5" />
          <circle cx="300" cy="100" r="14" fill="url(#clAtomGrad)" stroke="#FFFFFF" strokeWidth="1.5" />
          <text x="300" y="104" textAnchor="middle" fill="#FFFFFF" fontWeight="700" fontSize="11">Cl(eq)</text>

          <line x1="300" y1="160" x2="175" y2="195" stroke="#00F0FF" strokeWidth="2.5" />
          <circle cx="168" cy="197" r="14" fill="url(#clAtomGrad)" stroke="#FFFFFF" strokeWidth="1.5" />
          <text x="168" y="201" textAnchor="middle" fill="#FFFFFF" fontWeight="700" fontSize="11">Cl(eq)</text>

          <line x1="300" y1="160" x2="425" y2="195" stroke="#00F0FF" strokeWidth="2.5" />
          <circle cx="432" cy="197" r="14" fill="url(#clAtomGrad)" stroke="#FFFFFF" strokeWidth="1.5" />
          <text x="432" y="201" textAnchor="middle" fill="#FFFFFF" fontWeight="700" fontSize="11">Cl(eq)</text>

          {/* Bond Angle & Length Annotations */}
          <path d="M 275 160 A 25 25 0 0 1 300 135" fill="none" stroke="#FFD700" strokeWidth="1.5" />
          <text x="262" y="142" fill="#FFD700" fontSize="11" fontWeight="700">90°</text>

          <path d="M 230 185 A 70 70 0 0 0 370 185" fill="none" stroke="#00F0FF" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="300" y="222" fill="#00F0FF" fontSize="12" fontWeight="700" textAnchor="middle">120° (Equatorial Angle)</text>

          {/* Legend Callouts */}
          <g transform="translate(20, 20)">
            <rect width="180" height="74" rx="8" fill="rgba(15,23,42,0.85)" stroke="rgba(255,255,255,0.12)" />
            <text x="10" y="20" fill="#FFD700" fontSize="12" fontWeight="700">Trigonal Bipyramidal (sp³d)</text>
            <text x="10" y="40" fill="#FF8A8A" fontSize="11">• Axial Bonds: 240 pm (Longer)</text>
            <text x="10" y="58" fill="#38BDF8" fontSize="11">• Equatorial Bonds: 202 pm</text>
          </g>
        </svg>
      );
    }

    // =========================================================================
    // 5. CHEMISTRY: Chemical Equilibrium & Le Chatelier's Principle
    // =========================================================================
    if (combined.includes('chatelier') || combined.includes('equilibrium') || combined.includes('haber')) {
      return (
        <svg viewBox="0 0 600 320" className="concept-svg-diagram">
          {/* Coordinate Axes */}
          <line x1="60" y1="260" x2="560" y2="260" stroke="#64748B" strokeWidth="2" />
          <line x1="60" y1="40" x2="60" y2="260" stroke="#64748B" strokeWidth="2" />
          <text x="560" y="280" fill="#94A3B8" fontSize="12" textAnchor="end">Time (t) →</text>
          <text x="45" y="35" fill="#94A3B8" fontSize="12" textAnchor="middle">Rate / Conc</text>

          {/* Reactant Curve */}
          <path d="M 60 70 Q 150 140 220 150" fill="none" stroke="#F43F5E" strokeWidth="3" />
          <text x="130" y="95" fill="#F43F5E" fontSize="12" fontWeight="700">Reactants [R]</text>

          {/* Product Curve */}
          <path d="M 60 250 Q 150 160 220 150" fill="none" stroke="#10B981" strokeWidth="3" />
          <text x="130" y="225" fill="#10B981" fontSize="12" fontWeight="700">Products [P]</text>

          {/* Equilibrium Plateau */}
          <line x1="220" y1="150" x2="320" y2="150" stroke="#00F0FF" strokeWidth="3.5" />
          <text x="270" y="138" fill="#00F0FF" fontSize="11" fontWeight="700" textAnchor="middle">Dynamic Equilibrium (Rf = Rb)</text>

          {/* Stress Injection Event */}
          <line x1="320" y1="40" x2="320" y2="260" stroke="#F59E0B" strokeWidth="2" strokeDasharray="5 5" />
          <text x="320" y="30" fill="#F59E0B" fontSize="12" fontWeight="800" textAnchor="middle">⚡ STRESS: Pressure/Temp Shift</text>

          {/* Le Chatelier Counter-Shift Curves */}
          <path d="M 320 150 Q 380 90 440 120 L 550 120" fill="none" stroke="#F43F5E" strokeWidth="2.5" />
          <path d="M 320 150 Q 380 200 440 170 L 550 170" fill="none" stroke="#10B981" strokeWidth="2.5" />

          {/* New Equilibrium Zone */}
          <rect x="440" y="90" width="115" height="110" rx="8" fill="rgba(16,185,129,0.08)" stroke="rgba(16,185,129,0.3)" />
          <text x="497" y="110" fill="#10B981" fontSize="11" fontWeight="700" textAnchor="middle">New Equilibrium</text>
          <text x="497" y="148" fill="#E2E8F0" fontSize="10.5" textAnchor="middle">System Opposes Stress</text>
          <text x="497" y="162" fill="#00F0FF" fontSize="10.5" fontWeight="700" textAnchor="middle">K_eq Restored</text>

          <g transform="translate(180, 275)">
            <rect width="250" height="34" rx="17" fill="rgba(0, 240, 255, 0.1)" stroke="rgba(0, 240, 255, 0.4)" />
            <text x="125" y="21" fill="#00F0FF" fontSize="12" fontWeight="700" textAnchor="middle">
              Δn &gt; 0 ⟹ Pressure ↑ shifts LEFT
            </text>
          </g>
        </svg>
      );
    }

    // =========================================================================
    // 6. PHYSICS: Archimedes' Principle & Buoyancy
    // =========================================================================
    if (combined.includes('archimedes') || combined.includes('buoyancy') || combined.includes('float') || combined.includes('fluid')) {
      return (
        <svg viewBox="0 0 600 320" className="concept-svg-diagram">
          <defs>
            <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(0, 240, 255, 0.18)" />
              <stop offset="100%" stopColor="rgba(2, 132, 199, 0.55)" />
            </linearGradient>
            <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>

          {/* Tank Wall */}
          <rect x="140" y="60" width="320" height="220" rx="12" fill="url(#waterGrad)" stroke="#00F0FF" strokeWidth="2.5" />
          
          {/* Water Surface Line */}
          <line x1="140" y1="85" x2="460" y2="85" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="8 4" />
          <text x="155" y="80" fill="#38BDF8" fontSize="11" fontWeight="700">Free Fluid Surface (P₀)</text>

          {/* Submerged Solid Block */}
          <rect x="240" y="115" width="120" height="110" rx="8" fill="url(#bodyGrad)" stroke="#FFFFFF" strokeWidth="2" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.5))" />
          <text x="300" y="175" fill="#FFFFFF" fontSize="14" fontWeight="800" textAnchor="middle">V_body, ρ_body</text>

          {/* Upward Buoyant Force Vector */}
          <line x1="300" y1="115" x2="300" y2="25" stroke="#00F0FF" strokeWidth="4" />
          <polygon points="300,15 292,30 308,30" fill="#00F0FF" />
          <text x="315" y="32" fill="#00F0FF" fontSize="13" fontWeight="800">F_B = ρ_f · V_disp · g</text>

          {/* Downward Gravitational Force Vector */}
          <line x1="300" y1="225" x2="300" y2="295" stroke="#EF4444" strokeWidth="4" />
          <polygon points="300,305 292,290 308,290" fill="#EF4444" />
          <text x="315" y="300" fill="#EF4444" fontSize="13" fontWeight="800">W = m·g = ρ_b · V · g</text>

          {/* Hydrostatic Pressure Gradient Vectors on Sides */}
          <line x1="205" y1="125" x2="235" y2="125" stroke="#38BDF8" strokeWidth="2" />
          <polygon points="238,125 230,121 230,129" fill="#38BDF8" />
          <line x1="185" y1="170" x2="235" y2="170" stroke="#38BDF8" strokeWidth="2.5" />
          <polygon points="238,170 228,165 228,175" fill="#38BDF8" />
          <line x1="165" y1="215" x2="235" y2="215" stroke="#38BDF8" strokeWidth="3.5" />
          <polygon points="238,215 225,209 225,221" fill="#38BDF8" />
          <text x="150" y="245" fill="#38BDF8" fontSize="11" fontWeight="700">P(h) = P₀ + ρgh</text>

          {/* Right Summary Card */}
          <g transform="translate(475, 95)">
            <rect width="115" height="130" rx="8" fill="rgba(15,23,42,0.85)" stroke="rgba(255,255,255,0.12)" />
            <text x="10" y="22" fill="#00F0FF" fontSize="11" fontWeight="700">Floatation Rules:</text>
            <text x="10" y="44" fill="#34D399" fontSize="10.5">• F_B = W: Floats</text>
            <text x="10" y="66" fill="#F87171" fontSize="10.5">• F_B &lt; W: Sinks</text>
            <text x="10" y="88" fill="#FBBF24" fontSize="10.5">• F_B &gt; W: Accel ↑</text>
            <text x="10" y="112" fill="#94A3B8" fontSize="10">W' = W - F_B</text>
          </g>
        </svg>
      );
    }

    // =========================================================================
    // 7. PHYSICS: Lenz's Law & Electromagnetic Induction
    // =========================================================================
    if (combined.includes('lenz') || combined.includes('induction') || combined.includes('faraday') || combined.includes('magnetic flux')) {
      return (
        <svg viewBox="0 0 600 320" className="concept-svg-diagram">
          <g transform="translate(70, 110)">
            <rect x="0" y="0" width="70" height="60" fill="#EF4444" rx="4" />
            <text x="35" y="36" fill="#FFFFFF" fontSize="20" fontWeight="900" textAnchor="middle">N</text>
            <rect x="70" y="0" width="70" height="60" fill="#3B82F6" rx="4" />
            <text x="105" y="36" fill="#FFFFFF" fontSize="20" fontWeight="900" textAnchor="middle">S</text>
            <line x1="150" y1="30" x2="210" y2="30" stroke="#F59E0B" strokeWidth="3" />
            <polygon points="218,30 205,24 205,36" fill="#F59E0B" />
            <text x="180" y="18" fill="#F59E0B" fontSize="11" fontWeight="800" textAnchor="middle">velocity v →</text>
          </g>

          <ellipse cx="360" cy="140" rx="35" ry="85" fill="none" stroke="#F59E0B" strokeWidth="6" />
          <ellipse cx="360" cy="140" rx="20" ry="70" fill="rgba(0, 240, 255, 0.05)" stroke="rgba(255, 255, 255, 0.2)" strokeDasharray="3 3" />

          <path d="M 140 120 Q 250 90 340 100" fill="none" stroke="#60A5FA" strokeWidth="2.5" strokeDasharray="4 4" />
          <path d="M 140 140 L 340 140" fill="none" stroke="#60A5FA" strokeWidth="3" />
          <path d="M 140 160 Q 250 190 340 180" fill="none" stroke="#60A5FA" strokeWidth="2.5" strokeDasharray="4 4" />
          <text x="250" y="85" fill="#60A5FA" fontSize="12" fontWeight="700">External Flux B_ext (Increasing)</text>

          <line x1="360" y1="140" x2="260" y2="140" stroke="#00F0FF" strokeWidth="4" />
          <polygon points="250,140 265,133 265,147" fill="#00F0FF" />
          <text x="290" y="165" fill="#00F0FF" fontSize="13" fontWeight="800">B_induced (Opposes motion!)</text>

          <path d="M 360 55 A 35 85 0 0 1 390 140" fill="none" stroke="#10B981" strokeWidth="4" />
          <polygon points="380,68 368,54 384,52" fill="#10B981" />
          <text x="410" y="80" fill="#10B981" fontSize="12" fontWeight="800">Induced Current (I)</text>

          <g transform="translate(180, 250)">
            <rect width="240" height="50" rx="8" fill="rgba(15,23,42,0.9)" stroke="rgba(0,240,255,0.4)" />
            <text x="120" y="24" fill="#FFFFFF" fontSize="14" fontWeight="800" textAnchor="middle">
              ℰ = -N (dΦ_B / dt)
            </text>
            <text x="120" y="42" fill="#FF8A8A" fontSize="11" textAnchor="middle">
              The negative (-) sign embodies Lenz's Law
            </text>
          </g>
        </svg>
      );
    }

    // =========================================================================
    // 8. PHYSICS: Bernoulli's Principle & Dynamic Lift
    // =========================================================================
    if (combined.includes('bernoulli') || combined.includes('lift') || combined.includes('aerofoil') || combined.includes('pressure')) {
      return (
        <svg viewBox="0 0 600 320" className="concept-svg-diagram">
          <path 
            d="M 120 180 C 180 80 340 70 480 180 C 350 200 200 200 120 180 Z" 
            fill="#D97706" 
            stroke="#FFFFFF" 
            strokeWidth="2.5" 
          />
          <text x="290" y="160" fill="#FFFFFF" fontSize="14" fontWeight="800" textAnchor="middle">Aerofoil Wing</text>

          <path d="M 60 120 C 180 40 340 30 540 130" fill="none" stroke="#00F0FF" strokeWidth="3" />
          <path d="M 60 100 C 180 20 340 10 540 110" fill="none" stroke="#00F0FF" strokeWidth="2.5" strokeDasharray="6 3" />
          <text x="300" y="35" fill="#00F0FF" fontSize="13" fontWeight="800" textAnchor="middle">
            High Velocity (v_top ↑) ⟹ Low Pressure (P_top ↓)
          </text>

          <path d="M 60 210 C 200 220 360 220 540 210" fill="none" stroke="#3B82F6" strokeWidth="3" />
          <text x="300" y="245" fill="#3B82F6" fontSize="13" fontWeight="800" textAnchor="middle">
            Low Velocity (v_bottom ↓) ⟹ High Pressure (P_bottom ↑)
          </text>

          <line x1="300" y1="160" x2="300" y2="70" stroke="#10B981" strokeWidth="4.5" />
          <polygon points="300,58 290,75 310,75" fill="#10B981" />
          <text x="315" y="75" fill="#10B981" fontSize="14" fontWeight="900">Dynamic Lift = ΔP · Area</text>

          <g transform="translate(100, 265)">
            <rect width="400" height="42" rx="8" fill="rgba(15,23,42,0.85)" stroke="rgba(255,255,255,0.15)" />
            <text x="200" y="26" fill="#F8FAFC" fontSize="12.5" fontWeight="700" textAnchor="middle">
              P + ½ ρ v² + ρ g h = Constant along a streamline
            </text>
          </g>
        </svg>
      );
    }

    // =========================================================================
    // 9. MATHEMATICS: Calculus & Definite Integrals
    // =========================================================================
    if (combined.includes('calculus') || combined.includes('integral') || combined.includes('derivative') || combined.includes('math')) {
      return (
        <svg viewBox="0 0 600 320" className="concept-svg-diagram">
          <line x1="60" y1="260" x2="560" y2="260" stroke="#64748B" strokeWidth="2" />
          <line x1="80" y1="40" x2="80" y2="270" stroke="#64748B" strokeWidth="2" />
          <text x="560" y="280" fill="#94A3B8" fontSize="12" textAnchor="end">x →</text>
          <text x="65" y="45" fill="#94A3B8" fontSize="12" textAnchor="middle">y = f(x)</text>

          <path 
            d="M 180 260 L 180 170 Q 280 80 380 130 L 380 260 Z" 
            fill="rgba(0, 240, 255, 0.25)" 
            stroke="none" 
          />

          <path d="M 100 220 Q 200 150 280 85 T 460 180 T 540 90" fill="none" stroke="#00F0FF" strokeWidth="3.5" />

          <line x1="180" y1="170" x2="180" y2="260" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="4 4" />
          <line x1="380" y1="130" x2="380" y2="260" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="4 4" />
          <text x="180" y="280" fill="#F59E0B" fontSize="14" fontWeight="800" textAnchor="middle">x = a</text>
          <text x="380" y="280" fill="#F59E0B" fontSize="14" fontWeight="800" textAnchor="middle">x = b</text>

          <rect x="270" y="87" width="22" height="173" fill="rgba(123, 97, 255, 0.45)" stroke="#A78BFA" strokeWidth="1.5" />
          <text x="281" y="200" fill="#FFFFFF" fontSize="11" fontWeight="700" textAnchor="middle">f(x)·dx</text>

          <g transform="translate(200, 30)">
            <rect width="280" height="48" rx="8" fill="rgba(15,23,42,0.9)" stroke="rgba(0,240,255,0.4)" />
            <text x="140" y="22" fill="#00F0FF" fontSize="13.5" fontWeight="800" textAnchor="middle">
              Area = ∫[a to b] f(x) dx = F(b) - F(a)
            </text>
            <text x="140" y="38" fill="#CBD5E1" fontSize="10.5" textAnchor="middle">
              Fundamental Theorem of Calculus
            </text>
          </g>
        </svg>
      );
    }

    // =========================================================================
    // 10. SUBJECT-AWARE DEFAULT FALLBACK (No universal equilibrium piston fallback!)
    // =========================================================================
    // Biology Fallback
    if (subject.includes('bio')) {
      return (
        <svg viewBox="0 0 600 300" className="concept-svg-diagram">
          <ellipse cx="300" cy="150" rx="220" ry="100" fill="rgba(16, 185, 129, 0.08)" stroke="#10B981" strokeWidth="2.5" strokeDasharray="6 3" />
          <text x="300" y="70" fill="#10B981" fontSize="14" fontWeight="800" textAnchor="middle">Cellular Membrane Boundary</text>
          
          <circle cx="210" cy="150" r="45" fill="rgba(56, 189, 248, 0.15)" stroke="#38BDF8" strokeWidth="2" />
          <text x="210" y="145" fill="#38BDF8" fontSize="13" fontWeight="800" textAnchor="middle">Receptor</text>
          <text x="210" y="162" fill="#94A3B8" fontSize="10" textAnchor="middle">Substrate Binding</text>

          <line x1="260" y1="150" x2="330" y2="150" stroke="#F59E0B" strokeWidth="3" />
          <polygon points="338,150 326,144 326,156" fill="#F59E0B" />
          <text x="295" y="140" fill="#F59E0B" fontSize="11" fontWeight="700" textAnchor="middle">Transduction</text>

          <circle cx="390" cy="150" r="45" fill="rgba(168, 85, 247, 0.15)" stroke="#A855F7" strokeWidth="2" />
          <text x="390" y="145" fill="#C084FC" fontSize="13" fontWeight="800" textAnchor="middle">Gene / Enzyme</text>
          <text x="390" y="162" fill="#94A3B8" fontSize="10" textAnchor="middle">Active Site</text>

          <text x="300" y="270" fill="#CBD5E1" fontSize="12" fontWeight="700" textAnchor="middle">
            {topic.title} • Biological Pathway & Molecular Regulation
          </text>
        </svg>
      );
    }

    // Physics Fallback
    if (subject.includes('phys')) {
      return (
        <svg viewBox="0 0 600 300" className="concept-svg-diagram">
          <circle cx="160" cy="150" r="55" fill="rgba(0, 240, 255, 0.1)" stroke="#00F0FF" strokeWidth="2" />
          <text x="160" y="145" fill="#00F0FF" fontSize="13" fontWeight="800" textAnchor="middle">Force Input</text>
          <text x="160" y="165" fill="#94A3B8" fontSize="10" textAnchor="middle">Initial State S₁</text>

          <line x1="225" y1="150" x2="365" y2="150" stroke="#F59E0B" strokeWidth="3" />
          <polygon points="375,150 361,143 361,157" fill="#F59E0B" />
          <text x="295" y="138" fill="#F59E0B" fontSize="12" fontWeight="700" textAnchor="middle">Work / Energy Transfer →</text>
          <text x="295" y="172" fill="#94A3B8" fontSize="10.5" textAnchor="middle">W = ∫ F · dr = ΔK</text>

          <circle cx="430" cy="150" r="55" fill="rgba(16, 185, 129, 0.1)" stroke="#10B981" strokeWidth="2" />
          <text x="430" y="145" fill="#10B981" fontSize="13" fontWeight="800" textAnchor="middle">Kinetic State</text>
          <text x="430" y="165" fill="#94A3B8" fontSize="10" textAnchor="middle">Final State S₂</text>

          <text x="300" y="45" fill="#FFFFFF" fontSize="14" fontWeight="800" textAnchor="middle">
            {topic.title} • Physical Vector & Conservation Analysis
          </text>
        </svg>
      );
    }

    // General STEM Fallback
    return (
      <svg viewBox="0 0 600 300" className="concept-svg-diagram">
        <circle cx="160" cy="150" r="55" fill="rgba(0, 240, 255, 0.1)" stroke="#00F0FF" strokeWidth="2" />
        <text x="160" y="145" fill="#00F0FF" fontSize="13" fontWeight="800" textAnchor="middle">System Stimulus</text>
        <text x="160" y="165" fill="#94A3B8" fontSize="10" textAnchor="middle">Inputs & Constants</text>

        <line x1="225" y1="150" x2="365" y2="150" stroke="#F59E0B" strokeWidth="3" />
        <polygon points="375,150 361,143 361,157" fill="#F59E0B" />
        <text x="295" y="138" fill="#F59E0B" fontSize="12" fontWeight="700" textAnchor="middle">Governing Mechanism →</text>
        <text x="295" y="172" fill="#94A3B8" fontSize="10.5" textAnchor="middle">{topic.subject || 'STEM'} Principles</text>

        <circle cx="430" cy="150" r="55" fill="rgba(16, 185, 129, 0.1)" stroke="#10B981" strokeWidth="2" />
        <text x="430" y="145" fill="#10B981" fontSize="13" fontWeight="800" textAnchor="middle">Response State</text>
        <text x="430" y="165" fill="#94A3B8" fontSize="10" textAnchor="middle">Output Transformation</text>

        <text x="300" y="45" fill="#FFFFFF" fontSize="14" fontWeight="800" textAnchor="middle">
          {topic.title} • Schematic Analysis
        </text>
      </svg>
    );
  };

  return (
    <div className={`dynamic-diagram-card glass-panel animate-fade-in ${isExpanded ? 'diagram-expanded' : ''}`}>
      <div className="diagram-card-header flex-between items-center">
        <div className="flex-row items-center gap-2">
          <div className="diagram-badge glow-cyan">
            <Compass size={16} className="text-cyan" />
          </div>
          <div>
            <span className="diagram-tag">DYNAMIC SCIENTIFIC DIAGRAM</span>
            <h4 className="diagram-title">{topic.title} Visual Representation</h4>
          </div>
        </div>

        <button
          type="button"
          className="diagram-expand-btn glass-panel"
          onClick={() => setIsExpanded(!isExpanded)}
          title={isExpanded ? "Collapse Diagram" : "Expand Diagram"}
        >
          {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          <span>{isExpanded ? 'Collapse' : 'Expand'}</span>
        </button>
      </div>

      <div className="diagram-svg-container mt-3">
        {renderDiagramContent()}
      </div>

      <div className="diagram-footer mt-2 flex-between items-center text-xs text-muted">
        <span>Vector SVG • Calibrated to {topic.subject || 'STEM'} laws</span>
        <span className="text-cyan">Interactive Physical Reference</span>
      </div>
    </div>
  );
}
