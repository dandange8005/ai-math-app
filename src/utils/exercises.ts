import { Exercise } from '../types';

export const timetableExercises: Exercise[] = [
  {
    id: 'tt1',
    area: 'timetables',
    type: 'multiple-choice',
    question: 'If a train leaves London at 14:30 and arrives in Paris at 18:15 (Paris time), and Paris is 1 hour ahead of London, how long was the journey?',
    options: ['2 hours 45 minutes', '3 hours 45 minutes', '4 hours 45 minutes', '2 hours 15 minutes'],
    correctAnswer: '2 hours 45 minutes',
    explanation: 'London departure: 14:30, Paris arrival: 18:15. Since Paris is 1 hour ahead, the arrival time in London time would be 17:15. Journey time = 17:15 - 14:30 = 2 hours 45 minutes.',
    difficulty: 'medium'
  },
  {
    id: 'tt2',
    area: 'timetables',
    type: 'multiple-choice',
    question: 'A bus runs every 25 minutes starting from 08:00. What time will the 4th bus arrive?',
    options: ['09:15', '09:25', '09:35', '09:45'],
    correctAnswer: '09:15',
    explanation: 'Starting at 08:00: 1st bus at 08:00, 2nd at 08:25, 3rd at 08:50, 4th at 09:15.',
    difficulty: 'easy'
  },
  {
    id: 'tt3',
    area: 'timetables',
    type: 'multiple-choice',
    question: 'If it\'s 3:00 PM in New York (EST), what time is it in Tokyo (JST)? (Tokyo is 14 hours ahead of New York)',
    options: ['5:00 AM next day', '1:00 AM next day', '5:00 PM same day', '1:00 PM same day'],
    correctAnswer: '5:00 AM next day',
    explanation: 'New York 3:00 PM + 14 hours = 5:00 AM the next day in Tokyo.',
    difficulty: 'hard'
  },
  {
    id: 'tt4',
    area: 'timetables',
    type: 'fill-in',
    question: 'A movie starts at 19:45 and lasts 2 hours 20 minutes. What time does it end? (Use 24-hour format)',
    options: [],
    correctAnswer: '22:05',
    explanation: '19:45 + 2 hours 20 minutes = 22:05',
    difficulty: 'medium'
  },
  {
    id: 'tt5',
    area: 'timetables',
    type: 'multiple-choice',
    question: 'Looking at a train timetable: Train A leaves at 10:15 and arrives at 12:30. Train B leaves at 10:45 and arrives at 12:45. Which train is faster?',
    options: ['Train A', 'Train B', 'Both are the same speed', 'Cannot determine'],
    correctAnswer: 'Train A',
    explanation: 'Train A: 12:30 - 10:15 = 2 hours 15 minutes. Train B: 12:45 - 10:45 = 2 hours. Train A is faster.',
    difficulty: 'medium'
  }
];

