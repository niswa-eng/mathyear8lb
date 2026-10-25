/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Unit } from '../types/content';

export const unit7: Unit = {
  id: 'unit7',
  number: 7,
  title: '7. Fractions',
  codes: ['8Nf.01', '8Nf.02', '8Nf.03', '8Nf.04', '8Nf.06'],
  accentColor: '#EA580C',
  subtopics: [
    {
      id: 'subtopic7_1',
      number: '7.1',
      title: 'Fractions and recurring decimals',
      codes: ['8Nf.01'],
      steps: [
        {
          id: 'step7_1_1',
          title: 'Learning Objectives',
          kind: 'objectives',
          blocks: [
            {
              type: 'text',
              text: 'Recognise fractions that are equivalent to recurring decimals.',
            },
            {
              type: 'figure',
              component: 'RecurringDecimalTool',
              props: { fraction: '1/3' },
            },
          ],
        },
      ],
    },
    {
      id: 'subtopic7_2',
      number: '7.2',
      title: 'Ordering fractions',
      codes: ['8Nf.06'],
      steps: [
        {
          id: 'step7_2_1',
          title: 'Learning Objectives',
          kind: 'objectives',
          blocks: [
            {
              type: 'text',
              text: 'Compare and order fractions and mixed numbers using common denominators or decimals.',
            },
            {
              type: 'figure',
              component: 'FractionBar',
              props: { parts: 8, shaded: 5 },
            },
          ],
        },
      ],
    },
    {
      id: 'subtopic7_3',
      number: '7.3',
      title: 'Subtracting mixed numbers',
      codes: ['8Nf.02'],
      steps: [
        {
          id: 'step7_3_1',
          title: 'Learning Objectives',
          kind: 'objectives',
          blocks: [
            {
              type: 'text',
              text: 'Estimate and subtract mixed numbers and write answers in simplest form.',
            },
            {
              type: 'formula',
              latex: '3\\frac{1}{4} - 1\\frac{2}{3} = \\frac{13}{4} - \\frac{5}{3} = \\frac{39 - 20}{12} = \\frac{19}{12} = 1\\frac{7}{12}',
            },
          ],
        },
      ],
    },
    {
      id: 'subtopic7_4',
      number: '7.4',
      title: 'Multiplying an integer by a mixed number',
      codes: ['8Nf.03'],
      steps: [
        {
          id: 'step7_4_1',
          title: 'Learning Objectives',
          kind: 'objectives',
          blocks: [
            {
              type: 'text',
              text: 'Estimate and multiply an integer by a mixed number.',
            },
          ],
        },
      ],
    },
    {
      id: 'subtopic7_5',
      number: '7.5',
      title: 'Dividing an integer by a fraction',
      codes: ['8Nf.03'],
      steps: [
        {
          id: 'step7_5_1',
          title: 'Learning Objectives',
          kind: 'objectives',
          blocks: [
            {
              type: 'text',
              text: 'Divide an integer by a proper fraction using reciprocal multiplication.',
            },
            {
              type: 'formula',
              latex: '4 \\div \\frac{2}{3} = 4 \\times \\frac{3}{2} = \\frac{12}{2} = 6',
            },
          ],
        },
      ],
    },
    {
      id: 'subtopic7_6',
      number: '7.6',
      title: 'Making fraction calculations easier',
      codes: ['8Nf.04'],
      steps: [
        {
          id: 'step7_6_1',
          title: 'Learning Objectives',
          kind: 'objectives',
          blocks: [
            {
              type: 'text',
              text: 'Simplify complex fraction calculations using order of operations and factoring before multiplying.',
            },
          ],
        },
      ],
    },
  ],
};
