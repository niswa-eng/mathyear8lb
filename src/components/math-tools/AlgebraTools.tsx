/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MathFormula } from '../common/MathFormula';
import { RotateCcw, Plus, Minus, ArrowRight, ArrowLeft } from 'lucide-react';

/* =========================================================================
 * 1. BalanceScale
 * ========================================================================= */
export interface BalanceScaleProps {
  initialLeftWeight?: number;
  initialRightWeight?: number;
  unknownValue?: number;
}

export const BalanceScale: React.FC<BalanceScaleProps> = ({
  initialLeftWeight = 2, // 2x + 1
  initialRightWeight = 7,
  unknownValue = 3,
}) => {
  const [xCount, setXCount] = useState(2);
  const [leftUnits, setLeftUnits] = useState(1);
  const [rightUnits, setRightUnits] = useState(initialRightWeight);

  const leftTotal = xCount * unknownValue + leftUnits;
  const rightTotal = rightUnits;
  const diff = leftTotal - rightTotal;
  // tilt angle between -15 and +15 degrees
  const angle = Math.max(-14, Math.min(14, diff * 2));

  const reset = () => {
    setXCount(2);
    setLeftUnits(1);
    setRightUnits(initialRightWeight);
  };

  return (
    <div className="w-full flex flex-col items-center py-2 select-none">
      <div className="w-full max-w-2xl bg-white/70 border border-[#E3DED4] rounded-2xl p-5 shadow-sm flex flex-col items-center">
        <svg viewBox="0 0 500 260" className="w-full h-auto">
          {/* Base Stand */}
          <polygon points="250,190 220,240 280,240" fill="#0F1E36" />
          <rect x="245" y="70" width="10" height="120" fill="#0F1E36" />
          <circle cx="250" cy="70" r="8" fill="#1D4ED8" />

          {/* Rotating Beam */}
          <g transform={`rotate(${angle}, 250, 70)`}>
            <line x1="80" y1="70" x2="420" y2="70" stroke="#0F1E36" strokeWidth="6" strokeLinecap="round" />

            {/* Left Pan Strings & Pan */}
            <line x1="110" y1="70" x2="70" y2="150" stroke="#888888" strokeWidth="2" />
            <line x1="110" y1="70" x2="150" y2="150" stroke="#888888" strokeWidth="2" />
            <ellipse cx="110" cy="150" rx="55" ry="10" fill="#0F1E36" />

            {/* Left Items */}
            <g transform="translate(110, 140)">
              {Array.from({ length: xCount }).map((_, i) => (
                <rect
                  key={`x-${i}`}
                  x={-40 + i * 28}
                  y="-28"
                  width="24"
                  height="26"
                  rx="4"
                  fill="#1D4ED8"
                  stroke="#FFFFFF"
                />
              ))}
              {Array.from({ length: leftUnits }).map((_, i) => (
                <circle
                  key={`u-${i}`}
                  cx={-30 + (xCount * 28) + (i % 3) * 14}
                  cy={-14 - Math.floor(i / 3) * 14}
                  r="6"
                  fill="#EA580C"
                />
              ))}
            </g>

            {/* Right Pan Strings & Pan */}
            <line x1="390" y1="70" x2="350" y2="150" stroke="#888888" strokeWidth="2" />
            <line x1="390" y1="70" x2="430" y2="150" stroke="#888888" strokeWidth="2" />
            <ellipse cx="390" cy="150" rx="55" ry="10" fill="#0F1E36" />

            {/* Right Items */}
            <g transform="translate(390, 140)">
              {Array.from({ length: rightUnits }).map((_, i) => (
                <circle
                  key={`ru-${i}`}
                  cx={-35 + (i % 5) * 16}
                  cy={-10 - Math.floor(i / 5) * 15}
                  r="6"
                  fill="#EA580C"
                />
              ))}
            </g>
          </g>
        </svg>

        {/* Current State Formula */}
        <div className="text-2xl font-black text-[#0F1E36] my-2">
          <MathFormula
            latex={`${xCount}x + ${leftUnits} ${diff === 0 ? '=' : diff > 0 ? '>' : '<'} ${rightUnits}`}
            display={false}
          />
        </div>

        {/* Interactive Balancing Controls */}
        <div className="w-full grid grid-cols-2 gap-4 border-t border-[#E3DED4] pt-3">
          <div className="flex flex-col items-center gap-1.5 bg-[#FAF8F3] p-2.5 rounded-xl border border-[#E3DED4]">
            <span className="font-extrabold text-[#1D4ED8]">Left Pan ({xCount}x + {leftUnits})</span>
            <div className="flex gap-2">
              <button
                onClick={() => setXCount((c) => Math.max(0, c - 1))}
                className="px-2.5 py-1 bg-white border border-[#E3DED4] rounded-lg font-bold text-sm"
              >
                -x
              </button>
              <button
                onClick={() => setXCount((c) => c + 1)}
                className="px-2.5 py-1 bg-[#1D4ED8] text-white rounded-lg font-bold text-sm"
              >
                +x
              </button>
              <button
                onClick={() => setLeftUnits((u) => Math.max(0, u - 1))}
                className="px-2.5 py-1 bg-white border border-[#E3DED4] rounded-lg font-bold text-sm"
              >
                -1
              </button>
              <button
                onClick={() => setLeftUnits((u) => u + 1)}
                className="px-2.5 py-1 bg-[#EA580C] text-white rounded-lg font-bold text-sm"
              >
                +1
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center gap-1.5 bg-[#FAF8F3] p-2.5 rounded-xl border border-[#E3DED4]">
            <span className="font-extrabold text-[#EA580C]">Right Pan ({rightUnits})</span>
            <div className="flex gap-2">
              <button
                onClick={() => setRightUnits((u) => Math.max(0, u - 1))}
                className="px-3 py-1 bg-white border border-[#E3DED4] rounded-lg font-bold text-sm"
              >
                -1
              </button>
              <button
                onClick={() => setRightUnits((u) => u + 1)}
                className="px-3 py-1 bg-[#EA580C] text-white rounded-lg font-bold text-sm"
              >
                +1
              </button>
              <button
                onClick={reset}
                className="px-3 py-1 bg-white border border-[#E3DED4] rounded-lg font-bold text-sm flex items-center gap-1"
              >
                <RotateCcw className="w-4 h-4" /> Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
 * 2. AlgebraTiles
 * ========================================================================= */
export const AlgebraTiles: React.FC = () => {
  const [counts, setCounts] = useState({ x2: 1, x: 3, one: 2 });

  return (
    <div className="w-full flex flex-col items-center py-2 select-none">
      <div className="w-full max-w-2xl bg-white/70 border border-[#E3DED4] rounded-2xl p-5 shadow-sm flex flex-col items-center gap-4">
        <div className="text-2xl font-black text-[#0F1E36]">
          <MathFormula
            latex={`${counts.x2 > 0 ? `${counts.x2 === 1 ? '' : counts.x2}x^2` : ''} ${
              counts.x > 0 ? `+ ${counts.x === 1 ? '' : counts.x}x` : ''
            } ${counts.one > 0 ? `+ ${counts.one}` : ''}`}
            display={false}
          />
        </div>

        {/* Tiles Board */}
        <div className="w-full min-h-[120px] bg-[#FAF8F3] rounded-xl border border-[#E3DED4] p-4 flex flex-wrap gap-3 items-center justify-center">
          {Array.from({ length: counts.x2 }).map((_, i) => (
            <div
              key={`x2-${i}`}
              className="w-16 h-16 bg-[#1D4ED8] text-white rounded-lg font-black text-xl flex items-center justify-center shadow-sm"
            >
              x²
            </div>
          ))}
          {Array.from({ length: counts.x }).map((_, i) => (
            <div
              key={`x-${i}`}
              className="w-8 h-16 bg-[#16A34A] text-white rounded-md font-black text-lg flex items-center justify-center shadow-sm"
            >
              x
            </div>
          ))}
          {Array.from({ length: counts.one }).map((_, i) => (
            <div
              key={`1-${i}`}
              className="w-8 h-8 bg-[#EA580C] text-white rounded-md font-black text-base flex items-center justify-center shadow-sm"
            >
              1
            </div>
          ))}
        </div>

        {/* Tile Add/Remove Buttons */}
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5 bg-[#FAF8F3] px-3 py-1.5 rounded-xl border border-[#E3DED4]">
            <span className="font-bold text-[#1D4ED8]">x²</span>
            <button
              onClick={() => setCounts((c) => ({ ...c, x2: Math.max(0, c.x2 - 1) }))}
              className="w-7 h-7 bg-white rounded font-bold"
            >
              -
            </button>
            <button
              onClick={() => setCounts((c) => ({ ...c, x2: c.x2 + 1 }))}
              className="w-7 h-7 bg-[#1D4ED8] text-white rounded font-bold"
            >
              +
            </button>
          </div>
          <div className="flex items-center gap-1.5 bg-[#FAF8F3] px-3 py-1.5 rounded-xl border border-[#E3DED4]">
            <span className="font-bold text-[#16A34A]">x</span>
            <button
              onClick={() => setCounts((c) => ({ ...c, x: Math.max(0, c.x - 1) }))}
              className="w-7 h-7 bg-white rounded font-bold"
            >
              -
            </button>
            <button
              onClick={() => setCounts((c) => ({ ...c, x: c.x + 1 }))}
              className="w-7 h-7 bg-[#16A34A] text-white rounded font-bold"
            >
              +
            </button>
          </div>
          <div className="flex items-center gap-1.5 bg-[#FAF8F3] px-3 py-1.5 rounded-xl border border-[#E3DED4]">
            <span className="font-bold text-[#EA580C]">1</span>
            <button
              onClick={() => setCounts((c) => ({ ...c, one: Math.max(0, c.one - 1) }))}
              className="w-7 h-7 bg-white rounded font-bold"
            >
              -
            </button>
            <button
              onClick={() => setCounts((c) => ({ ...c, one: c.one + 1 }))}
              className="w-7 h-7 bg-[#EA580C] text-white rounded font-bold"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
 * 3. AreaModel (Expanding (x + a)(x + b))
 * ========================================================================= */
export const AreaModel: React.FC<{ a?: number; b?: number }> = ({ a = 3, b = 2 }) => {
  return (
    <div className="w-full flex flex-col items-center py-2 select-none">
      <div className="w-full max-w-2xl bg-white/70 border border-[#E3DED4] rounded-2xl p-6 shadow-sm flex flex-col items-center gap-4">
        <div className="text-3xl font-extrabold text-[#0F1E36]">
          <MathFormula latex={`(x + ${a})(x + ${b}) = x^2 + ${a + b}x + ${a * b}`} />
        </div>

        <div className="grid grid-cols-[80px_1fr_1fr] grid-rows-[50px_1fr_1fr] w-80 h-64 border-2 border-[#0F1E36] rounded-xl overflow-hidden text-2xl font-black">
          {/* Header row */}
          <div className="bg-[#FAF8F3] border-b-2 border-r-2 border-[#0F1E36] flex items-center justify-center text-[#888888]">
            ×
          </div>
          <div className="bg-[#FAF8F3] border-b-2 border-r-2 border-[#0F1E36] flex items-center justify-center text-[#1D4ED8]">
            x
          </div>
          <div className="bg-[#FAF8F3] border-b-2 border-[#0F1E36] flex items-center justify-center text-[#EA580C]">
            +{a}
          </div>

          {/* Row 1 */}
          <div className="bg-[#FAF8F3] border-b-2 border-r-2 border-[#0F1E36] flex items-center justify-center text-[#1D4ED8]">
            x
          </div>
          <div className="bg-blue-100 border-b-2 border-r-2 border-[#0F1E36] flex items-center justify-center text-[#1D4ED8]">
            x²
          </div>
          <div className="bg-amber-100 border-b-2 border-[#0F1E36] flex items-center justify-center text-[#EA580C]">
            {a}x
          </div>

          {/* Row 2 */}
          <div className="bg-[#FAF8F3] border-r-2 border-[#0F1E36] flex items-center justify-center text-[#16A34A]">
            +{b}
          </div>
          <div className="bg-emerald-100 border-r-2 border-[#0F1E36] flex items-center justify-center text-[#16A34A]">
            {b}x
          </div>
          <div className="bg-purple-100 flex items-center justify-center text-purple-700">
            {a * b}
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
 * 4. FunctionMachine
 * ========================================================================= */
export const FunctionMachine: React.FC<{ op1?: string; op2?: string; defaultInput?: number }> = ({
  op1 = '× 3',
  op2 = '+ 4',
  defaultInput = 5,
}) => {
  const [inputVal, setInputVal] = useState(defaultInput);
  const [isInverse, setIsInverse] = useState(false);

  // normal: (input * 3) + 4
  const step1 = inputVal * 3;
  const outputVal = step1 + 4;

  return (
    <div className="w-full flex flex-col items-center py-2 select-none">
      <div className="w-full max-w-3xl bg-white/70 border border-[#E3DED4] rounded-2xl p-6 shadow-sm flex flex-col items-center gap-6">
        <div className="w-full flex items-center justify-center gap-4">
          {/* Input */}
          <div className="flex flex-col items-center">
            <span className="font-extrabold text-sm text-[#0F1E36] mb-1">Input</span>
            <div className="w-18 h-18 rounded-2xl bg-[#1D4ED8] text-white text-3xl font-black flex items-center justify-center shadow-sm">
              {inputVal}
            </div>
          </div>

          <ArrowRight className="w-8 h-8 text-[#0F1E36]" />

          {/* Machine 1 */}
          <div className="px-6 py-4 rounded-2xl bg-[#FAF8F3] border-2 border-[#0F1E36] flex flex-col items-center">
            <span className="text-xs font-bold text-[#888888]">Operation 1</span>
            <span className="text-3xl font-black text-[#0F1E36]">{isInverse ? '÷ 3' : op1}</span>
          </div>

          <ArrowRight className="w-8 h-8 text-[#0F1E36]" />

          {/* Machine 2 */}
          <div className="px-6 py-4 rounded-2xl bg-[#FAF8F3] border-2 border-[#0F1E36] flex flex-col items-center">
            <span className="text-xs font-bold text-[#888888]">Operation 2</span>
            <span className="text-3xl font-black text-[#0F1E36]">{isInverse ? '- 4' : op2}</span>
          </div>

          <ArrowRight className="w-8 h-8 text-[#0F1E36]" />

          {/* Output */}
          <div className="flex flex-col items-center">
            <span className="font-extrabold text-sm text-[#0F1E36] mb-1">Output</span>
            <div className="w-18 h-18 rounded-2xl bg-[#16A34A] text-white text-3xl font-black flex items-center justify-center shadow-sm">
              {outputVal}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 pt-3 border-t border-[#E3DED4]">
          <span className="font-bold text-lg text-[#0F1E36]">Change Input:</span>
          <div className="flex gap-2">
            {[2, 3, 5, 7, 10].map((v) => (
              <button
                key={v}
                onClick={() => setInputVal(v)}
                className={`px-3 py-1.5 rounded-xl font-bold text-lg ${
                  inputVal === v ? 'bg-[#1D4ED8] text-white' : 'bg-[#FAF8F3] border border-[#E3DED4]'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
 * 5. ExpressionBuilder
 * ========================================================================= */
export const ExpressionBuilder: React.FC = () => {
  const [tokens, setTokens] = useState<string[]>(['3', 'x', '+', '5']);

  const addToken = (tok: string) => setTokens((t) => [...t, tok]);
  const removeLast = () => setTokens((t) => t.slice(0, -1));

  return (
    <div className="w-full flex flex-col items-center py-2 select-none">
      <div className="w-full max-w-2xl bg-white/70 border border-[#E3DED4] rounded-2xl p-6 shadow-sm flex flex-col items-center gap-4">
        {/* Token Expression Display */}
        <div className="min-h-[70px] w-full bg-[#FAF8F3] rounded-xl border border-[#E3DED4] p-3 flex items-center justify-center gap-2">
          {tokens.map((tok, i) => (
            <span
              key={i}
              className="px-4 py-2 bg-white border border-[#0F1E36] rounded-xl text-3xl font-black text-[#0F1E36] shadow-sm"
            >
              {tok}
            </span>
          ))}
        </div>

        {/* Keypad */}
        <div className="flex flex-wrap gap-2 justify-center">
          {['x', 'y', '2', '3', '5', '+', '-', '(', ')'].map((item) => (
            <button
              key={item}
              onClick={() => addToken(item)}
              className="w-14 h-14 bg-[#FAF8F3] hover:bg-[#E3DED4] border border-[#E3DED4] rounded-xl font-black text-2xl text-[#0F1E36] active:scale-95"
            >
              {item}
            </button>
          ))}
          <button
            onClick={removeLast}
            className="px-4 h-14 bg-red-100 border border-red-300 rounded-xl font-bold text-red-700 text-lg active:scale-95"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
 * 6. SequenceBuilder
 * ========================================================================= */
export const SequenceBuilder: React.FC<{ firstTerm?: number; diff?: number }> = ({
  firstTerm = 4,
  diff = 3,
}) => {
  const terms = Array.from({ length: 5 }, (_, i) => firstTerm + i * diff);

  return (
    <div className="w-full flex flex-col items-center py-2 select-none">
      <div className="w-full max-w-2xl bg-white/70 border border-[#E3DED4] rounded-2xl p-6 shadow-sm flex flex-col items-center gap-4">
        <div className="text-3xl font-black text-[#0F1E36]">
          nth term: <MathFormula latex={`${diff}n + ${firstTerm - diff}`} display={false} />
        </div>

        <div className="flex gap-4">
          {terms.map((t, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-xs font-bold text-[#888888]">Term {i + 1}</span>
              <div className="w-16 h-16 bg-[#1D4ED8] text-white rounded-2xl text-3xl font-black flex items-center justify-center shadow-sm">
                {t}
              </div>
              <span className="text-sm font-extrabold text-[#16A34A] mt-1">+{diff}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
 * 7. FormulaRearranger
 * ========================================================================= */
export const FormulaRearranger: React.FC = () => {
  const [step, setStep] = useState(0);

  const steps = [
    { formula: 'v = u + at', note: 'Start with equation of motion' },
    { formula: 'v - u = at', note: 'Subtract u from both sides' },
    { formula: 'a = \\frac{v - u}{t}', note: 'Divide both sides by t' },
  ];

  return (
    <div className="w-full flex flex-col items-center py-2 select-none">
      <div className="w-full max-w-2xl bg-white/70 border border-[#E3DED4] rounded-2xl p-6 shadow-sm flex flex-col items-center gap-4">
        <div className="text-3xl font-black text-[#1D4ED8] py-2">
          <MathFormula latex={steps[step].formula} />
        </div>

        <div className="text-xl font-bold text-[#0F1E36]">{steps[step].note}</div>

        <div className="flex gap-3">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="px-4 py-2 bg-[#FAF8F3] border border-[#E3DED4] disabled:opacity-40 rounded-xl font-bold"
          >
            Previous
          </button>
          <button
            onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
            disabled={step === steps.length - 1}
            className="px-5 py-2 bg-[#1D4ED8] text-white disabled:opacity-40 rounded-xl font-bold"
          >
            Next step
          </button>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
 * 8. AlgebraicFractionTool
 * ========================================================================= */
export const AlgebraicFractionTool: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center py-2 select-none">
      <div className="w-full max-w-2xl bg-white/70 border border-[#E3DED4] rounded-2xl p-6 shadow-sm flex flex-col items-center gap-4">
        <div className="text-3xl font-extrabold text-[#0F1E36]">
          <MathFormula latex="\\frac{6x^2}{2x} = \\frac{2x \\times 3x}{2x} = 3x" />
        </div>
        <div className="text-xl text-[#0F1E36]/90 font-bold text-center">
          Cancel the common factor of <span className="text-[#1D4ED8] font-black">2x</span> from numerator and denominator.
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
 * 9. SimultaneousEquationsGraph
 * ========================================================================= */
export const SimultaneousEquationsGraph: React.FC = () => {
  // Line 1: y = 2x - 1
  // Line 2: y = -x + 5
  // Intersection: 2x - 1 = -x + 5 => 3x = 6 => x = 2, y = 3
  return (
    <div className="w-full flex flex-col items-center py-2 select-none">
      <div className="w-full max-w-2xl bg-white/70 border border-[#E3DED4] rounded-2xl p-5 shadow-sm flex flex-col items-center">
        <svg viewBox="0 0 360 260" className="w-full max-w-md h-auto">
          {/* Grid lines */}
          {Array.from({ length: 9 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1="30"
              y1={30 + i * 25}
              x2="330"
              y2={30 + i * 25}
              stroke="#E3DED4"
              strokeWidth="1"
            />
          ))}
          {Array.from({ length: 13 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={30 + i * 25}
              y1="30"
              x2={30 + i * 25}
              y2="230"
              stroke="#E3DED4"
              strokeWidth="1"
            />
          ))}

          {/* Axes at (105, 180) */}
          <line x1="30" y1="180" x2="330" y2="180" stroke="#0F1E36" strokeWidth="2.5" />
          <line x1="105" y1="30" x2="105" y2="230" stroke="#0F1E36" strokeWidth="2.5" />

          {/* Line 1 (blue): y = 2x - 1 */}
          <line x1="55" y1="230" x2="205" y2="55" stroke="#1D4ED8" strokeWidth="3.5" />

          {/* Line 2 (orange): y = -x + 5 */}
          <line x1="55" y1="80" x2="255" y2="230" stroke="#EA580C" strokeWidth="3.5" />

          {/* Intersection point at x = 2, y = 3 => (105 + 50, 180 - 75) = (155, 105) */}
          <circle cx="155" cy="105" r="7" fill="#16A34A" stroke="#FFFFFF" strokeWidth="2" />
          <text x="170" y="100" fill="#16A34A" fontSize="18" fontWeight="bold">
            (2, 3)
          </text>
        </svg>

        <div className="flex gap-6 mt-3 text-xl font-bold">
          <span className="text-[#1D4ED8]">y = 2x - 1</span>
          <span className="text-[#EA580C]">y = -x + 5</span>
          <span className="text-[#16A34A]">Intersection: (2, 3)</span>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
 * 10. InequalityNumberLine
 * ========================================================================= */
export const InequalityNumberLine: React.FC<{
  minVal?: number;
  maxVal?: number;
  leftClosed?: boolean;
  rightClosed?: boolean;
}> = ({ minVal = -2, maxVal = 3, leftClosed = true, rightClosed = false }) => {
  return (
    <div className="w-full flex flex-col items-center py-2 select-none">
      <div className="w-full max-w-2xl bg-white/70 border border-[#E3DED4] rounded-2xl p-6 shadow-sm flex flex-col items-center gap-4">
        <div className="text-3xl font-extrabold text-[#0F1E36]">
          <MathFormula
            latex={`${minVal} ${leftClosed ? '\\le' : '<'} x ${rightClosed ? '\\le' : '<'} ${maxVal}`}
            display={false}
          />
        </div>

        <svg viewBox="0 0 500 120" className="w-full h-auto">
          {/* Axis */}
          <line x1="40" y1="70" x2="460" y2="70" stroke="#0F1E36" strokeWidth="3.5" />

          {/* Shaded interval */}
          <line x1="160" y1="70" x2="360" y2="70" stroke="#1D4ED8" strokeWidth="8" />

          {/* Left circle */}
          <circle
            cx="160"
            cy="70"
            r="9"
            fill={leftClosed ? '#1D4ED8' : '#FAF8F3'}
            stroke="#1D4ED8"
            strokeWidth="3.5"
          />
          <text x="160" y="105" textAnchor="middle" fill="#0F1E36" fontSize="20" fontWeight="bold">
            {minVal}
          </text>

          {/* Right circle */}
          <circle
            cx="360"
            cy="70"
            r="9"
            fill={rightClosed ? '#1D4ED8' : '#FAF8F3'}
            stroke="#1D4ED8"
            strokeWidth="3.5"
          />
          <text x="360" y="105" textAnchor="middle" fill="#0F1E36" fontSize="20" fontWeight="bold">
            {maxVal}
          </text>
        </svg>

        <div className="text-lg text-[#0F1E36]/80 font-bold">
          Solid dot = value included (≤ or ≥); Hollow dot = value excluded (&lt; or &gt;)
        </div>
      </div>
    </div>
  );
};
