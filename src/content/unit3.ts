/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Unit } from '../types/content';

export const unit3: Unit = {
  id: 'unit3',
  number: 3,
  title: '3. Place value and rounding',
  codes: ['8Np.01', '8Np.02'],
  accentColor: '#D97706',
  subtopics: [
    {
      id: 'subtopic3_1',
      number: '3.1',
      title: 'Multiplying and dividing by 0.1 and 0.01',
      codes: ['8Np.01'],
      steps: [
        {
          id: 'step3_1_1',
          title: 'Learning Objectives',
          kind: 'objectives',
          blocks: [
            {
              type: 'text',
              text: 'Use knowledge of place value to multiply and divide integers and decimals by 0.1 and 0.01.',
            },
            {
              type: 'figure',
              component: 'PlaceValueChart',
              props: {},
            },
          ],
        },
      ],
    },
    {
      id: 'subtopic3_2',
      number: '3.2',
      title: 'Rounding',
      codes: ['8Np.02'],
      steps: [
        {
          id: 'step3_2_1',
          title: 'Learning Objectives',
          kind: 'objectives',
          blocks: [
            {
              type: 'text',
              text: 'Round numbers to a given number of significant figures.',
            },
            {
              type: 'keyterm',
              term: 'Significant Figures',
              definition: 'The digits that carry meaningful precision, counted from the first non-zero digit.',
            },
            {
              type: 'formula',
              latex: '0.04586 \\approx 0.0459 \\quad (3\\text{ s.f.})',
            },
          ],
        },
      ],
    },
  ],
};
