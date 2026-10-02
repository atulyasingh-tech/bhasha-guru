// Preset Avatars for BhashaGuru STEM Learners
// Celebrates iconic scientists, mathematicians, and STEM archetypes

export const AVATAR_PRESETS = [
  {
    id: 'einstein',
    name: 'Albert Einstein',
    title: 'Theoretical Physicist',
    tagline: 'Imagination is more important than knowledge',
    iconType: 'atom',
    accent: '#00F0FF',
    svgGradient: ['#00F0FF', '#0072FF'],
    initials: 'AE',
    quote: 'E = mc²'
  },
  {
    id: 'hypatia',
    name: 'Hypatia of Alexandria',
    title: 'Astronomer & Mathematician',
    tagline: 'Reserve your right to think, for even to think wrongly is better than not to think at all',
    iconType: 'compass',
    accent: '#FF007A',
    svgGradient: ['#FF007A', '#7928CA'],
    initials: 'HY',
    quote: 'Conic Sections'
  },
  {
    id: 'ramanujan',
    name: 'Srinivasa Ramanujan',
    title: 'Number Theorist Extraordinaire',
    tagline: 'An equation has no meaning unless it expresses a thought of God',
    iconType: 'infinity',
    accent: '#FFB800',
    svgGradient: ['#FFB800', '#FF4E00'],
    initials: 'SR',
    quote: '1729 (Taxicab)'
  },
  {
    id: 'curie',
    name: 'Marie Curie',
    title: 'Pioneer of Radioactivity',
    tagline: 'Nothing in life is to be feared, it is only to be understood',
    iconType: 'flask',
    accent: '#00FF88',
    svgGradient: ['#00FF88', '#00B0FF'],
    initials: 'MC',
    quote: '2x Nobel Laureate'
  },
  {
    id: 'astronaut',
    name: 'Astro Explorer',
    title: 'Cosmic Navigator',
    tagline: 'Through hardships to the stars — Per Aspera Ad Astra',
    iconType: 'rocket',
    accent: '#9D00FF',
    svgGradient: ['#7928CA', '#4338CA'],
    initials: 'AX',
    quote: 'Deep Space'
  },
  {
    id: 'atom',
    name: 'Quantum Core',
    title: 'Subatomic Pioneer',
    tagline: 'Superposition, wave-particle duality, and uncertainty',
    iconType: 'sparkles',
    accent: '#38BDF8',
    svgGradient: ['#38BDF8', '#1E40AF'],
    initials: 'QC',
    quote: 'Ψ(x,t)'
  },
  {
    id: 'robot',
    name: 'Cyber Sentinel',
    title: 'Robotics & Hardware Architect',
    tagline: 'Precision control loops, sensor fusion, and actuator dynamics',
    iconType: 'bot',
    accent: '#F43F5E',
    svgGradient: ['#F43F5E', '#BE123C'],
    initials: 'CS',
    quote: 'Mechatronics'
  },
  {
    id: 'neural',
    name: 'Neural Synthesizer',
    title: 'AI & Cognitive Systems Engineer',
    tagline: 'Deep gradient descent and neuromorphic architecture',
    iconType: 'brain',
    accent: '#A855F7',
    svgGradient: ['#A855F7', '#6366F1'],
    initials: 'NS',
    quote: 'Backpropagation'
  }
];

export function getAvatarById(id) {
  return AVATAR_PRESETS.find(a => a.id === id) || AVATAR_PRESETS[0];
}
