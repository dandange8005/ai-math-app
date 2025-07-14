# Math Question Data Sources

This document outlines various sources for expanding the AI Math Helper question bank with external data.

## 1. Open Educational Resources (OERs)

### Khan Academy API
- **URL**: https://www.khanacademy.org/api-reference
- **Content**: Thousands of math problems across all grade levels
- **Format**: JSON API responses
- **License**: Creative Commons (mostly free to use)
- **Best For**: High-quality, age-appropriate content with explanations
- **Implementation**: Direct API integration

### OpenStax
- **URL**: https://openstax.org/
- **Content**: Textbook problems and exercises
- **Format**: Can be scraped or they have some API access
- **License**: Creative Commons
- **Best For**: Structured curriculum-based questions

## 2. Government Educational Resources

### UK Department for Education
- **URL**: https://www.gov.uk/government/collections/national-curriculum-assessments-practice-materials
- **Content**: Practice SATs questions (perfect for Ethan & Daniel's age groups)
- **Format**: PDF that can be converted to structured data
- **License**: Open Government License
- **Best For**: UK curriculum-aligned questions

### Common Core State Standards (US)
- **URL**: http://www.corestandards.org/
- **Content**: Grade-level math problems aligned to standards
- **Format**: Various formats, often JSON/XML
- **License**: Public domain
- **Best For**: Standards-aligned practice questions

## 3. Educational APIs & Datasets

### Wolfram Alpha Education API
- **URL**: https://products.wolframalpha.com/api/
- **Content**: Can generate math problems programmatically
- **Format**: JSON API
- **Cost**: Paid but very comprehensive
- **Best For**: Dynamic question generation

### MathWorld by Wolfram
- **URL**: https://mathworld.wolfram.com/
- **Content**: Extensive math problem database
- **Format**: Structured data available
- **Best For**: Advanced mathematical concepts

## 4. Open Source Question Banks

### STACK (System for Teaching and Assessment using a Computer algebra Kernel)
- **URL**: https://stack-assessment.org/
- **Content**: Open source math assessment questions
- **Format**: XML/Moodle format (convertible to JSON)
- **License**: Open source
- **Best For**: University-level and advanced secondary questions

### Question2Answer Open Source
- **URL**: Various educational repositories on GitHub
- **Content**: Community-contributed math problems
- **Format**: Usually JSON or database dumps
- **License**: Varies by repository
- **Best For**: Community-driven content

## 5. Specific Sources for Our Topics

### For Ethan's Topics
**Time zones, Speed/Distance, Rounding, Decimals**

- **Time Zone API**: http://worldtimeapi.org/ (for generating realistic timezone questions)
- **Transportation APIs**: Train/bus schedule APIs for realistic timetable problems
- **Real-world datasets**: Government transport data for authentic problems

### For Daniel's Topics
**Thermometer reading, Time fractions, Multiplication/Division by 10s**

- **Weather APIs**: For realistic temperature-based questions
- **Recipe APIs**: For fraction-based cooking math problems
- **Measurement datasets**: For practical unit conversion problems

## 6. Recommended Implementation Approach

### Phase 1: Khan Academy Integration (Recommended Starting Point)
**Why Khan Academy?**
- ✅ High-quality, age-appropriate content
- ✅ Well-structured JSON format
- ✅ Free to use for educational purposes
- ✅ Covers all needed topics
- ✅ Has difficulty levels and explanations
- ✅ Trusted educational source

### Implementation Steps:
1. **Set up Khan Academy API access**
   - Register for API key
   - Study their data structure
   
2. **Create a data fetching service**
   - Build API wrapper functions
   - Handle rate limiting and errors
   
3. **Transform data format**
   - Map Khan Academy format to our `Exercise` interface
   - Preserve explanations and difficulty levels
   
4. **Cache questions locally**
   - Store in localStorage for offline use
   - Implement refresh mechanisms

### Phase 2: Hybrid Approach
- Combine multiple sources for variety
- Create question generators for infinite practice
- Add user-generated content capability

## 7. Technical Implementation Guide

### Current Exercise Interface
```typescript
interface Exercise {
  id: string;
  area: string;
  type: 'multiple-choice' | 'fill-in' | 'drag-drop';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}
```

### Data Source Integration Options
1. **API Integration**: Real-time fetching from external APIs
2. **Static JSON Files**: Pre-downloaded and processed question banks
3. **Hybrid Caching**: API + local storage for performance
4. **Question Generators**: Programmatic question creation

## 8. Legal and Licensing Considerations

- **Always check licenses** before using external content
- **Attribute sources** where required
- **Consider fair use** for educational purposes
- **Prefer open/Creative Commons** licensed content
- **Document sources** for each question used

## 9. Quality Assurance

### Question Validation Checklist
- [ ] Age-appropriate language and concepts
- [ ] Clear, unambiguous wording
- [ ] Correct answers verified
- [ ] Helpful explanations provided
- [ ] Appropriate difficulty level
- [ ] Aligned with learning objectives

### Testing Strategy
- Test questions with actual children
- Monitor completion rates and success rates
- Gather feedback on question clarity
- A/B test different explanation styles

## 10. Future Enhancements

- **Adaptive difficulty**: Adjust question difficulty based on performance
- **Personalized content**: Questions tailored to individual learning gaps
- **Progress analytics**: Track learning patterns and suggest focus areas
- **Gamification**: Add achievements and progress rewards
- **Collaborative features**: Parent-child shared progress tracking