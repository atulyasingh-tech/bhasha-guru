export const MASTERY_TIERS = [
  {
    id: 'bronze',
    tierNumber: 1,
    name: 'Bronze Scholar',
    title: 'Core Definition & Fundamentals',
    minXp: 0,
    maxXp: 199,
    color: '#CD7F32',
    accentColor: '#E6A15C',
    badgeIcon: 'ShieldAlert',
    description: 'Mastered foundational terminology, fundamental definitions, and standard variable units.',
    perk: 'Unlocked Layer 1 Board Exam Notes & Formula Sheet (+20 Welcome XP)'
  },
  {
    id: 'silver',
    tierNumber: 2,
    name: 'Silver Engineer',
    title: 'Real-World Applications Applied',
    minXp: 200,
    maxXp: 499,
    color: '#A0AEC0',
    accentColor: '#E2E8F0',
    badgeIcon: 'Cog',
    description: 'Can identify and analyze physical principles at play in modern industrial, naval, and aerospace systems.',
    perk: 'Unlocked Layer 2 Industrial Case Studies'
  },
  {
    id: 'gold',
    tierNumber: 3,
    name: 'Gold Historian',
    title: 'Origin & Mechanism Mastered',
    minXp: 500,
    maxXp: 999,
    color: '#ECC94B',
    accentColor: '#F6E05E',
    badgeIcon: 'Award',
    description: 'Understands the historical crisis, experimental eureka moment, and epistemological evolution.',
    perk: 'Unlocked Historical Breakthrough Narratives'
  },
  {
    id: 'platinum',
    tierNumber: 4,
    name: 'Platinum Specialist',
    title: 'Edge Cases & Paradoxes Solved',
    minXp: 1000,
    maxXp: 1999,
    color: '#38BDF8',
    accentColor: '#7DD3FC',
    badgeIcon: 'Zap',
    description: 'Thrives in non-inertial frames, extreme physical boundaries, and counter-intuitive thought experiments.',
    perk: 'Unlocked Twisted Physical Paradox Generator'
  },
  {
    id: 'diamond',
    tierNumber: 5,
    name: 'Diamond Analyst',
    title: 'Derivations & Numericals Solved',
    minXp: 2000,
    maxXp: 2999,
    color: '#A855F7',
    accentColor: '#C084FC',
    badgeIcon: 'Code2',
    description: 'Solves multi-concept competitive calculation traps independently with algebraic rigor.',
    perk: 'Unlocked Interactive Derivation Sandbox'
  },
  {
    id: 'master',
    tierNumber: 6,
    name: 'Master Guru',
    title: 'Synthesis & Pedagogical Mastery',
    minXp: 3000,
    maxXp: Infinity,
    color: '#F59E0B',
    accentColor: '#FCD34D',
    badgeIcon: 'Crown',
    description: 'Can distill intricate mathematical physics into crystal-clear analogies and teach peers intuitively.',
    perk: 'Unlocked BhashaGuru Pedagogical Master Crest'
  }
];

export function getTierForXp(xp = 0) {
  for (let i = MASTERY_TIERS.length - 1; i >= 0; i--) {
    if (xp >= MASTERY_TIERS[i].minXp) {
      const currentTier = MASTERY_TIERS[i];
      const nextTier = MASTERY_TIERS[i + 1] || null;
      const tierRange = nextTier ? (nextTier.minXp - currentTier.minXp) : 1000;
      const progressInTier = nextTier
        ? Math.min(100, Math.max(0, ((xp - currentTier.minXp) / tierRange) * 100))
        : 100;
      const xpNeeded = nextTier ? nextTier.minXp - xp : 0;
      return {
        ...currentTier,
        nextTier,
        progressInTier: Math.round(progressInTier),
        xpNeeded
      };
    }
  }
  return { ...MASTERY_TIERS[0], nextTier: MASTERY_TIERS[1], progressInTier: 0, xpNeeded: 200 };
}