export const speedDistanceExercises: Exercise[] = [
  {
    id: 'sd1',
    area: 'speed-distance',
    type: 'multiple-choice',
    question: 'A car travels 120 km in 2 hours. What is its average speed?',
    options: ['50 km/h', '60 km/h', '70 km/h', '80 km/h'],
    correctAnswer: '60 km/h',
    explanation: 'Speed = Distance ÷ Time = 120 km ÷ 2 hours = 60 km/h',
    difficulty: 'easy'
  },
  {
    id: 'sd2',
    area: 'speed-distance',
    type: 'multiple-choice',
    question: 'If a cyclist travels at 15 km/h for 3 hours, how far does she travel?',
    options: ['35 km', '40 km', '45 km', '50 km'],
    correctAnswer: '45 km',
    explanation: 'Distance = Speed × Time = 15 km/h × 3 hours = 45 km',
    difficulty: 'easy'
  },
  {
    id: 'sd3',
    area: 'speed-distance',
    type: 'multiple-choice',
    question: 'A runner completes a 10 km race in 40 minutes. What is their speed in km/h?',
    options: ['12 km/h', '15 km/h', '18 km/h', '20 km/h'],
    correctAnswer: '15 km/h',
    explanation: '40 minutes = 40/60 hours = 2/3 hours. Speed = 10 km ÷ (2/3) hours = 10 × 3/2 = 15 km/h',
    difficulty: 'hard'
  },
  {
    id: 'sd4',
    area: 'speed-distance',
    type: 'fill-in',
    question: 'How long does it take to travel 240 km at a speed of 80 km/h?',
    options: [],
    correctAnswer: '3',
    explanation: 'Time = Distance ÷ Speed = 240 km ÷ 80 km/h = 3 hours',
    difficulty: 'medium'
  },
  {
    id: 'sd5',
    area: 'speed-distance',
    type: 'multiple-choice',
    question: 'Two cars leave the same point. Car A travels north at 60 km/h and Car B travels south at 40 km/h. After 2 hours, how far apart are they?',
    options: ['100 km', '120 km', '160 km', '200 km'],
    correctAnswer: '200 km',
    explanation: 'Car A travels: 60 × 2 = 120 km north. Car B travels: 40 × 2 = 80 km south. Total distance apart: 120 + 80 = 200 km',
    difficulty: 'hard'
  }
];

export const roundingExercises: Exercise[] = [
  {
    id: 'r1',
    area: 'rounding',
    type: 'multiple-choice',
    question: 'Estimate 298 + 503 by rounding to the nearest hundred.',
    options: ['700', '800', '900', '1000'],
    correctAnswer: '800',
    explanation: '298 rounds to 300, 503 rounds to 500. 300 + 500 = 800',
    difficulty: 'easy'
  },
  {
    id: 'r2',
    area: 'rounding',
    type: 'multiple-choice',
    question: 'A shop sells 187 apples, 234 oranges, and 159 bananas. Estimate the total fruit by rounding to the nearest ten.',
    options: ['570', '580', '590', '600'],
    correctAnswer: '580',
    explanation: '187 → 190, 234 → 230, 159 → 160. Total: 190 + 230 + 160 = 580',
    difficulty: 'medium'
  },
  {
    id: 'r3',
    area: 'rounding',
    type: 'multiple-choice',
    question: 'Estimate 42 × 19 by rounding both numbers to the nearest ten.',
    options: ['600', '700', '800', '900'],
    correctAnswer: '800',
    explanation: '42 rounds to 40, 19 rounds to 20. 40 × 20 = 800',
    difficulty: 'medium'
  },
  {
    id: 'r4',
    area: 'rounding',
    type: 'fill-in',
    question: 'Round 6,847 to the nearest thousand.',
    options: [],
    correctAnswer: '7000',
    explanation: '6,847 is closer to 7,000 than to 6,000, so it rounds to 7,000',
    difficulty: 'easy'
  },
  {
    id: 'r5',
    area: 'rounding',
    type: 'multiple-choice',
    question: 'A restaurant bill is £47.80. Estimate a 15% tip by rounding the bill to the nearest £10.',
    options: ['£6', '£7', '£8', '£9'],
    correctAnswer: '£7',
    explanation: '£47.80 rounds to £50. 15% of £50 = £7.50, which is approximately £7-£8, so £7 is the best estimate.',
    difficulty: 'hard'
  }
];

