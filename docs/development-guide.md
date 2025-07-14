# Development Guide

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)
- Modern web browser

### Installation
```bash
git clone <repository-url>
cd ai-math-app
npm install
```

### Development Commands
```bash
# Start development server
npm start                # Runs on http://localhost:3000

# Build for production
npm run build           # Creates optimized build in /build

# Run tests
npm test               # Runs test suite

# Eject (one-way operation)
npm run eject          # Exposes build configuration
```

## Adding New Exercises

### 1. Exercise Structure
All exercises follow this TypeScript interface:

```typescript
interface Exercise {
  id: string;                              // Unique identifier
  area: string;                           // Math area (e.g., 'timetables')
  type: 'multiple-choice' | 'fill-in';    // Question type
  question: string;                       // The question text
  options?: string[];                     // For multiple choice questions
  correctAnswer: string;                  // The correct answer
  explanation?: string;                   // Explanation of the solution
  difficulty: 'easy' | 'medium' | 'hard'; // Difficulty level
}
```

### 2. Adding Questions to Existing Areas
Edit `/src/utils/exercises.ts`:

```typescript
export const timetableExercises: Exercise[] = [
  // ... existing questions ...
  {
    id: 'tt6',  // Use next sequential ID
    area: 'timetables',
    type: 'multiple-choice',
    question: 'Your question here...',
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correctAnswer: 'Option B',
    explanation: 'Detailed explanation here...',
    difficulty: 'medium'
  }
];
```

### 3. Creating New Math Areas
1. **Add to type definitions** (`/src/types/index.ts`)
2. **Update childrenData** (`/src/utils/childrenData.ts`)
3. **Create exercise array** (`/src/utils/exercises.ts`)
4. **Update getExercisesByArea function**

Example:
```typescript
// 1. Add to mathAreas in childrenData.ts
export const mathAreas = {
  // ... existing areas ...
  'new-area': 'New Math Area Name'
};

// 2. Create exercise array in exercises.ts
export const newAreaExercises: Exercise[] = [
  // ... your exercises ...
];

// 3. Update getExercisesByArea function
export const getExercisesByArea = (area: string): Exercise[] => {
  switch (area) {
    // ... existing cases ...
    case 'new-area':
      return newAreaExercises;
    default:
      return [];
  }
};
```

## Component Development

### File Structure
- **Components**: Reusable UI components in `/src/components/`
- **Pages**: Full page components in `/src/pages/`
- **Hooks**: Custom React hooks in `/src/hooks/`
- **Utils**: Helper functions and data in `/src/utils/`

### Creating New Components
```typescript
// src/components/NewComponent.tsx
import React from 'react';

interface NewComponentProps {
  title: string;
  onAction: () => void;
}

const NewComponent: React.FC<NewComponentProps> = ({ title, onAction }) => {
  return (
    <div className="new-component">
      <h2>{title}</h2>
      <button onClick={onAction}>Action</button>
    </div>
  );
};

export default NewComponent;
```

### Adding Routes
Update `/src/App.tsx`:

```typescript
import NewPage from './pages/NewPage';

// In the Routes component:
<Routes>
  {/* ... existing routes ... */}
  <Route path="/new-page" element={<NewPage />} />
</Routes>
```

## Styling Guidelines

### CSS Organization
- Global styles in `/src/App.css`
- Component-specific styles should be added to App.css with descriptive class names
- Use BEM methodology for class naming

### Responsive Design
- Mobile-first approach
- Breakpoint: 768px for mobile/desktop
- Use CSS Grid and Flexbox
- Test on various screen sizes

### CSS Variables
```css
:root {
  --primary-color: #2c3e50;
  --secondary-color: #3498db;
  --success-color: #27ae60;
  --error-color: #e74c3c;
  --border-radius: 6px;
  --box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```

## Data Management

### Local Storage
- User data persisted automatically via `useLocalStorage` hook
- Data includes: child profiles, progress, quiz results
- Automatic JSON serialization/deserialization

### State Management
- React hooks for local state
- Custom hooks for shared logic
- No external state management library needed currently

### Adding New Data Types
1. **Define TypeScript interface** in `/src/types/index.ts`
2. **Create custom hook** if needed in `/src/hooks/`
3. **Update localStorage keys** to avoid conflicts

## Testing Strategy

### Manual Testing Checklist
- [ ] All routes navigate correctly
- [ ] Exercises load and function properly
- [ ] Progress tracking works
- [ ] Responsive design on mobile/desktop
- [ ] Local storage persists data
- [ ] Error handling for edge cases

### Browser Testing
- Chrome/Chromium
- Firefox
- Safari (if on Mac)
- Mobile browsers

## Performance Considerations

### Optimization Tips
- Keep exercise arrays manageable (20-50 questions max per area)
- Use React.memo for expensive components
- Lazy load routes if app grows large
- Optimize images in /public folder

### Bundle Size
- Current build size: ~500KB gzipped
- Monitor with `npm run build` output
- Consider code splitting for larger features

## Common Issues & Solutions

### TypeScript Errors
```bash
# Clear TypeScript cache
rm -rf node_modules/.cache
npm start
```

### Port Already in Use
```bash
# Use different port
PORT=3001 npm start

# Or kill process on port 3000
lsof -ti:3000 | xargs kill
```

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

## Deployment

### Static Hosting (Recommended)
```bash
npm run build
# Upload /build folder to:
# - Netlify (drag & drop)
# - Vercel (connect GitHub)
# - GitHub Pages
```

### Environment Variables
Create `.env` file for API keys:
```
REACT_APP_API_KEY=your_api_key_here
```

## Code Quality

### Linting
- ESLint configured with React rules
- Fix issues: `npm run lint --fix`
- Pre-commit hooks recommended

### TypeScript
- Strict mode enabled
- All components should be typed
- Use interfaces for complex types

### Git Workflow
```bash
# Feature development
git checkout -b feature/new-feature
git add .
git commit -m "Add new feature"
git push origin feature/new-feature
```

## Future Development

### Planned Features
1. **Quiz System**: Timed assessments with scoring
2. **Progress Charts**: Visual progress representation
3. **Parent Dashboard**: Overview of both children's progress
4. **External APIs**: Integration with educational content APIs
5. **Games**: Gamified learning experiences

### Technical Debt
- Add comprehensive testing (Jest + React Testing Library)
- Implement error boundaries
- Add loading states for better UX
- Consider state management library for complex features