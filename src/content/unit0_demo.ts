/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Unit } from '../types/content';

export const unit0Demo: Unit = {
  id: 'unit0',
  number: 0,
  title: '0. Demo: Board & Number Line',
  codes: ['DEMO.01'],
  accentColor: '#1D4ED8',
  subtopics: [
    {
      id: 'subtopic0_1',
      number: '0.1',
      title: 'Directed numbers in everyday life',
      codes: ['DEMO.01'],
      steps: [
        {
          id: 'step0_1_1',
          title: 'Real-Life Concept: Elevator Floors & Temperature',
          kind: 'concept',
          blocks: [
            {
              type: 'text',
              text: 'Think of an elevator in a tall shopping mall: Floor 0 is the ground street level. Floors +1, +2, +3 are above ground, while -1 and -2 are basement parking floors!',
            },
            {
              type: 'text',
              text: 'If you are on Floor +4 and take the elevator down 6 floors, where do you end up? 4 - 6 = -2 (Basement 2)!',
            },
            {
              type: 'keyterm',
              term: 'Directed Numbers',
              definition: 'Numbers that have both a size and a direction (positive is above/right; negative is below/left).',
              example: '+5°C is warm; -5°C is freezing cold.',
            },
            {
              type: 'figure',
              component: 'NumberLine',
              props: {
                min: -6,
                max: 6,
                step: 1,
                initialValue: 0,
                jumps: [
                  { from: 0, to: 4, label: '+4 floors', color: '#1D4ED8' },
                  { from: 4, to: -2, label: '-6 floors', color: '#DC2626' },
                ],
              },
              caption: 'Interactive Number Line: Visualizing 4 - 6 = -2',
            },
          ],
        },
        {
          id: 'step0_1_2',
          title: 'Worked Example: Bank Account Balance',
          kind: 'worked',
          blocks: [
            {
              type: 'text',
              text: 'Sam has $50 in his bank account. He buys a game for $70, then receives $30 for washing cars. What is his final balance?',
            },
            {
              type: 'buildSteps',
              steps: [
                {
                  type: 'text',
                  text: 'Step 1: Start with the initial deposit of $50.',
                },
                {
                  type: 'formula',
                  latex: '+50',
                },
                {
                  type: 'text',
                  text: 'Step 2: Spending $70 subtracts 70 (goes into negative balance/overdraft).',
                },
                {
                  type: 'formula',
                  latex: '50 - 70 = -20 \\text{ dollars (in debt)}',
                },
                {
                  type: 'text',
                  text: 'Step 3: Earning $30 adds 30 back to the account.',
                },
                {
                  type: 'formula',
                  latex: '-20 + 30 = +10 \\text{ dollars}',
                },
                {
                  type: 'text',
                  text: 'Conclusion: Sam now has a positive balance of +$10.',
                },
              ],
            },
          ],
        },
        {
          id: 'step0_1_3',
          title: 'Common Mistake & Pro Tip',
          kind: 'mistake',
          blocks: [
            {
              type: 'text',
              text: 'Common negative sign confusions to watch out for:',
            },
            {
              type: 'list',
              items: [
                'Subtracting a negative means ADDING: 5 - (-3) = 5 + 3 = 8 (removing a penalty makes you richer!).',
                'Adding a negative means SUBTRACTING: 7 + (-4) = 7 - 4 = 3.',
                'The further left on a number line, the SMALLER the number: -10 is smaller than -2.',
              ],
            },
            {
              type: 'keyterm',
              term: 'Walking on the Line Rule',
              definition: 'Face right for positive (+). Face left for negative (-). Walking backwards inverts the direction!',
            },
          ],
        },
        {
          id: 'step0_1_4',
          title: 'Exercise: Level 1 (Basic)',
          kind: 'practice',
          practiceLevel: 1,
          practiceQuestions: [
            {
              id: 'q0_1_1',
              level: 1,
              text: 'Calculate: a) 6 + (-9)    b) -4 + 7',
              hint: 'Move on the number line starting from the first number.',
              answer: 'a) -3,  b) 3',
            },
            {
              id: 'q0_1_2',
              level: 1,
              text: 'Calculate: a) 5 - (-4)    b) -3 - 5',
              hint: 'Subtracting a negative turns into adding (+).',
              answer: 'a) 9,  b) -8',
            },
            {
              id: 'q0_1_3',
              level: 1,
              text: 'Arrange these numbers from smallest to largest: -7,  3,  -1,  0,  -12,  5',
              hint: 'Most negative is furthest to the left.',
              answer: '-12, -7, -1, 0, 3, 5',
            },
          ],
        },
        {
          id: 'step0_1_5',
          title: 'Exercise: Level 2 (Real-World Scenarios)',
          kind: 'practice',
          practiceLevel: 2,
          practiceQuestions: [
            {
              id: 'q0_1_4',
              level: 2,
              text: 'At midnight, the temperature in Chicago was -6°C. By noon the next day, it rose by 11°C. What was the temperature at noon?',
              hint: 'Calculate -6 + 11.',
              answer: '+5°C (-6 + 11 = 5)',
            },
            {
              id: 'q0_1_5',
              level: 2,
              text: 'A diver is at 18 meters below sea level (-18 m). She ascends 7 meters toward the surface, then dives down 4 meters. What is her new depth?',
              hint: 'Calculate -18 + 7 - 4.',
              answer: '-15 meters (15 m below sea level)',
            },
            {
              id: 'q0_1_6',
              level: 2,
              text: 'An online store balance shows -$25. The owner deposits $60 and pays a shipping fee of $15. What is the new account balance?',
              hint: 'Calculate -25 + 60 - 15.',
              answer: '+$20 (-25 + 60 = 35; 35 - 15 = 20)',
            },
          ],
        },
        {
          id: 'step0_1_6',
          title: 'Exercise: Level 3 (Challenge & Problem Solving)',
          kind: 'practice',
          practiceLevel: 3,
          practiceQuestions: [
            {
              id: 'q0_1_7',
              level: 3,
              text: 'Find the missing number in the sequence: -15, -11, -7, ___, 1, 5.',
              hint: 'Find the constant difference being added each step (+4).',
              answer: '-3 (-7 + 4 = -3)',
            },
            {
              id: 'q0_1_8',
              level: 3,
              text: 'The temperature on Mount Everest drops by 2°C for every 300 meters of elevation gained. At Base Camp (5,300 m), the temperature is -5°C. Estimate the temperature at the summit (8,900 m).',
              hint: 'Elevation gain = 3600 m = 12 steps of 300 m. Temp drop = 12 × 2°C = 24°C drop.',
              answer: '-29°C (-5 - 24 = -29°C)',
            },
            {
              id: 'q0_1_9',
              level: 3,
              text: 'Evaluate: -2 - (-8) + (-5) - 3 + (-4) - (-10).',
              hint: 'Rewrite additions/subtractions first: -2 + 8 - 5 - 3 - 4 + 10.',
              answer: '4 ((-2 + 8 = 6) - 5 = 1 - 3 = -2 - 4 = -6 + 10 = 4)',
            },
          ],
        },
      ],
    },
  ],
};
