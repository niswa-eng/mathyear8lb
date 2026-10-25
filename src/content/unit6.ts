/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Unit } from '../types/content';

export const unit6: Unit = {
  id: 'unit6',
  number: 6,
  title: '6. Collecting data',
  codes: ['8Ss.01', '8Ss.02'],
  accentColor: '#0284C7',
  subtopics: [
    {
      id: 'subtopic6_1',
      number: '6.1',
      title: 'Data collection',
      codes: ['8Ss.01'],
      steps: [
        {
          id: 'step6_1_1',
          title: 'Learning Objectives',
          kind: 'objectives',
          blocks: [
            {
              type: 'text',
              text: 'Select, trial and justify data collection methods considering categorical, discrete and continuous data.',
            },
            {
              type: 'figure',
              component: 'DataTable',
              props: {},
            },
          ],
        },
      ],
    },
    {
      id: 'subtopic6_2',
      number: '6.2',
      title: 'Sampling',
      codes: ['8Ss.02'],
      steps: [
        {
          id: 'step6_2_1',
          title: 'Learning Objectives',
          kind: 'objectives',
          blocks: [
            {
              type: 'text',
              text: 'Understand advantages and disadvantages of different sampling methods and identify bias.',
            },
            {
              type: 'keyterm',
              term: 'Sample Bias',
              definition: 'When a sample does not fairly represent the entire target population.',
            },
          ],
        },
      ],
    },
  ],
};