export const decimalExercises: Exercise[] = [
  {
    id: 'd1',
    area: 'decimals',
    type: 'multiple-choice',
    question: 'What is 3.7 + 2.8?',
    options: ['5.5', '6.5', '6.15', '5.15'],
    correctAnswer: '6.5',
    explanation: '3.7 + 2.8 = 6.5',
    difficulty: 'easy'
  },
  {
    id: 'd2',
    area: 'decimals',
    type: 'multiple-choice',
    question: 'A bottle contains 1.75 litres of juice. After drinking 0.8 litres, how much is left?',
    options: ['0.95 litres', '1.05 litres', '0.85 litres', '1.15 litres'],
    correctAnswer: '0.95 litres',
    explanation: '1.75 - 0.8 = 0.95 litres',
    difficulty: 'medium'
  },
  {
    id: 'd3',
    area: 'decimals',
    type: 'multiple-choice',
    question: 'What is 0.6 × 0.4?',
    options: ['0.24', '0.24', '2.4', '0.024'],
    correctAnswer: '0.24',
    explanation: '0.6 × 0.4 = 0.24',
    difficulty: 'medium'
  },
  {
    id: 'd4',
    area: 'decimals',
    type: 'fill-in',
    question: 'Convert 3/4 to a decimal.',
    options: [],
    correctAnswer: '0.75',
    explanation: '3 ÷ 4 = 0.75',
    difficulty: 'medium'
  },
  {
    id: 'd5',
    area: 'decimals',
    type: 'multiple-choice',
    question: 'Which is larger: 0.8 or 0.75?',
    options: ['0.8', '0.75', 'They are equal', 'Cannot determine'],
    correctAnswer: '0.8',
    explanation: '0.8 = 0.80, which is larger than 0.75',
    difficulty: 'easy'
  }
];

export const thermometerExercises: Exercise[] = [
  {
    id: 'th1',
    area: 'thermometer',
    type: 'multiple-choice',
    question: 'What temperature is shown on this thermometer if each small line represents 2°C and the red line is at the 3rd mark above 10°C?',
    options: ['14°C', '16°C', '18°C', '20°C'],
    correctAnswer: '16°C',
    explanation: 'Starting at 10°C, each mark is 2°C. The 3rd mark above 10°C is: 10 + (3 × 2) = 16°C',
    difficulty: 'medium'
  },
  {
    id: 'th2',
    area: 'thermometer',
    type: 'multiple-choice',
    question: 'A thermometer shows -5°C. If the temperature rises by 12°C, what is the new temperature?',
    options: ['7°C', '17°C', '-17°C', '-7°C'],
    correctAnswer: '7°C',
    explanation: '-5°C + 12°C = 7°C',
    difficulty: 'medium'
  },
  {
    id: 'th3',
    area: 'thermometer',
    type: 'multiple-choice',
    question: 'On a thermometer scaled in 5°C intervals, what temperature is halfway between 20°C and 30°C?',
    options: ['22.5°C', '25°C', '27.5°C', '24°C'],
    correctAnswer: '25°C',
    explanation: 'Halfway between 20°C and 30°C is (20 + 30) ÷ 2 = 25°C',
    difficulty: 'easy'
  },
  {
    id: 'th4',
    area: 'thermometer',
    type: 'fill-in',
    question: 'If a thermometer shows 15°C and drops by 20°C, what is the new temperature?',
    options: [],
    correctAnswer: '-5',
    explanation: '15°C - 20°C = -5°C',
    difficulty: 'medium'
  },
  {
    id: 'th5',
    area: 'thermometer',
    type: 'multiple-choice',
    question: 'A thermometer has marks every 10°C. If the temperature is at the 2nd mark below 0°C, what temperature is it?',
    options: ['-10°C', '-20°C', '-30°C', '20°C'],
    correctAnswer: '-20°C',
    explanation: 'Starting at 0°C, the 2nd mark below is: 0 - (2 × 10) = -20°C',
    difficulty: 'medium'
  },
  {
    id: 'th6',
    area: 'thermometer',
    type: 'multiple-choice',
    question: 'A thermometer shows -12°C at 6am. By noon, it rises by 18°C, then drops by 7°C by 6pm. What is the temperature at 6pm?',
    options: ['-1°C', '1°C', '-3°C', '3°C'],
    correctAnswer: '-1°C',
    explanation: 'Start: -12°C. After rising 18°C: -12 + 18 = 6°C. After dropping 7°C: 6 - 7 = -1°C',
    difficulty: 'hard'
  },
  {
    id: 'th7',
    area: 'thermometer',
    type: 'fill-in',
    question: 'On a thermometer with marks every 0.5°C, what temperature is shown if the mercury is at the 7th mark above 36°C?',
    options: [],
    correctAnswer: '39.5',
    explanation: 'Each mark represents 0.5°C. The 7th mark above 36°C is: 36 + (7 × 0.5) = 39.5°C',
    difficulty: 'hard'
  },
  {
    id: 'th8',
    area: 'thermometer',
    type: 'multiple-choice',
    question: 'A weather station records temperatures of -8°C, 4°C, -2°C, and 9°C over four days. What is the average temperature?',
    options: ['0.75°C', '1.25°C', '0.5°C', '1°C'],
    correctAnswer: '0.75°C',
    explanation: '(-8 + 4 + (-2) + 9) ÷ 4 = 3 ÷ 4 = 0.75°C',
    difficulty: 'hard'
  },
  {
    id: 'th9',
    area: 'thermometer',
    type: 'multiple-choice',
    question: 'A thermometer measures temperature in both Celsius and Fahrenheit. If the Celsius reading is 25°C, what would be the approximate Fahrenheit reading? (Use F = C × 1.8 + 32)',
    options: ['67°F', '77°F', '87°F', '97°F'],
    correctAnswer: '77°F',
    explanation: 'F = 25 × 1.8 + 32 = 45 + 32 = 77°F',
    difficulty: 'hard'
  },
  {
    id: 'th10',
    area: 'thermometer',
    type: 'fill-in',
    question: 'The temperature changes from -15°C to 8°C. What is the total change in temperature?',
    options: [],
    correctAnswer: '23',
    explanation: 'Change = 8 - (-15) = 8 + 15 = 23°C',
    difficulty: 'medium'
  }
];

