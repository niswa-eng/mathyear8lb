/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Unit } from '../types/content';

export const unit5: Unit = {
  id: 'unit5',
  number: 5,
  title: '5. Angles and constructions',
  codes: ['8Gg.10', '8Gg.11', '8Gg.12'],
  accentColor: '#DC2626',
  subtopics: [
    {
      id: 'subtopic5_1',
      number: '5.1',
      title: 'Parallel lines',
      codes: ['8Gg.11'],
      steps: [
        {
          id: 'step5_1_1',
          title: 'Learning Objectives',
          kind: 'objectives',
          blocks: [
            {
              type: 'text',
              text: 'Recognise and describe angle properties on parallel lines: alternate, corresponding, and vertically opposite.',
            },
            {
              type: 'figure',
              component: 'AnglesTool',
              props: { mode: 'parallel' },
            },
          ],
        },
      ],
    },
    {
      id: 'subtopic5_2',
      number: '5.2',
      title: 'The exterior angle of a triangle',
      codes: ['8Gg.10'],
      steps: [
        {
          id: 'step5_2_1',
          title: 'Learning Objectives',
          kind: 'objectives',
          blocks: [
            {
              type: 'text',
              text: 'Derive and use the fact that the exterior angle of a triangle equals the sum of the two interior opposite angles.',
            },
            {
              type: 'formula',
              latex: 'd = a + b',
            },
          ],
        },
      ],
    },
    {
      id: 'subtopic5_3',
      number: '5.3',
      title: 'Constructions',
      codes: ['8Gg.12'],
      steps: [
        {
          id: 'step5_3_1',
          title: 'Learning Objectives',
          kind: 'objectives',
          blocks: [
            {
              type: 'text',
              text: 'Construct triangles, perpendicular bisectors, and angle bisectors using compass and straight edge.',
            },
            {
              type: 'figure',
              component: 'ConstructionTool',
              props: {},
            },
          ],
        },
      ],
    },
  ],
};
