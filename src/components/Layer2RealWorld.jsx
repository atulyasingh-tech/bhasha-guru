// Layer 2: Live Real-World Application
// Concrete modern societal applications: Submarines, cargo shipping, hydrometers, maglev brakes, etc.

import React from 'react';
import { Cog, CheckCircle, ExternalLink, Cpu, Compass, ShieldCheck } from 'lucide-react';
import MathRenderer from './MathRenderer';
import AudioPlayer from './AudioPlayer';

export default function Layer2RealWorld({
  data,
  profile,
  isMastered,
  onMasterLayer
}) {
  return (
    <div className="concept-layer-card layer-2-card">
      <div className="layer-header">
        <div className="layer-badge-wrap">
          <span className="layer-pill layer-2-pill">LAYER 2</span>
          <h3 className="layer-heading">Live Real-World Application</h3>
        </div>
        <div className="layer-header-actions">
          {isMastered ? (
            <span className="mastered-tag">
              <CheckCircle size={15} /> Applied (+35 XP)
            </span>
          ) : (
            <button
              type="button"
              className="master-action-btn"
              onClick={() => onMasterLayer('layer2', 35)}
            >
              <CheckCircle size={15} /> Mark Applied (+35 XP)
            </button>
          )}
        </div>
      </div>

      <div className="application-title-banner">
        <div className="flex-row items-center gap-2">
          <Compass className="text-cyan flex-shrink-0" size={20} />
          <h4 className="app-banner-title">{data.applicationTitle}</h4>
        </div>
        <span className="industry-tag">Modern Engineering & Society</span>
      </div>

      {/* Audio Narrator for Layer 2 */}
      <AudioPlayer
        textToRead={data.caseStudy}
        title="Listen to Real-World Application"
        language={profile.language}
      />

      <div className="real-world-grid">
        {/* Left Column: Detailed Case Study Narrative */}
        <div className="case-study-box glass-panel">
          <div className="panel-title-bar">
            <span className="panel-title">Engineering Mechanics Case Study</span>
            <span className="dialect-mini-badge">{profile.language}</span>
          </div>

          <div className="case-study-body">
            <MathRenderer content={data.caseStudy} />
          </div>

          {data.engineeringDiagramConcept && (
            <div className="engineering-concept-card">
              <div className="concept-label">
                <Cpu size={14} className="text-cyan" />
                <span>System Mechanism Core:</span>
              </div>
              <p className="concept-text">{data.engineeringDiagramConcept}</p>
            </div>
          )}
        </div>

        {/* Right Column: Practical Examples & Modern Systems */}
        <div className="systems-box glass-panel">
          <div className="panel-title-bar">
            <span className="panel-title">Everyday & Industrial Implementations</span>
            <span className="examples-count-pill">{data.realWorldExamples?.length || 4} Systems</span>
          </div>

          <div className="examples-list">
            {data.realWorldExamples?.map((item, idx) => (
              <div key={idx} className="example-item-card">
                <div className="example-bullet-icon">
                  <Cog size={15} className="text-cyan" />
                </div>
                <div className="example-item-text">
                  <MathRenderer content={item} />
                </div>
              </div>
            ))}
          </div>

          <div className="industry-takeaway-alert">
            <ShieldCheck size={16} className="text-emerald flex-shrink-0" />
            <p className="takeaway-text">
              <strong>STEM Architect Note:</strong> Theoretical equations in textbooks directly define structural limits, safety margins, and patent blueprints in aerospace and marine engineering.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
