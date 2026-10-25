/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Unit, Subtopic, Step, TextSize } from '../../types/content';
import {
  ChevronDown,
  Maximize2,
  Minimize2,
  HelpCircle,
  Zap,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Type,
  Maximize,
} from 'lucide-react';

interface TopBarProps {
  units: Unit[];
  currentUnit: Unit;
  currentSubtopic: Subtopic;
  currentStep: Step;
  onSelectUnit: (unit: Unit) => void;
  onSelectSubtopic: (subtopic: Subtopic) => void;
  accentColor: string;
  onOpenHelp: () => void;
  animSpeed: 'normal' | 'slow' | 'off';
  onToggleAnimSpeed: () => void;
  isFitToScreen: boolean;
  onFitToScreen: () => void;
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  textSize: TextSize;
  onTextSizeChange: (size: TextSize) => void;
  onTextSizeDecrease: () => void;
  onTextSizeIncrease: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  units,
  currentUnit,
  currentSubtopic,
  currentStep,
  onSelectUnit,
  onSelectSubtopic,
  accentColor,
  onOpenHelp,
  animSpeed,
  onToggleAnimSpeed,
  isFitToScreen,
  onFitToScreen,
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  textSize,
  onTextSizeChange,
  onTextSizeDecrease,
  onTextSizeIncrease,
}) => {
  const [unitOpen, setUnitOpen] = useState(false);
  const [subtopicOpen, setSubtopicOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const unitRef = useRef<HTMLDivElement>(null);
  const subtopicRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (unitRef.current && !unitRef.current.contains(e.target as Node)) {
        setUnitOpen(false);
      }
      if (subtopicRef.current && !subtopicRef.current.contains(e.target as Node)) {
        setSubtopicOpen(false);
      }
    };
    document.addEventListener('pointerdown', handleOutside);
    return () => document.removeEventListener('pointerdown', handleOutside);
  }, []);

  // Sync fullscreen state
  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const formattedZoom = `${Math.round(zoomLevel * 100)}%`;

  const cycleTextSize = () => {
    if (textSize === 'small') onTextSizeChange('normal');
    else if (textSize === 'normal') onTextSizeChange('large');
    else onTextSizeChange('small');
  };

  return (
    <header className="h-[46px] md:h-[50px] shrink-0 bg-white/95 border-b border-[#E3DED4] px-1.5 sm:px-3 flex items-center justify-between gap-1 sm:gap-2 select-none z-40 relative">
      {/* 1. Brand Title Zone */}
      <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
        <span className="text-xs sm:text-sm md:text-base font-black text-[#0F1E36] tracking-tight whitespace-nowrap">
          <span className="hidden xs:inline">Maths Board</span>
          <span className="xs:hidden">MB</span>
        </span>
        <span
          className="text-[10px] sm:text-[11px] font-black px-1 sm:px-1.5 py-0.5 rounded text-white hidden md:inline"
          style={{ backgroundColor: accentColor }}
        >
          Stage 8
        </span>
      </div>

      {/* 2. Flexible Dropdowns: Unit & Topic (intelligently shrinks to never push tools off-screen) */}
      <div className="flex items-center gap-1 sm:gap-1.5 flex-1 min-w-0 max-w-[200px] sm:max-w-[280px] md:max-w-[380px] lg:max-w-[460px]">
        {/* Dropdown 1: Unit */}
        <div ref={unitRef} className="relative flex-1 min-w-0">
          <button
            onClick={() => {
              setUnitOpen(!unitOpen);
              setSubtopicOpen(false);
            }}
            aria-label="Select Unit"
            title={`Current Unit: ${currentUnit.title}`}
            className="w-full h-7 sm:h-8 px-1.5 sm:px-2 bg-[#FAF8F3] hover:bg-[#F2EFE8] border border-[#0F1E36]/30 rounded-lg flex items-center justify-between gap-1 active:scale-98 transition-all text-left"
          >
            <div className="flex items-center gap-1 min-w-0 overflow-hidden">
              <span className="text-[9px] font-black uppercase text-[#888888] hidden sm:inline shrink-0">Unit</span>
              <span className="text-[11px] sm:text-xs font-extrabold text-[#0F1E36] truncate">
                {currentUnit.title}
              </span>
            </div>
            <ChevronDown className={`w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 text-[#0F1E36] transition-transform ${unitOpen ? 'rotate-180' : ''}`} />
          </button>

          {unitOpen && (
            <div className="absolute top-[34px] sm:top-[38px] left-0 w-72 sm:w-80 max-h-[340px] overflow-y-auto bg-white border border-[#0F1E36] rounded-xl shadow-xl p-1 z-50 flex flex-col gap-0.5">
              {units.map((u) => {
                const isSelected = u.id === currentUnit.id;
                return (
                  <button
                    key={u.id}
                    onClick={() => {
                      onSelectUnit(u);
                      setUnitOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg font-bold text-xs transition-colors flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#0F1E36] text-white'
                        : 'hover:bg-[#FAF8F3] text-[#0F1E36]'
                    }`}
                  >
                    <span className="truncate">{u.title}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Dropdown 2: Subtopic */}
        <div ref={subtopicRef} className="relative flex-1 min-w-0">
          <button
            onClick={() => {
              setSubtopicOpen(!subtopicOpen);
              setUnitOpen(false);
            }}
            aria-label="Select Subtopic"
            title={`Current Topic: ${currentSubtopic ? `${currentSubtopic.number} ${currentSubtopic.title}` : ''}`}
            className="w-full h-7 sm:h-8 px-1.5 sm:px-2 bg-[#FAF8F3] hover:bg-[#F2EFE8] border border-[#0F1E36]/30 rounded-lg flex items-center justify-between gap-1 active:scale-98 transition-all text-left"
          >
            <div className="flex items-center gap-1 min-w-0 overflow-hidden">
              <span className="text-[9px] font-black uppercase text-[#888888] hidden sm:inline shrink-0">Topic</span>
              <span className="text-[11px] sm:text-xs font-extrabold text-[#0F1E36] truncate">
                {currentSubtopic ? `${currentSubtopic.number} ${currentSubtopic.title}` : 'Topic'}
              </span>
            </div>
            <ChevronDown className={`w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 text-[#0F1E36] transition-transform ${subtopicOpen ? 'rotate-180' : ''}`} />
          </button>

          {subtopicOpen && currentUnit.subtopics && (
            <div className="absolute top-[34px] sm:top-[38px] left-0 w-80 sm:w-88 max-h-[340px] overflow-y-auto bg-white border border-[#0F1E36] rounded-xl shadow-xl p-1 z-50 flex flex-col gap-0.5">
              {currentUnit.subtopics.map((st) => {
                const isSelected = currentSubtopic && st.id === currentSubtopic.id;
                return (
                  <button
                    key={st.id}
                    onClick={() => {
                      onSelectSubtopic(st);
                      setSubtopicOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg font-bold text-xs transition-colors flex flex-col ${
                      isSelected
                        ? 'bg-[#0F1E36] text-white'
                        : 'hover:bg-[#FAF8F3] text-[#0F1E36]'
                    }`}
                  >
                    <span className="font-extrabold truncate">
                      {st.number} {st.title}
                    </span>
                    {st.codes && st.codes.length > 0 && (
                      <span className={`text-[10px] ${isSelected ? 'text-white/70' : 'text-[#888888]'}`}>
                        {st.codes.join(', ')}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* 3. Action Zone: Text Size, Zoom In/Out, Fit Screen, Animation, Help, Fullscreen */}
      {/* Designed to stay strictly visible on ANY screen size */}
      <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
        {/* Text Size Control */}
        <div
          className="flex items-center bg-[#FAF8F3] border border-[#E3DED4] rounded-lg p-0.5 shadow-2xs"
          title="Adjust Text Size: A- (decrease) / Cycle / A+ (increase)"
        >
          <button
            onClick={onTextSizeDecrease}
            disabled={textSize === 'small'}
            aria-label="Decrease text size"
            title="Smaller text size ([)"
            className="w-5 h-6 sm:w-6 sm:h-7 rounded flex items-center justify-center text-[#0F1E36] hover:bg-[#E3DED4] disabled:opacity-30 active:scale-95 font-bold text-[10px] sm:text-xs"
          >
            A-
          </button>

          <button
            onClick={cycleTextSize}
            aria-label={`Current text size: ${textSize}. Tap to cycle.`}
            title={`Text Size: ${textSize.toUpperCase()} (Click to cycle)`}
            className="px-1 sm:px-1.5 h-6 sm:h-7 rounded font-extrabold text-[10px] sm:text-[11px] text-[#0F1E36] hover:bg-[#E3DED4] active:scale-95 flex items-center gap-0.5"
          >
            <Type className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#1D4ED8]" />
            <span className="capitalize">{textSize}</span>
          </button>

          <button
            onClick={onTextSizeIncrease}
            disabled={textSize === 'large'}
            aria-label="Increase text size"
            title="Larger text size (])"
            className="w-5 h-6 sm:w-6 sm:h-7 rounded flex items-center justify-center text-[#0F1E36] hover:bg-[#E3DED4] disabled:opacity-30 active:scale-95 font-bold text-[10px] sm:text-xs"
          >
            A+
          </button>
        </div>

        {/* Zoom Controls: Out, %/Reset, In */}
        <div
          className="flex items-center bg-[#FAF8F3] border border-[#E3DED4] rounded-lg p-0.5 shadow-2xs"
          title="Zoom Controls: - / Reset / +"
        >
          <button
            onClick={onZoomOut}
            disabled={zoomLevel <= 0.5}
            aria-label="Zoom out"
            title="Zoom Out (-)"
            className="w-5 h-6 sm:w-6 sm:h-7 rounded flex items-center justify-center text-[#0F1E36] hover:bg-[#E3DED4] disabled:opacity-30 active:scale-95"
          >
            <ZoomOut className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>

          <button
            onClick={onResetZoom}
            aria-label="Reset zoom to 100%"
            title="Reset Zoom to 100% (0)"
            className="px-1 sm:px-1.5 h-6 sm:h-7 rounded font-extrabold text-[10px] sm:text-[11px] text-[#0F1E36] hover:bg-[#E3DED4] active:scale-95 flex items-center gap-0.5"
          >
            <span>{formattedZoom}</span>
            {zoomLevel !== 1 && <RotateCcw className="w-2.5 h-2.5 text-[#1D4ED8]" />}
          </button>

          <button
            onClick={onZoomIn}
            disabled={zoomLevel >= 2.0}
            aria-label="Zoom in"
            title="Zoom In (+)"
            className="w-5 h-6 sm:w-6 sm:h-7 rounded flex items-center justify-center text-[#0F1E36] hover:bg-[#E3DED4] disabled:opacity-30 active:scale-95"
          >
            <ZoomIn className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>
        </div>

        {/* Fit to Screen Button */}
        <button
          onClick={onFitToScreen}
          title={isFitToScreen ? 'Fit to Screen: Active (100% on one screen)' : 'Click to Fit Content to Screen (0)'}
          aria-label="Fit to Screen"
          className={`h-6 sm:h-7 px-1.5 sm:px-2 rounded-lg border text-[11px] font-bold transition-all active:scale-95 flex items-center gap-1 shadow-2xs ${
            isFitToScreen
              ? 'bg-[#1D4ED8] text-white border-[#1D4ED8]'
              : 'bg-[#FAF8F3] text-[#0F1E36] border-[#E3DED4] hover:bg-[#F2EFE8]'
          }`}
        >
          <Maximize className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span className="font-extrabold hidden xs:inline">Fit</span>
        </button>

        {/* Animation Speed Toggle */}
        <button
          onClick={onToggleAnimSpeed}
          title={`Animation Speed: ${animSpeed}`}
          aria-label="Toggle animation speed"
          className="h-6 sm:h-7 px-1.5 rounded-lg bg-[#FAF8F3] border border-[#E3DED4] hover:bg-[#F2EFE8] flex items-center gap-0.5 font-bold text-xs text-[#0F1E36] active:scale-95"
        >
          <Zap className="w-3 h-3 text-[#D97706]" />
          <span className="capitalize hidden lg:inline text-[10px]">{animSpeed}</span>
        </button>

        {/* Usage Help Guide */}
        <button
          onClick={onOpenHelp}
          aria-label="Teacher help guide"
          title="Usage Help (?)"
          className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#FAF8F3] border border-[#E3DED4] hover:bg-[#F2EFE8] flex items-center justify-center text-[#0F1E36] active:scale-95"
        >
          <HelpCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        </button>

        {/* Fullscreen Button */}
        <button
          onClick={toggleFullscreen}
          aria-label="Toggle Fullscreen"
          title="Fullscreen (F)"
          className="h-6 sm:h-7 px-1.5 sm:px-2 rounded-lg bg-[#0F1E36] text-white flex items-center gap-1 text-[11px] font-bold active:scale-95 shadow-xs"
        >
          {isFullscreen ? <Minimize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <Maximize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
          <span className="hidden sm:inline text-[10px]">{isFullscreen ? 'Exit' : 'Full'}</span>
        </button>
      </div>
    </header>
  );
};
