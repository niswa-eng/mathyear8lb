/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MathFormula } from '../common/MathFormula';
import { Play, RotateCcw, Eye } from 'lucide-react';

/* =========================================================================
 * 1. BarChart & DualBarChart & CompoundBarChart
 * ========================================================================= */
export const BarChart: React.FC<{
  categories?: string[];
  values?: number[];
  title?: string;
}> = ({
  categories = ['Red', 'Blue', 'Green', 'Yellow'],
  values = [8, 12, 6, 10],
  title = 'Favorite Colours Frequency',
}) => {
  const maxVal = Math.max(...values, 14);

  return (
    <div className="w-full flex flex-col items-center py-2 select-none">
      <div className="w-full max-w-xl bg-white/70 border border-[#E3DED4] rounded-2xl p-5 shadow-sm">
        <div className="text-xl font-extrabold text-[#0F1E36] mb-3 text-center">{title}</div>
        <svg viewBox="0 0 380 220" className="w-full h-auto">
          {/* Axis */}
          <line x1="50" y1="180" x2="350" y2="180" stroke="#0F1E36" strokeWidth="2.5" />
          <line x1="50" y1="20" x2="50" y2="180" stroke="#0F1E36" strokeWidth="2.5" />

          {/* Bars */}
          {categories.map((cat, idx) => {
            const val = values[idx] || 0;
            const barH = (val / maxVal) * 140;
            const x = 70 + idx * 70;
            const y = 180 - barH;

            return (
              <g key={idx}>
                <rect x={x} y={y} width="44" height={barH} rx="4" fill="#1D4ED8" />
                <text x={x + 22} y={y - 6} textAnchor="middle" fill="#0F1E36" fontSize="16" fontWeight="bold">
                  {val}
                </text>
                <text x={x + 22} y="202" textAnchor="middle" fill="#0F1E36" fontSize="16" fontWeight="bold">
                  {cat}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export const DualBarChart: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center py-2 select-none">
      <div className="w-full max-w-xl bg-white/70 border border-[#E3DED4] rounded-2xl p-5 shadow-sm">
        <div className="text-xl font-extrabold text-[#0F1E36] mb-2 text-center">Boys vs Girls Sports Preferences</div>
        <div className="flex justify-center gap-6 text-sm font-bold my-2">
          <span className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 bg-[#1D4ED8] rounded" /> Boys</span>
          <span className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 bg-[#EA580C] rounded" /> Girls</span>
        </div>
      </div>
    </div>
  );
};

export const CompoundBarChart: React.FC = () => {
  return <BarChart title="Compound Stacked Chart" />;
};

export const FrequencyDiagram: React.FC = () => {
  return <BarChart title="Frequency Diagram (Intervals)" categories={['0-10', '10-20', '20-30', '30-40']} values={[4, 9, 14, 7]} />;
};

export const FrequencyPolygon: React.FC = () => {
  return <BarChart title="Frequency Polygon" categories={['5', '15', '25', '35']} values={[4, 9, 14, 7]} />;
};

/* =========================================================================
 * 2. PieChart (with protractor toggle)
 * ========================================================================= */
export const PieChart: React.FC = () => {
  const [showProtractor, setShowProtractor] = useState(false);

  // 3 slices: 180° (50%), 90° (25%), 90° (25%)
  return (
    <div className="w-full flex flex-col items-center py-2 select-none">
      <div className="w-full max-w-md bg-white/70 border border-[#E3DED4] rounded-2xl p-5 shadow-sm flex flex-col items-center gap-3">
        <div className="text-2xl font-black text-[#0F1E36]">Pie Chart (Total = 360°)</div>
        <svg viewBox="0 0 260 260" className="w-56 h-56">
          {/* Half circle */}
          <path d="M 130 130 L 230 130 A 100 100 0 0 1 30 130 Z" fill="#1D4ED8" stroke="#FFFFFF" strokeWidth="2" />
          {/* Top right quarter */}
          <path d="M 130 130 L 130 30 A 100 100 0 0 1 230 130 Z" fill="#EA580C" stroke="#FFFFFF" strokeWidth="2" />
          {/* Top left quarter */}
          <path d="M 130 130 L 30 130 A 100 100 0 0 1 130 30 Z" fill="#16A34A" stroke="#FFFFFF" strokeWidth="2" />

          {showProtractor && (
            <circle cx="130" cy="130" r="110" fill="none" stroke="#DC2626" strokeWidth="2" strokeDasharray="3 3" />
          )}
        </svg>

        <button
          onClick={() => setShowProtractor(!showProtractor)}
          className="px-4 py-2 bg-[#FAF8F3] border border-[#E3DED4] rounded-xl font-bold"
        >
          {showProtractor ? 'Hide protractor' : 'Show 360° protractor'}
        </button>
      </div>
    </div>
  );
};

/* =========================================================================
 * 3. StemAndLeaf & BackToBackStemLeaf
 * ========================================================================= */
export const StemAndLeaf: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center py-2 select-none">
      <div className="w-full max-w-md bg-white/70 border border-[#E3DED4] rounded-2xl p-5 shadow-sm">
        <div className="text-xl font-black text-[#0F1E36] mb-2 text-center">Stem-and-Leaf Diagram</div>
        <table className="w-full text-2xl font-bold">
          <tbody>
            <tr className="border-b border-[#E3DED4]">
              <td className="w-16 py-2 text-right pr-4 font-black text-[#1D4ED8] border-r-4 border-[#0F1E36]">1</td>
              <td className="py-2 pl-4 text-left">2  5  8</td>
            </tr>
            <tr className="border-b border-[#E3DED4]">
              <td className="w-16 py-2 text-right pr-4 font-black text-[#1D4ED8] border-r-4 border-[#0F1E36]">2</td>
              <td className="py-2 pl-4 text-left">0  1  4  7  9</td>
            </tr>
            <tr>
              <td className="w-16 py-2 text-right pr-4 font-black text-[#1D4ED8] border-r-4 border-[#0F1E36]">3</td>
              <td className="py-2 pl-4 text-left">2  5</td>
            </tr>
          </tbody>
        </table>
        <div className="mt-3 text-base text-[#888888] font-bold text-center">
          Key: <span className="text-[#0F1E36]">2 | 1 = 21</span>
        </div>
      </div>
    </div>
  );
};

export const BackToBackStemLeaf: React.FC = () => {
  return <StemAndLeaf />;
};

/* =========================================================================
 * 4. VennDiagram & CarrollDiagram & DataTable & DotPlot
 * ========================================================================= */
export const VennDiagram: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center py-2 select-none">
      <div className="w-full max-w-lg bg-white/70 border border-[#E3DED4] rounded-2xl p-5 shadow-sm">
        <svg viewBox="0 0 360 200" className="w-full h-auto">
          <circle cx="140" cy="100" r="75" fill="#1D4ED8" fillOpacity="0.2" stroke="#1D4ED8" strokeWidth="3" />
          <circle cx="220" cy="100" r="75" fill="#EA580C" fillOpacity="0.2" stroke="#EA580C" strokeWidth="3" />
          <text x="100" y="105" textAnchor="middle" fill="#0F1E36" fontSize="22" fontWeight="bold">8</text>
          <text x="180" y="105" textAnchor="middle" fill="#0F1E36" fontSize="24" fontWeight="black">5</text>
          <text x="260" y="105" textAnchor="middle" fill="#0F1E36" fontSize="22" fontWeight="bold">11</text>
        </svg>
      </div>
    </div>
  );
};

export const CarrollDiagram: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center py-2 select-none">
      <div className="w-full max-w-md bg-white/70 border border-[#E3DED4] rounded-2xl p-5 shadow-sm">
        <table className="w-full border-2 border-[#0F1E36] text-center text-lg font-bold">
          <thead>
            <tr>
              <th className="border p-2 bg-[#FAF8F3]"></th>
              <th className="border p-2 bg-[#FAF8F3]">Even</th>
              <th className="border p-2 bg-[#FAF8F3]">Not Even</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2 bg-[#FAF8F3]">Multiple of 3</td>
              <td className="border p-3 text-[#1D4ED8]">6, 12, 18</td>
              <td className="border p-3 text-[#1D4ED8]">3, 9, 15</td>
            </tr>
            <tr>
              <td className="border p-2 bg-[#FAF8F3]">Not Multiple of 3</td>
              <td className="border p-3 text-[#EA580C]">2, 4, 8, 10</td>
              <td className="border p-3 text-[#EA580C]">1, 5, 7, 11</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const DataTable: React.FC<{ headers?: string[]; rows?: (string | number)[][] }> = ({
  headers = ['Score', 'Frequency'],
  rows = [[1, 4], [2, 7], [3, 11], [4, 6]],
}) => {
  return (
    <div className="w-full flex flex-col items-center py-2 select-none">
      <div className="w-full max-w-sm bg-white/70 border border-[#E3DED4] rounded-2xl p-4 shadow-sm">
        <table className="w-full text-center text-xl font-bold">
          <thead>
            <tr className="border-b-2 border-[#0F1E36]">
              {headers.map((h, i) => (
                <th key={i} className="py-2">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rI) => (
              <tr key={rI} className="border-b border-[#E3DED4]">
                {row.map((cell, cI) => (
                  <td key={cI} className="py-2 text-[#1D4ED8]">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const DotPlot: React.FC = () => {
  const [showMean, setShowMean] = useState(false);

  return (
    <div className="w-full flex flex-col items-center py-2 select-none">
      <div className="w-full max-w-md bg-white/70 border border-[#E3DED4] rounded-2xl p-5 shadow-sm flex flex-col items-center gap-3">
        <svg viewBox="0 0 300 150" className="w-full h-auto">
          <line x1="30" y1="120" x2="270" y2="120" stroke="#0F1E36" strokeWidth="2.5" />
          {[1, 2, 3, 4, 5].map((val) => {
            const x = 50 + (val - 1) * 50;
            const count = [2, 4, 5, 3, 1][val - 1];
            return (
              <g key={val}>
                <text x={x} y="140" textAnchor="middle" fill="#0F1E36" fontSize="16" fontWeight="bold">
                  {val}
                </text>
                {Array.from({ length: count }).map((_, i) => (
                  <circle key={i} cx={x} cy={110 - i * 16} r="6" fill="#1D4ED8" />
                ))}
              </g>
            );
          })}
          {showMean && (
            <line x1="140" y1="20" x2="140" y2="120" stroke="#DC2626" strokeWidth="3" strokeDasharray="4 2" />
          )}
        </svg>
        <button
          onClick={() => setShowMean(!showMean)}
          className="px-4 py-1.5 bg-[#FAF8F3] border border-[#E3DED4] rounded-xl font-bold"
        >
          {showMean ? 'Hide Mean line' : 'Show Mean (2.8)'}
        </button>
      </div>
    </div>
  );
};

/* =========================================================================
 * 5. Spinner & DiceRoller
 * ========================================================================= */
export const Spinner: React.FC = () => {
  const [angle, setAngle] = useState(0);
  const [spinning, setSpinning] = useState(false);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    const newAngle = angle + 720 + Math.floor(Math.random() * 360);
    setAngle(newAngle);
    setTimeout(() => setSpinning(false), 1000);
  };

  return (
    <div className="w-full flex flex-col items-center py-2 select-none">
      <div className="w-full max-w-sm bg-white/70 border border-[#E3DED4] rounded-2xl p-5 shadow-sm flex flex-col items-center gap-4">
        <div className="relative w-48 h-48">
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full transition-transform duration-1000 ease-out"
            style={{ transform: `rotate(${angle}deg)` }}
          >
            {/* 4 sectors */}
            <path d="M 100 100 L 190 100 A 90 90 0 0 1 100 190 Z" fill="#1D4ED8" />
            <path d="M 100 100 L 100 190 A 90 90 0 0 1 10 100 Z" fill="#EA580C" />
            <path d="M 100 100 L 10 100 A 90 90 0 0 1 100 10 Z" fill="#16A34A" />
            <path d="M 100 100 L 100 10 A 90 90 0 0 1 190 100 Z" fill="#EAB308" />
          </svg>
          {/* Pointer */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-0 h-0 border-l-8 border-r-8 border-t-[18px] border-l-transparent border-r-transparent border-t-[#0F1E36]" />
        </div>
        <button
          onClick={spin}
          disabled={spinning}
          className="px-6 py-2.5 bg-[#1D4ED8] text-white rounded-xl font-bold text-lg active:scale-95"
        >
          Spin
        </button>
      </div>
    </div>
  );
};

export const DiceRoller: React.FC = () => {
  const [val, setVal] = useState(6);

  const roll = () => {
    setVal(Math.floor(Math.random() * 6) + 1);
  };

  return (
    <div className="w-full flex flex-col items-center py-2 select-none">
      <div className="w-full max-w-xs bg-white/70 border border-[#E3DED4] rounded-2xl p-5 shadow-sm flex flex-col items-center gap-4">
        <div className="w-24 h-24 bg-white border-4 border-[#0F1E36] rounded-2xl flex items-center justify-center text-5xl font-black text-[#1D4ED8] shadow-md">
          {val}
        </div>
        <button
          onClick={roll}
          className="px-6 py-2.5 bg-[#1D4ED8] text-white rounded-xl font-bold text-lg active:scale-95"
        >
          Roll Dice
        </button>
      </div>
    </div>
  );
};

/* =========================================================================
 * 6. SampleSpaceGrid & ProbabilityTree & ProbabilityScale
 * ========================================================================= */
export const SampleSpaceGrid: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center py-2 select-none">
      <div className="w-full max-w-md bg-white/70 border border-[#E3DED4] rounded-2xl p-5 shadow-sm">
        <div className="text-xl font-black text-[#0F1E36] mb-2 text-center">Two Coins Outcomes (H, T)</div>
        <table className="w-full border text-center text-xl font-bold">
          <thead>
            <tr>
              <th className="border p-2"></th>
              <th className="border p-2 text-[#1D4ED8]">Heads</th>
              <th className="border p-2 text-[#1D4ED8]">Tails</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2 text-[#EA580C]">Heads</td>
              <td className="border p-2 font-mono">(H, H)</td>
              <td className="border p-2 font-mono">(H, T)</td>
            </tr>
            <tr>
              <td className="border p-2 text-[#EA580C]">Tails</td>
              <td className="border p-2 font-mono">(T, H)</td>
              <td className="border p-2 font-mono">(T, T)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const ProbabilityTree: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center py-2 select-none">
      <div className="w-full max-w-md bg-white/70 border border-[#E3DED4] rounded-2xl p-5 shadow-sm">
        <svg viewBox="0 0 320 160" className="w-full h-auto">
          {/* Root to branch 1 and 2 */}
          <line x1="40" y1="80" x2="160" y2="40" stroke="#0F1E36" strokeWidth="3" />
          <line x1="40" y1="80" x2="160" y2="120" stroke="#0F1E36" strokeWidth="3" />
          <text x="90" y="50" fill="#1D4ED8" fontSize="16" fontWeight="bold">0.6</text>
          <text x="90" y="115" fill="#1D4ED8" fontSize="16" fontWeight="bold">0.4</text>
          <text x="180" y="45" fill="#0F1E36" fontSize="18" fontWeight="bold">Win</text>
          <text x="180" y="125" fill="#0F1E36" fontSize="18" fontWeight="bold">Lose</text>
        </svg>
      </div>
    </div>
  );
};

export const ProbabilityScale: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center py-2 select-none">
      <div className="w-full max-w-xl bg-white/70 border border-[#E3DED4] rounded-2xl p-5 shadow-sm flex flex-col items-center gap-3">
        <svg viewBox="0 0 400 90" className="w-full h-auto">
          <line x1="40" y1="50" x2="360" y2="50" stroke="#0F1E36" strokeWidth="4" />
          <circle cx="40" cy="50" r="6" fill="#0F1E36" />
          <circle cx="200" cy="50" r="6" fill="#0F1E36" />
          <circle cx="360" cy="50" r="6" fill="#0F1E36" />
          <text x="40" y="30" textAnchor="middle" fill="#0F1E36" fontSize="16" fontWeight="bold">0 (Impossible)</text>
          <text x="200" y="30" textAnchor="middle" fill="#1D4ED8" fontSize="16" fontWeight="bold">0.5 (Evens)</text>
          <text x="360" y="30" textAnchor="middle" fill="#16A34A" fontSize="16" fontWeight="bold">1 (Certain)</text>
        </svg>
      </div>
    </div>
  );
};
