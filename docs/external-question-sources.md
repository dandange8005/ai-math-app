# External Question Sources for AI Math Helper

This document provides comprehensive information about external sources for expanding the question pool in the AI Math Helper app, specifically targeting Year 4 and Year 6 UK curriculum mathematics.

## 🎯 Current Challenge

The AI Math Helper app currently has 35 questions (5 per math area) covering:
- **Ethan's Areas**: Times tables/time zones, Speed/distance/time, Rounding, Decimals
- **Daniel's Areas**: Thermometer scales, Time fractions, Multiplication/division by 10s

To enhance learning outcomes, we need to expand the question pool with high-quality, curriculum-aligned content.

## 📚 Available Question Sources

### 1. UK Educational Question Banks

#### Testbase Question Banks ⭐ **RECOMMENDED**
- **Coverage**: Years 1-6, KS1 and KS2 national curriculum aligned
- **Content**: Thousands of questions from past KS2 SATs and optional test papers
- **Features**: 
  - Questions assess both procedural fluency and conceptual understanding
  - Each question includes mark schemes for evaluation
  - Searchable by topic, curriculum area, and difficulty level
- **Access**: Subscription-based platform trusted by 12,000+ primary schools
- **Website**: https://www.testbase.co.uk/question-banks/

#### Maths.co.uk
- **Coverage**: KS1 & KS2 standardised assessments
- **Content**: 10,000+ math questions for custom test creation
- **Features**:
  - 300+ online assessments
  - Termly standardised tests
  - Arithmetic and reasoning tests
- **Access**: Subscription-based
- **Website**: https://www.maths.co.uk/

#### Exampro Mathematics
- **Coverage**: KS2 and KS3 (Years 7-10)
- **Content**: 3,500+ questions from past papers
- **Features**:
  - Mapped to national curriculum and GCSE objectives
  - Drag-and-drop question builder
  - Export to PDF, Word, or web links
- **Access**: Subscription-based
- **Website**: https://www.exampro.co.uk/mathematics/

### 2. White Rose Maths Resources

#### White Rose Maths + Diagnostic Questions ⭐ **HIGHLY RECOMMENDED**
- **Coverage**: Years 2-6 with specific focus on White Rose scheme
- **Content**: 5-question quizzes for each "Small Step" in the curriculum
- **Features**:
  - Quiz A, B, and C for each topic (progressive difficulty)
  - Aligned with White Rose Maths mastery approach
  - Covers all Year 4 and Year 6 topics needed
- **Access**: Free platform with premium features
- **Website**: https://diagnosticquestions.com/whiterose

#### White Rose Maths Infinity
- **Coverage**: All year groups following White Rose scheme
- **Content**: Infinite bank of high-quality fluency questions
- **Features**:
  - Directly linked to White Rose schemes
  - Teaching videos and front-of-class slides
  - Rapid reasoning problems
- **Access**: Subscription required
- **Website**: https://whiteroseeducation.com/resources

#### LbQ (Learning by Questions)
- **Coverage**: Based on 5 Big Ideas of maths mastery
- **Content**: Interactive question sets with adaptive progression
- **Features**:
  - Automatic progression through difficulty levels
  - Understanding → Fluency → Reasoning → Problem solving
  - Real-time feedback and assessment
- **Access**: School subscription model
- **Website**: https://www.lbq.org/

### 3. BBC Bitesize Resources

#### BBC Bitesize KS2 Mathematics
- **Coverage**: Complete KS2 curriculum coverage
- **Content**: Interactive games, quizzes, and worksheets
- **Features**:
  - "Guardians: Defenders of Mathematica" game
  - Times tables, fractions, decimals, and more
  - Printable worksheets and activities
- **Access**: Free public resource
- **Website**: https://www.bbc.co.uk/bitesize/subjects/z826n39

### 4. Open Educational Resources

#### Third Space Learning
- **Coverage**: KS1 and KS2 mathematics
- **Content**: Free home learning packs and resources
- **Features**:
  - Year 1-6 curriculum alignment
  - White Rose Maths resource summaries
  - Free downloadable materials
