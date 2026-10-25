/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ToolType = 'pen' | 'highlighter' | 'eraser' | 'line' | 'rect' | 'circle' | 'ruler';

export interface Point {
  x: number;
  y: number;
  pressure?: number;
}

export interface Stroke {
  id: string;
  tool: ToolType;
  color: string;
  thickness: number;
  dashed?: boolean;
  points: Point[];
}

export type ToolbarPosition = 'left' | 'right' | 'bottom';
