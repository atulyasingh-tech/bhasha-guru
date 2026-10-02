// Layer 3: Origin Story
// Historical narrative of scientific discovery: The crisis, struggle, and "Eureka!" moment

import React from 'react';
import { Award, CheckCircle, Clock, User, Lightbulb, Flame, ScrollText } from 'lucide-react';
import MathRenderer from './MathRenderer';
import AudioPlayer from './AudioPlayer';

export default function Layer3OriginStory({
  data,
  profile,
  isMastered,
  onMasterLayer
}) {
  const narrativeText = typeof data.narrative === 'object' && data.narrative !== null
    ? data.narrative[profile?.language] || data.narrative.English || ''
    : data.narrative;

  return (
    <div className="concept-layer-card layer-3-card">
      <div className="layer-header">
        <div className="layer-badge-wrap">
          <span className="layer-pill layer-3-pill">LAYER 3</span>
          <h3 className="layer-heading">Origin Story: The Breakthrough Epiphany</h3>
        </div>
        <div className="layer-header-actions">
          {isMastered ? (
            <span className="mastered-tag">
              <CheckCircle size={15} /> Mastered (+40 XP)
            </span>
          ) : (
            <button
              type="button"
              className="master-action-btn"
              onClick={() => onMasterLayer('layer3', 40)}
            >
              <CheckCircle size={15} /> Mark Mastered (+40 XP)
            </button>
          )}
        </div>
      </div>

      <div className="historical-meta-banner">
        <div className="meta-item">
          <User size={15} className="text-gold" />
          <span className="meta-label">Discoverer:</span>
          <span className="meta-value">{data.hero}</span>
        </div>
        <div className="meta-item">
          <Clock size={15} className="text-cyan" />
          <span className="meta-label">Historical Era:</span>
          <span className="meta-value">{data.era}</span>
        </div>
        <div className="meta-item ml-auto">
          <span className="dialect-mini-badge">{profile.language}</span>
        </div>
      </div>

      {/* Audio Narrator for Layer 3 */}
      <AudioPlayer 
        textToRead={narrativeText}
        title="Listen to Historical Discovery Narrative"
        language={profile.language}
      />

      <div className="origin-story-container glass-panel">
        <div className="story-lead-icon">
          <ScrollText size={24} className="text-gold" />
        </div>

        <div className="story-content-body">
          <MathRenderer content={narrativeText} />
        </div>

        {/* Epiphany Key Breakthrough Card */}
        {data.epiphanyKey && (
          <div className="epiphany-breakthrough-card">
            <div className="epiphany-header">
              <Lightbulb size={18} className="text-amber animate-pulse" />
              <span className="epiphany-title">The "Eureka!" Epiphany Breakthrough:</span>
            </div>
            <p className="epiphany-text">
              <MathRenderer content={data.epiphanyKey} />
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
