/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Unit } from '../types/content';

export const unit2: Unit = {
  id: 'unit2',
  number: 2,
  title: '2. Expressions formulae and equations',
  codes: ['8Ae.03', '8Ae.04', '8Ae.05', '8Ae.06', '8Ae.07'],
  accentColor: '#059669',
  subtopics: [
    /* =========================================================================
     * 2.1 Constructing expressions
     * ========================================================================= */
    {
      id: 'subtopic2_1',
      number: '2.1',
      title: 'Constructing expressions',
      codes: ['8Ae.04'],
      steps: [
        {
          id: 'step2_1_1',
          title: 'Real-Life Concept: Taxi Fares & Shopping Baskets',
          kind: 'concept',
          blocks: [
            {
              type: 'text',
              text: 'In real life, we often have variable quantities. A taxi ride costs a $5 flat booking fee, plus $2 for every kilometer (k) driven. The total fare is written as the algebraic expression: 5 + 2k.',
            },
            {
              type: 'text',
              text: 'If you travel 10 km: 5 + 2(10) = $25. Algebra is just a shorthand way to write everyday rules without having to repeat the whole sentence every time!',
            },
            {
              type: 'keyterm',
              term: 'Algebraic Expression',
              definition: 'A mathematical phrase containing numbers, operation signs, and letters (variables) representing unknown values. Does NOT have an equals sign.',
              example: '3n - 4,  2x + 7,  x / 2',
            },
            {
              type: 'figure',
              component: 'ExpressionBuilder',
              props: {},
              caption: 'Interactive Expression Builder: Combine terms and coefficients visually',
            },
          ],
        },
        {
          id: 'step2_1_2',
          title: 'Worked Example: Cinema Ticket Order',
          kind: 'worked',
          blocks: [
            {
              type: 'text',
              text: 'A group of friends goes to the cinema. Adult tickets cost $12 each (a), child tickets cost $8 each (c), and they buy one family popcorn tub for $6. Write an expression for the total cost, then evaluate it for 3 adults and 4 children.',
            },
            {
              type: 'buildSteps',
              steps: [
                {
                  type: 'text',
                  text: 'Step 1: Write terms for adults, children, and popcorn.',
                },
                {
                  type: 'formula',
                  latex: '\\text{Cost} = 12a + 8c + 6',
                },
                {
                  type: 'text',
                  text: 'Step 2: Substitute a = 3 and c = 4.',
                },
                {
                  type: 'formula',
                  latex: '12(3) + 8(4) + 6 = 36 + 32 + 6 = 74',
                },
                {
                  type: 'text',
                  text: 'Conclusion: The total cost for 3 adults and 4 children is $74.',
                },
              ],
            },
          ],
        },
        {
          id: 'step2_1_3',
          title: 'Common Mistake & Pro Tip',
          kind: 'mistake',
          blocks: [
            {
              type: 'text',
              text: 'Translating everyday words into algebra: watch for these common traps:',
            },
            {
              type: 'list',
              items: [
                '"5 less than x" means x - 5, NOT 5 - x. (Think: 5 less than 20 is 20 - 5 = 15).',
                '"x squared" is x², whereas "2 times x" is 2x. (If x = 5, 2x = 10, but x² = 25).',
                'In algebra, we write 4 × y as 4y without the multiplication symbol.',
              ],
            },
          ],
        },
        {
          id: 'step2_1_4',
          title: 'Exercise: Level 1 (Basic)',
          kind: 'practice',
          practiceLevel: 1,
          practiceQuestions: [
            {
              id: 'q2_1_1',
              level: 1,
              text: 'Write an algebraic expression for each: a) 7 more than x    b) 4 times y    c) z divided by 3',
              hint: 'More than = (+), times = write together, divided = fraction.',
              answer: 'a) x + 7,  b) 4y,  c) z/3',
            },
            {
              id: 'q2_1_2',
              level: 1,
              text: 'Evaluate the expression 3m + 5 when: a) m = 4    b) m = 10',
              hint: 'Substitute the value of m and follow order of operations (BIDMAS).',
              answer: 'a) 17 (3×4 + 5 = 17),  b) 35 (3×10 + 5 = 35)',
            },
            {
              id: 'q2_1_3',
              level: 1,
              text: 'Simplify by combining like terms: 5x + 3y + 2x - y',
              hint: 'Combine x terms together (5x + 2x) and y terms together (3y - y).',
              answer: '7x + 2y',
            },
          ],
        },
        {
          id: 'step2_1_5',
          title: 'Exercise: Level 2 (Real-World Scenarios)',
          kind: 'practice',
          practiceLevel: 2,
          practiceQuestions: [
            {
              id: 'q2_1_4',
              level: 2,
              text: 'A music streaming subscription costs $10 per month plus $1.50 per downloaded album track (t). Write an expression for the monthly bill, then find the cost if Liam downloads 8 tracks.',
              hint: 'Total = 10 + 1.50t. Substitute t = 8.',
              answer: '10 + 1.5t; Cost = $22 (10 + 1.5×8 = $22)',
            },
            {
              id: 'q2_1_5',
              level: 2,
              text: 'A rectangle has length (x + 4) cm and width x cm. Write an expression in simplest form for the perimeter of the rectangle.',
              hint: 'Perimeter = 2 × length + 2 × width = 2(x + 4) + 2x.',
              answer: '4x + 8 cm',
            },
            {
              id: 'q2_1_6',
              level: 2,
              text: 'Mia is y years old. Her brother Ethan is 3 years older than Mia, and their father is 4 times as old as Ethan. Write an expression for the father\'s age in terms of y.',
              hint: 'Ethan = y + 3. Father = 4 × (y + 3).',
              answer: '4(y + 3) or 4y + 12 years old',
            },
          ],
        },
        {
          id: 'step2_1_6',
          title: 'Exercise: Level 3 (Challenge & Problem Solving)',
          kind: 'practice',
          practiceLevel: 3,
          practiceQuestions: [
            {
              id: 'q2_1_7',
              level: 3,
              text: 'Three consecutive integers can be written as n, n + 1, and n + 2. Write an expression for their sum in simplest form, and show that their sum is always a multiple of 3.',
              hint: 'Add: n + (n + 1) + (n + 2) = 3n + 3 = 3(n + 1).',
              answer: '3n + 3 = 3(n + 1), which has a factor of 3 so it is always a multiple of 3.',
            },
            {
              id: 'q2_1_8',
              level: 3,
              text: 'A plumber charges a call-out fee of $C plus an hourly rate of $R for h hours. Job 1 took 2 hours and cost $140. Job 2 took 5 hours and cost $290. Find the call-out fee C and the hourly rate R.',
              hint: 'Difference in cost: 3 hours = $150 → R = $50/hr. Then C = 140 - 2(50).',
              answer: 'C = $40 (call-out fee) and R = $50 per hour',
            },
            {
              id: 'q2_1_9',
              level: 3,
              text: 'If p = 3 and q = -2, evaluate the expression: (2p² - 3q) / (p + q).',
              hint: 'p² = 9, so 2(9) = 18. -3(-2) = +6. Numerator = 24. Denominator = 3 + (-2) = 1.',
              answer: '24 (24 ÷ 1 = 24)',
            },
          ],
        },
      ],
    },

    /* =========================================================================
     * 2.2 Using expressions and formulae
     * ========================================================================= */
    {
      id: 'subtopic2_2',
      number: '2.2',
      title: 'Using expressions and formulae',
      codes: ['8Ae.05'],
      steps: [
        {
          id: 'step2_2_1',
          title: 'Real-Life Concept: Cooking Times & Road Trips',
          kind: 'concept',
          blocks: [
            {
              type: 'text',
              text: 'A formula is a mathematical rule connecting two or more real-world variables with an equals sign (=).',
            },
            {
              type: 'text',
              text: '1. Cooking roast chicken: Time (minutes) T = 20w + 30, where w is weight in kg.',
            },
            {
              type: 'text',
              text: '2. Road trip: Distance d = s × t (speed × time). If speed = 80 km/h and time = 2.5 hours, distance = 80 × 2.5 = 200 km.',
            },
            {
              type: 'keyterm',
              term: 'Subject of a Formula',
              definition: 'The single variable written on its own on the left side of the equals sign.',
              example: 'In s = d/t, s is the subject. We can rearrange to make d = s × t.',
            },
            {
              type: 'figure',
              component: 'FormulaRearranger',
              props: {},
              caption: 'Interactive Formula Rearranger: Use inverse operations step-by-step',
            },
          ],
        },
        {
          id: 'step2_2_2',
          title: 'Worked Example: Rearranging Perimeter',
          kind: 'worked',
          blocks: [
            {
              type: 'text',
              text: 'The perimeter of a fence is P = 2l + 2w. Rearrange the formula to make width (w) the subject, then find w when P = 46 m and l = 15 m.',
            },
            {
              type: 'buildSteps',
              steps: [
                {
                  type: 'text',
                  text: 'Step 1: Subtract 2l from both sides to isolate the 2w term.',
                },
                {
                  type: 'formula',
                  latex: 'P - 2l = 2w',
                },
                {
                  type: 'text',
                  text: 'Step 2: Divide both sides by 2.',
                },
                {
                  type: 'formula',
                  latex: 'w = \\frac{P - 2l}{2}',
                },
                {
                  type: 'text',
                  text: 'Step 3: Substitute P = 46 and l = 15.',
                },
                {
                  type: 'formula',
                  latex: 'w = \\frac{46 - 2(15)}{2} = \\frac{46 - 30}{2} = \\frac{16}{2} = 8\\text{ m}',
                },
              ],
            },
          ],
        },
        {
          id: 'step2_2_3',
          title: 'Common Mistake & Pro Tip',
          kind: 'mistake',
          blocks: [
            {
              type: 'text',
              text: 'When rearranging formulas, always use reverse BIDMAS (SADMEP):',
            },
            {
              type: 'list',
              items: [
                'First undo additions and subtractions outside the target term.',
                'Then undo multiplications and divisions.',
                'Whatever you do to the left side, you MUST do to the right side to keep it balanced!',
              ],
            },
          ],
        },
        {
          id: 'step2_2_4',
          title: 'Exercise: Level 1 (Basic)',
          kind: 'practice',
          practiceLevel: 1,
          practiceQuestions: [
            {
              id: 'q2_2_1',
              level: 1,
              text: 'Use the formula v = u + at to find v when u = 5, a = 3, and t = 4.',
              hint: 'Multiply a × t first, then add u.',
              answer: 'v = 17 (5 + 3×4 = 17)',
            },
            {
              id: 'q2_2_2',
              level: 1,
              text: 'Rearrange y = 4x + 3 to make x the subject.',
              hint: 'Subtract 3 first, then divide by 4.',
              answer: 'x = (y - 3) / 4',
            },
            {
              id: 'q2_2_3',
              level: 1,
              text: 'The area of a triangle is A = (b × h) / 2. Find A when b = 12 cm and h = 7 cm.',
              hint: 'Multiply base by height, then divide by 2.',
              answer: 'A = 42 cm² (12 × 7 ÷ 2 = 42)',
            },
          ],
        },
        {
          id: 'step2_2_5',
          title: 'Exercise: Level 2 (Real-World Scenarios)',
          kind: 'practice',
          practiceLevel: 2,
          practiceQuestions: [
            {
              id: 'q2_2_4',
              level: 2,
              text: 'The formula for converting Celsius (C) to Fahrenheit (F) is F = 1.8C + 32. If a weather app displays 68°F, what is the temperature in °C?',
              hint: 'Substitute F = 68: 68 = 1.8C + 32. Subtract 32, then divide by 1.8.',
              answer: '20°C (68 - 32 = 36; 36 ÷ 1.8 = 20)',
            },
            {
              id: 'q2_2_5',
              level: 2,
              text: 'A car rental company uses the formula C = 45d + 0.25m, where d is days rented and m is miles driven. Noah rents a car for 3 days and drives 240 miles. What is the total rental cost?',
              hint: 'Calculate 45(3) + 0.25(240).',
              answer: '$195 (135 + 60 = 195)',
            },
            {
              id: 'q2_2_6',
              level: 2,
              text: 'Rearrange the distance formula d = s × t to make time (t) the subject. A runner runs a 10 km race at an average speed of 12 km/h. How many hours did they take?',
              hint: 't = d / s. Then 10 / 12.',
              answer: 't = d / s; Time = 5/6 hours (50 minutes)',
            },
          ],
        },
        {
          id: 'step2_2_6',
          title: 'Exercise: Level 3 (Challenge & Problem Solving)',
          kind: 'practice',
          practiceLevel: 3,
          practiceQuestions: [
            {
              id: 'q2_2_7',
              level: 3,
              text: 'The kinetic energy of an object is given by E = 0.5 × m × v². Rearrange the formula to make v the subject.',
              hint: 'Multiply by 2, divide by m, then take square root.',
              answer: 'v = √(2E / m)',
            },
            {
              id: 'q2_2_8',
              level: 3,
              text: 'A cylinder has volume V = πr²h. If V = 628 cm³ and r = 5 cm, calculate the height h. (Use π ≈ 3.14).',
              hint: 'r² = 25. πr² = 78.5. h = 628 ÷ 78.5.',
              answer: 'h = 8 cm',
            },
            {
              id: 'q2_2_9',
              level: 3,
              text: 'Make a the subject of the formula: S = a / (1 - r).',
              hint: 'Multiply both sides by (1 - r).',
              answer: 'a = S(1 - r)',
            },
          ],
        },
      ],
    },

    /* =========================================================================
     * 2.3 Expanding brackets
     * ========================================================================= */
    {
      id: 'subtopic2_3',
      number: '2.3',
      title: 'Expanding brackets',
      codes: ['8Ae.03'],
      steps: [
        {
          id: 'step2_3_1',
          title: 'Real-Life Concept: Combo Meals & Area Models',
          kind: 'concept',
          blocks: [
            {
              type: 'text',
              text: 'Imagine ordering 3 identical Fast Food Combo Meals. Each combo meal contains 1 Burger (b) and 2 Fries ($2 each).',
            },
            {
              type: 'text',
              text: 'Written with brackets: 3(b + 2). What do you actually receive? 3 Burgers and 6 Fries! So 3(b + 2) = 3b + 6. Expanding brackets simply multiplies everything inside by the number outside!',
            },
            {
              type: 'keyterm',
              term: 'The Distributive Law',
              definition: 'Multiply the term outside the bracket by EVERY term inside the bracket.',
              example: 'a(b + c) = ab + ac',
            },
            {
              type: 'figure',
              component: 'AreaModel',
              props: { a: 3, b: 2 },
              caption: 'Visual Area Model showing 3 × (x + 2) = 3x + 6',
            },
          ],
        },
        {
          id: 'step2_3_2',
          title: 'Worked Example: Expanding and Simplifying',
          kind: 'worked',
          blocks: [
            {
              type: 'text',
              text: 'Expand and simplify: 4(3x - 2) + 2(x + 5).',
            },
            {
              type: 'buildSteps',
              steps: [
                {
                  type: 'text',
                  text: 'Step 1: Expand the first bracket: 4 × 3x = 12x, and 4 × (-2) = -8.',
                },
                {
                  type: 'formula',
                  latex: '4(3x - 2) = 12x - 8',
                },
                {
                  type: 'text',
                  text: 'Step 2: Expand the second bracket: 2 × x = 2x, and 2 × 5 = +10.',
                },
                {
                  type: 'formula',
                  latex: '2(x + 5) = 2x + 10',
                },
                {
                  type: 'text',
                  text: 'Step 3: Combine like terms.',
                },
                {
                  type: 'formula',
                  latex: '(12x - 8) + (2x + 10) = (12x + 2x) + (-8 + 10) = 14x + 2',
                },
              ],
            },
          ],
        },
        {
          id: 'step2_3_3',
          title: 'Common Mistake & Pro Tip',
          kind: 'mistake',
          blocks: [
            {
              type: 'text',
              text: 'Watch out for these classic expansion slip-ups:',
            },
            {
              type: 'list',
              items: [
                'Forgetting the second term: 3(x + 5) is NOT 3x + 5! It must be 3x + 15.',
                'Negative outside the bracket: -2(x - 3) = -2x + 6 (because -2 × -3 = +6).',
                'Multiplying variables: x(x + 4) = x² + 4x (x times x is x²).',
              ],
            },
          ],
        },
        {
          id: 'step2_3_4',
          title: 'Exercise: Level 1 (Basic)',
          kind: 'practice',
          practiceLevel: 1,
          practiceQuestions: [
            {
              id: 'q2_3_1',
              level: 1,
              text: 'Expand: a) 4(x + 3)    b) 5(2y - 1)',
              hint: 'Multiply the outer number by each term inside.',
              answer: 'a) 4x + 12,  b) 10y - 5',
            },
            {
              id: 'q2_3_2',
              level: 1,
              text: 'Expand: a) -3(m + 4)    b) -2(3k - 5)',
              hint: 'Watch your negative signs: negative × negative is positive.',
              answer: 'a) -3m - 12,  b) -6k + 10',
            },
            {
              id: 'q2_3_3',
              level: 1,
              text: 'Expand: a) x(x + 7)    b) 2a(3a - 4)',
              hint: 'x × x = x²; 2a × 3a = 6a².',
              answer: 'a) x² + 7x,  b) 6a² - 8a',
            },
          ],
        },
        {
          id: 'step2_3_5',
          title: 'Exercise: Level 2 (Real-World Scenarios)',
          kind: 'practice',
          practiceLevel: 2,
          practiceQuestions: [
            {
              id: 'q2_3_4',
              level: 2,
              text: 'A school orders 5 party packs. Each pack has t T-shirts and 4 water bottles. Write the expanded expression for the total number of items ordered.',
              hint: '5(t + 4).',
              answer: '5t + 20 items (5 T-shirts and 20 water bottles)',
            },
            {
              id: 'q2_3_5',
              level: 2,
              text: 'A rectangular garden has length 3(x + 2) meters and width 4 meters. Expand the expression for the total area of the garden.',
              hint: 'Area = width × length = 4 × 3(x + 2) = 12(x + 2).',
              answer: '12x + 24 m²',
            },
            {
              id: 'q2_3_6',
              level: 2,
              text: 'Expand and simplify: 3(2x + 4) + 4(x - 2).',
              hint: 'Expand both brackets (6x + 12 + 4x - 8) and combine like terms.',
              answer: '10x + 4',
            },
          ],
        },
        {
          id: 'step2_3_6',
          title: 'Exercise: Level 3 (Challenge & Problem Solving)',
          kind: 'practice',
          practiceLevel: 3,
          practiceQuestions: [
            {
              id: 'q2_3_7',
              level: 3,
              text: 'Expand and simplify: 5(2x - 3) - 3(x - 4).',
              hint: 'Be very careful with -3 × (-4) = +12: (10x - 15 - 3x + 12).',
              answer: '7x - 3',
            },
            {
              id: 'q2_3_8',
              level: 3,
              text: 'Expand and simplify: 2x(x + 3) + 3x(2x - 5).',
              hint: '2x² + 6x + 6x² - 15x.',
              answer: '8x² - 9x',
            },
            {
              id: 'q2_3_9',
              level: 3,
              text: 'A photo frame has outer dimensions (x + 6) by (x + 4). The inner photo has dimensions x by (x - 2). Write an expanded expression for the area of the border.',
              hint: 'Outer area = (x+6)(x+4) = x² + 10x + 24. Inner area = x(x-2) = x² - 2x. Subtract.',
              answer: '12x + 24',
            },
          ],
        },
      ],
    },

    /* =========================================================================
     * 2.4 Factorising
     * ========================================================================= */
    {
      id: 'subtopic2_4',
      number: '2.4',
      title: 'Factorising',
      codes: ['8Ae.03'],
      steps: [
        {
          id: 'step2_4_1',
          title: 'Real-Life Concept: Packing Into Identical Gift Boxes',
          kind: 'concept',
          blocks: [
            {
              type: 'text',
              text: 'Factorising is the exact reverse of expanding brackets. Think of having 12 pencils and 18 erasers loose on a table: 12p + 18.',
            },
            {
              type: 'text',
              text: 'How can you pack them into the largest number of identical stationery sets? The HCF of 12 and 18 is 6. You can pack 6 sets of (2 pencils + 3 erasers): 6(2p + 3)!',
            },
            {
              type: 'keyterm',
              term: 'Factorising',
              definition: 'Writing an expression as a product of its highest common factor (HCF) outside brackets.',
              example: '6x + 9 = 3(2x + 3)',
            },
            {
              type: 'formula',
              latex: 'ab + ac = a(b + c)',
            },
          ],
        },
        {
          id: 'step2_4_2',
          title: 'Worked Example: Factorising Completely',
          kind: 'worked',
          blocks: [
            {
              type: 'text',
              text: 'Factorise completely: 14x² + 21x.',
            },
            {
              type: 'buildSteps',
              steps: [
                {
                  type: 'text',
                  text: 'Step 1: Find the HCF of the numbers 14 and 21 (HCF = 7).',
                },
                {
                  type: 'text',
                  text: 'Step 2: Find the common variable factor in x² and x (common factor = x).',
                },
                {
                  type: 'formula',
                  latex: '\\text{Overall HCF} = 7x',
                },
                {
                  type: 'text',
                  text: 'Step 3: Divide each term by 7x to find what remains inside brackets.',
                },
                {
                  type: 'formula',
                  latex: '14x^2 \\div 7x = 2x \\qquad 21x \\div 7x = 3',
                },
                {
                  type: 'formula',
                  latex: '14x^2 + 21x = 7x(2x + 3)',
                },
              ],
            },
          ],
        },
        {
          id: 'step2_4_3',
          title: 'Common Mistake & Pro Tip',
          kind: 'mistake',
          blocks: [
            {
              type: 'text',
              text: 'Common factorising mistakes:',
            },
            {
              type: 'list',
              items: [
                'Not taking out the HIGHEST common factor: e.g., 12x + 18 = 2(6x + 9) is NOT fully factorised, because 6 and 9 still share 3. It must be 6(2x + 3).',
                'Leaving 0 when a term is divided by itself: 4x + 4 = 4(x + 1), NOT 4(x). (4 ÷ 4 = 1).',
                'Always check by expanding back in your head!',
              ],
            },
          ],
        },
        {
          id: 'step2_4_4',
          title: 'Exercise: Level 1 (Basic)',
          kind: 'practice',
          practiceLevel: 1,
          practiceQuestions: [
            {
              id: 'q2_4_1',
              level: 1,
              text: 'Factorise: a) 6x + 15    b) 8y - 12',
              hint: 'Find the HCF of the numbers and place it outside.',
              answer: 'a) 3(2x + 5),  b) 4(2y - 3)',
            },
            {
              id: 'q2_4_2',
              level: 1,
              text: 'Factorise: a) 5m + 5    b) 14 - 7k',
              hint: 'Remember: 5 ÷ 5 = 1.',
              answer: 'a) 5(m + 1),  b) 7(2 - k)',
            },
            {
              id: 'q2_4_3',
              level: 1,
              text: 'Factorise: a) x² + 4x    b) 3y² - 9y',
              hint: 'Take out the common letter x or 3y.',
              answer: 'a) x(x + 4),  b) 3y(y - 3)',
            },
          ],
        },
        {
          id: 'step2_4_5',
          title: 'Exercise: Level 2 (Real-World Scenarios)',
          kind: 'practice',
          practiceLevel: 2,
          practiceQuestions: [
            {
              id: 'q2_4_4',
              level: 2,
              text: 'A store packages 18 apples and 24 oranges into identical fruit hampers. Write 18a + 24o in factorised form to show how many hampers can be made and what each contains.',
              hint: 'Find the HCF of 18 and 24 (6).',
              answer: '6(3a + 4o) → 6 hampers, each with 3 apples and 4 oranges',
            },
            {
              id: 'q2_4_5',
              level: 2,
              text: 'A rectangular billboard has an area of (15x + 35) m². Factorise this expression to find possible expressions for its length and width.',
              hint: 'Factorise by finding HCF of 15 and 35.',
              answer: '5(3x + 7) → width = 5 m, length = (3x + 7) m',
            },
            {
              id: 'q2_4_6',
              level: 2,
              text: 'Factorise completely: 12ab + 16b.',
              hint: 'Both terms have a common factor of 4 and b.',
              answer: '4b(3a + 4)',
            },
          ],
        },
        {
          id: 'step2_4_6',
          title: 'Exercise: Level 3 (Challenge & Problem Solving)',
          kind: 'practice',
          practiceLevel: 3,
          practiceQuestions: [
            {
              id: 'q2_4_7',
              level: 3,
              text: 'Factorise completely: 18x²y - 27xy².',
              hint: 'HCF of numbers is 9; common letters are x and y.',
              answer: '9xy(2x - 3y)',
            },
            {
              id: 'q2_4_8',
              level: 3,
              text: 'The total surface area of a cylinder can be written as 2πr² + 2πrh. Factorise this formula completely.',
              hint: 'Take out 2πr.',
              answer: '2πr(r + h)',
            },
            {
              id: 'q2_4_9',
              level: 3,
              text: 'Without using a calculator, evaluate 73 × 48 + 27 × 48 by factorising.',
              hint: 'Common factor is 48: 48(73 + 27).',
              answer: '4,800 (48 × 100 = 4,800)',
            },
          ],
        },
      ],
    },

    /* =========================================================================
     * 2.5 Constructing and solving linear equations
     * ========================================================================= */
    {
      id: 'subtopic2_5',
      number: '2.5',
      title: 'Constructing and solving linear equations',
      codes: ['8Ae.06'],
      steps: [
        {
          id: 'step2_5_1',
          title: 'Real-Life Concept: The Mystery Balance Scale',
          kind: 'concept',
          blocks: [
            {
              type: 'text',
              text: 'Think of a traditional balance scale at a farmer\'s market. On the left side are 3 identical mystery bags of apples plus a 2 kg metal weight. On the right side is a 14 kg weight.',
            },
            {
              type: 'text',
              text: 'Because the scale balances evenly, we write the equation: 3x + 2 = 14.',
            },
            {
              type: 'text',
              text: 'To find the weight of one bag: 1) Remove the 2 kg weight from both sides: 3x = 12. 2) Divide both sides by 3: x = 4 kg!',
            },
            {
              type: 'keyterm',
              term: 'Linear Equation',
              definition: 'Two algebraic expressions joined by an equals sign (=). Solving means finding the value of the unknown variable that makes both sides equal.',
              example: '3x + 2 = 14  ⟹  x = 4',
            },
            {
              type: 'figure',
              component: 'BalanceScale',
              props: {},
              caption: 'Interactive Balance Scale: Maintain equality by performing operations on both sides',
            },
          ],
        },
        {
          id: 'step2_5_2',
          title: 'Worked Example: Unknowns on Both Sides',
          kind: 'worked',
          blocks: [
            {
              type: 'text',
              text: 'Solve the equation: 5x - 4 = 2x + 11.',
            },
            {
              type: 'buildSteps',
              steps: [
                {
                  type: 'text',
                  text: 'Step 1: Eliminate the smaller variable term (2x) by subtracting 2x from both sides.',
                },
                {
                  type: 'formula',
                  latex: '5x - 2x - 4 = 11 \\implies 3x - 4 = 11',
                },
                {
                  type: 'text',
                  text: 'Step 2: Add 4 to both sides to isolate the 3x term.',
                },
                {
                  type: 'formula',
                  latex: '3x = 11 + 4 = 15',
                },
                {
                  type: 'text',
                  text: 'Step 3: Divide both sides by 3.',
                },
                {
                  type: 'formula',
                  latex: 'x = \\frac{15}{3} = 5',
                },
                {
                  type: 'text',
                  text: 'Check: 5(5) - 4 = 21, and 2(5) + 11 = 21. Both sides balance!',
                },
              ],
            },
          ],
        },
        {
          id: 'step2_5_3',
          title: 'Common Mistake & Pro Tip',
          kind: 'mistake',
          blocks: [
            {
              type: 'text',
              text: 'The Golden Rule of Solving Equations:',
            },
            {
              type: 'list',
              items: [
                'Whatever you do to one side, you MUST do to the other side.',
                'If there are brackets, expand them FIRST: 2(x + 3) = 14 → 2x + 6 = 14.',
                'When you have unknowns on both sides, always subtract the smaller x first so your x coefficient stays positive!',
              ],
            },
          ],
        },
        {
          id: 'step2_5_4',
          title: 'Exercise: Level 1 (Basic)',
          kind: 'practice',
          practiceLevel: 1,
          practiceQuestions: [
            {
              id: 'q2_5_1',
              level: 1,
              text: 'Solve: a) 4x + 7 = 31    b) 3y - 5 = 16',
              hint: 'Subtract or add the constant first, then divide by the coefficient.',
              answer: 'a) x = 6 (24÷4),  b) y = 7 (21÷3)',
            },
            {
              id: 'q2_5_2',
              level: 1,
              text: 'Solve: a) x / 4 + 3 = 8    b) 2(x + 5) = 22',
              hint: 'For b, expand brackets: 2x + 10 = 22 or divide by 2 first: x + 5 = 11.',
              answer: 'a) x = 20,  b) x = 6',
            },
            {
              id: 'q2_5_3',
              level: 1,
              text: 'Solve: 5x + 2 = 3x + 12',
              hint: 'Subtract 3x from both sides first.',
              answer: 'x = 5 (2x = 10)',
            },
          ],
        },
        {
          id: 'step2_5_5',
          title: 'Exercise: Level 2 (Real-World Scenarios)',
          kind: 'practice',
          practiceLevel: 2,
          practiceQuestions: [
            {
              id: 'q2_5_4',
              level: 2,
              text: 'Lucas buys 4 identical game skins and has a $5 discount coupon. His final bill is $27. Write an equation and solve it to find the regular price of one skin.',
              hint: '4s - 5 = 27.',
              answer: '4s - 5 = 27 → s = $8 each',
            },
            {
              id: 'q2_5_5',
              level: 2,
              text: 'A gym membership at Club A costs $30 joining fee plus $15 per month. Club B has no joining fee but costs $20 per month. After how many months (m) will both clubs cost the exact same total?',
              hint: 'Set them equal: 30 + 15m = 20m.',
              answer: 'm = 6 months (5m = 30)',
            },
            {
              id: 'q2_5_6',
              level: 2,
              text: 'The perimeter of an isosceles triangle is 42 cm. The base is 10 cm and the two equal legs are each (2x + 1) cm. Find the value of x.',
              hint: '2(2x + 1) + 10 = 42 → 4x + 12 = 42.',
              answer: 'x = 7.5 cm (4x = 30)',
            },
          ],
        },
        {
          id: 'step2_5_6',
          title: 'Exercise: Level 3 (Challenge & Problem Solving)',
          kind: 'practice',
          practiceLevel: 3,
          practiceQuestions: [
            {
              id: 'q2_5_7',
              level: 3,
              text: 'Solve: 3(2x - 4) = 4(x + 1) + 2.',
              hint: 'Expand both sides: 6x - 12 = 4x + 4 + 2 → 6x - 12 = 4x + 6.',
              answer: 'x = 9 (2x = 18)',
            },
            {
              id: 'q2_5_8',
              level: 3,
              text: 'Solve: (2x + 5) / 3 = (x + 7) / 2.',
              hint: 'Cross-multiply: 2(2x + 5) = 3(x + 7) → 4x + 10 = 3x + 21.',
              answer: 'x = 11',
            },
            {
              id: 'q2_5_9',
              level: 3,
              text: 'Sarah is 4 times as old as her daughter Chloe. In 16 years, Sarah will be only twice as old as Chloe. How old are Sarah and Chloe today?',
              hint: 'Let Chloe = c, Sarah = 4c. In 16 years: 4c + 16 = 2(c + 16).',
              answer: 'Chloe is 8 years old, and Sarah is 32 years old (4c + 16 = 2c + 32 → 2c = 16)',
            },
          ],
        },
      ],
    },

    /* =========================================================================
     * 2.6 Inequalities
     * ========================================================================= */
    {
      id: 'subtopic2_6',
      number: '2.6',
      title: 'Inequalities',
      codes: ['8Ae.07'],
      steps: [
        {
          id: 'step2_6_1',
          title: 'Real-Life Concept: Rollercoaster Heights & Speed Limits',
          kind: 'concept',
          blocks: [
            {
              type: 'text',
              text: 'In real life, many rules do not specify an exact number, but a whole range of allowed values:',
            },
            {
              type: 'text',
              text: '1. Rollercoaster safety: "You must be at least 120 cm tall to ride": h ≥ 120 cm.',
            },
            {
              type: 'text',
              text: '2. School zone speed limit: "Maximum speed is 40 km/h": s ≤ 40 km/h.',
            },
            {
              type: 'keyterm',
              term: 'Inequality Symbols',
              definition: '> (greater than),  < (less than),  ≥ (greater than or equal to),  ≤ (less than or equal to).',
              example: 'x > 3 means 3.1, 4, 5... (3 is not included). x ≥ 3 includes 3.',
            },
            {
              type: 'figure',
              component: 'InequalityNumberLine',
              props: { minVal: -2, maxVal: 4, leftClosed: true, rightClosed: false },
              caption: 'Number line showing -2 ≤ x < 4 (solid dot = included, open dot = not included)',
            },
          ],
        },
        {
          id: 'step2_6_2',
          title: 'Worked Example: Solving a Real-Life Inequality',
          kind: 'worked',
          blocks: [
            {
              type: 'text',
              text: 'Sam has $50. He buys a pizza for $14 and wants to buy several arcade tokens that cost $4 each (t). How many tokens can he afford?',
            },
            {
              type: 'buildSteps',
              steps: [
                {
                  type: 'text',
                  text: 'Step 1: Write an inequality where total spending must be ≤ $50.',
                },
                {
                  type: 'formula',
                  latex: '14 + 4t \\le 50',
                },
                {
                  type: 'text',
                  text: 'Step 2: Subtract 14 from both sides.',
                },
                {
                  type: 'formula',
                  latex: '4t \\le 36',
                },
                {
                  type: 'text',
                  text: 'Step 3: Divide by 4.',
                },
                {
                  type: 'formula',
                  latex: 't \\le 9',
                },
                {
                  type: 'text',
                  text: 'Conclusion: Sam can buy at most 9 tokens.',
                },
              ],
            },
          ],
        },
        {
          id: 'step2_6_3',
          title: 'Common Mistake & Pro Tip',
          kind: 'mistake',
          blocks: [
            {
              type: 'text',
              text: 'Critical inequality rules:',
            },
            {
              type: 'list',
              items: [
                'On a number line: OPEN circle (○) means strict inequality (< or >). SOLID circle (●) means includes equal to (≤ or ≥).',
                'Multiplying or dividing by a NEGATIVE number FLIPS the inequality sign: e.g. -2x < 6 ⟹ x > -3.',
              ],
            },
          ],
        },
        {
          id: 'step2_6_4',
          title: 'Exercise: Level 1 (Basic)',
          kind: 'practice',
          practiceLevel: 1,
          practiceQuestions: [
            {
              id: 'q2_6_1',
              level: 1,
              text: 'Solve the inequality: a) x + 5 < 12    b) 3y ≥ 18',
              hint: 'Treat it like an equation: subtract 5 or divide by 3.',
              answer: 'a) x < 7,  b) y ≥ 6',
            },
            {
              id: 'q2_6_2',
              level: 1,
              text: 'List all integers that satisfy: -2 ≤ x < 3.',
              hint: 'Includes -2 because of ≤, but does NOT include 3.',
              answer: '-2, -1, 0, 1, 2',
            },
            {
              id: 'q2_6_3',
              level: 1,
              text: 'Solve: 2x - 3 ≤ 11.',
              hint: 'Add 3 to both sides, then divide by 2.',
              answer: 'x ≤ 7',
            },
          ],
        },
        {
          id: 'step2_6_5',
          title: 'Exercise: Level 2 (Real-World Scenarios)',
          kind: 'practice',
          practiceLevel: 2,
          practiceQuestions: [
            {
              id: 'q2_6_4',
              level: 2,
              text: 'An elevator has a maximum safe load capacity of 600 kg. If 4 adults weigh a total of 320 kg, what is the maximum number of 35 kg cargo boxes (b) that can be added safely?',
              hint: '320 + 35b ≤ 600 → 35b ≤ 280.',
              answer: 'At most 8 boxes (35 × 8 = 280)',
            },
            {
              id: 'q2_6_5',
              level: 2,
              text: 'A cell phone plan costs $25 per month plus $0.10 for each text message over 200. Zoe has a strict monthly budget of $40. Write and solve an inequality for the extra messages (m) she can send.',
              hint: '25 + 0.10m ≤ 40 → 0.10m ≤ 15.',
              answer: 'm ≤ 150 extra messages',
            },
            {
              id: 'q2_6_6',
              level: 2,
              text: 'To pass a driving test course, a driver must score more than 75 points. A driver starts with 100 points and loses 4 points for each penalty fault (f). What is the maximum number of faults allowed?',
              hint: '100 - 4f > 75 → -4f > -25 → 4f < 25.',
              answer: 'Maximum 6 faults (7 faults loses 28 points, leaving 72)',
            },
          ],
        },
        {
          id: 'step2_6_6',
          title: 'Exercise: Level 3 (Challenge & Problem Solving)',
          kind: 'practice',
          practiceLevel: 3,
          practiceQuestions: [
            {
              id: 'q2_6_7',
              level: 3,
              text: 'Solve the inequality: 5 - 3x < 20. Remember to flip the sign when dividing by a negative!',
              hint: '-3x < 15 → divide by -3 and flip < to >.',
              answer: 'x > -5',
            },
            {
              id: 'q2_6_8',
              level: 3,
              text: 'Find all integer values of x that satisfy both: 2x + 1 > 5  AND  3x - 4 ≤ 14.',
              hint: '2x > 4 → x > 2. And 3x ≤ 18 → x ≤ 6. Combine: 2 < x ≤ 6.',
              answer: '3, 4, 5, 6',
            },
            {
              id: 'q2_6_9',
              level: 3,
              text: 'A delivery truck carries boxes weighing 18 kg and crates weighing 30 kg. The truck can carry at most 900 kg. If the truck must carry exactly twice as many boxes as crates, find the maximum number of crates it can carry.',
              hint: 'Let crates = c, boxes = 2c. Total weight = 30c + 18(2c) = 30c + 36c = 66c ≤ 900.',
              answer: '13 crates (66 × 13 = 858 kg; 14 would be 924 kg)',
            },
          ],
        },
      ],
    },
  ],
};
