/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { WhiteboardCanvas } from '../whiteboard/WhiteboardCanvas';
import { ToolType, Stroke } from '../whiteboard/types';
import {
  Square,
  AlignJustify,
  Grid,
  Hash,
  CircleDot,
  Trash2,
  PenTool,
} from 'lucide-react';

export type BoardBackground = 'blank' | 'dots' | 'squares' | 'lined' | 'graph';

interface TeacherBoardProps {
  boardBg: BoardBackground;
  onSelectBoardBg: (bg: BoardBackground) => void;
  onClearBoard: () => void;
  hasStrokes: boolean;
  accentColor: string;
  isDrawMode: boolean;
  onToggleDrawMode?: () => void;
  activeTool: ToolType;
  color: string;
  thickness: number;
  isDashed: boolean;
  strokes: Stroke[];
  onStrokesChange: (strokes: Stroke[]) => void;
  undoTrigger?: number;
  redoTrigger?: number;
}

export const TeacherBoard: React.FC<TeacherBoardProps> = ({
  boardBg,
  onSelectBoardBg,
  onClearBoard,
  hasStrokes,
  accentColor,
  isDrawMode,
  activeTool,
  color,
  thickness,
  isDashed,
  strokes,
  onStrokesChange,
  undoTrigger,
  redoTrigger,
}) => {
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const bgClasses: Record<BoardBackground, string> = {
    blank: 'bg-grid-blank',
    dots: 'bg-grid-dots',
    squares: 'bg-grid-squares',
    lined: 'bg-grid-lined',
    graph: 'bg-grid-graph',
  };

  return (
    <section
      aria-label="Teacher's Board: Notes and Scratchpad"
      className="w-full h-full flex flex-col min-h-0 select-none"
    >
      {/* 1. Header Bar: Board Title & Paper Grid Switcher */}
      <div className="h-8 md:h-9 px-2 sm:px-3 bg-white/95 border border-[#E3DED4] rounded-xl flex items-center justify-between gap-1 shrink-0 shadow-2xs mb-1.5">
        {/* Left: Brand / Title */}
        <div className="flex items-center gap-1.5 min-w-0">
          <div
            className="w-5 h-5 rounded-md flex items-center justify-center text-white shrink-0"
            style={{ backgroundColor: accentColor }}
          >
            <PenTool className="w-3 h-3" />
          </div>
          <span className="font-black text-xs md:text-sm text-[#0F1E36] tracking-tight whitespace-nowrap">
            Teacher's Board
          </span>
          <span className="text-[10px] text-[#888888] font-bold hidden lg:inline whitespace-nowrap">
            Notes & Scratchpad
          </span>
        </div>

        {/* Right: Background Grid Pattern Switcher & Clear Button */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Background Grid Buttons */}
          <div className="flex items-center gap-0.5 bg-[#FAF8F3] border border-[#E3DED4] p-0.5 rounded-lg shadow-2xs">
            <button
              onClick={() => onSelectBoardBg('squares')}
              title="Square Math Grid Paper (default for math)"
              aria-label="Square Grid Paper"
              className={`p-1 rounded transition-all active:scale-95 ${
                boardBg === 'squares' ? 'bg-[#0F1E36] text-white shadow-2xs' : 'text-[#0F1E36] hover:bg-[#E3DED4]'
              }`}
            >
              <Grid className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>

            <button
              onClick={() => onSelectBoardBg('lined')}
              title="Lined / Ruled Paper (great for writing notes & proofs)"
              aria-label="Lined Paper"
              className={`p-1 rounded transition-all active:scale-95 ${
                boardBg === 'lined' ? 'bg-[#0F1E36] text-white shadow-2xs' : 'text-[#0F1E36] hover:bg-[#E3DED4]'
              }`}
            >
              <AlignJustify className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>

            <button
              onClick={() => onSelectBoardBg('dots')}
              title="Dot Grid Paper"
              aria-label="Dot Grid Paper"
              className={`p-1 rounded transition-all active:scale-95 ${
                boardBg === 'dots' ? 'bg-[#0F1E36] text-white shadow-2xs' : 'text-[#0F1E36] hover:bg-[#E3DED4]'
              }`}
            >
              <CircleDot className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>

            <button
              onClick={() => onSelectBoardBg('blank')}
              title="Plain White Board"
              aria-label="Plain White Board"
              className={`p-1 rounded transition-all active:scale-95 ${
                boardBg === 'blank' ? 'bg-[#0F1E36] text-white shadow-2xs' : 'text-[#0F1E36] hover:bg-[#E3DED4]'
              }`}
            >
              <Square className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>

            <button
              onClick={() => onSelectBoardBg('graph')}
              title="Coordinate Graph Axes Paper"
              aria-label="Graph Axes Paper"
              className={`p-1 rounded transition-all active:scale-95 ${
                boardBg === 'graph' ? 'bg-[#0F1E36] text-white shadow-2xs' : 'text-[#0F1E36] hover:bg-[#E3DED4]'
              }`}
            >
              <Hash className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
          </div>

          {/* Quick Clear Board Button */}
          <button
            onClick={() => setShowClearConfirm(true)}
            disabled={!hasStrokes}
            title="Clear notes on this board"
            aria-label="Clear notes"
            className="h-6 sm:h-7 px-1.5 sm:px-2 rounded-lg bg-[#FAF8F3] hover:bg-red-50 border border-[#E3DED4] disabled:opacity-30 text-red-600 flex items-center gap-1 font-bold text-[11px] active:scale-95 shadow-2xs"
          >
            <Trash2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className="hidden sm:inline">Clear</span>
          </button>
        </div>
      </div>

      {/* 2. Board Canvas Surface */}
      <div
        className={`flex-1 w-full h-full min-h-[220px] md:min-h-0 rounded-2xl border-2 border-[#D5CEBF] relative overflow-hidden shadow-xs transition-colors ${
          bgClasses[boardBg]
        }`}
      >
        {/* Subtle Watermark */}
        <div className="absolute top-2 right-3 pointer-events-none text-[11px] font-black text-[#888888]/30 select-none uppercase tracking-wider">
          Teacher Scratchpad
        </div>

        {/* Dedicated Whiteboard Canvas Layer */}
        <WhiteboardCanvas
          isDrawMode={isDrawMode}
          activeTool={activeTool}
          color={color}
          thickness={thickness}
          isDashed={isDashed}
          strokes={strokes}
          onStrokesChange={onStrokesChange}
          undoTrigger={undoTrigger}
          redoTrigger={redoTrigger}
        />
      </div>

      {/* Clear Notes Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center p-4">
          <div className="bg-[#FAF8F3] border-2 border-[#DC2626] rounded-2xl p-5 max-w-sm w-full shadow-xl flex flex-col items-center gap-3 text-center select-none">
            <Trash2 className="w-10 h-10 text-[#DC2626]" />
            <div className="text-lg font-black text-[#0F1E36]">Clear notes on this board?</div>
            <p className="text-xs text-[#0F1E36]/70">This will erase handwriting and sketches made on this slide.</p>
            <div className="flex gap-3 w-full justify-center mt-1">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 rounded-xl bg-white border border-[#E3DED4] text-xs font-bold text-[#0F1E36] active:scale-95"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onClearBoard();
                  setShowClearConfirm(false);
                }}
                className="px-4 py-2 rounded-xl bg-[#DC2626] text-white text-xs font-bold active:scale-95"
              >
                Clear Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
