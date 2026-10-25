/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Step, Block, TextSize, PracticeQuestion } from '../../types/content';
import { MathFormula } from '../common/MathFormula';
import { MathFigure } from '../math-tools';
import { ChevronRight, BookOpen, Sparkles } from 'lucide-react';

interface StepRendererProps {
  step: Step;
  accentColor: string;
  isCompactMode?: boolean;
  textSize?: TextSize;
}

const KIND_LABELS: Record<string, string> = {
  concept: 'Concept & Theory',
  worked: 'Worked Example',
  interactive: 'Interactive Tool',
  mistake: 'Common Mistake',
  vocab: 'Key Vocabulary',
  objectives: 'Learning Objectives',
  practice: 'Practice Questions',
};

export const StepRenderer: React.FC<StepRendererProps> = ({
  step,
  accentColor,
  textSize = 'small',
}) => {
  // Heading styles based on text size
  const headingClass =
    textSize === 'large'
      ? 'text-lg md:text-xl font-black text-[#0F1E36] tracking-tight leading-snug'
      : textSize === 'normal'
      ? 'text-base md:text-lg font-black text-[#0F1E36] tracking-tight leading-snug'
      : 'text-sm md:text-base font-black text-[#0F1E36] tracking-tight leading-snug';

  const kindLabel =
    step.kind === 'practice' && step.practiceLevel
      ? step.practiceLevel === 1
        ? 'Exercise: Level 1 (Basic)'
        : step.practiceLevel === 2
        ? 'Exercise: Level 2 (Real-World)'
        : 'Exercise: Level 3 (Challenge)'
      : KIND_LABELS[step.kind] || 'Lesson Material';

  return (
    <article
      aria-label="Slide Material"
      className="w-full h-full flex flex-col min-h-0 select-none overflow-hidden"
    >
      {/* 1. Slide Material Header: Type Pill & Title */}
      <div className="h-8 md:h-9 px-2 sm:px-3 bg-white/95 border border-[#E3DED4] rounded-xl flex items-center justify-between gap-1 shrink-0 shadow-2xs mb-1.5 min-w-0">
        <div className="flex items-center gap-1.5 min-w-0 overflow-hidden">
          <div
            className="w-5 h-5 rounded-md flex items-center justify-center text-white shrink-0"
            style={{ backgroundColor: accentColor }}
          >
            <BookOpen className="w-3 h-3" />
          </div>
          <span
            className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded text-white shrink-0"
            style={{ backgroundColor: accentColor }}
          >
            {kindLabel}
          </span>
          <h1 className={`${headingClass} truncate`}>
            {step.title}
          </h1>
        </div>
      </div>

      {/* 2. Slide Material Card: Content Container */}
      <div className="flex-1 w-full h-full min-h-0 bg-white/90 border border-[#E3DED4] rounded-2xl p-2.5 sm:p-3.5 shadow-2xs overflow-y-auto flex flex-col gap-2">
        {step.kind === 'practice' && step.practiceQuestions ? (
          <RenderPracticeMaterial
            questions={step.practiceQuestions}
            accentColor={accentColor}
            textSize={textSize}
            practiceLevel={step.practiceLevel}
          />
        ) : (
          step.blocks?.map((block, idx) => (
            <RenderBlock
              key={idx}
              block={block}
              accentColor={accentColor}
              textSize={textSize}
            />
          ))
        )}
      </div>
    </article>
  );
};

/* =========================================================================
 * Practice Questions Material: Directly renders all questions on 1 slide
 * ========================================================================= */
