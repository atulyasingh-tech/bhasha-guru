// Avatar Display Component (Supports Presets & Custom Uploads)
import React from 'react';
import { Atom, Compass, Infinity as InfinityIcon, FlaskConical, Rocket, Sparkles, Bot, Brain, User } from 'lucide-react';
import { getAvatarById } from '../data/avatarPresets';

export default function AvatarDisplay({
  avatarId = 'einstein',
  customUrl = null,
  size = 40,
  className = '',
  showBadge = false
}) {
  const avatar = getAvatarById(avatarId);

  // If custom uploaded image
  if (avatarId === 'custom' && customUrl) {
    return (
      <div 
        className={`avatar-circle-wrap custom-avatar ${className}`}
        style={{ width: size, height: size }}
      >
        <img 
          src={customUrl} 
          alt="Student Avatar" 
          className="avatar-img-cover" 
          style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover' }}
        />
      </div>
    );
  }

  // Render Preset Icon
  const getIcon = () => {
    const iconSize = Math.max(16, Math.round(size * 0.52));
    switch (avatar.iconType) {
      case 'atom': return <Atom size={iconSize} />;
      case 'compass': return <Compass size={iconSize} />;
      case 'infinity': return <InfinityIcon size={iconSize} />;
      case 'flask': return <FlaskConical size={iconSize} />;
      case 'rocket': return <Rocket size={iconSize} />;
      case 'sparkles': return <Sparkles size={iconSize} />;
      case 'bot': return <Bot size={iconSize} />;
      case 'brain': return <Brain size={iconSize} />;
      default: return <User size={iconSize} />;
    }
  };

  const bgGradient = avatar.svgGradient 
    ? `linear-gradient(135deg, ${avatar.svgGradient[0]} 0%, ${avatar.svgGradient[1]} 100%)`
    : `linear-gradient(135deg, #00F0FF 0%, #7B61FF 100%)`;

  return (
    <div 
      className={`avatar-circle-wrap preset-avatar ${className}`}
      style={{ 
        width: size, 
        height: size, 
        background: bgGradient,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#04091A',
        boxShadow: `0 0 ${Math.round(size * 0.3)}px ${avatar.accent}44`,
        border: `2px solid ${avatar.accent}`,
        position: 'relative',
        flexShrink: 0
      }}
      title={`${avatar.name} - ${avatar.title}`}
    >
      {getIcon()}
      {showBadge && (
        <span 
          className="avatar-mini-badge"
          style={{
            position: 'absolute',
            bottom: -3,
            right: -3,
            background: '#0c1020',
            border: `1px solid ${avatar.accent}`,
            color: avatar.accent,
            fontSize: '9px',
            fontWeight: 800,
            borderRadius: '9999px',
            padding: '1px 4px',
            lineHeight: 1
          }}
        >
          {avatar.initials}
        </span>
      )}
    </div>
  );
}
