/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { units, getUnitAccentColor } from './content';
import { Unit, Subtopic, Step, TextSize } from './types/content';
import { ToolType, Stroke } from './components/whiteboard/types';
import { TopBar } from './components/board/TopBar';
import { BottomBar } from './components/board/BottomBar';
import { StepRenderer } from './components/board/StepRenderer';
import { TeacherBoard, BoardBackground } from './components/board/TeacherBoard';
import { HelpModal } from './components/board/HelpModal';

export default function App() {
  // 1. Current Unit selection
  const [currentUnitId, setCurrentUnitId] = useState<string>(() => {
    try {
      return localStorage.getItem('mtb_unit_id') || 'unit0';
    } catch {
      return 'unit0';
    }
  });

  const currentUnit = useMemo(() => {
    return units.find((u) => u.id === currentUnitId) || units[0];
  }, [currentUnitId]);

  // 2. Current Subtopic selection
  const [currentSubtopicId, setCurrentSubtopicId] = useState<string>(() => {
    try {
      return localStorage.getItem(`mtb_subtopic_${currentUnitId}`) || currentUnit.subtopics[0]?.id || '';
    } catch {
      return currentUnit.subtopics[0]?.id || '';
    }
  });

  const currentSubtopic = useMemo(() => {
    const found = currentUnit.subtopics.find((st) => st.id === currentSubtopicId);
    return found || currentUnit.subtopics[0] || { id: 'empty', number: '0', title: 'Content', steps: [] };
  }, [currentUnit, currentSubtopicId]);

  // 3. Step index per subtopic memory
  const [stepIndexMap, setStepIndexMap] = useState<Record<string, number>>(() => {
    try {
      const raw = localStorage.getItem('mtb_step_indices');
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const currentStepIndex = stepIndexMap[currentSubtopic.id] ?? 0;
  const currentStep: Step = currentSubtopic.steps[currentStepIndex] || currentSubtopic.steps[0] || {
    id: 'placeholder',
    title: 'Content Coming Soon',
    kind: 'concept',
    blocks: [{ type: 'text', text: 'Lesson content for this subtopic will be added soon.' }],
  };

  const accentColor = getUnitAccentColor(currentUnit);

  // 4. Whiteboard state
  const [isDrawMode, setIsDrawMode] = useState(false);
  const [activeTool, setActiveTool] = useState<ToolType>('pen');
  const [color, setColor] = useState('#0F1E36');
  const [thickness, setThickness] = useState(7);
  const [isDashed, setIsDashed] = useState(false);
  const [undoCounter, setUndoCounter] = useState(0);
  const [redoCounter, setRedoCounter] = useState(0);

  // 5. Teacher's Board Background Grid (Squares/Math grid by default)
  const [boardBg, setBoardBg] = useState<BoardBackground>(() => {
    try {
      return (localStorage.getItem('mtb_board_bg') as BoardBackground) || 'squares';
    } catch {
      return 'squares';
    }
  });

  // Persistent strokes per screen
  const screenKey = `${currentUnit.id}-${currentSubtopic.id}-${currentStep.id}`;
  const [allStrokes, setAllStrokes] = useState<Record<string, Stroke[]>>(() => {
    try {
      const raw = localStorage.getItem('mtb_strokes');
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const currentStrokes = allStrokes[screenKey] || [];

  const handleStrokesChange = useCallback(
    (newStrokes: Stroke[]) => {
      setAllStrokes((prev) => {
        const next = { ...prev, [screenKey]: newStrokes };
        try {
          localStorage.setItem('mtb_strokes', JSON.stringify(next));
        } catch (e) {
          console.warn('Storage quota exceeded for strokes:', e);
        }
        return next;
      });
    },
    [screenKey]
  );

  const handleClearStrokes = useCallback(() => {
    handleStrokesChange([]);
  }, [handleStrokesChange]);

  // Unit and Subtopic handlers
  const handleSelectUnit = (unit: Unit) => {
    setCurrentUnitId(unit.id);
    const firstSubtopicId = unit.subtopics[0]?.id || '';
    setCurrentSubtopicId(firstSubtopicId);
    try {
      localStorage.setItem('mtb_unit_id', unit.id);
      localStorage.setItem(`mtb_subtopic_${unit.id}`, firstSubtopicId);
    } catch {}
  };

  const handleSelectSubtopic = (subtopic: Subtopic) => {
    setCurrentSubtopicId(subtopic.id);
    try {
      localStorage.setItem(`mtb_subtopic_${currentUnit.id}`, subtopic.id);
    } catch {}
  };

  const handleSelectStepIndex = (idx: number) => {
    const clamped = Math.max(0, Math.min(currentSubtopic.steps.length - 1, idx));
    setStepIndexMap((prev) => {
      const next = { ...prev, [currentSubtopic.id]: clamped };
      try {
        localStorage.setItem('mtb_step_indices', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      handleSelectStepIndex(currentStepIndex - 1);
    }
  };

  const handleNextStep = () => {
    if (currentStepIndex < currentSubtopic.steps.length - 1) {
      handleSelectStepIndex(currentStepIndex + 1);
    }
  };

  // Animation speed control
  const [animSpeed, setAnimSpeed] = useState<'normal' | 'slow' | 'off'>('normal');
  const toggleAnimSpeed = () => {
    setAnimSpeed((prev) => (prev === 'normal' ? 'slow' : prev === 'slow' ? 'off' : 'normal'));
  };

  // Teacher Help modal
  const [helpOpen, setHelpOpen] = useState(false);

  // Zoom Level state (0.5 to 2.0, default 1.0)
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);
  const [isFitToScreen, setIsFitToScreen] = useState<boolean>(true);

  const mainRef = useRef<HTMLElement | null>(null);
  const stageContentRef = useRef<HTMLDivElement | null>(null);

  const handleFitToScreen = useCallback(() => {
    setIsFitToScreen(true);
    setZoomLevel(1.0);
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, []);

  const handleZoomIn = () => {
    setIsFitToScreen(false);
    setZoomLevel((z) => Math.min(2.0, Math.round((z + 0.1) * 10) / 10));
  };

  const handleZoomOut = () => {
    setIsFitToScreen(false);
    setZoomLevel((z) => Math.max(0.5, Math.round((z - 0.1) * 10) / 10));
  };

  const handleResetZoom = () => {
    handleFitToScreen();
  };

  // Text Size state ('small' | 'normal' | 'large', default 'small' for sleek fit)
  const [textSize, setTextSize] = useState<TextSize>(() => {
    try {
      return (localStorage.getItem('mtb_text_size') as TextSize) || 'small';
    } catch {
      return 'small';
    }
  });

  const handleTextSizeChange = (size: TextSize) => {
    setTextSize(size);
    try {
      localStorage.setItem('mtb_text_size', size);
    } catch {}
  };

  const handleTextSizeDecrease = () => {
    if (textSize === 'large') handleTextSizeChange('normal');
    else if (textSize === 'normal') handleTextSizeChange('small');
  };

  const handleTextSizeIncrease = () => {
    if (textSize === 'small') handleTextSizeChange('normal');
    else if (textSize === 'normal') handleTextSizeChange('large');
  };

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if an input is active
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        handleNextStep();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        handlePrevStep();
      } else if (e.key === '+' || e.key === '=') {
        handleZoomIn();
      } else if (e.key === '-' || e.key === '_') {
        handleZoomOut();
      } else if (e.key === '0' || e.key === 'Escape') {
        handleFitToScreen();
      } else if (e.key === '[') {
        handleTextSizeDecrease();
      } else if (e.key === ']') {
        handleTextSizeIncrease();
      } else if (e.key === 'd' || e.key === 'D') {
        setIsDrawMode((prev) => !prev);
      } else if (e.key === 'e' || e.key === 'E') {
        setActiveTool('eraser');
        setIsDrawMode(true);
      } else if (e.key === 'p' || e.key === 'P') {
        setActiveTool('pen');
        setIsDrawMode(true);
      } else if (e.key === 'z' && (e.ctrlKey || e.metaKey)) {
        setUndoCounter((c) => c + 1);
      } else if (e.key === 'y' && (e.ctrlKey || e.metaKey)) {
        setRedoCounter((c) => c + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const effectiveScale = zoomLevel;

  return (
    <div
      className="fixed inset-0 w-full h-full max-h-[100dvh] flex flex-col bg-[#FAF8F3] text-[#0F1E36] overflow-hidden select-none"
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* 1. Top Navigation Bar */}
      <TopBar
        units={units}
        currentUnit={currentUnit}
        currentSubtopic={currentSubtopic}
        currentStep={currentStep}
        onSelectUnit={handleSelectUnit}
        onSelectSubtopic={handleSelectSubtopic}
        accentColor={accentColor}
        onOpenHelp={() => setHelpOpen(true)}
        animSpeed={animSpeed}
        onToggleAnimSpeed={toggleAnimSpeed}
        isFitToScreen={isFitToScreen}
        onFitToScreen={handleFitToScreen}
        zoomLevel={zoomLevel}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onResetZoom={handleResetZoom}
        textSize={textSize}
        onTextSizeChange={handleTextSizeChange}
        onTextSizeDecrease={handleTextSizeDecrease}
        onTextSizeIncrease={handleTextSizeIncrease}
      />

      {/* 2. Main Stage with Whiteboard Overlay & Synchronized Auto-Fit Zoom */}
      <main
        ref={mainRef}
        className={`flex-1 relative flex flex-col min-h-0 bg-[#FAF8F3] ${
          effectiveScale > 1.0 ? 'overflow-auto' : 'overflow-hidden'
        }`}
      >
        <div
          ref={stageContentRef}
          className="w-full h-full relative flex flex-col min-h-0 origin-top"
          style={
            effectiveScale !== 1.0
              ? {
                  transform: `scale(${effectiveScale})`,
                  transformOrigin: 'top center',
                  width: effectiveScale < 1 ? `${100 / effectiveScale}%` : '100%',
                  height: effectiveScale < 1 ? `${100 / effectiveScale}%` : '100%',
                  minHeight: effectiveScale > 1 ? `${100 * effectiveScale}%` : '100%',
                  transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
                }
              : {
                  width: '100%',
                  height: '100%',
                }
          }
        >
          {/* 2-Part Slide Layout: Left = Material, Right = Teacher's Board */}
          <div className="w-full h-full flex flex-col md:flex-row gap-2 sm:gap-3 p-1.5 sm:p-2.5 min-h-0 overflow-hidden">
            {/* PART 1 (LEFT SIDE): Lesson Material */}
            <div
              className={`w-full md:w-1/2 h-full flex flex-col min-h-0 overflow-hidden transition-opacity ${
                animSpeed === 'slow' ? 'duration-500' : animSpeed === 'off' ? 'duration-0' : 'duration-200'
              }`}
            >
              <StepRenderer
                step={currentStep}
                accentColor={accentColor}
                isCompactMode={true}
                textSize={textSize}
              />
            </div>

            {/* PART 2 (RIGHT SIDE): Teacher's Board for Notes & Scratchpad */}
            <div className="w-full md:w-1/2 h-full flex flex-col min-h-0 overflow-hidden">
              <TeacherBoard
                boardBg={boardBg}
                onSelectBoardBg={(bg) => {
                  setBoardBg(bg);
                  try {
                    localStorage.setItem('mtb_board_bg', bg);
                  } catch {}
                }}
                onClearBoard={handleClearStrokes}
                hasStrokes={currentStrokes.length > 0}
                accentColor={accentColor}
                isDrawMode={isDrawMode}
                onToggleDrawMode={() => setIsDrawMode((prev) => !prev)}
                activeTool={activeTool}
                color={color}
                thickness={thickness}
                isDashed={isDashed}
                strokes={currentStrokes}
                onStrokesChange={handleStrokesChange}
                undoTrigger={undoCounter}
                redoTrigger={redoCounter}
              />
            </div>
          </div>
        </div>

      </main>

      {/* 3. Unified Bottom Bar: All Whiteboard Tools & Step Navigation Visible on One Screen */}
      <BottomBar
        steps={currentSubtopic.steps}
        currentStepIndex={currentStepIndex}
        onSelectStepIndex={handleSelectStepIndex}
        onPrev={handlePrevStep}
        onNext={handleNextStep}
        accentColor={accentColor}
        isDrawMode={isDrawMode}
        onToggleDrawMode={() => setIsDrawMode((prev) => !prev)}
        activeTool={activeTool}
        onSelectTool={(tool) => {
          setActiveTool(tool);
          setIsDrawMode(true);
        }}
        color={color}
        onSelectColor={setColor}
        thickness={thickness}
        onSelectThickness={setThickness}
        isDashed={isDashed}
        onToggleDashed={() => setIsDashed((prev) => !prev)}
        onUndo={() => setUndoCounter((c) => c + 1)}
        onRedo={() => setRedoCounter((c) => c + 1)}
        onClear={handleClearStrokes}
        canUndo={currentStrokes.length > 0}
        canRedo={false}
      />

      {/* 4. Teacher Help Modal (hidden until "?" is tapped) */}
      <HelpModal isOpen={helpOpen} onClose={() => setHelpOpen(false)} />
    </div>
  );
}
