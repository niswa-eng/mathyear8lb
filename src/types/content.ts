/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type StepKind = 
  | 'objectives'
  | 'concept'
  | 'worked'
  | 'interactive'
  | 'mistake'
  | 'vocab'
  | 'practice';

export type TextSize = 'small' | 'normal' | 'large';

export interface FigureBlock {
  type: 'figure';
  component: string;
  props: Record<string, any>;
  caption?: string;
}

export interface TextBlock {
  type: 'text';
  text: string;
  highlight?: boolean;
}

export interface KeytermBlock {
  type: 'keyterm';
  term: string;
  definition: string;
  example?: string;
}

export interface FormulaBlock {
  type: 'formula';
  latex: string;
  label?: string;
  explanation?: string;
}

export interface TableBlock {
  type: 'table';
  headers: string[];
  rows: (string | number)[][];
}

export interface ListBlock {
  type: 'list';
  items: string[];
  ordered?: boolean;
}

export interface BuildStepsBlock {
  type: 'buildSteps';
  steps: Block[];
}

export type Block = 
  | TextBlock 
  | KeytermBlock 
  | FormulaBlock 
  | TableBlock 
  | ListBlock 
  | FigureBlock 
  | BuildStepsBlock;

export interface PracticeQuestion {
  id: string;
  level?: 1 | 2 | 3; // 1: Basic, 2: Medium, 3: Challenge
  text: string;
  figure?: {
    component: string;
    props: Record<string, any>;
  };
  answer?: string;
  hint?: string;
  background?: 'blank' | 'dots' | 'squares' | 'lined' | 'graph';
}

export interface Step {
  id: string;
  title: string;
  kind: StepKind;
  practiceLevel?: 1 | 2 | 3;
  blocks?: Block[];
  practiceQuestions?: PracticeQuestion[];
}

export interface Subtopic {
  id: string;
  number: string;
  title: string;
  codes?: string[];
  steps: Step[];
}

export interface Unit {
  id: string;
  number: number;
  title: string;
  codes?: string[];
  accentColor?: string;
  subtopics: Subtopic[];
}
