/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Unit } from '../types/content';

export const unit1: Unit = {
  id: 'unit1',
  number: 1,
  title: '1. Integers',
  codes: ['8Ni.01', '8Ni.02', '8Ni.03', '8Ni.05', '8Ni.06', '8Ni.07'],
  accentColor: '#1D4ED8',
  subtopics: [
    /* =========================================================================
     * 1.1 Factors, multiples and primes
     * ========================================================================= */
    {
      id: 'subtopic1_1',
      number: '1.1',
      title: 'Factors, multiples and primes',
      codes: ['8Ni.03'],
      steps: [
        {
          id: 'step1_1_1',
          title: 'Real-Life Concept: Arranging Bakery Cookies',
          kind: 'concept',
          blocks: [
            {
              type: 'text',
              text: 'Imagine you bake 24 cookies. Can you pack them into equal rectangular boxes? Yes! You can do 1×24, 2×12, 3×8, or 4×6. These numbers (1, 2, 3, 4, 6, 8, 12, 24) are the factors of 24.',
            },
            {
              type: 'text',
              text: 'What if you bake 13 cookies? You can only arrange them in 1 line of 13 (1×13). That is what makes 13 a Prime Number!',
            },
            {
              type: 'keyterm',
              term: 'Prime Number',
              definition: 'A whole number greater than 1 that has exactly two factors: 1 and itself (e.g., 2, 3, 5, 7, 11, 13...).',
              example: '2 is the only even prime number.',
            },
            {
              type: 'keyterm',
              term: 'HCF & LCM',
              definition: 'Highest Common Factor (HCF) is the largest number dividing both. Lowest Common Multiple (LCM) is the first shared number in their times tables.',
            },
            {
              type: 'figure',
              component: 'PrimeFactorTool',
              props: { numA: 24, numB: 36 },
              caption: 'Interactive Prime Factor Venn Diagram for 24 and 36',
            },
          ],
        },
        {
          id: 'step1_1_2',
          title: 'Worked Example: Packing Party Gift Bags',
          kind: 'worked',
          blocks: [
            {
              type: 'text',
              text: 'A party organizer has 24 chocolate bars and 36 juice boxes. They want to make identical gift bags with no items left over. What is the greatest number of identical bags they can make?',
            },
            {
              type: 'buildSteps',
              steps: [
                {
                  type: 'text',
                  text: 'Step 1: Write both numbers as products of their prime factors.',
                },
                {
                  type: 'formula',
                  latex: '24 = 2 \\times 2 \\times 2 \\times 3 = 2^3 \\times 3',
                },
                {
                  type: 'formula',
                  latex: '36 = 2 \\times 2 \\times 3 \\times 3 = 2^2 \\times 3^2',
                },
                {
                  type: 'text',
                  text: 'Step 2: Find the shared prime factors to get the HCF.',
                },
                {
                  type: 'formula',
                  latex: '\\text{HCF} = 2 \\times 2 \\times 3 = 12',
                },
                {
                  type: 'text',
                  text: 'Conclusion: The organizer can make 12 identical bags. Each bag will contain 2 chocolate bars (24 ÷ 12) and 3 juice boxes (36 ÷ 12).',
                },
              ],
            },
          ],
        },
        {
          id: 'step1_1_3',
          title: 'Common Mistake & Pro Tip',
          kind: 'mistake',
          blocks: [
            {
              type: 'text',
              text: 'Watch out for these common traps in tests:',
            },
            {
              type: 'list',
              items: [
                'Mistake 1: Thinking 1 is a prime number. 1 has only ONE factor (itself), so it is NOT prime.',
                'Mistake 2: Thinking all odd numbers are prime. 9, 15, 21, and 25 are odd, but they have extra factors (e.g. 3 × 3 = 9).',
                'Mistake 3: Confusing factors (numbers that divide into it, smaller) with multiples (numbers in its times table, bigger).',
              ],
            },
            {
              type: 'keyterm',
              term: 'Quick Memory Rule',
              definition: 'Factors divide into the number. Multiples are made by multiplying.',
              example: 'Factors of 6: 1, 2, 3, 6. Multiples of 6: 6, 12, 18, 24...',
            },
          ],
        },
        {
          id: 'step1_1_4',
          title: 'Exercise: Level 1 (Basic)',
          kind: 'practice',
          practiceLevel: 1,
          practiceQuestions: [
            {
              id: 'q1_1_1',
              level: 1,
              text: 'List all factors of 28 in ascending order.',
              hint: 'Find pairs that multiply to 28: 1×28, 2×14, 4×7.',
              answer: '1, 2, 4, 7, 14, 28',
            },
            {
              id: 'q1_1_2',
              level: 1,
              text: 'Write 60 as a product of prime factors in index form.',
              hint: 'Use a factor tree: 60 = 6 × 10 = (2 × 3) × (2 × 5).',
              answer: '2² × 3 × 5',
            },
            {
              id: 'q1_1_3',
              level: 1,
              text: 'Find the Lowest Common Multiple (LCM) of 6 and 8.',
              hint: 'List multiples of 8 (8, 16, 24...) and check which is in the 6 times table.',
              answer: '24',
            },
          ],
        },
        {
          id: 'step1_1_5',
          title: 'Exercise: Level 2 (Real-World Scenarios)',
          kind: 'practice',
          practiceLevel: 2,
          practiceQuestions: [
            {
              id: 'q1_1_4',
              level: 2,
              text: 'Hot dog buns come in packs of 8, while sausages come in packs of 12. What is the smallest number of packs of each you must buy so that every sausage has a bun with none left over?',
              hint: 'Find the LCM of 8 and 12, then divide by pack sizes.',
              answer: '3 packs of buns (24 buns) and 2 packs of sausages (24 sausages)',
            },
            {
              id: 'q1_1_5',
              level: 2,
              text: 'A gardener has 45 red tulip bulbs and 75 yellow tulip bulbs. They want to plant them in identical rows with no bulbs left over. What is the greatest number of identical rows they can plant?',
              hint: 'Find the HCF of 45 and 75.',
              answer: '15 rows (each row gets 3 red and 5 yellow tulips)',
            },
            {
              id: 'q1_1_6',
              level: 2,
              text: 'Two harbor ferry boats leave the pier at 9:00 AM. Ferry A returns every 20 minutes, and Ferry B returns every 25 minutes. At what time will both ferries return to the pier together again?',
              hint: 'Find the LCM of 20 and 25 minutes, then add to 9:00 AM.',
              answer: '10:40 AM (after 100 minutes)',
            },
          ],
        },
        {
          id: 'step1_1_6',
          title: 'Exercise: Level 3 (Challenge & Problem Solving)',
          kind: 'practice',
          practiceLevel: 3,
          practiceQuestions: [
            {
              id: 'q1_1_7',
              level: 3,
              text: 'The product of two prime numbers is 119. What are the two prime numbers?',
              hint: 'Test small primes: 2, 3, 5 are not factors. Test 7.',
              answer: '7 and 17 (7 × 17 = 119)',
            },
            {
              id: 'q1_1_8',
              level: 3,
              text: 'A secret 3-digit safe code ABC has the following clues: A is the smallest prime number; B is a multiple of 3 between 4 and 8; C is a factor of 21 greater than 3. What is the code?',
              hint: 'A = smallest prime; B = multiple of 3 in {5,6,7}; C = factor of 21 > 3.',
              answer: '267 (A = 2, B = 6, C = 7)',
            },
            {
              id: 'q1_1_9',
              level: 3,
              text: 'Find the smallest positive 3-digit number that is simultaneously divisible by 12, 18, and 24.',
              hint: 'First find the LCM of 12, 18, and 24, then find its smallest 3-digit multiple.',
              answer: '144 (LCM is 72; multiples are 72, 144...)',
            },
          ],
        },
      ],
    },

    /* =========================================================================
     * 1.2 Multiplying and dividing integers
     * ========================================================================= */
    {
      id: 'subtopic1_2',
      number: '1.2',
      title: 'Multiplying and dividing integers',
      codes: ['8Ni.02'],
      steps: [
        {
          id: 'step1_2_1',
          title: 'Real-Life Concept: Temperature Drops & Cancelling Debt',
          kind: 'concept',
          blocks: [
            {
              type: 'text',
              text: 'Positive numbers represent gains or warmth (+). Negative numbers represent losses, debts, or below-zero temperatures (-).',
            },
            {
              type: 'text',
              text: '1. Positive × Negative: The winter temperature drops by 3°C each hour for 4 hours. Overall change: 4 × (-3) = -12°C.',
            },
            {
              type: 'text',
              text: '2. Negative × Negative: Imagine your bank cancels (takes away, -) 3 monthly late penalty fees of $5 (-5). Removing a debt is a gain: (-3) × (-5) = +$15!',
            },
            {
              type: 'keyterm',
              term: 'The Sign Rule for × and ÷',
              definition: 'SAME signs produce a POSITIVE (+). DIFFERENT signs produce a NEGATIVE (-).',
              example: '(+) × (+) = (+),  (-) × (-) = (+),  (+) × (-) = (-),  (-) × (+) = (-)',
            },
            {
              type: 'formula',
              latex: '(-a) \\times (-b) = +ab \\qquad \\text{and} \\qquad \\frac{-a}{b} = -\\frac{a}{b}',
            },
          ],
        },
        {
          id: 'step1_2_2',
          title: 'Worked Example: Submarine Depth Changes',
          kind: 'worked',
          blocks: [
            {
              type: 'text',
              text: 'A research submarine dives down at 15 meters per minute for 8 minutes. Then it ascends back toward the surface in 4 equal stages. Find its depth and rate of ascent.',
            },
            {
              type: 'buildSteps',
              steps: [
                {
                  type: 'text',
                  text: 'Step 1: Calculate the final diving depth (diving down is negative).',
                },
                {
                  type: 'formula',
                  latex: '8 \\times (-15) = -120 \\text{ meters}',
                },
                {
                  type: 'text',
                  text: 'Step 2: To return to 0, it must gain +120 meters in 4 stages.',
                },
                {
                  type: 'formula',
                  latex: '120 \\div 4 = +30 \\text{ meters per stage}',
                },
                {
                  type: 'text',
                  text: 'Conclusion: The submarine reaches -120 m depth, and ascends at +30 m per minute.',
                },
              ],
            },
          ],
        },
        {
          id: 'step1_2_3',
          title: 'Common Mistake & Pro Tip',
          kind: 'mistake',
          blocks: [
            {
              type: 'text',
              text: 'Do not confuse adding integers with multiplying integers!',
            },
            {
              type: 'list',
              items: [
                'Adding two negatives gives a bigger negative: -4 + (-3) = -7 (you owe $4 and borrow $3 more).',
                'Multiplying two negatives gives a positive: (-4) × (-3) = +12 (same signs multiply to positive).',
                'A negative squared is positive: (-5)² = (-5) × (-5) = +25. But -5² means -(5²) = -25 without brackets!',
              ],
            },
          ],
        },
        {
          id: 'step1_2_4',
          title: 'Exercise: Level 1 (Basic)',
          kind: 'practice',
          practiceLevel: 1,
          practiceQuestions: [
            {
              id: 'q1_2_1',
              level: 1,
              text: 'Calculate: a) (-7) × 6    b) (-8) × (-5)',
              hint: 'Different signs = negative; Same signs = positive.',
              answer: 'a) -42,  b) +40',
            },
            {
              id: 'q1_2_2',
              level: 1,
              text: 'Calculate: a) (-54) ÷ 9    b) (-72) ÷ (-8)',
              hint: 'Divide the numbers, then apply sign rules.',
              answer: 'a) -6,  b) +9',
            },
            {
              id: 'q1_2_3',
              level: 1,
              text: 'Evaluate: a) (-4)²    b) (-2)³',
              hint: '(-4) × (-4) = +16, and (-2) × (-2) × (-2) has an odd number of negatives.',
              answer: 'a) 16,  b) -8',
            },
          ],
        },
        {
          id: 'step1_2_5',
          title: 'Exercise: Level 2 (Real-World Scenarios)',
          kind: 'practice',
          practiceLevel: 2,
          practiceQuestions: [
            {
              id: 'q1_2_4',
              level: 2,
              text: 'A refrigerator test chamber cools at a rate of -3°C every 15 minutes. If it starts at 0°C, what will the temperature be after 1 hour (4 periods)?',
              hint: 'Multiply the hourly intervals (4) by the rate (-3).',
              answer: '-12°C (4 × -3 = -12)',
            },
            {
              id: 'q1_2_5',
              level: 2,
              text: 'A game developer company suffered a total loss of -$24,000 over 6 consecutive months. What was the average profit/loss per month?',
              hint: 'Divide the total debt (-24,000) by the number of months (6).',
              answer: '-$4,000 per month (-24,000 ÷ 6 = -4,000)',
            },
            {
              id: 'q1_2_6',
              level: 2,
              text: 'In a board game, landing on a swamp costs you 15 points. Lucas landed on the swamp 4 times. He then drew 2 bonus cards worth +20 points each. What is his net score change?',
              hint: 'Calculate (4 × -15) + (2 × 20).',
              answer: '-20 points (-60 + 40 = -20)',
            },
          ],
        },
        {
          id: 'step1_2_6',
          title: 'Exercise: Level 3 (Challenge & Problem Solving)',
          kind: 'practice',
          practiceLevel: 3,
          practiceQuestions: [
            {
              id: 'q1_2_7',
              level: 3,
              text: 'If x = -3, y = -4, and z = 2, find the value of: (x × y) - (y × z).',
              hint: '(-3 × -4) = 12. Then (-4 × 2) = -8. Then 12 - (-8).',
              answer: '20 (12 - (-8) = 12 + 8 = 20)',
            },
            {
              id: 'q1_2_8',
              level: 3,
              text: 'Find two integers that have a sum of -3 and a product of -28.',
              hint: 'List factor pairs of 28: 1×28, 2×14, 4×7. Check differences of 3.',
              answer: '4 and -7 (4 + (-7) = -3, and 4 × -7 = -28)',
            },
            {
              id: 'q1_2_9',
              level: 3,
              text: 'A quiz has 20 questions. Each correct answer gives +5 points, each wrong answer deducts -2 points, and skipped questions score 0. Maya answered 13 correctly, 5 incorrectly, and left 2 blank. What is her final score?',
              hint: '(13 × 5) + (5 × -2) + (2 × 0).',
              answer: '55 points (65 - 10 + 0 = 55)',
            },
          ],
        },
      ],
    },

    /* =========================================================================
     * 1.3 Square roots and cube roots
     * ========================================================================= */
    {
      id: 'subtopic1_3',
      number: '1.3',
      title: 'Square roots and cube roots',
      codes: ['8Ni.06', '8Ni.07'],
      steps: [
        {
          id: 'step1_3_1',
          title: 'Real-Life Concept: Floor Tiles & Storage Boxes',
          kind: 'concept',
          blocks: [
            {
              type: 'text',
              text: '1. Square Roots in Real Life: If you have a square bedroom with an area of 49 m², how long is each wall? Since area = side × side, each wall is √49 = 7 m.',
            },
            {
              type: 'text',
              text: '2. Cube Roots in Real Life: If a cubic storage box has a volume of 125 cm³, how long is each edge? Since volume = edge × edge × edge, each edge is ∛125 = 5 cm (5 × 5 × 5 = 125).',
            },
            {
              type: 'keyterm',
              term: 'Square Root (√)',
              definition: 'The value that, when multiplied by itself, gives the original number.',
              example: '√64 = 8 because 8 × 8 = 64.',
            },
            {
              type: 'keyterm',
              term: 'Cube Root (∛)',
              definition: 'The value that, when multiplied by itself three times, gives the original number.',
              example: '∛27 = 3 because 3 × 3 × 3 = 27.',
            },
            {
              type: 'figure',
              component: 'SurdEstimator',
              props: { target: 50 },
              caption: 'Estimating non-square roots: √50 is between √49 (7) and √64 (8)',
            },
          ],
        },
        {
          id: 'step1_3_2',
          title: 'Worked Example: Estimating a Square Garden Wall',
          kind: 'worked',
          blocks: [
            {
              type: 'text',
              text: 'A square community garden has an area of 75 m². Between which two consecutive whole numbers does the length of its side lie?',
            },
            {
              type: 'buildSteps',
              steps: [
                {
                  type: 'text',
                  text: 'Step 1: Check nearby perfect squares.',
                },
                {
                  type: 'formula',
                  latex: '8^2 = 64 \\qquad \\text{and} \\qquad 9^2 = 81',
                },
                {
                  type: 'text',
                  text: 'Step 2: Place 75 between the two squares.',
                },
                {
                  type: 'formula',
                  latex: '64 < 75 < 81 \\implies \\sqrt{64} < \\sqrt{75} < \\sqrt{81}',
                },
                {
                  type: 'formula',
                  latex: '8 < \\sqrt{75} < 9',
                },
                {
                  type: 'text',
                  text: 'Conclusion: The side length is between 8 m and 9 m (closer to 9 m because 75 is closer to 81).',
                },
              ],
            },
          ],
        },
        {
          id: 'step1_3_3',
          title: 'Common Mistake & Pro Tip',
          kind: 'mistake',
          blocks: [
            {
              type: 'text',
              text: 'Common errors when calculating roots:',
            },
            {
              type: 'list',
              items: [
                'Do not divide by 2! √36 is NOT 18. √36 = 6 because 6 × 6 = 36.',
                'Do not divide by 3 for cube roots! ∛27 is NOT 9. ∛27 = 3 because 3 × 3 × 3 = 27.',
                'Negative numbers have real cube roots: ∛(-8) = -2 because (-2) × (-2) × (-2) = -8.',
              ],
            },
          ],
        },
        {
          id: 'step1_3_4',
          title: 'Exercise: Level 1 (Basic)',
          kind: 'practice',
          practiceLevel: 1,
          practiceQuestions: [
            {
              id: 'q1_3_1',
              level: 1,
              text: 'Calculate: a) √81    b) √144    c) √100',
              hint: 'Think: what number multiplied by itself gives each value?',
              answer: 'a) 9,  b) 12,  c) 10',
            },
            {
              id: 'q1_3_2',
              level: 1,
              text: 'Calculate: a) ∛8    b) ∛64    c) ∛1000',
              hint: 'Think: what number multiplied 3 times gives 8, 64, 1000?',
              answer: 'a) 2,  b) 4,  c) 10',
            },
            {
              id: 'q1_3_3',
              level: 1,
              text: 'Find: a) (-9)²    b) ∛(-27)',
              hint: '(-9) × (-9) is positive; cube root of negative is negative.',
              answer: 'a) 81,  b) -3',
            },
          ],
        },
        {
          id: 'step1_3_5',
          title: 'Exercise: Level 2 (Real-World Scenarios)',
          kind: 'practice',
          practiceLevel: 2,
          practiceQuestions: [
            {
              id: 'q1_3_4',
              level: 2,
              text: 'A square playground has an area of 121 m². The school wants to put a safety fence all the way around its perimeter. How many meters of fencing are needed?',
              hint: 'Side = √121. Perimeter = 4 × side.',
              answer: '44 meters (Side = 11 m, Perimeter = 4 × 11 = 44 m)',
            },
            {
              id: 'q1_3_5',
              level: 2,
              text: 'A cubic shipping container holds 216 m³ of cargo. What is the height of the container?',
              hint: 'Volume of cube = s³, so height = ∛216.',
              answer: '6 meters (6 × 6 × 6 = 216)',
            },
            {
              id: 'q1_3_6',
              level: 2,
              text: 'A square living room has an area of 32 m². Between which two consecutive whole numbers does the width of the room lie?',
              hint: 'Find the two perfect squares that 32 lies between.',
              answer: 'Between 5 m and 6 m (5² = 25, 6² = 36)',
            },
          ],
        },
        {
          id: 'step1_3_6',
          title: 'Exercise: Level 3 (Challenge & Problem Solving)',
          kind: 'practice',
          practiceLevel: 3,
          practiceQuestions: [
            {
              id: 'q1_3_7',
              level: 3,
              text: 'Solve for positive x: x² + 36 = 100.',
              hint: 'Subtract 36 from both sides, then take the square root.',
              answer: 'x = 8 (x² = 64, √64 = 8)',
            },
            {
              id: 'q1_3_8',
              level: 3,
              text: 'A cube has a total surface area of 150 cm². Find the volume of the cube.',
              hint: 'A cube has 6 identical square faces. Find area of one face (150 ÷ 6), then side length, then volume.',
              answer: '125 cm³ (1 face = 25 cm², side = 5 cm, volume = 5³ = 125 cm³)',
            },
            {
              id: 'q1_3_9',
              level: 3,
              text: 'Without using a calculator, estimate √90 to one decimal place.',
              hint: '√81 = 9, √100 = 10. 90 is about halfway (9.5² = 90.25).',
              answer: '≈ 9.5 (9.5² = 90.25)',
            },
          ],
        },
      ],
    },

    /* =========================================================================
     * 1.4 Indices
     * ========================================================================= */
    {
      id: 'subtopic1_4',
      number: '1.4',
      title: 'Indices',
      codes: ['8Ni.05', '8Ni.01'],
      steps: [
        {
          id: 'step1_4_1',
          title: 'Real-Life Concept: Viral Videos & Bacteria Doubling',
          kind: 'concept',
          blocks: [
            {
              type: 'text',
              text: 'Indices (powers) represent repeated multiplication. For example, if you share a video with 3 friends, and each friend shares with 3 friends: 3 × 3 = 3² = 9 viewers. In the next round: 3 × 3 × 3 = 3³ = 27 viewers!',
            },
            {
              type: 'keyterm',
              term: 'Index Laws (The Easy Way)',
              definition: '1. Multiplying same base → ADD powers: aᵐ × aⁿ = aᵐ⁺ⁿ\n2. Dividing same base → SUBTRACT powers: aᵐ ÷ aⁿ = aᵐ⁻ⁿ\n3. Power of zero: a⁰ = 1 (any number to power 0 is 1).',
            },
            {
              type: 'formula',
              latex: 'x^m \\times x^n = x^{m+n} \\qquad \\frac{x^m}{x^n} = x^{m-n} \\qquad x^0 = 1',
            },
            {
              type: 'figure',
              component: 'IndexLawsTool',
              props: { base: 'a', m: 4, n: 2 },
              caption: 'Interactive Index Laws Tool showing power expansions',
            },
          ],
        },
        {
          id: 'step1_4_2',
          title: 'Worked Example: Simplifying Powers',
          kind: 'worked',
          blocks: [
            {
              type: 'text',
              text: 'Simplify the expression: (2⁵ × 2³) ÷ 2⁴ and find its final numerical value.',
            },
            {
              type: 'buildSteps',
              steps: [
                {
                  type: 'text',
                  text: 'Step 1: Simplify the numerator by adding powers.',
                },
                {
                  type: 'formula',
                  latex: '2^5 \\times 2^3 = 2^{5+3} = 2^8',
                },
                {
                  type: 'text',
                  text: 'Step 2: Divide by subtracting powers.',
                },
                {
                  type: 'formula',
                  latex: '\\frac{2^8}{2^4} = 2^{8-4} = 2^4',
                },
                {
                  type: 'text',
                  text: 'Step 3: Calculate the numerical value.',
                },
                {
                  type: 'formula',
                  latex: '2^4 = 2 \\times 2 \\times 2 \\times 2 = 16',
                },
              ],
            },
          ],
        },
        {
          id: 'step1_4_3',
          title: 'Common Mistake & Pro Tip',
          kind: 'mistake',
          blocks: [
            {
              type: 'text',
              text: 'Common index errors to avoid:',
            },
            {
              type: 'list',
              items: [
                'Do not multiply the base numbers! 2³ × 2² is NOT 4⁵. The base stays 2: 2⁵.',
                'Remember that any non-zero number to the power 0 is 1, NOT 0! 7⁰ = 1, 100⁰ = 1.',
                'Do not add powers when bases are different! 2³ × 3² cannot be combined into a single power.',
              ],
            },
          ],
        },
        {
          id: 'step1_4_4',
          title: 'Exercise: Level 1 (Basic)',
          kind: 'practice',
          practiceLevel: 1,
          practiceQuestions: [
            {
              id: 'q1_4_1',
              level: 1,
              text: 'Simplify as a single power: a) 4³ × 4⁵    b) 6⁸ ÷ 6²',
              hint: 'Add powers for multiplication; subtract powers for division.',
              answer: 'a) 4⁸,  b) 6⁶',
            },
            {
              id: 'q1_4_2',
              level: 1,
              text: 'Write the value of each: a) 10³    b) 9⁰    c) 2⁵',
              hint: '10³ = 1000; any power 0 is 1; 2⁵ = 32.',
              answer: 'a) 1000,  b) 1,  c) 32',
            },
            {
              id: 'q1_4_3',
              level: 1,
              text: 'Simplify: a) y⁴ × y³    b) m⁷ ÷ m⁴',
              hint: 'Keep the variable base and apply index rules.',
              answer: 'a) y⁷,  b) m³',
            },
          ],
        },
        {
          id: 'step1_4_5',
          title: 'Exercise: Level 2 (Real-World Scenarios)',
          kind: 'practice',
          practiceLevel: 2,
          practiceQuestions: [
            {
              id: 'q1_4_4',
              level: 2,
              text: 'A bacterial culture doubles every hour. If it starts with 1 bacterium, write as a power of 2 how many bacteria there will be after 8 hours, and calculate the total count.',
              hint: 'After 1 hour: 2¹. After 8 hours: 2⁸.',
              answer: '2⁸ = 256 bacteria',
            },
            {
              id: 'q1_4_5',
              level: 2,
              text: 'A supercomputer server farm has 10³ racks. Each rack contains 10² processing units. Write the total number of processing units as a single power of 10, then write as a normal number.',
              hint: 'Multiply 10³ × 10² = 10³⁺².',
              answer: '10⁵ = 100,000 units',
            },
            {
              id: 'q1_4_6',
              level: 2,
              text: 'A square microchip has a side length of 2⁴ millimeters. Write an expression with a power for its area, then find its area in mm².',
              hint: 'Area = side² = (2⁴)² = 2⁸.',
              answer: '2⁸ = 256 mm²',
            },
          ],
        },
        {
          id: 'step1_4_6',
          title: 'Exercise: Level 3 (Challenge & Problem Solving)',
          kind: 'practice',
          practiceLevel: 3,
          practiceQuestions: [
            {
              id: 'q1_4_7',
              level: 3,
              text: 'Find the value of n in: 3ⁿ × 3⁴ = 3¹⁰.',
              hint: 'n + 4 = 10.',
              answer: 'n = 6',
            },
            {
              id: 'q1_4_8',
              level: 3,
              text: 'Simplify completely: (5⁶ × 5³) ÷ (5² × 5⁴).',
              hint: 'Numerator = 5⁹. Denominator = 5⁶. 5⁹ ÷ 5⁶ = 5³.',
              answer: '5³ = 125',
            },
            {
              id: 'q1_4_9',
              level: 3,
              text: 'Which is larger: 2³⁰ or 3²⁰? Explain how you know without a calculator.',
              hint: 'Rewrite as (2³)¹⁰ = 8¹⁰ and (3²)¹⁰ = 9¹⁰.',
              answer: '3²⁰ is larger (because 3²⁰ = 9¹⁰ and 2³⁰ = 8¹⁰, and 9¹⁰ > 8¹⁰)',
            },
          ],
        },
      ],
    },
  ],
};