- **Access**: Free resources available
- **Website**: https://thirdspacelearning.com/

#### Mathsframe
- **Coverage**: Curriculum-aligned mathematics games
- **Content**: Interactive games and activities
- **Features**:
  - Levels based on Year 1-6 objectives
  - Topics include multiplication, fractions, Roman numerals
  - Interactive and engaging format
- **Access**: Free with premium features
- **Website**: https://mathsframe.co.uk/

## 🔧 Integration Strategies

### 1. API Integration Approaches

#### Current API Status
- **Khan Academy API**: Discontinued in 2020 ❌
- **OpenStax API**: Limited to college-level content ❌
- **Direct BBC Bitesize API**: Not publicly available ❌

#### Available Integration Methods

**1. Diagnostic Questions Integration**
```javascript
// Potential approach for Diagnostic Questions
const fetchWhiteRoseQuestions = async (topic, yearGroup) => {
  // Would require API key or partnership
  const response = await fetch(`/api/diagnostic-questions`, {
    method: 'POST',
    headers: { 'Authorization': 'Bearer YOUR_API_KEY' },
    body: JSON.stringify({ topic, yearGroup })
  });
  return response.json();
};
```

**2. Smartgrade API Integration**
```javascript
// Smartgrade offers API integration for assessment data
const integrateSmartgradeAPI = async (assessmentData) => {
  // API allows integration with other systems
  const response = await fetch('/api/smartgrade-integration', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(assessmentData)
  });
  return response.json();
};
```

### 2. Content Scraping and Parsing

#### Web Scraping Approach (Educational Use)
```javascript
// Example for educational content extraction
const scrapeEducationalContent = async (url) => {
  // Use libraries like Puppeteer or Cheerio
  const content = await fetch(url);
  const parsedContent = parseEducationalQuestions(content);
  return formatForApp(parsedContent);
};
```

#### PDF Content Extraction
```javascript
// For extracting questions from educational PDFs
const extractFromPDF = async (pdfUrl) => {
  // Use pdf-parse or similar library
  const pdfContent = await parsePDF(pdfUrl);
  return extractQuestions(pdfContent);
};
```

### 3. Manual Content Curation

#### Question Bank Development
1. **Content Review**: Manually review and select questions from free resources
2. **Format Standardization**: Convert to app's question format
3. **Quality Assurance**: Ensure curriculum alignment and difficulty progression
4. **Rights Compliance**: Verify usage rights for educational purposes

#### Structured Data Creation
```typescript
// Enhanced exercise structure for external sources
interface ExternalExercise extends Exercise {
  source: string;
  sourceUrl?: string;
  curriculumAlignment: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  lastUpdated: Date;
}
```

### 4. Partnership and Licensing

#### Educational Partnerships
- **School Subscriptions**: Partner with schools that have access to premium resources
- **Educational Licenses**: Obtain licenses for educational content use
- **Content Partnerships**: Work with content creators for question development

#### API Access Requests
- **Diagnostic Questions**: Request API access for educational projects
- **White Rose Maths**: Inquire about content partnership opportunities
- **BBC Educational**: Contact for educational content licensing

## 📊 Topic-Specific Sources

### Ethan's Areas (Year 6)

#### Times Tables/Time Zones
- **White Rose Maths**: Year 4 Block 4 - Multiplication and Division
- **Diagnostic Questions**: 3, 6, 9, 7, 11, 12 times tables quizzes
- **BBC Bitesize**: Times tables games and activities
- **Mathsframe**: Interactive times tables games

#### Speed/Distance/Time
- **White Rose Maths**: Year 6 measurement and problem-solving
- **Testbase**: KS2 word problems and reasoning questions
- **Third Space Learning**: Speed/distance/time worksheets

#### Rounding & Estimation
- **White Rose Maths**: Year 4 Place Value - Rounding to nearest 1000
- **Diagnostic Questions**: Place value and rounding quizzes
- **BBC Bitesize**: Rounding number activities