export const timeFractionExercises: Exercise[] = [
  {
    id: 'tf1',
    area: 'time-fractions',
    type: 'multiple-choice',
    question: 'What is 1/4 of an hour in minutes?',
    options: ['10 minutes', '15 minutes', '20 minutes', '25 minutes'],
    correctAnswer: '15 minutes',
    explanation: '1 hour = 60 minutes. 1/4 of 60 = 60 ÷ 4 = 15 minutes',
    difficulty: 'easy'
  },
  {
    id: 'tf2',
    area: 'time-fractions',
    type: 'multiple-choice',
    question: 'If a movie lasts 2 1/2 hours, how many minutes is that?',
    options: ['120 minutes', '150 minutes', '180 minutes', '140 minutes'],
    correctAnswer: '150 minutes',
    explanation: '2 1/2 hours = 2.5 hours = 2.5 × 60 = 150 minutes',
    difficulty: 'medium'
  },
  {
    id: 'tf3',
    area: 'time-fractions',
    type: 'multiple-choice',
    question: 'What is 3/4 of a minute in seconds?',
    options: ['40 seconds', '45 seconds', '50 seconds', '55 seconds'],
    correctAnswer: '45 seconds',
    explanation: '1 minute = 60 seconds. 3/4 of 60 = (3 × 60) ÷ 4 = 45 seconds',
    difficulty: 'medium'
  },
  {
    id: 'tf4',
    area: 'time-fractions',
    type: 'fill-in',
    question: 'How many minutes are in 1/3 of an hour?',
    options: [],
    correctAnswer: '20',
    explanation: '1 hour = 60 minutes. 1/3 of 60 = 60 ÷ 3 = 20 minutes',
    difficulty: 'medium'
  },
  {
    id: 'tf5',
    area: 'time-fractions',
    type: 'multiple-choice',
    question: 'A race takes 1 hour and 1/6 of an hour. How long is the race in minutes?',
    options: ['70 minutes', '75 minutes', '80 minutes', '85 minutes'],
    correctAnswer: '70 minutes',
    explanation: '1 hour = 60 minutes. 1/6 of an hour = 60 ÷ 6 = 10 minutes. Total = 60 + 10 = 70 minutes',
    difficulty: 'hard'
  },
  {
    id: 'tf6',
    area: 'time-fractions',
    type: 'multiple-choice',
    question: 'A baking recipe calls for 3/8 of an hour in the oven, then 1/4 of an hour to cool. What is the total time in minutes?',
    options: ['35 minutes', '37.5 minutes', '40 minutes', '42.5 minutes'],
    correctAnswer: '37.5 minutes',
    explanation: '3/8 of 60 minutes = 22.5 minutes. 1/4 of 60 minutes = 15 minutes. Total = 22.5 + 15 = 37.5 minutes',
    difficulty: 'hard'
  },
  {
    id: 'tf7',
    area: 'time-fractions',
    type: 'fill-in',
    question: 'How many seconds are in 5/12 of a minute?',
    options: [],
    correctAnswer: '25',
    explanation: '1 minute = 60 seconds. 5/12 of 60 = (5 × 60) ÷ 12 = 300 ÷ 12 = 25 seconds',
    difficulty: 'hard'
  },
  {
    id: 'tf8',
    area: 'time-fractions',
    type: 'multiple-choice',
    question: 'A school day is 6 1/4 hours long. If lunch break is 3/4 of an hour, how many hours of lessons are there?',
    options: ['5 hours', '5.25 hours', '5.5 hours', '5.75 hours'],
    correctAnswer: '5.5 hours',
    explanation: '6 1/4 hours = 6.25 hours. 3/4 hour = 0.75 hours. Lesson time = 6.25 - 0.75 = 5.5 hours',
    difficulty: 'hard'
  },
  {
    id: 'tf9',
    area: 'time-fractions',
    type: 'multiple-choice',
    question: 'If 2/3 of a journey takes 40 minutes, how long is the complete journey?',
    options: ['50 minutes', '55 minutes', '60 minutes', '65 minutes'],
    correctAnswer: '60 minutes',
    explanation: 'If 2/3 = 40 minutes, then 1/3 = 20 minutes. Complete journey = 3/3 = 3 × 20 = 60 minutes',
    difficulty: 'hard'
  },
  {
    id: 'tf10',
    area: 'time-fractions',
    type: 'fill-in',
    question: 'What fraction of an hour is 36 minutes? (Express as a fraction in lowest terms)',
    options: [],
    correctAnswer: '3/5',
    explanation: '36 minutes out of 60 minutes = 36/60 = 3/5 (dividing both by 12)',
    difficulty: 'hard'
  }
];

