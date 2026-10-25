/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
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
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { ToolType, ToolbarPosition } from './types';

interface WhiteboardToolbarProps {
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

export const WhiteboardToolbar: React.FC<WhiteboardToolbarProps> = ({
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
  const [position, setPosition] = useState<ToolbarPosition>(() => {
    try {
      return (localStorage.getItem('mtb_tb_pos') as ToolbarPosition) || 'left';
    } catch {
      return 'left';
    }
  });

  const [collapsed, setCollapsed] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const switchPosition = (pos: ToolbarPosition) => {
    setPosition(pos);
    try {
      localStorage.setItem('mtb_tb_pos', pos);
    } catch {}
  };

  const posClasses = {
    left: 'left-2 bottom-16 flex-col',
    right: 'right-2 bottom-16 flex-col',
    bottom: 'bottom-16 left-1/2 -translate-x-1/2 flex-row',
  }[position];

  return (
    <>
      {/* Sleek, Micro-Sized Floating Whiteboard Widget */}
      <div
        className={`fixed z-50 flex items-center shadow-lg rounded-xl bg-white/95 backdrop-blur-md border border-[#0F1E36]/30 transition-all select-none p-1 ${posClasses}`}
      >
        {/* Draw / Interact Toggle Button (Ultra compact, 32px height) */}
        <div className="flex items-center gap-1">
          <button
            onClick={onToggleDrawMode}
            aria-label={isDrawMode ? 'Switch to Touch mode' : 'Switch to Draw mode'}
            title={isDrawMode ? 'Mode: Draw (Click for Touch)' : 'Mode: Touch (Click for Draw)'}
            className={`h-8 px-2.5 rounded-lg flex items-center gap-1.5 font-bold text-xs transition-all active:scale-95 ${
              isDrawMode
                ? 'bg-[#1D4ED8] text-white shadow-xs'
                : 'bg-[#FAF8F3] text-[#0F1E36] hover:bg-[#E3DED4]'
            }`}
          >
            {isDrawMode ? (
              <>
                <PenTool className="w-3.5 h-3.5" />
                <span className="font-extrabold uppercase text-[11px] tracking-wide">Draw</span>
              </>
            ) : (
              <>
                <Hand className="w-3.5 h-3.5 text-[#0F1E36]/80" />
                <span className="font-extrabold uppercase text-[11px] tracking-wide">Touch</span>
              </>
            )}
          </button>

          {/* Minimize / Expand arrow */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-6 h-8 rounded-lg flex items-center justify-center text-[#0F1E36]/60 hover:bg-[#FAF8F3] hover:text-[#0F1E36] active:scale-90"
            aria-label={collapsed ? 'Expand whiteboard tools' : 'Collapse whiteboard tools'}
            title={collapsed ? 'Expand tools' : 'Collapse tools'}
          >
            {position === 'bottom' ? (
              collapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />
            ) : collapsed ? (
              position === 'left' ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />
            ) : (
              position === 'left' ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Micro Tools Tray (only shown when expanded & Draw mode active) */}
        {!collapsed && isDrawMode && (
          <div
            className={`flex items-center gap-1 pt-1 border-t border-[#E3DED4] ${
              position === 'bottom' ? 'flex-row border-t-0 border-l pl-1.5 pt-0' : 'flex-col'
            }`}
          >
            {/* Primary Tools: Pen, Highlighter, Eraser */}
            <div className="flex gap-1 justify-center">
              <button
                onClick={() => onSelectTool('pen')}
                title="Pen"
                aria-label="Pen"
                className={`w-7 h-7 rounded-md flex items-center justify-center active:scale-95 ${
                  activeTool === 'pen' ? 'bg-[#0F1E36] text-white' : 'bg-[#FAF8F3] text-[#0F1E36] hover:bg-[#E3DED4]'
                }`}
              >
                <PenTool className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onSelectTool('highlighter')}
                title="Highlighter"
                aria-label="Highlighter"
                className={`w-7 h-7 rounded-md flex items-center justify-center active:scale-95 ${
                  activeTool === 'highlighter' ? 'bg-[#0F1E36] text-white' : 'bg-[#FAF8F3] text-[#0F1E36] hover:bg-[#E3DED4]'
                }`}
              >
                <Highlighter className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onSelectTool('eraser')}
                title="Eraser"
                aria-label="Eraser"
                className={`w-7 h-7 rounded-md flex items-center justify-center active:scale-95 ${
                  activeTool === 'eraser' ? 'bg-[#0F1E36] text-white' : 'bg-[#FAF8F3] text-[#0F1E36] hover:bg-[#E3DED4]'
                }`}
              >
                <Eraser className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Shapes: Line, Rect, Circle, Ruler */}
            <div className="flex gap-1 justify-center">
              <button
                onClick={() => onSelectTool('line')}
                title="Straight Line"
                aria-label="Straight Line"
                className={`w-6 h-6 rounded-md flex items-center justify-center active:scale-95 ${
                  activeTool === 'line' ? 'bg-[#1D4ED8] text-white' : 'bg-[#FAF8F3] text-[#0F1E36]'
                }`}
              >
                <Minus className="w-3 h-3 -rotate-45" />
              </button>

              <button
                onClick={() => onSelectTool('rect')}
                title="Rectangle"
                aria-label="Rectangle"
                className={`w-6 h-6 rounded-md flex items-center justify-center active:scale-95 ${
                  activeTool === 'rect' ? 'bg-[#1D4ED8] text-white' : 'bg-[#FAF8F3] text-[#0F1E36]'
                }`}
              >
                <Square className="w-3 h-3" />
              </button>

              <button
                onClick={() => onSelectTool('circle')}
                title="Circle"
                aria-label="Circle"
                className={`w-6 h-6 rounded-md flex items-center justify-center active:scale-95 ${
                  activeTool === 'circle' ? 'bg-[#1D4ED8] text-white' : 'bg-[#FAF8F3] text-[#0F1E36]'
                }`}
              >
                <CircleIcon className="w-3 h-3" />
              </button>

              <button
                onClick={() => onSelectTool('ruler')}
                title="Ruler line"
                aria-label="Ruler"
                className={`w-6 h-6 rounded-md flex items-center justify-center active:scale-95 ${
                  activeTool === 'ruler' ? 'bg-[#1D4ED8] text-white' : 'bg-[#FAF8F3] text-[#0F1E36]'
                }`}
              >
                <Ruler className="w-3 h-3" />
              </button>

              <button
                onClick={onToggleDashed}
                title="Dashed Line"
                aria-label="Dashed line toggle"
                className={`w-6 h-6 rounded-md flex items-center justify-center text-[9px] font-black active:scale-95 ${
                  isDashed ? 'bg-[#EA580C] text-white' : 'bg-[#FAF8F3] text-[#0F1E36]'
                }`}
              >
                - -
              </button>
            </div>

            {/* Colors: 6 micro dots */}
            <div className="grid grid-cols-3 gap-1 py-0.5">
              {COLORS.map((c) => (
                <button
                  key={c.value}
                  onClick={() => onSelectColor(c.value)}
                  title={c.label}
                  aria-label={c.label}
                  className={`w-5 h-5 rounded-full border transition-transform active:scale-90 ${
                    color === c.value ? 'scale-115 border-[#0F1E36] ring-1 ring-blue-400' : 'border-white'
                  }`}
                  style={{ backgroundColor: c.value }}
                />
              ))}
            </div>

            {/* Thickness: 3 sizes */}
            <div className="flex gap-1 items-center justify-center">
              {THICKNESSES.map((th) => (
                <button
                  key={th.value}
                  onClick={() => onSelectThickness(th.value)}
                  title={th.label}
                  aria-label={th.label}
                  className={`w-5 h-5 rounded-md flex items-center justify-center active:scale-95 ${
                    thickness === th.value ? 'bg-[#0F1E36] text-white' : 'bg-[#FAF8F3] text-[#0F1E36]'
                  }`}
                >
                  <span
                    className="rounded-full bg-current"
                    style={{ width: th.value / 2.5 + 2, height: th.value / 2.5 + 2 }}
                  />
                </button>
              ))}
            </div>

            {/* Actions: Undo, Redo, Clear */}
            <div className="flex gap-1 pt-1 border-t border-[#E3DED4]">
              <button
                onClick={onUndo}
                disabled={!canUndo}
                title="Undo (Ctrl+Z)"
                aria-label="Undo"
                className="w-6 h-6 rounded-md bg-[#FAF8F3] disabled:opacity-25 text-[#0F1E36] flex items-center justify-center active:scale-95"
              >
                <Undo2 className="w-3 h-3" />
              </button>
              <button
                onClick={onRedo}
                disabled={!canRedo}
                title="Redo (Ctrl+Y)"
                aria-label="Redo"
                className="w-6 h-6 rounded-md bg-[#FAF8F3] disabled:opacity-25 text-[#0F1E36] flex items-center justify-center active:scale-95"
              >
                <Redo2 className="w-3 h-3" />
              </button>
              <button
                onClick={() => setShowClearConfirm(true)}
                title="Clear screen ink"
                aria-label="Clear all ink"
                className="w-6 h-6 rounded-md bg-red-50 text-red-600 flex items-center justify-center active:scale-95"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>

            {/* Dock Position Toggles */}
            <div className="flex gap-1 text-[8px] text-[#888888] font-bold">
              {(['left', 'right', 'bottom'] as const).map((pos) => (
                <button
                  key={pos}
                  onClick={() => switchPosition(pos)}
                  className={`px-1 py-0.5 rounded uppercase ${
                    position === pos ? 'bg-[#0F1E36] text-white' : 'hover:bg-[#E3DED4]'
                  }`}
                >
                  {pos[0]}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Clear ink confirmation modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center p-4">
          <div className="bg-[#FAF8F3] border-2 border-[#DC2626] rounded-2xl p-5 max-w-sm w-full shadow-xl flex flex-col items-center gap-3 text-center select-none">
            <Trash2 className="w-10 h-10 text-[#DC2626]" />
            <div className="text-xl font-black text-[#0F1E36]">Clear drawings on this slide?</div>
            <div className="flex gap-3 w-full justify-center">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 rounded-xl bg-white border border-[#E3DED4] text-sm font-bold text-[#0F1E36] active:scale-95"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onClear();
                  setShowClearConfirm(false);
                }}
                className="px-4 py-2 rounded-xl bg-[#DC2626] text-white text-sm font-bold active:scale-95"
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
