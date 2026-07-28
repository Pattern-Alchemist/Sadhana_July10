'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SACRED_LOCATIONS, filterLocations, getRegions, getPracticeTypes, type SacredLocation } from '@/lib/sacred-locations';

export default function LocationsPage() {
  const [selectedLocation, setSelectedLocation] = useState<SacredLocation | null>(SACRED_LOCATIONS[0]);
  const [filterType, setFilterType] = useState<'all' | 'practice' | 'region' | 'season'>('all');
  const [filterValue, setFilterValue] = useState<string>('');
  
  const regions = getRegions();
  const practiceTypes = getPracticeTypes();
  const currentMonth = new Date().getMonth() + 1;

  // Apply filters
  let filtered = SACRED_LOCATIONS;
  
  if (filterType === 'region' && filterValue) {
    filtered = filtered.filter(l => l.region === filterValue);
  } else if (filterType === 'practice' && filterValue) {
    filtered = filtered.filter(l => l.bestFor.includes(filterValue));
  } else if (filterType === 'season') {
    filtered = filtered.filter(l => l.bestMonths.includes(currentMonth));
  }

  const displayLocation = selectedLocation && filtered.includes(selectedLocation) 
    ? selectedLocation 
    : filtered[0];

  return (
    <div className="min-h-screen bg-[var(--color-obsidian)]">
      {/* Hero Section */}
      <section className="relative px-5 py-16 sm:px-8 sm:py-24 border-b border-[var(--hairline)]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl sm:text-5xl text-[var(--color-gold-bright)] mb-4">
              Sacred Locations of India
            </h1>
            <p className="font-serif text-lg italic text-[var(--color-bone)]/80 max-w-2xl mx-auto">
              Spiritually potent pilgrimage sites where authentic sadhana practice reaches its fullest expression. The universe resonates strongest at these sacred points.
            </p>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <button
              onClick={() => { setFilterType('all'); setFilterValue(''); }}
              className={`px-4 py-2 text-sm font-medium rounded-full border transition ${
                filterType === 'all'
                  ? 'border-[var(--color-gold)] bg-[var(--color-gold)]/10 text-[var(--color-gold-bright)]'
                  : 'border-[var(--hairline)] text-[var(--color-bone)]/70 hover:border-[var(--color-gold)]/50'
              }`}
            >
              All Locations
            </button>
            
            <button
              onClick={() => { setFilterType('season'); setFilterValue(''); }}
              className={`px-4 py-2 text-sm font-medium rounded-full border transition ${
                filterType === 'season'
                  ? 'border-[var(--color-cyan-accent)] bg-[var(--color-cyan-accent)]/10 text-[var(--color-cyan-accent)]'
                  : 'border-[var(--hairline)] text-[var(--color-bone)]/70 hover:border-[var(--color-cyan-accent)]/50'
              }`}
            >
              This Season
            </button>

            <select
              value={filterValue}
              onChange={(e) => {
                setFilterValue(e.target.value);
                if (e.target.value && filterType === 'all') setFilterType('region');
              }}
              className="px-4 py-2 text-sm font-medium rounded-full border border-[var(--hairline)] bg-[var(--color-ink)] text-[var(--color-bone)] hover:border-[var(--color-gold)]/50"
            >
              <option value="">Practice Type...</option>
              {practiceTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <select
              value={filterValue}
              onChange={(e) => {
                setFilterValue(e.target.value);
                if (e.target.value && filterType === 'all') setFilterType('region');
              }}
              className="px-4 py-2 text-sm font-medium rounded-full border border-[var(--hairline)] bg-[var(--color-ink)] text-[var(--color-bone)] hover:border-[var(--color-gold)]/50"
            >
              <option value="">Region...</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>

          <p className="text-center text-xs uppercase tracking-wider text-[var(--color-bone)]/50">
            Showing {filtered.length} location{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-5 sm:p-8">
          {/* Location List */}
          <div className="lg:col-span-1 space-y-2 max-h-[600px] overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="p-4 text-center text-[var(--color-bone)]/60">
                No locations match your filters
              </div>
            ) : (
              filtered.map(location => (
                <button
                  key={location.id}
                  onClick={() => setSelectedLocation(location)}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition ${
                    displayLocation?.id === location.id
                      ? 'border-[var(--color-gold)]/60 bg-[var(--color-gold)]/10'
                      : 'border-[var(--hairline)] hover:border-[var(--color-gold)]/40'
                  }`}
                >
                  <div className="font-display text-base text-[var(--color-gold-bright)]">{location.name}</div>
                  <div className="text-xs text-[var(--color-bone)]/60 mt-1">{location.sanskrit}</div>
                  <div className="text-[0.7rem] text-[var(--color-bone)]/50 mt-2 flex flex-wrap gap-1">
                    {location.deity.map(d => (
                      <span key={d} className="inline-block bg-[var(--color-gold)]/10 px-2 py-0.5 rounded">
                        {d}
                      </span>
                    ))}
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Location Details */}
          {displayLocation && (
            <div className="lg:col-span-2 rounded-lg border border-[var(--hairline)] bg-[var(--color-ink)]/60 p-6 sm:p-8">
              <div className="mb-6">
                <h2 className="font-display text-3xl text-[var(--color-gold-bright)] mb-1">
                  {displayLocation.name}
                </h2>
                <p className="font-serif italic text-lg text-[var(--color-bone)]/80 mb-4">
                  {displayLocation.sanskrit}
                </p>
                <div className="flex flex-wrap gap-3 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase text-[var(--color-bone)]/50">Region:</span>
                    <span className="text-sm font-medium text-[var(--color-ivory)]">{displayLocation.region}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase text-[var(--color-bone)]/50">Difficulty:</span>
                    <span className="inline-block px-2 py-1 bg-[var(--color-gold)]/20 text-[var(--color-gold)] text-xs font-medium rounded">
                      {displayLocation.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase text-[var(--color-bone)]/50">Access:</span>
                    <span className="text-sm text-[var(--color-ivory)]">{displayLocation.accessibility}</span>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="space-y-8">
                {/* Spiritual Significance */}
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-[var(--color-gold)]/80 mb-3">Spiritual Significance</h3>
                  <p className="text-sm leading-relaxed text-[var(--color-bone)]/85 mb-4">
                    {displayLocation.history}
                  </p>
                  <p className="text-sm italic text-[var(--color-bone)]/70">
                    "{displayLocation.significance}"
                  </p>
                </div>

                {/* Deities & Elements */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-[var(--color-gold)]/80 mb-2">Deities</h4>
                    <div className="flex flex-wrap gap-1">
                      {displayLocation.deity.map(d => (
                        <span key={d} className="inline-block px-2 py-1 bg-[var(--color-gold)]/10 text-[var(--color-gold-bright)] text-xs rounded">
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-[var(--color-cyan-accent)]/80 mb-2">Element</h4>
                    <span className="inline-block px-2 py-1 bg-[var(--color-cyan-accent)]/10 text-[var(--color-cyan-accent)] text-xs rounded capitalize">
                      {displayLocation.element}
                    </span>
                  </div>
                </div>

                {/* Best For */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-[var(--color-gold)]/80 mb-2">Best For</h4>
                  <div className="flex flex-wrap gap-2">
                    {displayLocation.bestFor.map(practice => (
                      <span key={practice} className="inline-block px-2.5 py-1.5 bg-[var(--color-purple-accent)]/15 text-[var(--color-purple-accent)] text-xs rounded capitalize">
                        {practice}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Practices */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-[var(--color-gold)]/80 mb-2">Practices to Perform</h4>
                  <ul className="text-sm text-[var(--color-bone)]/80 space-y-1">
                    {displayLocation.practices.map((practice, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[var(--color-gold)] mt-1">•</span>
                        <span>{practice}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Travel Info */}
                <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-[var(--color-obsidian)]/50 border border-[var(--hairline)]">
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-[var(--color-gold)]/80 mb-1">Best Months</h4>
                    <p className="text-sm text-[var(--color-ivory)]">
                      {displayLocation.bestMonths.map(m => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][m - 1]).join(', ')}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-[var(--color-gold)]/80 mb-1">Suggested Stay</h4>
                    <p className="text-sm text-[var(--color-ivory)]">{displayLocation.estimatedStay}</p>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-[var(--color-gold)]/80 mb-1">Access From</h4>
                    <p className="text-sm text-[var(--color-ivory)]">{displayLocation.accessibleFrom.join(', ')}</p>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-[var(--color-gold)]/80 mb-1">Yoga Path</h4>
                    <p className="text-sm text-[var(--color-ivory)]">{displayLocation.yogaPath}</p>
                  </div>
                </div>

                {/* Accommodation */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-[var(--color-gold)]/80 mb-2">Accommodation Options</h4>
                  <div className="flex flex-wrap gap-2">
                    {displayLocation.accommodationOptions.map(opt => (
                      <span key={opt} className="text-xs px-2.5 py-1.5 border border-[var(--hairline)] rounded text-[var(--color-bone)]/70">
                        {opt}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Warnings if any */}
                {displayLocation.warnings && displayLocation.warnings.length > 0 && (
                  <div className="p-4 rounded-lg border border-amber-700/40 bg-amber-950/20">
                    <h4 className="text-xs uppercase tracking-wider text-amber-300/90 mb-2">Important Considerations</h4>
                    <ul className="text-sm text-amber-100/80 space-y-1">
                      {displayLocation.warnings.map((warning, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-amber-300 mt-0.5">⚠</span>
                          <span>{warning}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Call to Action */}
              <div className="mt-8 pt-6 border-t border-[var(--hairline)]">
                <p className="text-xs uppercase tracking-wider text-[var(--color-bone)]/50 mb-3">
                  Ready to begin your journey?
                </p>
                <Link
                  href="/archive"
                  className="inline-block px-6 py-2.5 bg-[var(--color-gold)] text-[var(--color-obsidian)] font-medium text-sm rounded hover:bg-[var(--color-gold-bright)] transition"
                >
                  Explore Related Practices →
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
