/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Unit } from '../types/content';

export const unit8: Unit = {
  id: 'unit8',
  number: 8,
  title: '8. Shapes and symmetry',
  codes: ['8Gg.01', '8Gg.02', '8Gg.05', '8Gg.08', '8Gg.09'],
  accentColor: '#0D9488',
  subtopics: [
    {
      id: 'subtopic8_1',
      number: '8.1',
      title: 'Quadrilaterals and polygons',
      codes: ['8Gg.01', '8Gg.09'],
      steps: [
        {
          id: 'step8_1_1',
          title: 'Learning Objectives',
          kind: 'objectives',
          blocks: [
            {
              type: 'text',
              text: 'Identify hierarchy of quadrilaterals and understand symmetry in regular polygons.',
            },
            {
              type: 'figure',
              component: 'SymmetryTool',
              props: {},
            },
          ],
        },
      ],
    },
    {
      id: 'subtopic8_2',
      number: '8.2',
      title: 'The circumference of a circle',
      codes: ['8Gg.02'],
      steps: [
        {
          id: 'step8_2_1',
          title: 'Learning Objectives',
          kind: 'objectives',
          blocks: [
            {
              type: 'text',
              text: 'Understand π as ratio of circumference to diameter, and use C = πd = 2πr.',
            },
            {
              type: 'figure',
              component: 'CircleTool',
              props: { radius: 7 },
            },
          ],
        },
      ],
    },
    {
      id: 'subtopic8_3',
      number: '8.3',
      title: '3D shapes',
      codes: ['8Gg.05', '8Gg.08'],
      steps: [
        {
          id: 'step8_3_1',
          title: 'Learning Objectives',
          kind: 'objectives',
          blocks: [
            {
              type: 'text',
              text: 'Euler formula connects vertices, faces and edges: V - E + F = 2.',
            },
            {
              type: 'formula',
              latex: 'V - E + F = 2',
            },
            {
              type: 'figure',
              component: 'Solid3D',
              props: { shape: 'cuboid' },
            },
          ],
        },
      ],
    },
  ],
};
