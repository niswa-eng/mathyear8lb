/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useId } from 'react';
import { MathFormula } from '../common/MathFormula';
import { RotateCcw, Plus, Minus, ChevronRight, Play, Eye } from 'lucide-react';

/* =========================================================================
 * 1. NumberLine
 * ========================================================================= */
export interface NumberLineProps {
  min?: number;
  max?: number;
  step?: number;
  initialValue?: number;
  jumps?: Array<{ from: number; to: number; label?: string; color?: string }>;
  points?: Array<{ val: number; label?: string; closed?: boolean; color?: string }>;
  showDraggableMarker?: boolean;
}

export const NumberLine: React.FC<NumberLineProps> = ({
  min = -5,
  max = 5,
  step = 1,
  initialValue = 0,
  jumps = [],
  points = [],
  showDraggableMarker = true,
}) => {
  const [currentVal, setCurrentVal] = useState<number>(initialValue);
  const [activeJumps, setActiveJumps] = useState(jumps);

  const range = max - min;
  const paddingX = 80;
  const width = 800;
  const height = 180;
  const lineY = 110;

  const getX = (val: number) => {
    const clamped = Math.max(min, Math.min(max, val));
    return paddingX + ((clamped - min) / range) * (width - 2 * paddingX);
  };

  const ticks: number[] = [];
  for (let v = min; v <= max; v += step) {
    ticks.push(v);
  }

  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * width;
    const proportion = (clickX - paddingX) / (width - 2 * paddingX);
    const rawVal = min + proportion * range;
    const snapped = Math.round(rawVal / step) * step;
    setCurrentVal(Math.max(min, Math.min(max, snapped)));
  };

  const reset = () => {
    setCurrentVal(initialValue);
    setActiveJumps(jumps);
  };

  return (
    <div className="w-full flex flex-col items-center select-none py-1">
      <div className="w-full max-w-3xl bg-white/80 border border-[#E3DED4] rounded-xl p-3 shadow-xs flex flex-col items-center">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full max-h-[140px] cursor-pointer touch-none"
          onPointerDown={handlePointerDown}
        >
          {/* Main Axis */}
          <line
            x1={paddingX - 30}
            y1={lineY}
            x2={width - paddingX + 30}
            y2={lineY}
            stroke="#0F1E36"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Arrowheads */}
          <polygon
            points={`${paddingX - 35},${lineY} ${paddingX - 20},${lineY - 7} ${paddingX - 20},${lineY + 7}`}
            fill="#0F1E36"
          />
          <polygon
            points={`${width - paddingX + 35},${lineY} ${width - paddingX + 20},${lineY - 7} ${width - paddingX + 20},${lineY + 7}`}
            fill="#0F1E36"
          />

          {/* Jumps Arcs */}
          {activeJumps.map((jump, idx) => {
            const x1 = getX(jump.from);
            const x2 = getX(jump.to);
            const midX = (x1 + x2) / 2;
            const arcH = Math.min(60, Math.abs(x2 - x1) * 0.35 + 25);
            const col = jump.color || '#1D4ED8';
            return (
              <g key={`jump-${idx}`}>
                <path
                  d={`M ${x1} ${lineY} Q ${midX} ${lineY - arcH} ${x2} ${lineY}`}
                  fill="none"
                  stroke={col}
                  strokeWidth="3.5"
                  strokeDasharray="6 3"
                />
                {jump.label && (
                  <text
                    x={midX}
                    y={lineY - arcH - 6}
                    textAnchor="middle"
                    fill={col}
                    fontSize="15"
                    fontWeight="bold"
                  >
                    {jump.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* Ticks and Numbers */}
          {ticks.map((val) => {
            const x = getX(val);
            const isZero = val === 0;
            return (
              <g key={val}>
                <line
                  x1={x}
                  y1={lineY - (isZero ? 14 : 8)}
                  x2={x}
                  y2={lineY + (isZero ? 14 : 8)}
                  stroke="#0F1E36"
                  strokeWidth={isZero ? '3.5' : '2'}
                />
                <text
                  x={x}
                  y={lineY + 28}
                  textAnchor="middle"
                  fill="#0F1E36"
                  fontSize="16"
                  fontWeight={isZero ? '800' : '600'}
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Fixed Points (Open / Closed circles) */}
          {points.map((pt, i) => {
            const px = getX(pt.val);
            const col = pt.color || '#DC2626';
            return (
              <g key={`pt-${i}`}>
                <circle
                  cx={px}
                  y={lineY}
                  r="8"
                  fill={pt.closed !== false ? col : '#FAF8F3'}
                  stroke={col}
                  strokeWidth="3"
                />
                {pt.label && (
                  <text
                    x={px}
                    y={lineY - 16}
                    textAnchor="middle"
                    fill={col}
                    fontSize="15"
                    fontWeight="bold"
                  >
                    {pt.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* Draggable Current Marker */}
          {showDraggableMarker && (
            <g transform={`translate(${getX(currentVal)}, ${lineY})`}>
              <circle cx="0" cy="0" r="10" fill="#1D4ED8" stroke="#FFFFFF" strokeWidth="2.5" />
              <circle cx="0" cy="0" r="3.5" fill="#FFFFFF" />
              <rect x="-24" y="-36" width="48" height="26" rx="6" fill="#1D4ED8" />
              <text x="0" y="-18" textAnchor="middle" fill="#FFFFFF" fontSize="15" fontWeight="bold">
                {currentVal}
              </text>
            </g>
          )}
        </svg>

        <div className="w-full flex items-center justify-between pt-2 border-t border-[#E3DED4]/60 px-2">
          <div className="text-base font-bold text-[#0F1E36]">
            Marker: <span className="text-[#1D4ED8] font-black text-lg">{currentVal}</span>
          </div>
          <div className="flex gap-1.5">
            <button
              onClick={() => setCurrentVal((prev) => Math.max(min, prev - step))}
              className="px-2.5 py-1 bg-[#F0EDE6] hover:bg-[#E3DED4] active:scale-95 rounded-lg font-bold text-sm text-[#0F1E36]"
            >
              - {step}
            </button>
            <button
              onClick={() => setCurrentVal((prev) => Math.min(max, prev + step))}
              className="px-2.5 py-1 bg-[#F0EDE6] hover:bg-[#E3DED4] active:scale-95 rounded-lg font-bold text-sm text-[#0F1E36]"
            >
              + {step}
            </button>
            <button
              onClick={reset}
              className="px-2.5 py-1 bg-[#FAF8F3] border border-[#E3DED4] active:scale-95 rounded-lg text-sm font-bold text-[#0F1E36] flex items-center gap-1"
            >
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
 * 2. PlaceValueChart
 * ========================================================================= */
export interface PlaceValueChartProps {
  initialCounts?: Record<string, number>;
  columns?: string[];
}

export const PlaceValueChart: React.FC<PlaceValueChartProps> = ({
  initialCounts = { Th: 1, H: 3, T: 4, U: 6, 't (0.1)': 2 },
  columns = ['Thousands (1000)', 'Hundreds (100)', 'Tens (10)', 'Units (1)', 'Tenths (0.1)'],
}) => {
  const [counts, setCounts] = useState<number[]>(() => {
    return columns.map((_, i) => Object.values(initialCounts)[i] ?? 0);
  });

  const columnMultipliers = [1000, 100, 10, 1, 0.1, 0.01];

  const totalValue = counts.reduce((acc, count, i) => {
    const mult = columnMultipliers[i] ?? 1;
    return acc + count * mult;
  }, 0);

  const increment = (idx: number) => {
    setCounts((prev) => {
      const next = [...prev];
      if (next[idx] < 9) next[idx] += 1;
      return next;
    });
  };

  const decrement = (idx: number) => {
    setCounts((prev) => {
      const next = [...prev];
      if (next[idx] > 0) next[idx] -= 1;
      return next;
    });
  };

  const reset = () => {
    setCounts(columns.map((_, i) => Object.values(initialCounts)[i] ?? 0));
  };

  return (
    <div className="w-full flex flex-col items-center py-2 select-none">
      <div className="w-full max-w-4xl bg-white/70 border border-[#E3DED4] rounded-2xl p-5 shadow-sm">
        <div className="grid grid-cols-5 gap-2 border-b-2 border-[#0F1E36] pb-3 text-center">
          {columns.slice(0, 5).map((col, idx) => (
            <div key={idx} className="font-extrabold text-lg text-[#0F1E36] px-1">
              {col}
            </div>
          ))}
        </div>

        {/* Counter tokens row */}
        <div className="grid grid-cols-5 gap-2 py-4 min-h-[140px] bg-[#FAF8F3]/60 rounded-xl my-3">
          {counts.slice(0, 5).map((count, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center p-2 border-r last:border-r-0 border-[#E3DED4]">
              <div className="flex flex-wrap gap-1.5 justify-center max-w-[120px] min-h-[64px] items-center">
                {Array.from({ length: count }).map((_, cIdx) => (
                  <span
                    key={cIdx}
                    className="w-7 h-7 rounded-full bg-[#1D4ED8] border-2 border-white shadow-sm flex items-center justify-center text-white font-bold text-xs"
                  >
                    ●
                  </span>
                ))}
              </div>
              <div className="text-3xl font-black text-[#0F1E36] mt-2">{count}</div>
              <div className="flex gap-1.5 mt-2">
                <button
                  onClick={() => decrement(idx)}
                  className="w-10 h-10 rounded-lg bg-[#E3DED4] hover:bg-[#D5CEBF] font-black text-xl flex items-center justify-center active:scale-95"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <button
                  onClick={() => increment(idx)}
                  className="w-10 h-10 rounded-lg bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-black text-xl flex items-center justify-center active:scale-95"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[#E3DED4]">
          <div className="text-2xl font-bold text-[#0F1E36]">
            Total: <span className="font-black text-3xl text-[#1D4ED8]">{totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
          </div>
          <button
            onClick={reset}
            className="px-4 py-2 bg-[#FAF8F3] border border-[#E3DED4] active:scale-95 rounded-xl text-lg font-bold text-[#0F1E36] flex items-center gap-1.5"
          >
            <RotateCcw className="w-5 h-5" /> Reset
          </button>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
 * 3. FactorTree
 * ========================================================================= */
export interface FactorTreeProps {
  number?: number;
}

export const FactorTree: React.FC<FactorTreeProps> = ({ number = 36 }) => {
  const [num, setNum] = useState<number>(number);
  const [step, setStep] = useState<number>(1);

  const reset = () => {
    setNum(number);
    setStep(1);
  };

  return (
    <div className="w-full flex flex-col items-center py-2 select-none">
      <div className="w-full max-w-2xl bg-white/70 border border-[#E3DED4] rounded-2xl p-5 shadow-sm flex flex-col items-center">
        <svg viewBox="0 0 500 280" className="w-full max-h-[190px]">
          {/* Root node */}
          <circle cx="250" cy="40" r="26" fill="#0F1E36" />
          <text x="250" y="48" textAnchor="middle" fill="#FFFFFF" fontSize="20" fontWeight="bold">
            {num}
          </text>

          {/* Level 1 branches */}
          {step >= 1 && (
            <>
              <line x1="230" y1="65" x2="160" y2="120" stroke="#0F1E36" strokeWidth="3" />
              <line x1="270" y1="65" x2="340" y2="120" stroke="#0F1E36" strokeWidth="3" />
              <circle cx="160" cy="128" r="22" fill="#16A34A" />
              <text x="160" y="135" textAnchor="middle" fill="#FFFFFF" fontSize="17" fontWeight="bold">
                2
              </text>
              <circle cx="340" cy="128" r="22" fill="#1D4ED8" />
              <text x="340" y="135" textAnchor="middle" fill="#FFFFFF" fontSize="17" fontWeight="bold">
                {num === 36 ? '18' : Math.floor(num / 2)}
              </text>
            </>
          )}

          {/* Level 2 branches */}
          {step >= 2 && num === 36 && (
            <>
              <line x1="325" y1="150" x2="280" y2="200" stroke="#0F1E36" strokeWidth="3" />
              <line x1="355" y1="150" x2="400" y2="200" stroke="#0F1E36" strokeWidth="3" />
              <circle cx="280" cy="208" r="22" fill="#16A34A" />
              <text x="280" y="215" textAnchor="middle" fill="#FFFFFF" fontSize="17" fontWeight="bold">
                2
              </text>
              <circle cx="400" cy="208" r="22" fill="#EA580C" />
              <text x="400" y="215" textAnchor="middle" fill="#FFFFFF" fontSize="17" fontWeight="bold">
                9
              </text>
            </>
          )}

          {/* Level 3 branches */}
          {step >= 3 && num === 36 && (
            <>
              <line x1="390" y1="230" x2="365" y2="260" stroke="#0F1E36" strokeWidth="2.5" />
              <line x1="410" y1="230" x2="435" y2="260" stroke="#0F1E36" strokeWidth="2.5" />
              <circle cx="365" cy="260" r="16" fill="#16A34A" />
              <text x="365" y="265" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="bold">
                3
              </text>
              <circle cx="435" cy="260" r="16" fill="#16A34A" />
              <text x="435" y="265" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="bold">
                3
              </text>
            </>
          )}
        </svg>

        <div className="w-full flex items-center justify-between pt-2 border-t border-[#E3DED4]">
          <div className="text-base font-bold text-[#0F1E36]">
            {step >= 3 ? (
              <span className="flex items-center gap-1.5">
                Prime Factor Form: <MathFormula latex="2^2 \times 3^2 = 36" display={false} />
              </span>
            ) : (
              <span>Step {step} of 3</span>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setStep((s) => Math.min(3, s + 1))}
              disabled={step >= 3}
              className="px-3.5 py-1.5 bg-[#1D4ED8] disabled:opacity-40 text-white rounded-lg font-bold text-sm flex items-center gap-1 active:scale-95"
            >
              Next step <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={reset}
              className="px-3 py-1.5 bg-[#FAF8F3] border border-[#E3DED4] rounded-lg text-sm font-bold text-[#0F1E36] active:scale-95 flex items-center gap-1"
            >
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
 * 4. PrimeFactorTool (HCF/LCM Venn)
 * ========================================================================= */
export interface PrimeFactorToolProps {
  numA?: number;
  numB?: number;
}

export const PrimeFactorTool: React.FC<PrimeFactorToolProps> = ({ numA = 24, numB = 36 }) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="w-full flex flex-col items-center py-1 select-none">
      <div className="w-full max-w-2xl bg-white/80 border border-[#E3DED4] rounded-xl p-3 shadow-2xs">
        <svg viewBox="0 0 540 220" className="w-full max-h-[170px]">
          {/* Left circle */}
          <circle cx="210" cy="115" r="90" fill="#1D4ED8" fillOpacity="0.18" stroke="#1D4ED8" strokeWidth="3" />
          {/* Right circle */}
          <circle cx="330" cy="115" r="90" fill="#EA580C" fillOpacity="0.18" stroke="#EA580C" strokeWidth="3" />

          {/* Labels */}
          <text x="160" y="35" fill="#1D4ED8" fontSize="16" fontWeight="800">
            Factors of {numA}
          </text>
          <text x="380" y="35" textAnchor="end" fill="#EA580C" fontSize="16" fontWeight="800">
            Factors of {numB}
          </text>

          {/* Factors Left */}
          <text x="170" y="120" textAnchor="middle" fill="#0F1E36" fontSize="20" fontWeight="bold">
            2
          </text>

          {/* Intersection factors */}
          <text x="270" y="95" textAnchor="middle" fill="#0F1E36" fontSize="18" fontWeight="bold">
            2
          </text>
          <text x="270" y="120" textAnchor="middle" fill="#0F1E36" fontSize="18" fontWeight="bold">
            2
          </text>
          <text x="270" y="145" textAnchor="middle" fill="#0F1E36" fontSize="18" fontWeight="bold">
            3
          </text>

          {/* Factors Right */}
          <text x="370" y="120" textAnchor="middle" fill="#0F1E36" fontSize="20" fontWeight="bold">
            3
          </text>
        </svg>

        <div className="flex items-center justify-between pt-2 border-t border-[#E3DED4] px-2">
          <div className="flex gap-4 text-base font-bold text-[#0F1E36]">
            <div>
              HCF: <span className="text-[#1D4ED8] font-black text-lg">{revealed ? '12 (2 × 2 × 3)' : '?'}</span>
            </div>
            <div>
              LCM: <span className="text-[#EA580C] font-black text-lg">{revealed ? '72' : '?'}</span>
            </div>
          </div>
          <button
            onClick={() => setRevealed(!revealed)}
            className="px-3 py-1 bg-[#1D4ED8] text-white rounded-lg font-bold text-xs active:scale-95 flex items-center gap-1"
          >
            <Eye className="w-3.5 h-3.5" /> {revealed ? 'Hide' : 'Show values'}
          </button>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
 * 5. IndexLawsTool
 * ========================================================================= */
export interface IndexLawsToolProps {
  base?: string;
  m?: number;
  n?: number;
  operation?: 'multiply' | 'divide' | 'power';
}

export const IndexLawsTool: React.FC<IndexLawsToolProps> = ({
  base = 'a',
  m = 3,
  n = 2,
  operation = 'multiply',
}) => {
  const [op, setOp] = useState<'multiply' | 'divide'>(operation === 'divide' ? 'divide' : 'multiply');
  const [showExpanded, setShowExpanded] = useState(false);

  const mFactors = Array(m).fill(base).join(' \\times ');
  const nFactors = Array(n).fill(base).join(' \\times ');

  return (
    <div className="w-full flex flex-col items-center py-2 select-none">
      <div className="w-full max-w-3xl bg-white/70 border border-[#E3DED4] rounded-2xl p-6 shadow-sm">
        <div className="flex justify-center gap-3 mb-4">
          <button
            onClick={() => setOp('multiply')}
            className={`px-5 py-2.5 rounded-xl font-bold text-lg active:scale-95 ${
              op === 'multiply' ? 'bg-[#1D4ED8] text-white' : 'bg-[#FAF8F3] border border-[#E3DED4] text-[#0F1E36]'
            }`}
          >
            Multiplication: <MathFormula latex="a^m \times a^n" display={false} />
          </button>
          <button
            onClick={() => setOp('divide')}
            className={`px-5 py-2.5 rounded-xl font-bold text-lg active:scale-95 ${
              op === 'divide' ? 'bg-[#1D4ED8] text-white' : 'bg-[#FAF8F3] border border-[#E3DED4] text-[#0F1E36]'
            }`}
          >
            Division: <MathFormula latex="a^m \div a^n" display={false} />
          </button>
        </div>

        <div className="bg-[#FAF8F3] p-4 rounded-xl border border-[#E3DED4] flex flex-col items-center gap-3 my-1.5">
          <div className="text-xl md:text-2xl font-bold text-[#0F1E36]">
            {op === 'multiply' ? (
              <MathFormula latex={`${base}^${m} \\times ${base}^${n}`} />
            ) : (
              <MathFormula latex={`\\frac{${base}^${m}}{${base}^${n}}`} />
            )}
          </div>

          {showExpanded && (
            <div className="text-base md:text-lg font-bold text-[#1D4ED8] bg-white p-3 rounded-lg border border-[#E3DED4] w-full text-center">
              {op === 'multiply' ? (
                <MathFormula latex={`(${mFactors}) \\times (${nFactors}) = ${base}^{${m + n}}`} />
              ) : (
                <MathFormula latex={`\\frac{${mFactors}}{${nFactors}} = ${base}^{${m - n}}`} />
              )}
            </div>
          )}

          <div className="text-base md:text-lg font-bold text-[#0F1E36]">
            Law:{' '}
            {op === 'multiply' ? (
              <MathFormula latex={`${base}^m \\times ${base}^n = ${base}^{m+n}`} display={false} />
            ) : (
              <MathFormula latex={`${base}^m \\div ${base}^n = ${base}^{m-n}`} display={false} />
            )}
          </div>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-[#E3DED4]">
          <span className="text-sm text-[#0F1E36]/80 font-bold">Base stays the same; indices combine.</span>
          <button
            onClick={() => setShowExpanded(!showExpanded)}
            className="px-3 py-1.5 bg-[#FAF8F3] border border-[#E3DED4] rounded-lg text-xs font-bold text-[#0F1E36] active:scale-95"
          >
            {showExpanded ? 'Hide expansion' : 'Expand terms'}
          </button>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
 * 6. StandardFormTool
 * ========================================================================= */
export const StandardFormTool: React.FC<{ initialBase?: number; initialPower?: number }> = ({
  initialBase = 3.5,
  initialPower = 3,
}) => {
  const [power, setPower] = useState(initialPower);
  const base = initialBase;
  const standardVal = base * Math.pow(10, power);

  return (
    <div className="w-full flex flex-col items-center py-1 select-none">
      <div className="w-full max-w-xl bg-white/70 border border-[#E3DED4] rounded-xl p-4 shadow-2xs flex flex-col items-center gap-3">
        <div className="text-xl md:text-2xl font-bold text-[#0F1E36]">
          <MathFormula latex={`${base} \\times 10^{${power}}`} />
        </div>

        <div className="text-xl font-bold text-[#1D4ED8] bg-[#FAF8F3] px-5 py-2 rounded-lg border border-[#E3DED4]">
          = {standardVal.toLocaleString()}
        </div>

        <div className="w-full flex items-center gap-3 px-3 pt-1">
          <span className="font-bold text-sm text-[#0F1E36]">Power of 10:</span>
          <input
            type="range"
            min="-2"
            max="5"
            value={power}
            onChange={(e) => setPower(parseInt(e.target.value, 10))}
            className="flex-1 h-2 bg-[#E3DED4] rounded-lg accent-[#1D4ED8] cursor-pointer"
          />
          <span className="font-bold text-base text-[#0F1E36] w-6 text-center">{power}</span>
        </div>

        <button
          onClick={() => setPower(initialPower)}
          className="self-end px-3 py-1 bg-[#FAF8F3] border border-[#E3DED4] rounded-lg text-xs font-bold text-[#0F1E36] active:scale-95 flex items-center gap-1"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>
    </div>
  );
};

/* =========================================================================
 * 7. SurdEstimator
 * ========================================================================= */
export const SurdEstimator: React.FC<{ target?: number }> = ({ target = 50 }) => {
  const [val, setVal] = useState(target);

  const lowerSq = Math.floor(Math.sqrt(val));
  const upperSq = lowerSq + 1;

  return (
    <div className="w-full flex flex-col items-center py-1 select-none">
      <div className="w-full max-w-xl bg-white/70 border border-[#E3DED4] rounded-xl p-4 shadow-2xs flex flex-col items-center gap-3">
        <div className="text-xl md:text-2xl font-bold text-[#0F1E36]">
          Estimating <MathFormula latex={`\\sqrt{${val}}`} display={false} />
        </div>

        <div className="w-full bg-[#FAF8F3] border border-[#E3DED4] p-3 rounded-lg flex items-center justify-around text-base md:text-lg font-bold">
          <div className="text-center">
            <MathFormula latex={`\\sqrt{${lowerSq * lowerSq}}`} />
            <div className="text-[#16A34A] font-bold text-lg mt-0.5">{lowerSq}</div>
          </div>
          <div className="text-lg font-bold text-[#0F1E36]">&lt;</div>
          <div className="text-center bg-white px-3 py-1 rounded-lg border border-[#1D4ED8]">
            <MathFormula latex={`\\sqrt{${val}}`} />
            <div className="text-[#1D4ED8] font-bold text-lg mt-0.5">≈ {Math.sqrt(val).toFixed(2)}</div>
          </div>
          <div className="text-lg font-bold text-[#0F1E36]">&lt;</div>
          <div className="text-center">
            <MathFormula latex={`\\sqrt{${upperSq * upperSq}}`} />
            <div className="text-[#16A34A] font-bold text-lg mt-0.5">{upperSq}</div>
          </div>
        </div>

        <div className="w-full flex items-center gap-3 px-3">
          <span className="font-bold text-sm text-[#0F1E36]">Target Number:</span>
          <input
            type="range"
            min="2"
            max="100"
            value={val}
            onChange={(e) => setVal(parseInt(e.target.value, 10))}
            className="flex-1 h-2 bg-[#E3DED4] rounded-lg accent-[#1D4ED8] cursor-pointer"
          />
          <span className="font-bold text-base text-[#0F1E36] w-8 text-center">{val}</span>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
 * 8. RationalIrrationalTool
 * ========================================================================= */
export const RationalIrrationalTool: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);

  const examples = [
    { label: '3/4', type: 'Rational', reason: 'Ratio of two integers (0.75 terminating)' },
    { label: '√2', type: 'Irrational', reason: 'Non-terminating, non-repeating decimal (1.4142...)' },
    { label: '0.333...', type: 'Rational', reason: 'Recurring decimal equals 1/3' },
    { label: 'π', type: 'Irrational', reason: 'Ratio of circumference to diameter cannot be expressed as fraction' },
    { label: '√49', type: 'Rational', reason: 'Equals 7, an integer' },
  ];

  return (
    <div className="w-full flex flex-col items-center py-1 select-none">
      <div className="w-full max-w-2xl bg-white/70 border border-[#E3DED4] rounded-xl p-4 shadow-2xs flex flex-col gap-3">
        <div className="grid grid-cols-5 gap-2">
          {examples.map((ex) => (
            <button
              key={ex.label}
              onClick={() => setSelected(ex.label)}
              className={`p-2 rounded-lg font-bold text-base border transition-all active:scale-95 ${
                selected === ex.label
                  ? 'bg-[#1D4ED8] text-white border-[#1D4ED8] shadow-xs'
                  : 'bg-[#FAF8F3] text-[#0F1E36] border-[#E3DED4]'
              }`}
            >
              {ex.label}
            </button>
          ))}
        </div>

        {selected && (
          <div className="bg-[#FAF8F3] p-3 rounded-lg border border-[#E3DED4]">
            {(() => {
              const item = examples.find((e) => e.label === selected)!;
              return (
                <div className="flex flex-col gap-1">
                  <div className="text-base font-bold text-[#0F1E36]">
                    Classification: <span className={item.type === 'Rational' ? 'text-[#16A34A] font-black' : 'text-[#EA580C] font-black'}>{item.type}</span>
                  </div>
                  <div className="text-sm text-[#0F1E36]/90 font-medium">{item.reason}</div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

/* =========================================================================
 * 9. RecurringDecimalTool
 * ========================================================================= */
export const RecurringDecimalTool: React.FC<{ fraction?: string }> = ({ fraction = '1/3' }) => {
  return (
    <div className="w-full flex flex-col items-center py-1 select-none">
      <div className="w-full max-w-lg bg-white/70 border border-[#E3DED4] rounded-xl p-4 shadow-2xs flex flex-col items-center gap-2.5">
        <div className="text-xl md:text-2xl font-bold text-[#0F1E36]">
          <MathFormula latex="\\frac{1}{3} = 0.3333\\dots = 0.\\dot{3}" />
        </div>
        <div className="text-sm text-[#0F1E36]/90 font-medium text-center">
          The dot above the digit indicates that <span className="font-bold text-[#1D4ED8]">3</span> repeats indefinitely.
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
 * 10. ArithmeticLayout
 * ========================================================================= */
export const ArithmeticLayout: React.FC<{ num1?: number; num2?: number; op?: '+' | '-' | '×' }> = ({
  num1 = 248,
  num2 = 135,
  op = '+',
}) => {
  const [step, setStep] = useState(1);
  const result = op === '+' ? num1 + num2 : num1 - num2;

  return (
    <div className="w-full flex flex-col items-center py-1 select-none">
      <div className="w-56 bg-white/70 border border-[#E3DED4] rounded-xl p-4 shadow-2xs flex flex-col items-end text-xl font-mono font-bold text-[#0F1E36]">
        <div>{num1}</div>
        <div className="flex items-center gap-2">
          <span className="text-[#1D4ED8]">{op}</span>
          <span>{num2}</span>
        </div>
        <div className="w-full h-0.5 bg-[#0F1E36] my-1.5" />
        <div className="text-2xl text-[#1D4ED8] font-black">{step >= 2 ? result : '---'}</div>
        <button
          onClick={() => setStep((s) => (s >= 2 ? 1 : 2))}
          className="mt-3 self-center px-3 py-1 bg-[#F0EDE6] rounded-lg font-sans text-xs font-bold active:scale-95"
        >
          {step >= 2 ? 'Hide' : 'Calculate'}
        </button>
      </div>
    </div>
  );
};

/* =========================================================================
 * 11. BarModel
 * ========================================================================= */
export interface BarModelProps {
  totalLabel?: string;
  segments?: Array<{ label: string; flex: number; color?: string }>;
}

export const BarModel: React.FC<BarModelProps> = ({
  totalLabel = 'Total = 60',
  segments = [
    { label: 'x', flex: 1, color: '#1D4ED8' },
    { label: 'x', flex: 1, color: '#1D4ED8' },
    { label: '20', flex: 1, color: '#EA580C' },
  ],
}) => {
  return (
    <div className="w-full flex flex-col items-center py-1 select-none">
      <div className="w-full max-w-xl bg-white/70 border border-[#E3DED4] rounded-xl p-4 shadow-2xs flex flex-col items-center gap-2">
        {totalLabel && (
          <div className="w-full text-center text-base font-bold text-[#0F1E36] border-b border-dashed border-[#0F1E36]/30 pb-1.5">
            {totalLabel}
          </div>
        )}
        <div className="w-full flex h-11 rounded-lg overflow-hidden border border-[#0F1E36]">
          {segments.map((seg, i) => (
            <div
              key={i}
              style={{ flex: seg.flex, backgroundColor: seg.color || '#1D4ED8' }}
              className="h-full flex items-center justify-center text-white text-base font-bold border-r last:border-r-0 border-white/50"
            >
              {seg.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
 * 12. DoubleNumberLine
 * ========================================================================= */
export const DoubleNumberLine: React.FC<{
  topLabel?: string;
  bottomLabel?: string;
  pairs?: Array<[number, number]>;
}> = ({
  topLabel = 'Distance (km)',
  bottomLabel = 'Time (h)',
  pairs = [
    [0, 0],
    [50, 1],
    [100, 2],
    [150, 3],
  ],
}) => {
  return (
    <div className="w-full flex flex-col items-center py-1 select-none">
      <div className="w-full max-w-2xl bg-white/70 border border-[#E3DED4] rounded-xl p-4 shadow-2xs flex flex-col gap-4">
        <div>
          <div className="text-sm font-bold text-[#1D4ED8] mb-1">{topLabel}</div>
          <div className="flex justify-between border-b-2 border-[#1D4ED8] pb-1 px-3">
            {pairs.map(([top], i) => (
              <span key={i} className="text-base font-bold text-[#0F1E36]">
                {top}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between border-t-2 border-[#EA580C] pt-1 px-3">
            {pairs.map(([, btm], i) => (
              <span key={i} className="text-base font-bold text-[#0F1E36]">
                {btm}
              </span>
            ))}
          </div>
          <div className="text-sm font-bold text-[#EA580C] mt-1">{bottomLabel}</div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
 * 13. FractionBar & FractionCircle
 * ========================================================================= */
export const FractionBar: React.FC<{ parts?: number; shaded?: number }> = ({ parts = 5, shaded = 3 }) => {
  const [activeCount, setActiveCount] = useState(shaded);

  return (
    <div className="w-full flex flex-col items-center py-1 select-none">
      <div className="w-full max-w-xl bg-white/70 border border-[#E3DED4] rounded-xl p-4 shadow-2xs flex flex-col items-center gap-3">
        <div className="w-full flex h-11 rounded-lg overflow-hidden border border-[#0F1E36]">
          {Array.from({ length: parts }).map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveCount(i + 1 === activeCount ? i : i + 1)}
              className={`flex-1 h-full border-r last:border-r-0 border-[#0F1E36] transition-colors ${
                i < activeCount ? 'bg-[#1D4ED8]' : 'bg-[#FAF8F3]'
              }`}
            />
          ))}
        </div>
        <div className="text-base md:text-lg font-bold text-[#0F1E36]">
          Fraction: <MathFormula latex={`\\frac{${activeCount}}{${parts}}`} display={false} />
        </div>
      </div>
    </div>
  );
};

export const FractionCircle: React.FC<{ parts?: number; shaded?: number }> = ({ parts = 6, shaded = 4 }) => {
  const [active, setActive] = useState(shaded);

  const radius = 70;
  const cx = 90;
  const cy = 90;

  const toggleSector = (idx: number) => {
    setActive(idx + 1 === active ? idx : idx + 1);
  };

  return (
    <div className="w-full flex flex-col items-center py-1 select-none">
      <div className="w-full max-w-sm bg-white/70 border border-[#E3DED4] rounded-xl p-4 shadow-2xs flex flex-col items-center gap-2">
        <svg viewBox="0 0 180 180" className="w-36 h-36 cursor-pointer">
          <circle cx={cx} cy={cy} r={radius} fill="#FAF8F3" stroke="#0F1E36" strokeWidth="2.5" />
          {Array.from({ length: parts }).map((_, i) => {
            const angle1 = (i * 2 * Math.PI) / parts - Math.PI / 2;
            const angle2 = ((i + 1) * 2 * Math.PI) / parts - Math.PI / 2;
            const x1 = cx + radius * Math.cos(angle1);
            const y1 = cy + radius * Math.sin(angle1);
            const x2 = cx + radius * Math.cos(angle2);
            const y2 = cy + radius * Math.sin(angle2);
            const isShaded = i < active;

            return (
              <path
                key={i}
                d={`M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`}
                fill={isShaded ? '#1D4ED8' : '#FAF8F3'}
                stroke="#0F1E36"
                strokeWidth="2"
                onClick={() => toggleSector(i)}
              />
            );
          })}
        </svg>
        <div className="text-base md:text-lg font-bold text-[#0F1E36]">
          <MathFormula latex={`\\frac{${active}}{${parts}}`} display={false} />
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
 * 14. CompoundPercentTool & ProportionTable & DirectInverseProportionGraph
 * ========================================================================= */
export const CompoundPercentTool: React.FC<{ initialAmount?: number; percent?: number; years?: number }> = ({
  initialAmount = 100,
  percent = 10,
  years = 2,
}) => {
  const [currentYears, setCurrentYears] = useState(years);
  const amount = initialAmount * Math.pow(1 + percent / 100, currentYears);

  return (
    <div className="w-full flex flex-col items-center py-2 select-none">
      <div className="w-full max-w-2xl bg-white/70 border border-[#E3DED4] rounded-2xl p-6 shadow-sm flex flex-col items-center gap-4">
        <div className="text-2xl font-bold text-[#0F1E36]">
          Original: ${initialAmount} with +{percent}% per period
        </div>
        <div className="text-3xl font-black text-[#1D4ED8]">
          After {currentYears} periods = ${amount.toFixed(2)}
        </div>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((y) => (
            <button
              key={y}
              onClick={() => setCurrentYears(y)}
              className={`px-4 py-2 rounded-xl font-bold text-lg ${
                currentYears === y ? 'bg-[#1D4ED8] text-white' : 'bg-[#FAF8F3] border border-[#E3DED4]'
              }`}
            >
              Period {y}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ProportionTable: React.FC<{ headers?: string[]; rows?: (string | number)[][] }> = ({
  headers = ['Items', 'Cost ($)'],
  rows = [
    [1, 4],
    [3, 12],
    [5, 20],
  ],
}) => {
  return (
    <div className="w-full flex flex-col items-center py-2 select-none">
      <div className="w-full max-w-md bg-white/70 border border-[#E3DED4] rounded-2xl p-4 shadow-sm">
        <table className="w-full text-center text-2xl font-bold text-[#0F1E36]">
          <thead>
            <tr className="border-b-2 border-[#0F1E36]">
              {headers.map((h, i) => (
                <th key={i} className="py-2">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rI) => (
              <tr key={rI} className="border-b border-[#E3DED4] last:border-b-0">
                {row.map((cell, cI) => (
                  <td key={cI} className="py-2.5 font-black text-[#1D4ED8]">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const DirectInverseProportionGraph: React.FC = () => {
  const [type, setType] = useState<'direct' | 'inverse'>('direct');

  return (
    <div className="w-full flex flex-col items-center py-2 select-none">
      <div className="w-full max-w-2xl bg-white/70 border border-[#E3DED4] rounded-2xl p-6 shadow-sm flex flex-col items-center gap-4">
        <div className="flex gap-3">
          <button
            onClick={() => setType('direct')}
            className={`px-4 py-2 rounded-xl font-bold text-lg ${
              type === 'direct' ? 'bg-[#1D4ED8] text-white' : 'bg-[#FAF8F3] border border-[#E3DED4]'
            }`}
          >
            Direct: <MathFormula latex="y = kx" display={false} />
          </button>
          <button
            onClick={() => setType('inverse')}
            className={`px-4 py-2 rounded-xl font-bold text-lg ${
              type === 'inverse' ? 'bg-[#1D4ED8] text-white' : 'bg-[#FAF8F3] border border-[#E3DED4]'
            }`}
          >
            Inverse: <MathFormula latex="y = \frac{k}{x}" display={false} />
          </button>
        </div>

        <svg viewBox="0 0 300 200" className="w-full max-w-xs h-auto">
          {/* Axes */}
          <line x1="40" y1="170" x2="280" y2="170" stroke="#0F1E36" strokeWidth="3" />
          <line x1="40" y1="170" x2="40" y2="20" stroke="#0F1E36" strokeWidth="3" />
          <text x="270" y="195" fontSize="18" fontWeight="bold" fill="#0F1E36">
            x
          </text>
          <text x="15" y="30" fontSize="18" fontWeight="bold" fill="#0F1E36">
            y
          </text>

          {type === 'direct' ? (
            <line x1="40" y1="170" x2="260" y2="40" stroke="#1D4ED8" strokeWidth="4" />
          ) : (
            <path d="M 50 30 Q 70 140 260 160" fill="none" stroke="#EA580C" strokeWidth="4" />
          )}
        </svg>
      </div>
    </div>
  );
};
