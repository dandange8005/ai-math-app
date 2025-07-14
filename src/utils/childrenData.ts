import { Child } from '../types';

export const defaultChildrenData: Record<string, Child> = {
  ethan: {
    id: 'ethan',
    name: 'Ethan',
    age: 11,
    grade: 6,
    strugglingAreas: ['timetables', 'speed-distance', 'rounding', 'decimals'],
    progress: {
      'timetables': 0,
      'speed-distance': 0,
      'rounding': 0,
      'decimals': 0
    }
  },
  daniel: {
    id: 'daniel',
    name: 'Daniel',
    age: 9,
    grade: 4,
    strugglingAreas: ['thermometer', 'time-fractions', 'multiplication-division'],
    progress: {
      'thermometer': 0,
      'time-fractions': 0,
      'multiplication-division': 0
    }
  }
};

export const mathAreas = {
  'timetables': 'Time Tables & Time Zones',
  'speed-distance': 'Speed, Distance & Time',
  'rounding': 'Rounding Estimation',
  'decimals': 'Decimal Problem Solving',
  'thermometer': 'Thermometer Scale Reading',
  'time-fractions': 'Time Fraction Interpretation',
  'multiplication-division': 'Multiplication/Division by 10s'
};