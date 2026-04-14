'use client';

import React, { useState, useEffect } from 'react';
import styles from './LanguageChart.module.scss';

interface Language {
  name: string;
  percentage: number;
}

interface HoveredInfo {
  index: number;
  name: string;
  percentage: number;
  color: string;
}

const API_URL =
  'https://github-stats.tashif.codes/donovan-dev-web/languages?excluded=Markdown&excluded=JSON&excluded=YAML&excluded=XML&excluded=Blade&excluded=Dockerfile';

const COLORS = [
  '#7c4bff',
  '#5f55ff',
  '#3f5fff',
  '#1f6bff',
  '#006bfa',
  '#009ed4',
  '#00c6b0',
  '#04d9a0',
  '#08dfa7',
  '#7c4bff',
  '#5f55ff',
  '#3f5fff',
  '#1f6bff',
  '#006bfa',
  '#009ed4',
  '#00c6b0',
  '#04d9a0',
  '#08dfa7',
];

// Arc: starts at 135° (upper-left), spans 270° clockwise to 45° (upper-right).
// The gap (upper area) is where labels live.
const TRACK_ANGLE = 90;
const START_DEG = 270;
const BASE_RADIUS = 50;
const RING_STEP = 14;
const RING_STROKE = 11;

// SVG canvas
const SVG_W = 320;
const SVG_H = 150;
const CX = 158; // arc center – right-shifted so labels have room on left
const CY = 152;
const LABEL_X = 100; // right-align labels here

export default function LanguageChart() {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [hovered, setHovered] = useState<HoveredInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(API_URL)
      .then((r) => {
        if (!r.ok) throw new Error('fetch failed');
        return r.json();
      })
      .then((data: Language[]) => {
        // Descending: highest % → index 0 → innermost ring (smallest radius)
        const sorted = [...data]
          .sort((a, b) => a.percentage - b.percentage)
          .slice(0, COLORS.length);
        setLanguages(sorted);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const n = languages.length;
  const maxPercentage = Math.max(...languages.map((l) => l.percentage));

  return (
    <div className={styles.wrapper}>
      <h3 style={{ marginBottom: '20px' }}>Langages de programmation :</h3>
      <div className={styles.chartWrapper}>
        {loading && (
          <div className={styles.loadingRings}>
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={styles.loadingRing}
                style={{ '--i': i } as React.CSSProperties}
              />
            ))}
          </div>
        )}

        {error && (
          <p className={styles.error}>
            Impossible de charger les données depuis Github.
          </p>
        )}

        {!loading && !error && (
          <svg
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            width="100%"
            className={styles.svg}
            aria-label="Répartition des langages GitHub"
          >
            <defs>
              {COLORS.map((_, i) => (
                <filter
                  key={i}
                  id={`lc-glow-${i}`}
                  x="-40%"
                  y="-40%"
                  width="180%"
                  height="180%"
                >
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              ))}
            </defs>

            {/*
             * Draw outermost → innermost so inner rings appear on top.
             * i = original index (0 = innermost / highest %)
             */}
            {[...languages].reverse().map((lang, revI) => {
              const i = n - 1 - revI;
              const r = BASE_RADIUS + i * RING_STEP;
              const circumference = 2 * Math.PI * r;
              const trackDash = (TRACK_ANGLE / 360) * circumference;
              const relative = Math.sqrt(lang.percentage / maxPercentage);
              const filledDash = relative * trackDash;
              const color = COLORS[i % COLORS.length];
              const isHov = hovered?.index === i;

              // Label y aligns to the top of the ring (12-o'clock point)
              const labelY = CY - r;

              return (
                <g
                  key={lang.name}
                  className={styles.ringGroup}
                  onMouseEnter={() =>
                    setHovered({
                      index: i,
                      name: lang.name,
                      percentage: lang.percentage,
                      color,
                    })
                  }
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Label */}
                  <text
                    x={LABEL_X}
                    y={labelY}
                    textAnchor="end"
                    dominantBaseline="middle"
                    className={`${styles.label} ${isHov ? styles.labelActive : ''}`}
                    fill={color}
                    fillOpacity={isHov ? 1 : 0.55}
                  >
                    <tspan className={styles.labelName}>{lang.name}</tspan>
                    <tspan>: </tspan>
                    <tspan className={styles.labelValue}>
                      {Number.isInteger(lang.percentage)
                        ? lang.percentage
                        : lang.percentage.toFixed(1)}
                    </tspan>
                    <tspan>%</tspan>
                  </text>

                  {/* Connector dot */}
                  <circle
                    cx={LABEL_X + 8}
                    cy={labelY}
                    r={isHov ? 3.5 : 2.5}
                    fill={color}
                    fillOpacity={isHov ? 1 : 0.45}
                    className={styles.dot}
                  />

                  {/* Arc group – rotated so stroke starts at START_DEG */}
                  <g transform={`rotate(${START_DEG}, ${CX}, ${CY})`}>
                    {/* Background track */}
                    <circle
                      cx={CX}
                      cy={CY}
                      r={r}
                      fill="none"
                      stroke={color}
                      strokeOpacity={isHov ? 0.22 : 0.1}
                      strokeWidth={isHov ? RING_STROKE + 2 : RING_STROKE}
                      strokeDasharray={`${trackDash} ${circumference}`}
                      strokeLinecap="round"
                      className={styles.trackArc}
                    />

                    {/* Filled arc – animated on mount */}
                    <circle
                      cx={CX}
                      cy={CY}
                      r={r}
                      fill="none"
                      stroke={color}
                      strokeWidth={isHov ? RING_STROKE + 2 : RING_STROKE}
                      strokeLinecap="round"
                      filter={isHov ? `url(#lc-glow-${i})` : undefined}
                      className={styles.filledArc}
                      style={
                        {
                          '--circumference': circumference,
                          '--filled-dash': filledDash,
                          '--delay': `${i * 70}ms`,
                          stroke: color,
                        } as React.CSSProperties
                      }
                    />
                  </g>
                </g>
              );
            })}

            {/* Center info on hover */}
            {hovered ? (
              <g className={styles.centerGroup}>
                {/* Icon */}

                <text
                  x={CX}
                  y={CY - 13}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className={styles.centerName}
                  fill={hovered.color}
                >
                  {hovered.name}
                </text>
                <text
                  x={CX}
                  y={CY + 14}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className={styles.centerPct}
                  fill="white"
                >
                  {hovered.percentage.toFixed(1)}%
                </text>
              </g>
            ) : (
              <text
                x={CX}
                y={CY}
                textAnchor="middle"
                dominantBaseline="middle"
                className={styles.centerHint}
                fill="rgba(255,255,255,0.18)"
              >
                hover
              </text>
            )}
          </svg>
        )}
      </div>
    </div>
  );
}
