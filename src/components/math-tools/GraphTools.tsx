/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MathFormula } from '../common/MathFormula';
import { RotateCcw } from 'lucide-react';

/* =========================================================================
 * 1. CoordinateGrid (y = mx + c)
 * ========================================================================= */
export const CoordinateGrid: React.FC<{ initialM?: number; initialC?: number }> = ({
  initialM = 1,
  initialC = 1,
}) => {
  const [m, setM] = useState(initialM);
  const [c, setC] = useState(initialC);

  const size = 320;
  const range = 5; // -5 to +5
  const origin = size / 2;
  const stepPx = origin / range;

  // Compute line endpoints: at x = -5, y = m*(-5) + c; at x = 5, y = m*(5) + c
  const x1 = -5;
  const y1 = m * x1 + c;
  const x2 = 5;
  const y2 = m * x2 + c;

  const toSvgX = (x: number) => origin + x * stepPx;
  const toSvgY = (y: number) => origin - y * stepPx;

  return (
    <div className="w-full flex flex-col items-center py-2 select-none">
      <div className="w-full max-w-2xl bg-white/70 border border-[#E3DED4] rounded-2xl p-5 shadow-sm flex flex-col items-center gap-4">
        <div className="text-3xl font-extrabold text-[#0F1E36]">
          <MathFormula latex={`y = ${m === 1 ? '' : m === -1 ? '-' : m}x ${c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`}`} />
        </div>

        <svg viewBox={`0 0 ${size} ${size}`} className="w-72 h-72 bg-[#FAF8F3] rounded-xl border border-[#0F1E36]">
          {/* Grid lines */}
          {Array.from({ length: 11 }).map((_, i) => {
            const val = i - 5;
            const coord = toSvgX(val);
            return (
              <g key={i}>
                <line x1={coord} y1="0" x2={coord} y2={size} stroke="#E3DED4" strokeWidth="1" />
                <line x1="0" y1={coord} x2={size} y2={coord} stroke="#E3DED4" strokeWidth="1" />
              </g>
            );
          })}

          {/* Axes */}
          <line x1="0" y1={origin} x2={size} y2={origin} stroke="#0F1E36" strokeWidth="2.5" />
          <line x1={origin} y1="0" x2={origin} y2={size} stroke="#0F1E36" strokeWidth="2.5" />

          {/* Plot Line */}
          <line
            x1={toSvgX(x1)}
            y1={toSvgY(y1)}
            x2={toSvgX(x2)}
            y2={toSvgY(y2)}
            stroke="#1D4ED8"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Y-intercept dot */}
          <circle cx={origin} cy={toSvgY(c)} r="6" fill="#EA580C" />
        </svg>

        <div className="w-full flex flex-col gap-3 px-6">
          <div className="flex items-center gap-4">
            <span className="font-bold text-lg text-[#0F1E36] w-24">Gradient m:</span>
            <input
              type="range"
              min="-3"
              max="3"
              step="1"
              value={m}
              onChange={(e) => setM(parseInt(e.target.value, 10))}
              className="flex-1 h-3 accent-[#1D4ED8]"
            />
            <span className="font-extrabold text-xl text-[#1D4ED8] w-6">{m}</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-bold text-lg text-[#0F1E36] w-24">Intercept c:</span>
            <input
              type="range"
              min="-4"
              max="4"
              step="1"
              value={c}
              onChange={(e) => setC(parseInt(e.target.value, 10))}
              className="flex-1 h-3 accent-[#EA580C]"
            />
            <span className="font-extrabold text-xl text-[#EA580C] w-6">{c}</span>
          </div>
        </div>

        <button
          onClick={() => {
            setM(initialM);
            setC(initialC);
          }}
          className="self-end px-4 py-2 bg-[#FAF8F3] border border-[#E3DED4] rounded-xl text-lg font-bold text-[#0F1E36] active:scale-95 flex items-center gap-1.5"
        >
          <RotateCcw className="w-5 h-5" /> Reset
        </button>
      </div>
    </div>
  );
};

/* =========================================================================
 * 2. QuadraticGraph
 * ========================================================================= */
export const QuadraticGraph: React.FC<{ a?: number }> = ({ a = 0 }) => {
  const [offsetA, setOffsetA] = useState(a);

  const points: [number, number][] = [-3, -2, -1, 0, 1, 2, 3].map((x) => [x, x * x + offsetA]);
  const size = 300;
  const originX = 150;
  const originY = 220;
  const scaleX = 35;
  const scaleY = 18;

  const toX = (x: number) => originX + x * scaleX;
  const toY = (y: number) => originY - y * scaleY;

  const pathD = points.reduce((acc, [x, y], idx) => {
    return `${acc} ${idx === 0 ? 'M' : 'L'} ${toX(x)} ${toY(y)}`;
  }, '');

  return (
    <div className="w-full flex flex-col items-center py-2 select-none">
      <div className="w-full max-w-2xl bg-white/70 border border-[#E3DED4] rounded-2xl p-5 shadow-sm flex flex-col items-center gap-4">
        <div className="text-3xl font-black text-[#0F1E36]">
          <MathFormula latex={`y = x^2 ${offsetA !== 0 ? (offsetA > 0 ? `+ ${offsetA}` : `- ${Math.abs(offsetA)}`) : ''}`} />
        </div>

        <svg viewBox={`0 0 ${size} ${size}`} className="w-72 h-72 bg-[#FAF8F3] rounded-xl border border-[#0F1E36]">
          <line x1="0" y1={originY} x2={size} y2={originY} stroke="#0F1E36" strokeWidth="2" />
          <line x1={originX} y1="0" x2={originX} y2={size} stroke="#0F1E36" strokeWidth="2" />

          <path d={pathD} fill="none" stroke="#1D4ED8" strokeWidth="4" />

          {points.map(([x, y], i) => (
            <circle key={i} cx={toX(x)} cy={toY(y)} r="5" fill="#EA580C" />
          ))}
        </svg>

        <div className="flex gap-2">
          {[-2, -1, 0, 1, 2].map((val) => (
            <button
              key={val}
              onClick={() => setOffsetA(val)}
              className={`px-3 py-1.5 rounded-xl font-bold text-lg ${
                offsetA === val ? 'bg-[#1D4ED8] text-white' : 'bg-[#FAF8F3] border border-[#E3DED4]'
              }`}
            >
              a = {val}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
 * 3. TimeSeriesGraph, ScatterGraph, ConversionGraph
 * ========================================================================= */
export const TimeSeriesGraph: React.FC = () => {
  const data = [12, 15, 18, 14, 22, 26];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  return (
    <div className="w-full flex flex-col items-center py-2 select-none">
      <div className="w-full max-w-xl bg-white/70 border border-[#E3DED4] rounded-2xl p-5 shadow-sm">
        <div className="text-xl font-extrabold text-[#0F1E36] mb-3 text-center">Temperature (°C) Over Time</div>
        <svg viewBox="0 0 400 200" className="w-full h-auto">
          <line x1="40" y1="170" x2="380" y2="170" stroke="#0F1E36" strokeWidth="2.5" />
          <line x1="40" y1="20" x2="40" y2="170" stroke="#0F1E36" strokeWidth="2.5" />

          {data.map((val, idx) => {
            const x = 70 + idx * 55;
            const y = 170 - (val / 30) * 140;
            const nextVal = data[idx + 1];
            const nextX = 70 + (idx + 1) * 55;
            const nextY = nextVal ? 170 - (nextVal / 30) * 140 : null;

            return (
              <g key={idx}>
                {nextY && <line x1={x} y1={y} x2={nextX} y2={nextY} stroke="#1D4ED8" strokeWidth="3.5" />}
                <circle cx={x} cy={y} r="6" fill="#1D4ED8" />
                <text x={x} y="190" textAnchor="middle" fill="#0F1E36" fontSize="14" fontWeight="bold">
                  {months[idx]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export const ScatterGraph: React.FC = () => {
  const pts: [number, number][] = [
    [1, 2], [2, 3], [3, 3.5], [4, 5], [5, 4.8], [6, 6.5], [7, 7]
  ];

  return (
    <div className="w-full flex flex-col items-center py-2 select-none">
      <div className="w-full max-w-xl bg-white/70 border border-[#E3DED4] rounded-2xl p-5 shadow-sm">
        <div className="text-xl font-extrabold text-[#0F1E36] mb-3 text-center">Positive Correlation with Line of Best Fit</div>
        <svg viewBox="0 0 350 220" className="w-full h-auto">
          <line x1="40" y1="180" x2="330" y2="180" stroke="#0F1E36" strokeWidth="2.5" />
          <line x1="40" y1="20" x2="40" y2="180" stroke="#0F1E36" strokeWidth="2.5" />

          {/* Line of best fit */}
          <line x1="40" y1="170" x2="320" y2="35" stroke="#EA580C" strokeWidth="3" strokeDasharray="6 3" />

          {pts.map(([x, y], i) => (
            <circle key={i} cx={40 + x * 38} cy={180 - y * 20} r="5.5" fill="#1D4ED8" />
          ))}
        </svg>
      </div>
    </div>
  );
};

export const ConversionGraph: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center py-2 select-none">
      <div className="w-full max-w-xl bg-white/70 border border-[#E3DED4] rounded-2xl p-5 shadow-sm">
        <div className="text-xl font-extrabold text-[#0F1E36] mb-2 text-center">Miles to Kilometres (5 miles ≈ 8 km)</div>
        <svg viewBox="0 0 360 220" className="w-full h-auto">
          <line x1="50" y1="170" x2="340" y2="170" stroke="#0F1E36" strokeWidth="2.5" />
          <line x1="50" y1="20" x2="50" y2="170" stroke="#0F1E36" strokeWidth="2.5" />
          <line x1="50" y1="170" x2="300" y2="30" stroke="#1D4ED8" strokeWidth="4" />
          <text x="330" y="195" fontSize="16" fontWeight="bold" fill="#0F1E36">Miles</text>
          <text x="15" y="30" fontSize="16" fontWeight="bold" fill="#0F1E36">km</text>
        </svg>
      </div>
    </div>
  );
};
