/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Unit } from '../types/content';
import { unit0Demo } from './unit0_demo';
import { unit1 } from './unit1';
import { unit2 } from './unit2';
import { unit3 } from './unit3';
import { unit4 } from './unit4';
import { unit5 } from './unit5';
import { unit6 } from './unit6';
import { unit7 } from './unit7';
import { unit8 } from './unit8';
import { unit9, unit10, unit11, unit12, unit13, unit14, unit15 } from './unit9_to_15';

// All Registered Units (Adding a unit = create one file + one registry line)
export const units: Unit[] = [
  unit0Demo,
  unit1,
  unit2,
  unit3,
  unit4,
  unit5,
  unit6,
  unit7,
  unit8,
  unit9,
  unit10,
  unit11,
  unit12,
  unit13,
  unit14,
  unit15,
];

// Palette of distinct, accessible accent colors
const ACCENT_PALETTE = [
  '#1D4ED8', // Blue
  '#059669', // Emerald
  '#D97706', // Amber
  '#7C3AED', // Violet
  '#DC2626', // Red
  '#0284C7', // Sky
  '#EA580C', // Orange
  '#0D9488', // Teal
  '#2563EB', // Cobalt
  '#16A34A', // Forest
  '#4F46E5', // Indigo
  '#B45309', // Ochre
  '#9333EA', // Purple
  '#E11D48', // Rose
  '#0891B2', // Cyan
  '#475569', // Slate
];

export const getUnitAccentColor = (unit: Unit): string => {
  if (unit.accentColor) return unit.accentColor;
  return ACCENT_PALETTE[unit.number % ACCENT_PALETTE.length];
};

export const getUnitById = (id: string): Unit | undefined => {
  return units.find((u) => u.id === id);
};
