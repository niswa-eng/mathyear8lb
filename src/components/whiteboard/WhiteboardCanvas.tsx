/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ToolType, Point, Stroke } from './types';

interface WhiteboardCanvasProps {
  isDrawMode: boolean;
  activeTool: ToolType;
  color: string;
  thickness: number;
  isDashed: boolean;
  strokes: Stroke[];
  onStrokesChange: (newStrokes: Stroke[]) => void;
  onUndoRedoAvailabilityChange?: (canUndo: boolean, canRedo: boolean) => void;
  undoTrigger?: number;
  redoTrigger?: number;
}

export const WhiteboardCanvas: React.FC<WhiteboardCanvasProps> = ({
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
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);
  const currentStrokeRef = useRef<Stroke | null>(null);
  const hasPenRef = useRef(false);

  // Undo / Redo stacks
  const [undoStack, setUndoStack] = useState<Stroke[][]>([]);
  const [redoStack, setRedoStack] = useState<Stroke[][]>([]);

  // Redraw canvas helper
  const renderAllStrokes = useCallback(
    (targetStrokes: Stroke[], previewStroke?: Stroke | null) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      ctx.clearRect(0, 0, width, height);

      const all = previewStroke ? [...targetStrokes, previewStroke] : targetStrokes;

      for (const stroke of all) {
        if (!stroke.points || stroke.points.length === 0) continue;

        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        if (stroke.tool === 'highlighter') {
          ctx.strokeStyle = stroke.color;
          ctx.globalAlpha = 0.38;
          ctx.lineWidth = stroke.thickness * 2.8;
        } else {
          ctx.strokeStyle = stroke.color;
          ctx.globalAlpha = 1.0;
          ctx.lineWidth = stroke.thickness;
        }

        if (stroke.dashed) {
          ctx.setLineDash([stroke.thickness * 2, stroke.thickness * 1.5]);
        } else {
          ctx.setLineDash([]);
        }

        const pts = stroke.points;
        const start = pts[0];

        if (stroke.tool === 'line' || stroke.tool === 'ruler') {
          const end = pts[pts.length - 1];
          let endX = end.x;
          let endY = end.y;

          // Snap to horizontal or vertical if close (< 12 degrees)
          const dx = endX - start.x;
          const dy = endY - start.y;
          const angle = Math.abs(Math.atan2(dy, dx) * (180 / Math.PI));
          if (angle < 12 || angle > 168) {
            endY = start.y; // snap horizontal
          } else if (Math.abs(angle - 90) < 12) {
            endX = start.x; // snap vertical
          }

          ctx.beginPath();
          ctx.moveTo(start.x, start.y);
          ctx.lineTo(endX, endY);
          ctx.stroke();

          // If ruler tool, draw tick marks along the line
          if (stroke.tool === 'ruler') {
            const length = Math.hypot(endX - start.x, endY - start.y);
            const numTicks = Math.floor(length / 20);
            const unitX = (endX - start.x) / length;
            const unitY = (endY - start.y) / length;
            const normX = -unitY;
            const normY = unitX;

            for (let t = 1; t <= numTicks; t++) {
              const tickDist = t * 20;
              const tx = start.x + unitX * tickDist;
              const ty = start.y + unitY * tickDist;
              const tickLen = t % 5 === 0 ? 14 : 7;
              ctx.beginPath();
              ctx.moveTo(tx, ty);
              ctx.lineTo(tx + normX * tickLen, ty + normY * tickLen);
              ctx.stroke();
            }
          }
        } else if (stroke.tool === 'rect') {
          const end = pts[pts.length - 1];
          const rx = Math.min(start.x, end.x);
          const ry = Math.min(start.y, end.y);
          const rw = Math.abs(end.x - start.x);
          const rh = Math.abs(end.y - start.y);
          ctx.beginPath();
          ctx.strokeRect(rx, ry, rw, rh);
        } else if (stroke.tool === 'circle') {
          const end = pts[pts.length - 1];
          const rx = (start.x + end.x) / 2;
          const ry = (start.y + end.y) / 2;
          const radiusX = Math.abs(end.x - start.x) / 2;
          const radiusY = Math.abs(end.y - start.y) / 2;
          ctx.beginPath();
          ctx.ellipse(rx, ry, radiusX, radiusY, 0, 0, Math.PI * 2);
          ctx.stroke();
        } else {
          // Smooth pen or highlighter curve
          if (pts.length === 1) {
            ctx.beginPath();
            ctx.arc(start.x, start.y, ctx.lineWidth / 2, 0, Math.PI * 2);
            ctx.fillStyle = ctx.strokeStyle;
            ctx.fill();
          } else {
            ctx.beginPath();
            ctx.moveTo(start.x, start.y);
            for (let i = 1; i < pts.length - 1; i++) {
              const xc = (pts[i].x + pts[i + 1].x) / 2;
              const yc = (pts[i].y + pts[i + 1].y) / 2;
              ctx.quadraticCurveTo(pts[i].x, pts[i].y, xc, yc);
            }
            ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
            ctx.stroke();
          }
        }

        ctx.restore();
      }
    },
    []
  );

  // Setup Canvas DPR & Resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
      renderAllStrokes(strokes);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [renderAllStrokes, strokes]);

  // Redraw when strokes change
  useEffect(() => {
    renderAllStrokes(strokes);
  }, [strokes, renderAllStrokes]);

  // Handle Undo
  useEffect(() => {
    if (undoTrigger && undoTrigger > 0) {
      if (strokes.length > 0) {
        const last = strokes[strokes.length - 1];
        const nextStrokes = strokes.slice(0, -1);
        setRedoStack((prev) => [...prev, [last]]);
        onStrokesChange(nextStrokes);
      }
    }
  }, [undoTrigger]);

  // Handle Redo
  useEffect(() => {
    if (redoTrigger && redoTrigger > 0) {
      if (redoStack.length > 0) {
        const item = redoStack[redoStack.length - 1];
        setRedoStack((prev) => prev.slice(0, -1));
        onStrokesChange([...strokes, ...item]);
      }
    }
  }, [redoTrigger]);

  // Erase stroke helper
  const eraseNearPoint = (x: number, y: number, radius = 24) => {
    const remaining = strokes.filter((stroke) => {
      return !stroke.points.some((p) => Math.hypot(p.x - x, p.y - y) <= radius + stroke.thickness);
    });

    if (remaining.length !== strokes.length) {
      setUndoStack((prev) => [...prev, strokes]);
      setRedoStack([]);
      onStrokesChange(remaining);
    }
  };

  // Pointer Events
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawMode) return;

    // Palm rejection
    if (e.pointerType === 'pen') {
      hasPenRef.current = true;
    } else if (hasPenRef.current && e.pointerType === 'touch') {
      return; // Reject touch when pen is used
    }

    if (!e.isPrimary) return; // Ignore secondary touches
    if (e.pointerType === 'touch' && (e.width > 35 || e.height > 35)) return; // Palm contact rejection

    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (!rect || rect.width === 0 || rect.height === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const internalW = canvas.width / dpr;
    const internalH = canvas.height / dpr;
    const x = ((e.clientX - rect.left) / rect.width) * internalW;
    const y = ((e.clientY - rect.top) / rect.height) * internalH;

    if (activeTool === 'eraser') {
      isDrawingRef.current = true;
      eraseNearPoint(x, y);
      return;
    }

    isDrawingRef.current = true;
    const newStroke: Stroke = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      tool: activeTool,
      color,
      thickness,
      dashed: isDashed,
      points: [{ x, y, pressure: e.pressure }],
    };

    currentStrokeRef.current = newStroke;
    renderAllStrokes(strokes, newStroke);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawMode || !isDrawingRef.current) return;
    if (!e.isPrimary) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (!rect || rect.width === 0 || rect.height === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const internalW = canvas.width / dpr;
    const internalH = canvas.height / dpr;
    const x = ((e.clientX - rect.left) / rect.width) * internalW;
    const y = ((e.clientY - rect.top) / rect.height) * internalH;

    if (activeTool === 'eraser') {
      eraseNearPoint(x, y);
      return;
    }

    const curr = currentStrokeRef.current;
    if (!curr) return;

    if (activeTool === 'line' || activeTool === 'rect' || activeTool === 'circle' || activeTool === 'ruler') {
      // Shape tools only keep start and latest point
      curr.points = [curr.points[0], { x, y }];
    } else {
      curr.points.push({ x, y, pressure: e.pressure });
    }

    renderAllStrokes(strokes, curr);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawMode || !isDrawingRef.current) return;

    isDrawingRef.current = false;
    const curr = currentStrokeRef.current;
    currentStrokeRef.current = null;

    if (activeTool !== 'eraser' && curr && curr.points.length > 0) {
      setUndoStack((prev) => [...prev, strokes]);
      setRedoStack([]);
      const updated = [...strokes, curr];
      onStrokesChange(updated);
      renderAllStrokes(updated);
    }
  };

  return (
    <canvas
      ref={canvasRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`absolute inset-0 w-full h-full select-none ${
        isDrawMode ? 'pointer-events-auto cursor-crosshair' : 'pointer-events-none'
      }`}
      style={{ touchAction: 'none' }}
    />
  );
};