const RenderPracticeMaterial: React.FC<{
  questions: PracticeQuestion[];
  accentColor: string;
  textSize: TextSize;
  practiceLevel?: 1 | 2 | 3;
}> = ({
  questions,
  accentColor,
  textSize,
  practiceLevel,
}) => {
  // Track which answers are revealed
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [showAllAnswers, setShowAllAnswers] = useState(false);

  const toggleAnswer = (id: string) => {
    setRevealedAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const levelInfo = practiceLevel === 1
    ? { title: 'Level 1: Basic Practice', desc: 'Direct fundamental questions to test understanding.', badgeColor: '#059669' }
    : practiceLevel === 2
    ? { title: 'Level 2: Real-World Scenarios', desc: 'Practical everyday situations using this math concept.', badgeColor: '#1D4ED8' }
    : practiceLevel === 3
    ? { title: 'Level 3: Challenge & Problem Solving', desc: 'Deeper puzzle and multi-step reasoning questions.', badgeColor: '#D97706' }
    : { title: 'Exercise & Practice', desc: 'Work through each question on the board to the right.', badgeColor: accentColor };

  const questionTextClass =
    textSize === 'large'
      ? 'text-sm md:text-base font-semibold text-[#0F1E36] leading-snug'
      : textSize === 'normal'
      ? 'text-xs md:text-sm font-semibold text-[#0F1E36] leading-snug'
      : 'text-xs font-semibold text-[#0F1E36] leading-snug';

  if (!questions || questions.length === 0) {
    return (
      <div className="p-4 text-center text-xs font-bold text-[#888888]">
        Practice questions coming soon.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2.5 pb-2">
      {/* Exercise Sub-header */}
      <div className="flex items-center justify-between gap-1 flex-wrap pb-1.5 border-b border-[#E3DED4]">
        <div className="flex items-center gap-1.5">
          <span
            className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded text-white"
            style={{ backgroundColor: levelInfo.badgeColor }}
          >
            {levelInfo.title}
          </span>
          <span className="text-[10px] text-[#888888] font-medium hidden sm:inline">
            {questions.length} Questions
          </span>
        </div>

        {/* Global Answer Toggle */}
        <button
          onClick={() => setShowAllAnswers(!showAllAnswers)}
          className="text-[10px] font-bold text-[#1D4ED8] hover:underline active:scale-95"
        >
          {showAllAnswers ? 'Hide All Answers' : 'Reveal All Answers'}
        </button>
      </div>

      <p className="text-[11px] text-[#0F1E36]/75 italic leading-tight">
        {levelInfo.desc} Solve on the Teacher's Board on the right.
      </p>

      {/* Directly Display All Questions in 1 Slide */}
      <div className="flex flex-col gap-2.5">
        {questions.map((q, idx) => {
          const isAnswerRevealed = showAllAnswers || Boolean(revealedAnswers[q.id || `q_${idx}`]);

          return (
            <div
              key={q.id || idx}
              className="bg-[#FAF8F3] border border-[#E3DED4] rounded-xl p-2.5 sm:p-3 flex flex-col gap-1.5 shadow-2xs transition-all hover:border-[#0F1E36]/20"
            >
              {/* Question Header & Prompt */}
              <div className="flex items-start gap-2">
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center font-black text-[11px] text-white shrink-0 mt-0.5"
                  style={{ backgroundColor: levelInfo.badgeColor }}
                >
                  {idx + 1}
                </span>

                <div className="flex-1 min-w-0">
                  <div className={questionTextClass}>
                    {q.text}
                  </div>

                  {/* Optional Figure / Diagram */}
                  {q.figure && (
                    <div className="w-full pt-1.5 max-h-[28vh] flex justify-center">
                      <MathFigure
                        component={q.figure.component}
                        props={q.figure.props}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Answer & Hint Reveal Tray */}
              <div className="flex items-center justify-between pt-1 border-t border-[#E3DED4]/60 mt-0.5 text-[10px]">
                {q.hint && (
                  <span className="text-[#888888] italic truncate pr-2">
                    Tip: {q.hint}
                  </span>
                )}

                {q.answer ? (
                  <div className="flex items-center gap-1.5 ml-auto">
                    {isAnswerRevealed ? (
                      <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-2 py-0.5 rounded font-extrabold flex items-center gap-1 animate-fade-in">
                        <span>Ans:</span>
                        <span>{q.answer}</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => toggleAnswer(q.id || `q_${idx}`)}
                        className="px-2 py-0.5 rounded bg-white border border-[#E3DED4] text-[#1D4ED8] hover:bg-[#F2EFE8] font-bold active:scale-95 transition-all"
                      >
                        Check Answer
                      </button>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* =========================================================================
 * Block Renderer for Theory / Concept / Formula / Interactive Tools
 * ========================================================================= */
const RenderBlock: React.FC<{
  block: Block;
  accentColor: string;
  textSize?: TextSize;
}> = ({ block, accentColor, textSize = 'small' }) => {
  const [revealedSteps, setRevealedSteps] = useState(1);

  switch (block.type) {
    case 'text': {
      const textClass =
        textSize === 'large'
          ? 'text-sm md:text-base font-medium text-[#0F1E36] leading-relaxed'
          : textSize === 'normal'
          ? 'text-xs md:text-sm font-medium text-[#0F1E36] leading-relaxed'
          : 'text-xs font-medium text-[#0F1E36] leading-relaxed';

      return <p className={textClass}>{block.text}</p>;
    }

    case 'keyterm': {
      const termTitleClass =
        textSize === 'large'
          ? 'text-base md:text-lg font-black tracking-tight leading-none'
          : textSize === 'normal'
          ? 'text-sm md:text-base font-black tracking-tight leading-none'
          : 'text-xs md:text-sm font-black tracking-tight leading-none';

      const defClass =
        textSize === 'large'
          ? 'text-xs md:text-sm font-semibold text-[#0F1E36] leading-snug'
          : 'text-xs font-semibold text-[#0F1E36] leading-snug';

      return (
        <div className="rounded-xl bg-[#FAF8F3] border border-[#E3DED4] shadow-2xs p-2.5 flex flex-col gap-1 my-0.5">
          <div className={termTitleClass} style={{ color: accentColor }}>
            {block.term}
          </div>
          <div className={defClass}>{block.definition}</div>
          {block.example && (
            <div className="text-[10px] md:text-[11px] text-[#0F1E36]/75 font-normal mt-0.5">
              Example: {block.example}
            </div>
          )}
        </div>
      );
    }

    case 'formula': {
      const formulaClass =
        textSize === 'large'
          ? 'text-lg md:text-xl'
          : textSize === 'normal'
          ? 'text-base md:text-lg'
          : 'text-sm md:text-base';

      return (
        <div className="rounded-xl bg-[#FAF8F3] border border-[#E3DED4] flex flex-col items-center justify-center shadow-2xs my-1 py-1.5 px-3 gap-0.5">
          {block.label && (
            <span className="text-[9px] font-black uppercase tracking-wider text-[#888888]">
              {block.label}
            </span>
          )}
          <div className={formulaClass}>
            <MathFormula latex={block.latex} />
          </div>
          {block.explanation && (
            <span className="text-[10px] md:text-[11px] text-[#0F1E36]/85 font-medium text-center">
              {block.explanation}
            </span>
          )}
        </div>
      );
    }

    case 'table': {
      const tableTextClass = 'text-xs font-semibold';

      return (
        <div className="overflow-x-auto my-1 bg-[#FAF8F3] rounded-lg border border-[#E3DED4] p-1.5">
          <table className={`w-full text-center ${tableTextClass}`}>
            <thead>
              <tr className="border-b border-[#0F1E36]">
                {block.headers.map((h, i) => (
                  <th key={i} className="py-1 px-2">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rI) => (
                <tr key={rI} className="border-b border-[#E3DED4] last:border-b-0">
                  {row.map((cell, cI) => (
                    <td key={cI} className="py-1 px-2">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    case 'list': {
      const listClass =
        textSize === 'large'
          ? 'text-xs md:text-sm'
          : 'text-xs';

      return (
        <ul className={`flex flex-col gap-1 font-medium text-[#0F1E36] pl-4 list-disc ${listClass}`}>
          {block.items.map((item, i) => (
            <li key={i} className="leading-snug">
              {item}
            </li>
          ))}
        </ul>
      );
    }

    case 'figure':
      return (
        <div className="my-1 w-full flex flex-col items-center justify-center max-h-[42vh] overflow-hidden">
          <MathFigure component={block.component} props={block.props} />
          {block.caption && (
            <span className="text-[10px] text-[#888888] font-bold mt-1">
              {block.caption}
            </span>
          )}
        </div>
      );

    case 'buildSteps':
      return (
        <div className="flex flex-col gap-1.5 my-1">
          {block.steps.slice(0, revealedSteps).map((stepBlock, sIdx) => (
            <div key={sIdx} className="animate-fade-in">
              <RenderBlock block={stepBlock} accentColor={accentColor} textSize={textSize} />
            </div>
          ))}

          {revealedSteps < block.steps.length && (
            <button
              onClick={() => setRevealedSteps((s) => s + 1)}
              className="self-start h-7 px-2.5 py-1 bg-[#1D4ED8] text-white rounded-lg font-bold text-xs flex items-center gap-1 active:scale-95 shadow-2xs mt-0.5"
            >
              Next step <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      );

    default:
      return null;
  }
};
