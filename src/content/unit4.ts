/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Unit } from '../types/content';

export const unit4: Unit = {
  id: 'unit4',
  number: 4,
  title: '4. Decimals',
  codes: ['8Nf.04', '8Nf.06', '8Nf.07', '8Nf.08'],
  accentColor: '#7C3AED',
  subtopics: [
    {
      id: 'subtopic4_1',
      number: '4.1',
      title: 'Ordering decimals',
      codes: ['8Nf.06'],
      steps: [
        {
          id: 'step4_1_1',
          title: 'Learning Objectives',
          kind: 'objectives',
          blocks: [
            {
              type: 'text',
              text: 'Compare and order decimals and fractions using inequality symbols = ≠ > < ≤ and ≥.',
            },
            {
              type: 'figure',
              component: 'NumberLine',
              props: { min: 0, max: 1, step: 0.1, initialValue: 0.4 },
            },
          ],
        },
      ],
    },
    {
      id: 'subtopic4_2',
      number: '4.2',
      title: 'Multiplying decimals',
      codes: ['8Nf.07'],
      steps: [
        {
          id: 'step4_2_1',
          title: 'Learning Objectives',
          kind: 'objectives',
          blocks: [
            {
              type: 'text',
              text: 'Estimate and multiply decimals by integers and decimals.',
            },
            {
              type: 'formula',
              latex: '0.4 \\times 0.3 = 0.12',
            },
          ],
        },
      ],
    },
    {
      id: 'subtopic4_3',
      number: '4.3',
      title: 'Dividing by decimals',
      codes: ['8Nf.08'],
      steps: [
        {
          id: 'step4_3_1',
          title: 'Learning Objectives',
          kind: 'objectives',
          blocks: [
            {
              type: 'text',
              text: 'Estimate and divide decimals by numbers with one decimal place.',
            },
            {
              type: 'formula',
              latex: '4.8 \\div 0.6 = \\frac{4.8 \\times 10}{0.6 \\times 10} = 48 \\div 6 = 8',
            },
          ],
        },
      ],
    },
    {
      id: 'subtopic4_4',
      number: '4.4',
      title: 'Making decimal calculations easier',
      codes: ['8Nf.04'],
      steps: [
        {
          id: 'step4_4_1',
          title: 'Learning Objectives',
          kind: 'objectives',
          blocks: [
            {
              type: 'text',
              text: 'Use laws of arithmetic and order of operations to simplify calculations containing decimals.',
            },
          ],
        },
      ],
    },
  ],
};
