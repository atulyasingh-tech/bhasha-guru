// Sarvam AI Bulbul V3 Voice Narrator for BhashaGuru
// Natural Indic voice narration with live sound-wave visualizer and fallback

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, RotateCcw, Sparkles, Loader2 } from 'lucide-react';
import { 
  synthesizeSpeechWithSarvam, 
  playSarvamAudioUrl, 
  stopSarvamPlayback,
  cleanTextForSpeech
} from '../services/sarvamVoiceService.js';

export default function AudioPlayer({ 
  textToRead, 
  title = "Lesson Audio", 
  language = "English" 
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [speechRate, setSpeechRate] = useState(1.0);
  const [isSarvamVoice, setIsSarvamVoice] = useState(true);
  const currentAudioRef = useRef(null);

  // Clean up playback when unmounted or textToRead changes
  useEffect(() => {
    return () => {
      stopSarvamPlayback();
      setIsPlaying(false);
      setIsPaused(false);
      setIsLoading(false);
    };
  }, [textToRead]);

  // Fallback to browser SpeechSynthesis if Sarvam network fails
  const playWebSpeechFallback = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsPlaying(false);
      setIsLoading(false);
      return;
    }

    window.speechSynthesis.cancel();
    const spoken = cleanTextForSpeech(textToRead);
    const utterance = new SpeechSynthesisUtterance(spoken);
    utterance.rate = speechRate;

    const voices = window.speechSynthesis.getVoices();
    let preferred = null;
    if (language === 'Hinglish') {
      preferred = voices.find(v => v.lang.includes('hi') || v.name.includes('India'));
    } else if (language === 'Tenglish') {
      preferred = voices.find(v => v.lang.includes('te') || v.name.includes('India'));
    }
    if (!preferred) {
      preferred = voices.find(v => v.lang.includes('en-IN')) || voices.find(v => v.lang.includes('en'));
    }
    if (preferred) utterance.voice = preferred;

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };
    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
    setIsLoading(false);
    setIsSarvamVoice(false);
  };

  const handlePlay = async () => {
    if (isPaused && currentAudioRef.current) {
      currentAudioRef.current.play().catch(() => {});
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    stopSarvamPlayback();
    setIsLoading(true);

    try {
      // 1. Try Sarvam AI Bulbul V3
      const audioUrl = await synthesizeSpeechWithSarvam({
        text: textToRead,
        dialect: language,
        pace: speechRate
      });

      const audio = playSarvamAudioUrl(
        audioUrl,
        () => {
          setIsPlaying(false);
          setIsPaused(false);
          setIsLoading(false);
        },
        (err) => {
          console.warn('Sarvam playback error, falling back to Web Speech:', err);
          playWebSpeechFallback();
        }
      );

      currentAudioRef.current = audio;
      setIsPlaying(true);
      setIsPaused(false);
      setIsLoading(false);
      setIsSarvamVoice(true);
    } catch (err) {
      console.warn('Sarvam synthesis notice:', err.message, 'Falling back to Web Speech.');
      playWebSpeechFallback();
    }
  };

  const handlePause = () => {
    if (currentAudioRef.current && isPlaying) {
      currentAudioRef.current.pause();
      setIsPaused(true);
      setIsPlaying(false);
    } else if (typeof window !== 'undefined' && 'speechSynthesis' in window && isPlaying) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    stopSarvamPlayback();
    setIsPlaying(false);
    setIsPaused(false);
    setIsLoading(false);
  };

  return (
    <div className={`audio-narrator-bar ${isPlaying ? 'audio-playing' : ''}`}>
      <div className="audio-info flex-row items-center gap-2">
        <Volume2 className={`text-cyan ${isPlaying ? 'icon-pulse' : ''}`} size={16} />
        <span className="audio-label">{title}</span>
        
        {/* Sarvam Voice Indicator Badge */}
        <span className="sarvam-voice-pill">
          <Sparkles size={10} className="text-gold" />
          <span>{isSarvamVoice ? 'Sarvam AI Bulbul V3' : 'Web Audio'} ({language})</span>
        </span>
      </div>

      {/* Live Soundwave Animation */}
      {isPlaying && (
        <div className="soundwave-container" title="Audio Playing">
          <span className="soundwave-bar bar-1" />
          <span className="soundwave-bar bar-2" />
          <span className="soundwave-bar bar-3" />
          <span className="soundwave-bar bar-4" />
          <span className="soundwave-bar bar-5" />
        </div>
      )}

      <div className="audio-controls">
        {isLoading ? (
          <button type="button" className="audio-btn loading-btn" disabled>
            <Loader2 size={14} className="animate-spin text-cyan" />
            <span>Generating Audio...</span>
          </button>
        ) : !isPlaying ? (
          <button 
            type="button" 
            onClick={handlePlay} 
            className="audio-btn play-btn"
            title="Listen with Natural AI Voice"
          >
            <Play size={14} /> Listen
          </button>
        ) : (
          <button 
            type="button" 
            onClick={handlePause} 
            className="audio-btn pause-btn"
            title="Pause Voice"
          >
            <Pause size={14} /> Pause
          </button>
        )}

        {(isPlaying || isPaused) && (
          <button 
            type="button" 
            onClick={handleStop} 
            className="audio-btn stop-btn"
            title="Stop Audio"
          >
            <RotateCcw size={13} /> Stop
          </button>
        )}

        <div className="speed-pills">
          {[0.9, 1.0, 1.2].map(rate => (
            <button
              key={rate}
              type="button"
              className={`speed-pill ${speechRate === rate ? 'active' : ''}`}
              onClick={() => {
                setSpeechRate(rate);
                if (isPlaying) {
                  handleStop();
                }
              }}
              title={`Playback speed ${rate}x`}
            >
              {rate}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