#### Decimals
- **White Rose Maths**: Year 4 Summer Decimals resources
- **Diagnostic Questions**: Decimal comparison and ordering quizzes
- **LbQ**: Decimal fluency question sets

### Daniel's Areas (Year 4)

#### Thermometer Scales
- **White Rose Maths**: Year 2 Mass, Capacity and Temperature (adapted)
- **Math Worksheets 4 Kids**: Temperature reading worksheets
- **Third Space Learning**: Measurement and scales resources

#### Time Fractions
- **White Rose Maths**: Year 4 Fractions and Time
- **Diagnostic Questions**: Time and fraction relationship quizzes
- **BBC Bitesize**: Time fraction activities

#### Multiplication/Division by 10s
- **White Rose Maths**: Year 4 Place Value and Multiplication
- **Diagnostic Questions**: Powers of 10 quizzes
- **Mathsframe**: Multiplication by 10, 100, 1000 games

## 🚀 Implementation Roadmap

### Phase 1: Free Resource Integration (Immediate)
1. **Manual Content Curation**
   - Extract questions from BBC Bitesize activities
   - Adapt White Rose Maths free resources
   - Create questions based on Third Space Learning materials

2. **Content Standardization**
   - Convert to app's question format
   - Ensure curriculum alignment
   - Add difficulty progression

### Phase 2: API Integration (Short-term)
1. **Diagnostic Questions Partnership**
   - Request API access for educational use
   - Integrate White Rose aligned questions
   - Implement automated question fetching

2. **Smartgrade Integration**
   - Explore API integration possibilities
   - Connect assessment data with app progress

### Phase 3: Advanced Integration (Long-term)
1. **School Partnerships**
   - Partner with schools for premium resource access
   - Implement teacher dashboard features
   - Enable curriculum mapping

2. **AI-Powered Question Generation**
   - Use machine learning to generate similar questions
   - Maintain curriculum alignment
   - Ensure quality and variety

## 📝 Legal and Ethical Considerations

### Copyright and Usage Rights
- **Educational Use**: Most resources allow educational use with proper attribution
- **Commercial Use**: May require licensing for commercial applications
- **Attribution**: Always provide proper source attribution

### Data Privacy
- **GDPR Compliance**: Ensure data handling meets UK privacy requirements
- **Child Privacy**: Special considerations for under-13 users
- **Data Minimization**: Only collect necessary educational data

### Quality Assurance
- **Curriculum Alignment**: Verify all content meets UK curriculum standards
- **Age Appropriateness**: Ensure content is suitable for target age groups
- **Accessibility**: Make content accessible to all learners

## 🎯 Recommended Next Steps

### Immediate Actions
1. **Start with Free Resources**: Begin with BBC Bitesize and Third Space Learning content
2. **Create Content Pipeline**: Establish process for question curation and formatting
3. **Implement Source Tracking**: Add source attribution to all questions

### Short-term Goals
1. **Expand Question Pool**: Target 50+ questions per area (current: 5 per area)
2. **Add Difficulty Progression**: Implement beginner/intermediate/advanced levels
3. **Source Diversification**: Use multiple sources for each topic

### Long-term Vision
1. **API Integration**: Implement automated question fetching
2. **AI Enhancement**: Use AI to generate contextually appropriate questions
3. **Curriculum Evolution**: Stay updated with curriculum changes and new resources

## 📊 Success Metrics

### Quantitative Measures
- **Question Pool Size**: Target 200+ questions total (vs current 35)
- **Source Diversity**: Minimum 3 sources per topic area
- **Difficulty Distribution**: 40% beginner, 40% intermediate, 20% advanced

### Qualitative Indicators
- **Curriculum Alignment**: 100% alignment with UK Year 4-6 standards
- **Content Quality**: High-quality, engaging questions with clear explanations
- **User Engagement**: Increased time spent and return visits

---

**Note**: This document should be regularly updated as new resources become available and API access changes. Always verify current availability and terms of use for external resources.