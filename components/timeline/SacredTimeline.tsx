'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

interface TithiInfo {
  number: number;
  name: string;
  paksha: 'shukla' | 'krishna';
  isAuspicious: boolean;
  recommendations: string[];
}

interface TimelineEvent {
  date: Date;
  tithi: TithiInfo;
  nakshatra: string;
  yoga: string;
  deity: string;
  recommendedPractice: string;
  energyLevel: number; // 1-10
}

// Simplified Tithi calculation (client-side)
function getTithiInfo(date: Date): TithiInfo {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // Simplified lunar phase calculation
  const lunarDay = ((day + month * 30) % 30) + 1;
  const tithiNumber = Math.floor((lunarDay / 30) * 30) + 1;
  const paksha = tithiNumber <= 15 ? 'shukla' : 'krishna';

  const TITHI_NAMES = [
    'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
    'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
    'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima',
    'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
    'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
    'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Amavasya',
  ];

  return {
    number: tithiNumber,
    name: TITHI_NAMES[tithiNumber - 1],
    paksha,
    isAuspicious: [1, 6, 10, 11, 15].includes(tithiNumber),
    recommendations: getRecommendations(tithiNumber, paksha),
  };
}

function getRecommendations(tithi: number, paksha: 'shukla' | 'krishna'): string[] {
  if (paksha === 'shukla' && tithi === 15) return ['Full Moon Meditation', 'Abundance Rituals', 'Manifestation Work'];
  if (paksha === 'krishna' && tithi === 30) return ['Kali Sadhana', 'Introspection', 'Release Work'];
  if (tithi === 11) return ['Fasting Day', 'Spiritual Practices', 'Cleansing'];
  return ['General Practice', 'Mantra Japa', 'Meditation'];
}

function getNakshatra(date: Date): string {
  const nakshatras = [
    'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira',
    'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha',
    'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Svati',
    'Visakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha',
    'Uttara Ashadha', 'Shravana', 'Dhanistha', 'Shatabhisha', 'Purva Bhadra',
    'Uttara Bhadra', 'Revati',
  ];
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
  return nakshatras[dayOfYear % 27];
}

function getYoga(date: Date): string {
  const yogas = [
    'Vaidhriti', 'Vishkumbha', 'Priti', 'Ayushman', 'Saubhagya',
    'Shobhana', 'Atiganda', 'Sukarma', 'Dhriti', 'Shula',
    'Ganda', 'Vriddhi', 'Dhruva', 'Vyaghata', 'Harshana',
    'Vajra', 'Siddhi', 'Sadhya', 'Shubha', 'Shukla',
    'Brahma', 'Indra', 'Vaidhriti',
  ];
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
  return yogas[dayOfYear % 23];
}

function getDeity(date: Date): string {
  const deities = [
    'Surya (Sun)', 'Soma (Moon)', 'Mangala (Mars)', 'Budha (Mercury)',
    'Guru (Jupiter)', 'Shukra (Venus)', 'Shani (Saturn)',
  ];
  return deities[date.getDay()];
}

