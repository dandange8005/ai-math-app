# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server (runs on http://localhost:3000)
npm start

# Build for production
npm run build

# Run tests in watch mode
npm test

# Run a single test file
npm test -- --testNamePattern="ComponentName"
```

## Project Context

This is **AI Math Helper**, a personalized educational web app for two specific children in the UK:
- **Ethan** (11, Year 6): Struggles with time tables/zones, speed/distance/time, rounding, decimals
- **Daniel** (9, Year 4): Struggles with thermometer scales, time fractions, multiplication/division by 10s

The app provides targeted practice exercises for their specific learning gaps identified through recent assessments.

## Architecture Overview

### Data Flow Architecture
The app uses a **local-first approach** with no backend. All data flows through:

1. **Local Storage Layer**: `useLocalStorage` hook persists all user data
2. **Data Management**: `useChildrenData` hook centralizes child profiles, progress tracking, and quiz results
3. **Exercise System**: Static exercise banks in `utils/exercises.ts` mapped to specific learning areas
4. **Progress Tracking**: Real-time updates to child progress stored locally

### Core Data Models

The app revolves around 4 primary interfaces:

- **Child**: Contains profile, struggling areas array, and progress tracking by area
- **Exercise**: Individual practice questions with multiple-choice/fill-in types, explanations, and difficulty levels
- **QuizResult**: Stores assessment outcomes with timing and scoring data
- **Progress**: Tracks completion statistics and learning analytics per area

### Exercise System Architecture

Exercises are organized by **learning area keys** that map to child struggling areas:
- Each area has 5 exercises in arrays (e.g., `timetableExercises`, `thermometerExercises`)
- `getExercisesByArea()` function routes area IDs to appropriate exercise arrays
- Exercise flow: Select area → Load exercises → Track progress → Update child data

### Routing & Navigation

Three main routes handle the learning flow:
- `/` - Home with child profile selection
- `/profile/:childId` - Individual dashboard showing areas and progress
- `/exercise/:areaId` - Interactive exercise session with instant feedback

Child IDs are hardcoded as 'ethan' and 'daniel' throughout the codebase.

## Key Implementation Details

### Adding New Exercises

1. **Add to existing area**: Append to exercise array in `src/utils/exercises.ts`
2. **New learning area**: 
   - Add area key to `mathAreas` object in `src/utils/childrenData.ts`
   - Create new exercise array
   - Update `getExercisesByArea()` switch statement
   - Add area to appropriate child's `strugglingAreas` array

### Progress Tracking Logic

Progress updates automatically when exercises complete via `updateChildProgress()`. The scoring system calculates percentage completion which updates the progress bars and statistics displayed on profile pages.

### Local Storage Strategy

All data persistence happens through the `useLocalStorage` hook which:
- Auto-serializes/deserializes JSON data
- Provides React state-like interface
- Supports functional updates for complex state changes
- Handles localStorage errors gracefully

### Styling Approach

Single CSS file (`App.css`) with component-specific classes. Uses CSS Grid for layouts, Flexbox for component alignment, and includes responsive breakpoints at 768px. Color scheme uses CSS custom properties defined at root level.

## Content Considerations

Exercise content is specifically tailored to address real learning gaps from recent assessments. When adding questions, ensure they align with the identified struggle areas and maintain age-appropriate difficulty levels. All exercises should include clear explanations for learning reinforcement.

The app targets UK curriculum expectations for Year 4 and Year 6 students who are towards the end of their academic year. Content aligns with the UK National Curriculum for mathematics at these key stages.