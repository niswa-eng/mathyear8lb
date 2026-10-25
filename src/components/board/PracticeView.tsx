/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PracticeQuestion, TextSize } from '../../types/content';
import { MathFigure } from '../math-tools';
import { Grid, Square, AlignJustify, Hash, CircleDot } from 'lucide-react';

interface PracticeViewProps {
  questions: PracticeQuestion[];
  accentColor: string;
  isCompactMode?: boolean;
  textSize?: TextSize;
}

type BackgroundType = 'blank' | 'dots' | 'squares' | 'lined' | 'graph';

export const PracticeView: React.FC<PracticeViewProps> = ({
  questions,
  accentColor,
  isCompactMode = true,
  textSize = 'small',
}) => {
  const [selectedLevel, setSelectedLevel] = useState<1 | 2 | 3>(1);
  const [questionIndexByLevel, setQuestionIndexByLevel] = useState<Record<number, number>>({
    1: 0,
    2: 0,
    3: 0,
  });

  const [bgType, setBgType] = useState<BackgroundType>('squares');

  const filteredQuestions = questions.filter((q) => q.level === selectedLevel);
  const currentIndex = questionIndexByLevel[selectedLevel] || 0;
  const currentQ = filteredQuestions[currentIndex] || filteredQuestions[0];

  const handleSelectLevel = (lvl: 1 | 2 | 3) => {
    setSelectedLevel(lvl);
  };

  const nextQuestionInLevel = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setQuestionIndexByLevel((prev) => ({
        ...prev,
        [selectedLevel]: currentIndex + 1,
      }));
    }
  };

  const prevQuestionInLevel = () => {
    if (currentIndex > 0) {
      setQuestionIndexByLevel((prev) => ({
        ...prev,
        [selectedLevel]: currentIndex - 1,
      }));
    }
  };

  const bgClasses: Record<BackgroundType, string> = {
    blank: 'bg-grid-blank',
    dots: 'bg-grid-dots',
    squares: 'bg-grid-squares',
    lined: 'bg-grid-lined',
    graph: 'bg-grid-graph',
  };

  if (!currentQ) {
    return (
      <div className="w-full h-full flex items-center justify-center text-xl font-bold text-[#0F1E36]/60">
        Practice questions coming soon.
      </div>
    );
  }

  const questionTextClass =
    textSize === 'large'
      ? 'text-base md:text-lg font-bold text-[#0F1E36] leading-snug'
      : textSize === 'normal'
      ? 'text-sm md:text-base font-bold text-[#0F1E36] leading-snug'
      : 'text-xs md:text-sm font-bold text-[#0F1E36] leading-snug';

  return (
    <div className="w-full h-full flex flex-col p-3 md:p-4 overflow-hidden select-none">
      {/* Top Level Chips Bar */}
      <div className="flex items-center justify-between gap-1.5 flex-wrap pb-1.5 border-b border-[#E3DED4] shrink-0">
        <div className="flex items-center gap-1 sm:gap-1.5">
          {([1, 2, 3] as const).map((lvl) => {
            const label = lvl === 1 ? 'Level 1: Basic' : lvl === 2 ? 'Level 2: Medium' : 'Level 3: Challenge';
            const isSelected = selectedLevel === lvl;
            return (
              <button
                key={lvl}
                onClick={() => handleSelectLevel(lvl)}
                className={`h-7 sm:h-8 px-2 sm:px-3 rounded-xl font-bold text-xs transition-all active:scale-95 ${
                  isSelected
                    ? 'text-white shadow-xs'
                    : 'bg-white/80 text-[#0F1E36] border border-[#E3DED4]'
                }`}
                style={isSelected ? { backgroundColor: accentColor } : {}}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Question Counter in level if multiple */}
        {filteredQuestions.length > 1 && (
          <div className="flex items-center gap-1 sm:gap-1.5">
            <button
              onClick={prevQuestionInLevel}
              disabled={currentIndex === 0}
              className="h-6 sm:h-7 px-1.5 sm:px-2 rounded-lg bg-white border border-[#E3DED4] disabled:opacity-40 font-bold text-xs"
            >
              Prev Q
            </button>
            <span className="text-xs font-black text-[#0F1E36]">
              Q {currentIndex + 1} / {filteredQuestions.length}
            </span>
            <button
              onClick={nextQuestionInLevel}
              disabled={currentIndex === filteredQuestions.length - 1}
              className="h-6 sm:h-7 px-1.5 sm:px-2 rounded-lg bg-white border border-[#E3DED4] disabled:opacity-40 font-bold text-xs"
            >
              Next Q
            </button>
          </div>
        )}

        {/* Working Space Background Grid Switcher */}
        <div className="flex items-center gap-0.5 bg-white/80 border border-[#E3DED4] p-0.5 rounded-xl">
          <button
            onClick={() => setBgType('blank')}
            title="Blank background"
            aria-label="Blank"
            className={`p-1 sm:p-1.5 rounded-lg ${bgType === 'blank' ? 'bg-[#0F1E36] text-white' : 'text-[#0F1E36]'}`}
          >
            <Square className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>
          <button
            onClick={() => setBgType('dots')}
            title="Dot Grid"
            aria-label="Dot Grid"
            className={`p-1 sm:p-1.5 rounded-lg ${bgType === 'dots' ? 'bg-[#0F1E36] text-white' : 'text-[#0F1E36]'}`}
          >
            <CircleDot className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>
          <button
            onClick={() => setBgType('squares')}
            title="Square Grid"
            aria-label="Square Grid"
            className={`p-1 sm:p-1.5 rounded-lg ${bgType === 'squares' ? 'bg-[#0F1E36] text-white' : 'text-[#0F1E36]'}`}
          >
            <Grid className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>
          <button
            onClick={() => setBgType('lined')}
            title="Lined background"
            aria-label="Lined"
            className={`p-1 sm:p-1.5 rounded-lg ${bgType === 'lined' ? 'bg-[#0F1E36] text-white' : 'text-[#0F1E36]'}`}
          >
            <AlignJustify className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>
          <button
            onClick={() => setBgType('graph')}
            title="Graph Axes"
            aria-label="Graph Axes"
            className={`p-1 sm:p-1.5 rounded-lg ${bgType === 'graph' ? 'bg-[#0F1E36] text-white' : 'text-[#0F1E36]'}`}
          >
            <Hash className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Split: ~40% Question + Visual / ~60% Empty Working Space */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-3 pt-2 overflow-y-auto md:overflow-hidden min-h-0">
        {/* Left 40% (5 cols on md+): Question statement and optional figure */}
        <div className="col-span-1 md:col-span-5 flex flex-col justify-start pr-1 overflow-y-auto min-h-0">
          <div className="bg-white/80 border border-[#E3DED4] rounded-xl p-2.5 sm:p-3 shadow-2xs flex flex-col gap-1.5 sm:gap-2">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#888888]">
              {selectedLevel === 1 ? 'Level 1: Basic' : selectedLevel === 2 ? 'Level 2: Medium' : 'Level 3: Challenge'}
            </div>
            <div className={questionTextClass}>
              {currentQ.text}
            </div>

            {currentQ.figure && (
              <div className="w-full pt-1 max-h-[30vh]">
                <MathFigure
                  component={currentQ.figure.component}
                  props={currentQ.figure.props}
                />
              </div>
            )}
          </div>
        </div>

        {/* Right 60% (7 cols on md+): Working Canvas Area */}
        <div
          className={`col-span-1 md:col-span-7 h-full min-h-[220px] md:min-h-0 rounded-2xl border-2 border-[#E3DED4] relative overflow-hidden transition-all ${
            bgClasses[currentQ.background || bgType]
          }`}
        >
          {/* Subtle watermark in working space */}
          <div className="absolute top-2 right-3 pointer-events-none text-[11px] font-bold text-[#888888]/40 select-none">
            Working Space
          </div>
        </div>
      </div>
    </div>
  );
};