export const multiplicationDivisionExercises: Exercise[] = [
  {
    id: 'md1',
    area: 'multiplication-division',
    type: 'multiple-choice',
    question: 'What is 4.5 × 10?',
    options: ['45', '450', '4.5', '0.45'],
    correctAnswer: '45',
    explanation: 'When multiplying by 10, move the decimal point one place to the right: 4.5 × 10 = 45',
    difficulty: 'easy'
  },
  {
    id: 'md2',
    area: 'multiplication-division',
    type: 'multiple-choice',
    question: 'What is 67 ÷ 100?',
    options: ['6.7', '0.67', '670', '0.067'],
    correctAnswer: '0.67',
    explanation: 'When dividing by 100, move the decimal point two places to the left: 67 ÷ 100 = 0.67',
    difficulty: 'medium'
  },
  {
    id: 'md3',
    area: 'multiplication-division',
    type: 'multiple-choice',
    question: 'What is 0.8 × 1000?',
    options: ['8', '80', '800', '8000'],
    correctAnswer: '800',
    explanation: 'When multiplying by 1000, move the decimal point three places to the right: 0.8 × 1000 = 800',
    difficulty: 'medium'
  },
  {
    id: 'md4',
    area: 'multiplication-division',
    type: 'fill-in',
    question: 'What is 25 × 100?',
    options: [],
    correctAnswer: '2500',
    explanation: 'When multiplying by 100, move the decimal point two places to the right: 25 × 100 = 2500',
    difficulty: 'easy'
  },
  {
    id: 'md5',
    area: 'multiplication-division',
    type: 'multiple-choice',
    question: 'What is 12.34 ÷ 10?',
    options: ['123.4', '1.234', '0.1234', '1234'],
    correctAnswer: '1.234',
    explanation: 'When dividing by 10, move the decimal point one place to the left: 12.34 ÷ 10 = 1.234',
    difficulty: 'medium'
  },
  {
    id: 'md6',
    area: 'multiplication-division',
    type: 'multiple-choice',
    question: 'A packet of sweets weighs 0.045 kg. What is the weight in grams?',
    options: ['4.5 g', '45 g', '450 g', '4500 g'],
    correctAnswer: '45 g',
    explanation: 'To convert kg to grams, multiply by 1000: 0.045 × 1000 = 45 grams',
    difficulty: 'medium'
  },
  {
    id: 'md7',
    area: 'multiplication-division',
    type: 'fill-in',
    question: 'What is 7.89 × 10000?',
    options: [],
    correctAnswer: '78900',
    explanation: 'When multiplying by 10000, move the decimal point four places to the right: 7.89 × 10000 = 78900',
    difficulty: 'hard'
  },
  {
    id: 'md8',
    area: 'multiplication-division',
    type: 'multiple-choice',
    question: 'If 1 metre = 100 centimetres, how many metres is 325 centimetres?',
    options: ['3.25 m', '32.5 m', '0.325 m', '3250 m'],
    correctAnswer: '3.25 m',
    explanation: 'To convert cm to metres, divide by 100: 325 ÷ 100 = 3.25 metres',
    difficulty: 'hard'
  },
  {
    id: 'md9',
    area: 'multiplication-division',
    type: 'multiple-choice',
    question: 'What is 0.0072 × 1000?',
    options: ['0.72', '7.2', '72', '720'],
    correctAnswer: '7.2',
    explanation: 'When multiplying by 1000, move the decimal point three places to the right: 0.0072 × 1000 = 7.2',
    difficulty: 'hard'
  },
  {
    id: 'md10',
    area: 'multiplication-division',
    type: 'fill-in',
    question: 'A recipe calls for 2.4 litres of water. How many millilitres is this?',
    options: [],
    correctAnswer: '2400',
    explanation: 'To convert litres to millilitres, multiply by 1000: 2.4 × 1000 = 2400 millilitres',
    difficulty: 'medium'
  },
  {
    id: 'md11',
    area: 'multiplication-division',
    type: 'multiple-choice',
    question: 'What is 456.7 ÷ 1000?',
    options: ['4.567', '45.67', '0.4567', '4567'],
    correctAnswer: '0.4567',
    explanation: 'When dividing by 1000, move the decimal point three places to the left: 456.7 ÷ 1000 = 0.4567',
    difficulty: 'hard'
  },
  {
    id: 'md12',
    area: 'multiplication-division',
    type: 'multiple-choice',
    question: 'A toy costs £0.85. How much do 100 toys cost?',
    options: ['£8.50', '£85', '£850', '£8500'],
    correctAnswer: '£85',
    explanation: 'To find the cost of 100 toys: £0.85 × 100 = £85',
    difficulty: 'medium'
  }
];

export const getExercisesByArea = (area: string): Exercise[] => {
  switch (area) {
    case 'timetables':
      return timetableExercises;
    case 'speed-distance':
      return speedDistanceExercises;
    case 'rounding':
      return roundingExercises;
    case 'decimals':
      return decimalExercises;
    case 'thermometer':
      return thermometerExercises;
    case 'time-fractions':
      return timeFractionExercises;
    case 'multiplication-division':
      return multiplicationDivisionExercises;
    default:
      return [];
  }
};