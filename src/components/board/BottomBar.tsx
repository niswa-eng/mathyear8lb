/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Step } from '../../types/content';
import { ToolType } from '../whiteboard/types';
import {
  ArrowLeft,
  ArrowRight,
  PenTool,
  Hand,
  Highlighter,
  Eraser,
  Undo2,
  Redo2,
  Trash2,
  Minus,
  Square,
  Circle as CircleIcon,
  Ruler,
} from 'lucide-react';

interface BottomBarProps {
  steps: Step[];
  currentStepIndex: number;
  onSelectStepIndex: (idx: number) => void;
  onPrev: () => void;
  onNext: () => void;
  accentColor: string;
  // Whiteboard tools
  isDrawMode: boolean;
  onToggleDrawMode: () => void;
  activeTool: ToolType;
  onSelectTool: (tool: ToolType) => void;
  color: string;
  onSelectColor: (c: string) => void;
  thickness: number;
  onSelectThickness: (t: number) => void;
  isDashed: boolean;
  onToggleDashed: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const COLORS = [
  { label: 'Navy', value: '#0F1E36' },
  { label: 'Blue', value: '#1D4ED8' },
  { label: 'Red', value: '#DC2626' },
  { label: 'Green', value: '#16A34A' },
  { label: 'Orange', value: '#EA580C' },
  { label: 'Purple', value: '#7C3AED' },
];

const THICKNESSES = [
  { label: 'Fine', value: 3 },
  { label: 'Medium', value: 7 },
  { label: 'Thick', value: 14 },
];

export const BottomBar: React.FC<BottomBarProps> = ({
  steps,
  currentStepIndex,
  onSelectStepIndex,
  onPrev,
  onNext,
  accentColor,
  isDrawMode,
  onToggleDrawMode,
  activeTool,
  onSelectTool,
  color,
  onSelectColor,
  thickness,
  onSelectThickness,
  isDashed,
  onToggleDashed,
  onUndo,
  onRedo,
  onClear,
  canUndo,
  canRedo,
}) => {
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const canPrev = currentStepIndex > 0;
  const canNext = currentStepIndex < steps.length - 1;
  const currentStep = steps[currentStepIndex];

  // Helper to pick a tool and ensure draw mode is on
  const handlePickTool = (tool: ToolType) => {
    onSelectTool(tool);
    if (!isDrawMode) {
      onToggleDrawMode();
    }
  };

  const handlePickColor = (c: string) => {
    onSelectColor(c);
    if (!isDrawMode) {
      onToggleDrawMode();
    }
  };

  // Reusable whiteboard toolset JSX
  const whiteboardToolsRibbon = (
    <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap sm:flex-nowrap shrink-0">
      {/* Mode Switch: Touch vs Draw */}
      <button
        onClick={onToggleDrawMode}
        aria-label={isDrawMode ? 'Switch to Touch mode' : 'Switch to Draw mode'}
        title={isDrawMode ? 'Mode: DRAWING (Click for Touch)' : 'Mode: TOUCH / INTERACT (Click for Draw)'}
        className={`h-6 sm:h-7 px-1.5 sm:px-2 rounded-lg flex items-center gap-1 font-bold text-xs transition-all active:scale-95 ${
          isDrawMode
            ? 'bg-[#1D4ED8] text-white shadow-xs'
            : 'bg-[#FAF8F3] text-[#0F1E36] border border-[#0F1E36]/30 hover:bg-[#E3DED4]'
        }`}
      >
        {isDrawMode ? (
          <>
            <PenTool className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className="font-extrabold uppercase text-[9px] sm:text-[10px] tracking-wide">Draw</span>
          </>
        ) : (
          <>
            <Hand className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#0F1E36]" />
            <span className="font-extrabold uppercase text-[9px] sm:text-[10px] tracking-wide">Touch</span>
          </>
        )}
      </button>

      <div className="h-3.5 w-px bg-[#E3DED4] mx-0.5 hidden xs:block" />

      {/* Primary Drawing Tools: Pen, Highlighter, Eraser */}
      <div className="flex items-center gap-0.5 bg-[#FAF8F3] p-0.5 rounded-lg border border-[#E3DED4]">
        <button
          onClick={() => handlePickTool('pen')}
          title="Pen (P)"
          aria-label="Pen"
          className={`w-5.5 h-5.5 sm:w-6 sm:h-6 rounded flex items-center justify-center active:scale-95 ${
            isDrawMode && activeTool === 'pen'
              ? 'bg-[#0F1E36] text-white shadow-xs'
              : 'text-[#0F1E36] hover:bg-[#E3DED4]'
          }`}
        >
          <PenTool className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        </button>

        <button
          onClick={() => handlePickTool('highlighter')}
          title="Highlighter"
          aria-label="Highlighter"
          className={`w-5.5 h-5.5 sm:w-6 sm:h-6 rounded flex items-center justify-center active:scale-95 ${
            isDrawMode && activeTool === 'highlighter'
              ? 'bg-[#0F1E36] text-white shadow-xs'
              : 'text-[#0F1E36] hover:bg-[#E3DED4]'
          }`}
        >
          <Highlighter className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        </button>

        <button
          onClick={() => handlePickTool('eraser')}
          title="Eraser (E)"
          aria-label="Eraser"
          className={`w-5.5 h-5.5 sm:w-6 sm:h-6 rounded flex items-center justify-center active:scale-95 ${
            isDrawMode && activeTool === 'eraser'
              ? 'bg-[#0F1E36] text-white shadow-xs'
              : 'text-[#0F1E36] hover:bg-[#E3DED4]'
          }`}
        >
          <Eraser className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        </button>
      </div>

      {/* Shape Tools: Straight Line, Rectangle, Circle, Ruler, Dashed Line */}
      <div className="flex items-center gap-0.5 bg-[#FAF8F3] p-0.5 rounded-lg border border-[#E3DED4]">
        <button
          onClick={() => handlePickTool('line')}
          title="Straight Line"
          aria-label="Straight Line"
          className={`w-5.5 h-5.5 sm:w-6 sm:h-6 rounded flex items-center justify-center active:scale-95 ${
            isDrawMode && activeTool === 'line'
              ? 'bg-[#1D4ED8] text-white'
              : 'text-[#0F1E36] hover:bg-[#E3DED4]'
          }`}
        >
          <Minus className="w-3 h-3 -rotate-45" />
        </button>

        <button
          onClick={() => handlePickTool('rect')}
          title="Rectangle"
          aria-label="Rectangle"
          className={`w-5.5 h-5.5 sm:w-6 sm:h-6 rounded flex items-center justify-center active:scale-95 ${
            isDrawMode && activeTool === 'rect'
              ? 'bg-[#1D4ED8] text-white'
              : 'text-[#0F1E36] hover:bg-[#E3DED4]'
          }`}
        >
          <Square className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
        </button>

        <button
          onClick={() => handlePickTool('circle')}
          title="Circle"
          aria-label="Circle"
          className={`w-5.5 h-5.5 sm:w-6 sm:h-6 rounded flex items-center justify-center active:scale-95 ${
            isDrawMode && activeTool === 'circle'
              ? 'bg-[#1D4ED8] text-white'
              : 'text-[#0F1E36] hover:bg-[#E3DED4]'
          }`}
        >
          <CircleIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
        </button>

        <button
          onClick={() => handlePickTool('ruler')}
          title="Ruler line with scale ticks"
          aria-label="Ruler"
          className={`w-5.5 h-5.5 sm:w-6 sm:h-6 rounded flex items-center justify-center active:scale-95 ${
            isDrawMode && activeTool === 'ruler'
              ? 'bg-[#1D4ED8] text-white'
              : 'text-[#0F1E36] hover:bg-[#E3DED4]'
          }`}
        >
          <Ruler className="w-3 h-3" />
        </button>

        <button
          onClick={onToggleDashed}
          title={isDashed ? 'Dashed Line: Active' : 'Dashed Line Toggle'}
          aria-label="Dashed line toggle"
          className={`w-5.5 h-5.5 sm:w-6 sm:h-6 rounded flex items-center justify-center text-[8px] sm:text-[9px] font-black active:scale-95 ${
            isDashed ? 'bg-[#EA580C] text-white' : 'text-[#0F1E36] hover:bg-[#E3DED4]'
          }`}
        >
          - -
        </button>
      </div>

      {/* 6 Ink Color Swatches */}
      <div className="flex items-center gap-0.5 sm:gap-1 px-1 bg-[#FAF8F3] py-0.5 rounded-lg border border-[#E3DED4]">
        {COLORS.map((c) => (
          <button
            key={c.value}
            onClick={() => handlePickColor(c.value)}
            title={`Color: ${c.label}`}
            aria-label={`Color: ${c.label}`}
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border transition-all active:scale-90 ${
              color === c.value
                ? 'scale-115 border-[#0F1E36] ring-2 ring-blue-500 shadow-2xs'
                : 'border-white hover:scale-105'
            }`}
            style={{ backgroundColor: c.value }}
          />
        ))}
      </div>

      {/* 3 Stroke Thicknesses */}
      <div className="flex items-center gap-0.5 bg-[#FAF8F3] p-0.5 rounded-lg border border-[#E3DED4]">
        {THICKNESSES.map((th) => (
          <button
            key={th.value}
            onClick={() => onSelectThickness(th.value)}
            title={`Stroke: ${th.label}`}
            aria-label={`Stroke: ${th.label}`}
            className={`w-4.5 h-5.5 sm:w-5 sm:h-6 rounded flex items-center justify-center active:scale-95 ${
              thickness === th.value ? 'bg-[#0F1E36] text-white' : 'text-[#0F1E36] hover:bg-[#E3DED4]'
            }`}
          >
            <span
              className="rounded-full bg-current"
              style={{ width: th.value / 3 + 2, height: th.value / 3 + 2 }}
            />
          </button>
        ))}
      </div>

      {/* Actions: Undo, Redo, Clear Ink */}
      <div className="flex items-center gap-0.5 bg-[#FAF8F3] p-0.5 rounded-lg border border-[#E3DED4]">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          title="Undo Stroke (Ctrl+Z)"
          aria-label="Undo"
          className="w-5.5 h-5.5 sm:w-6 sm:h-6 rounded disabled:opacity-25 text-[#0F1E36] hover:bg-[#E3DED4] flex items-center justify-center active:scale-95"
        >
          <Undo2 className="w-3 h-3" />
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo}
          title="Redo Stroke (Ctrl+Y)"
          aria-label="Redo"
          className="w-5.5 h-5.5 sm:w-6 sm:h-6 rounded disabled:opacity-25 text-[#0F1E36] hover:bg-[#E3DED4] flex items-center justify-center active:scale-95"
        >
          <Redo2 className="w-3 h-3" />
        </button>
        <button
          onClick={() => setShowClearConfirm(true)}
          title="Clear all ink on this slide"
          aria-label="Clear all ink"
          className="w-5.5 h-5.5 sm:w-6 sm:h-6 rounded text-red-600 hover:bg-red-50 flex items-center justify-center active:scale-95"
        >
          <Trash2 className="w-3 h-3" />
        </button>
      </div>
    </div>
  );

  // Reusable step navigation JSX
  const navigationSection = (
    <div className="flex items-center justify-between gap-1.5 w-full xl:w-auto">
      {/* Back Button */}
      <button
        onClick={onPrev}
        disabled={!canPrev}
        aria-label="Previous step"
        title="Previous Step (Left Arrow)"
        className="h-6 sm:h-7 px-2 sm:px-2.5 rounded-lg bg-[#FAF8F3] hover:bg-[#F2EFE8] border border-[#0F1E36]/30 disabled:opacity-30 flex items-center justify-center gap-1 font-extrabold text-[11px] sm:text-xs text-[#0F1E36] active:scale-95 transition-all shadow-2xs shrink-0"
      >
        <ArrowLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        <span className="hidden xs:inline">Back</span>
      </button>

      {/* Progress Indicators & Title */}
      <div className="flex items-center gap-1.5 flex-1 min-w-0 max-w-sm px-1">
        <div className="flex items-center gap-1 flex-1">
          {steps.map((step, idx) => {
            const isActive = idx === currentStepIndex;
            return (
              <button
                key={step.id || idx}
                onClick={() => onSelectStepIndex(idx)}
                aria-label={`Step ${idx + 1}: ${step.title}`}
                title={`${idx + 1}. ${step.title}`}
                className={`h-1.5 sm:h-2 rounded-full flex-1 transition-all active:scale-95 ${
                  isActive
                    ? 'shadow-xs ring-1 ring-offset-1 ring-[#0F1E36]'
                    : 'bg-[#E3DED4] hover:bg-[#D5CEBF]'
                }`}
                style={isActive ? { backgroundColor: accentColor } : {}}
              />
            );
          })}
        </div>

        <span className="text-[10px] sm:text-[11px] font-black text-[#0F1E36]/80 shrink-0 whitespace-nowrap">
          {currentStepIndex + 1}/{steps.length}
        </span>

        {currentStep?.title && (
          <span className="text-[10px] font-bold text-[#0F1E36]/60 truncate max-w-[120px] hidden md:inline">
            {currentStep.title}
          </span>
        )}
      </div>

      {/* Next Button */}
      <button
        onClick={onNext}
        disabled={!canNext}
        aria-label="Next step"
        title="Next Step (Right Arrow)"
        className="h-6 sm:h-7 px-2 sm:px-2.5 rounded-lg text-white disabled:opacity-30 flex items-center justify-center gap-1 font-extrabold text-[11px] sm:text-xs active:scale-95 transition-all shadow-2xs shrink-0"
        style={{ backgroundColor: accentColor }}
      >
        <span className="hidden xs:inline">Next</span>
        <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
      </button>
    </div>
  );

  return (
    <>
      <footer className="shrink-0 bg-white/95 border-t border-[#E3DED4] px-1.5 sm:px-3 py-1 select-none z-40 relative shadow-sm">
        {/* On wide screens (>= 1120px / xl): Single sleek horizontal row */}
        <div className="hidden xl:flex items-center justify-between gap-2 h-[42px]">
          {whiteboardToolsRibbon}
          <div className="h-4 w-px bg-[#E3DED4] mx-1" />
          <div className="flex-1 flex justify-end">
            {navigationSection}
          </div>
        </div>

        {/* On screens < 1120px (laptops, tablets, split screens, iframes):
            Two clean micro-rows so EVERY SINGLE TOOL IS DIRECTLY VISIBLE ON ONE SCREEN WITHOUT HORIZONTAL SCROLL! */}
        <div className="flex xl:hidden flex-col gap-1 w-full">
          {/* Row 1: All Drawing & Annotation Tools */}
          <div className="flex items-center justify-between gap-1 overflow-x-auto py-0.5 no-scrollbar">
            {whiteboardToolsRibbon}
          </div>

          {/* Row 2: Lesson Step Navigation */}
          <div className="pt-0.5 border-t border-[#E3DED4]/60">
            {navigationSection}
          </div>
        </div>
      </footer>

      {/* Clear ink confirmation modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center p-4">
          <div className="bg-[#FAF8F3] border-2 border-[#DC2626] rounded-2xl p-5 max-w-sm w-full shadow-xl flex flex-col items-center gap-3 text-center select-none">
            <Trash2 className="w-10 h-10 text-[#DC2626]" />
            <div className="text-lg font-black text-[#0F1E36]">Clear drawings on this slide?</div>
            <div className="flex gap-3 w-full justify-center">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 rounded-xl bg-white border border-[#E3DED4] text-xs font-bold text-[#0F1E36] active:scale-95"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onClear();
                  setShowClearConfirm(false);
                }}
                className="px-4 py-2 rounded-xl bg-[#DC2626] text-white text-xs font-bold active:scale-95"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