export default function SacredTimeline() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewType, setViewType] = useState<'calendar' | 'timeline' | 'energy'>('calendar');
  const [streak, setStreak] = useState(47);

  const tithiInfo = useMemo(() => getTithiInfo(selectedDate), [selectedDate]);
  const nakshatra = useMemo(() => getNakshatra(selectedDate), [selectedDate]);
  const yoga = useMemo(() => getYoga(selectedDate), [selectedDate]);
  const deity = useMemo(() => getDeity(selectedDate), [selectedDate]);

  const next30Days = useMemo(() => {
    const days: TimelineEvent[] = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date(selectedDate);
      date.setDate(date.getDate() + i);
      const tithi = getTithiInfo(date);
      days.push({
        date,
        tithi,
        nakshatra: getNakshatra(date),
        yoga: getYoga(date),
        deity: getDeity(date),
        recommendedPractice: tithi.recommendations[0] || 'Meditation',
        energyLevel: Math.floor(Math.random() * 10) + 1,
      });
    }
    return days;
  }, [selectedDate]);

  return (
    <div className="space-y-8 px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-serif mb-2">Sacred Timeline</h1>
        <p className="text-sm text-[var(--color-bone)]/60">Lunar calendar, practice recommendations, and cosmic alignment</p>
      </div>

      {/* Streak Display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-lg border border-[var(--color-gold)] bg-[var(--color-gold)]/10 p-6 text-center"
      >
        <p className="text-xs uppercase tracking-luxe text-[var(--color-bone)]/60 mb-2">Your Practice Streak</p>
        <p className="text-5xl font-serif text-[var(--color-gold)] mb-2">{streak}</p>
        <p className="text-sm text-[var(--color-bone)]/70">days of continuous practice</p>
      </motion.div>

      {/* Today's Cosmic Info */}
      <div className="rounded-lg border border-[var(--hairline)] p-6 space-y-4">
        <h2 className="text-2xl font-serif">Today’s Cosmic Alignment</h2>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-lg bg-[var(--color-bone)]/5 p-4">
            <p className="text-xs uppercase tracking-luxe text-[var(--color-bone)]/60 mb-1">Tithi</p>
            <p className="text-lg font-serif text-[var(--color-gold)]">{tithiInfo.name}</p>
            <p className="text-xs text-[var(--color-bone)]/60 mt-1">{tithiInfo.paksha === 'shukla' ? 'Waxing' : 'Waning'}</p>
          </div>

          <div className="rounded-lg bg-[var(--color-bone)]/5 p-4">
            <p className="text-xs uppercase tracking-luxe text-[var(--color-bone)]/60 mb-1">Nakshatra</p>
            <p className="text-lg font-serif">{nakshatra}</p>
            <p className="text-xs text-[var(--color-bone)]/60 mt-1">Lunar mansion</p>
          </div>

          <div className="rounded-lg bg-[var(--color-bone)]/5 p-4">
            <p className="text-xs uppercase tracking-luxe text-[var(--color-bone)]/60 mb-1">Yoga</p>
            <p className="text-lg font-serif">{yoga}</p>
            <p className="text-xs text-[var(--color-bone)]/60 mt-1">Cosmic yoga</p>
          </div>

          <div className="rounded-lg bg-[var(--color-bone)]/5 p-4">
            <p className="text-xs uppercase tracking-luxe text-[var(--color-bone)]/60 mb-1">Deity</p>
            <p className="text-lg font-serif">{deity}</p>
            <p className="text-xs text-[var(--color-bone)]/60 mt-1">Presiding force</p>
          </div>
        </div>

        {/* Recommendations */}
        <div className="border-t border-[var(--hairline)] pt-4">
          <p className="text-xs uppercase tracking-luxe text-[var(--color-bone)]/60 mb-3">Recommended Today</p>
          <ul className="space-y-2">
            {tithiInfo.recommendations.map((rec, i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" />
                {rec}
              </li>
            ))}
          </ul>
        </div>

        {tithiInfo.isAuspicious && (
          <div className="rounded bg-green-900/20 p-3 border border-green-900/40">
            <p className="text-xs font-serif text-green-300">✓ Auspicious day for major practices and rituals</p>
          </div>
        )}
      </div>

      {/* View Type Selector */}
      <div className="flex gap-2">
        {(['calendar', 'timeline', 'energy'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setViewType(type)}
            className={`rounded-lg px-4 py-2 text-xs font-serif uppercase tracking-luxe transition ${
              viewType === type
                ? 'bg-[var(--color-gold)] text-[var(--color-bone)]'
                : 'border border-[var(--hairline)] text-[var(--color-bone)]/70 hover:border-[var(--color-gold)]/40'
            }`}
          >
            {type === 'calendar' ? 'Calendar' : type === 'timeline' ? 'Timeline' : 'Energy Map'}
          </button>
        ))}
      </div>

      {/* 30-Day Timeline */}
      {viewType === 'timeline' && (
        <div className="space-y-3 rounded-lg border border-[var(--hairline)] p-6">
          <h3 className="text-lg font-serif mb-4">Next 30 Days</h3>
          <div className="space-y-3">
            {next30Days.slice(0, 15).map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex gap-4 rounded-lg bg-[var(--color-bone)]/5 p-3"
              >
                <div className="flex-shrink-0 w-16">
                  <p className="text-xs text-[var(--color-bone)]/60">
                    {event.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-serif text-[var(--color-gold)]">{event.tithi.name}</p>
                  <p className="text-xs text-[var(--color-bone)]/60">{event.recommendedPractice}</p>
                </div>
                <div className="flex-shrink-0">
                  <div className="text-xs font-serif text-[var(--color-gold)]">
                    {event.energyLevel}
                    <span className="text-[var(--color-bone)]/40">/10</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Energy Map */}
      {viewType === 'energy' && (
        <div className="rounded-lg border border-[var(--hairline)] p-6">
          <h3 className="text-lg font-serif mb-4">Energy Map (Next 30 Days)</h3>
          <div className="grid grid-cols-7 gap-2 sm:grid-cols-14">
            {next30Days.map((event, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1 }}
                className={`aspect-square rounded flex items-center justify-center text-center cursor-pointer transition ${
                  event.energyLevel >= 8
                    ? 'bg-[var(--color-gold)]/40 border border-[var(--color-gold)]'
                    : event.energyLevel >= 5
                      ? 'bg-[var(--color-bone)]/20 border border-[var(--hairline)]'
                      : 'bg-[var(--color-bone)]/10 border border-[var(--hairline)]'
                }`}
                title={`${event.date.toDateString()}: Energy ${event.energyLevel}/10`}
              >
                <span className="text-xs font-serif text-[var(--color-gold)]">{event.energyLevel}</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Seasonal Awareness */}
      <div className="rounded-lg bg-[var(--color-bone)]/5 p-6">
        <h3 className="text-lg font-serif mb-4">Seasonal Awareness (Ayurvedic)</h3>
        <div className="text-sm space-y-2 text-[var(--color-bone)]/70">
          <p>
            <span className="font-serif text-[var(--color-gold)]">Current Season:</span> {selectedDate.getMonth() >= 2 && selectedDate.getMonth() <= 3 ? 'Vasanta (Spring)' : selectedDate.getMonth() >= 4 && selectedDate.getMonth() <= 5 ? 'Grishma (Summer)' : 'Other'}
          </p>
          <p>
            <span className="font-serif text-[var(--color-gold)]">Dosha Balance:</span> Practice appropriate for your constitution and season
          </p>
        </div>
      </div>
    </div>
  );
}
