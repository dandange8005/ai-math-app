import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mathAreas } from '../utils/childrenData';

interface StudyTip {
  title: string;
  description: string;
  examples: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface ExternalResource {
  title: string;
  description: string;
  url: string;
  type: 'website' | 'video' | 'app' | 'book';
  ageGroup: string;
}

const ResourceLibrary: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tips' | 'resources' | 'worksheets' | 'parent-guide'>('tips');
  const [selectedArea, setSelectedArea] = useState<string>('all');

  const studyTips: Record<string, StudyTip[]> = {
    'timetables': [
      {
        title: 'Skip Counting Method',
        description: 'Learn times tables by counting in multiples',
        examples: ['2x: 2, 4, 6, 8, 10...', '5x: 5, 10, 15, 20, 25...', '10x: 10, 20, 30, 40, 50...'],
        difficulty: 'beginner'
      },
      {
        title: 'Pattern Recognition',
        description: 'Find patterns in multiplication tables',
        examples: ['9x table: digits always add to 9', '11x table: repeat the single digit', 'Even x Even = Even'],
        difficulty: 'intermediate'
      },
      {
        title: 'Real-World Applications',
        description: 'Connect times tables to everyday situations',
        examples: ['Arrays of objects (3 rows of 4 = 12)', 'Money counting (4 groups of 5p)', 'Time intervals'],
        difficulty: 'advanced'
      }
    ],
    'speed-distance': [
      {
        title: 'Formula Triangle',
        description: 'Use the triangle method: Distance = Speed × Time',
        examples: ['Cover Distance to find S×T', 'Cover Speed to find D÷T', 'Cover Time to find D÷S'],
        difficulty: 'beginner'
      },
      {
        title: 'Units Consistency',
        description: 'Always check your units match throughout the problem',
        examples: ['Speed in mph needs time in hours', 'Speed in m/s needs time in seconds', 'Convert units first'],
        difficulty: 'intermediate'
      }
    ],
    'rounding': [
      {
        title: 'Number Line Visualization',
        description: 'Use a number line to see which number is closer',
        examples: ['47 is closer to 50 than 40', '23 is closer to 20 than 30', 'Halfway rounds up'],
        difficulty: 'beginner'
      },
      {
        title: 'Estimation Strategies',
        description: 'Round numbers to make mental calculations easier',
        examples: ['199 + 298 ≈ 200 + 300 = 500', '47 × 21 ≈ 50 × 20 = 1000', 'Check if answer is reasonable'],
        difficulty: 'intermediate'
      }
    ],
    'decimals': [
      {
        title: 'Place Value Understanding',
        description: 'Know what each decimal place represents',
        examples: ['0.5 = 5 tenths', '0.25 = 25 hundredths', '0.125 = 125 thousandths'],
        difficulty: 'beginner'
      },
      {
        title: 'Decimal-Fraction Connection',
        description: 'Connect decimals to fractions for better understanding',
        examples: ['0.5 = 1/2', '0.25 = 1/4', '0.75 = 3/4', '0.1 = 1/10'],
        difficulty: 'intermediate'
      }
    ],
    'thermometer': [
      {
        title: 'Scale Reading',
        description: 'Count the intervals between marked numbers',
        examples: ['If marks are 10°C apart, each line is 2°C', 'Start from 0 and count up', 'Look for halfway points'],
        difficulty: 'beginner'
      },
      {
        title: 'Temperature Contexts',
        description: 'Relate temperatures to real-world experiences',
        examples: ['Body temperature ≈ 37°C', 'Room temperature ≈ 20°C', 'Water freezes at 0°C'],
        difficulty: 'intermediate'
      }
    ],
    'time-fractions': [
      {
        title: 'Clock Face Division',
        description: 'Use the clock face to understand time fractions',
        examples: ['Half past = 1/2 hour = 30 minutes', 'Quarter past = 1/4 hour = 15 minutes', 'Quarter to = 45 minutes past'],
        difficulty: 'beginner'
      },
      {
        title: 'Time Calculations',
        description: 'Calculate time differences using fractions',
        examples: ['1.5 hours = 1 hour 30 minutes', '2/3 hour = 40 minutes', 'Add/subtract time systematically'],
        difficulty: 'intermediate'
      }
    ],
    'multiples-10': [
      {
        title: 'Zero Pattern',
        description: 'Multiplying by 10, 100, 1000 adds zeros',
        examples: ['23 × 10 = 230', '45 × 100 = 4500', '7 × 1000 = 7000'],
        difficulty: 'beginner'
      },
      {
        title: 'Division Patterns',
        description: 'Dividing by 10, 100, 1000 removes zeros or moves decimal',
        examples: ['230 ÷ 10 = 23', '4500 ÷ 100 = 45', '2.5 ÷ 10 = 0.25'],
        difficulty: 'intermediate'
      }
    ]
  };

  const externalResources: ExternalResource[] = [
    {
      title: 'BBC Bitesize KS2 Maths',
      description: 'Comprehensive curriculum-aligned resources for UK Year 4-6 students',
      url: 'https://www.bbc.co.uk/bitesize/subjects/z826n39',
      type: 'website',
      ageGroup: 'Ages 7-11'
    },
    {
      title: 'White Rose Maths',
      description: 'Free schemes of learning and resources for primary mathematics',
      url: 'https://whiteroseeducation.com/resources/primary-resources',
      type: 'website',
      ageGroup: 'Ages 5-11'
    },
    {
      title: 'Khan Academy Kids',
      description: 'Interactive learning app with personalized learning dashboard',
      url: 'https://www.khanacademy.org/kids',
      type: 'app',
      ageGroup: 'Ages 2-13'
    },
    {
      title: 'Times Tables Rock Stars',
      description: 'Fun multiplication tables practice with games and competitions',
      url: 'https://ttrockstars.com',
      type: 'app',
      ageGroup: 'Ages 6-14'
    },
    {
      title: 'Prodigy Math Game',
      description: 'Curriculum-aligned math game that adapts to each child\'s level',
      url: 'https://www.prodigygame.com',
      type: 'app',
      ageGroup: 'Ages 6-14'
    },
    {
      title: 'Mathematical Reasoning Series',
      description: 'Books focusing on developing critical thinking and problem-solving skills',
      url: 'https://www.criticalthinking.com/mathematical-reasoning-series',
      type: 'book',
      ageGroup: 'Ages 6-12'
    }
  ];

  const parentGuideContent = {
    'daily-practice': {
      title: 'Daily Practice Tips',
      points: [
        'Set aside 10-15 minutes daily for focused math practice',
        'Use real-world situations to reinforce concepts (cooking, shopping, time)',
        'Celebrate small wins and progress, not just perfect scores',
        'Make it fun with games, puzzles, and interactive activities',
        'Be patient and encourage effort over natural ability'
      ]
    },
    'supporting-struggles': {
      title: 'Supporting Learning Struggles',
      points: [
        'Break complex problems into smaller, manageable steps',
        'Use visual aids like number lines, shapes, and manipulatives',
        'Connect new concepts to things your child already understands',
        'Allow extra time and multiple attempts without pressure',
        'Communicate with teachers about progress and concerns'
      ]
    },
    'growth-mindset': {
      title: 'Building a Growth Mindset',
      points: [
        'Praise effort and strategy use: "I like how you tried different approaches"',
        'Normalize mistakes: "Mistakes help our brains grow stronger"',
        'Use "yet" language: "You haven\'t mastered this YET"',
        'Share your own learning experiences and challenges',
        'Focus on improvement and progress over comparison to others'
      ]
    },
    'when-to-help': {
      title: 'When and How to Provide Help',
      points: [
        'Let them struggle productively for a few minutes before stepping in',
        'Ask guiding questions rather than giving direct answers',
        'Work through similar examples together',
        'Encourage them to explain their thinking process',
        'Know when to take a break and return to the problem later'
      ]
    }
  };

  const worksheetTopics = [
    { area: 'timetables', title: 'Times Tables Practice Sheets', description: 'Progressive difficulty worksheets for each times table' },
    { area: 'speed-distance', title: 'Speed Distance Time Problems', description: 'Word problems and formula practice' },
    { area: 'rounding', title: 'Rounding and Estimation', description: 'Number line activities and real-world rounding' },
    { area: 'decimals', title: 'Decimal Operations', description: 'Place value, addition, subtraction, and comparison' },
    { area: 'thermometer', title: 'Reading Scales', description: 'Thermometer and other measuring instrument practice' },
    { area: 'time-fractions', title: 'Time and Fractions', description: 'Clock reading and time calculations' },
    { area: 'multiples-10', title: 'Powers of 10', description: 'Multiplication and division by 10, 100, 1000' }
  ];

  const getFilteredTips = () => {
    if (selectedArea === 'all') {
      return Object.entries(studyTips).flatMap(([area, tips]) => 
        tips.map(tip => ({ ...tip, area }))
      );
    }
    return studyTips[selectedArea] || [];
  };

  const renderTipsTab = () => (
    <div className="resource-section">
      <div className="section-header">
        <h2>Study Tips & Strategies</h2>
        <p>Proven techniques to help children master each math area</p>
      </div>
      
      <div className="filter-controls">
        <label>Filter by Math Area:</label>
        <select 
          value={selectedArea} 
          onChange={(e) => setSelectedArea(e.target.value)}
          className="area-filter"
        >
          <option value="all">All Areas</option>
          {Object.keys(mathAreas).map(areaId => (
            <option key={areaId} value={areaId}>
              {mathAreas[areaId as keyof typeof mathAreas]}
            </option>
          ))}
        </select>
      </div>

      <div className="tips-grid">
        {getFilteredTips().map((tip, index) => (
          <div key={index} className={`tip-card ${tip.difficulty}`}>
            <div className="tip-header">
              <h3>{tip.title}</h3>
              <span className={`difficulty-badge ${tip.difficulty}`}>
                {tip.difficulty}
              </span>
            </div>
            <p className="tip-description">{tip.description}</p>
            <div className="tip-examples">
              <h4>Examples:</h4>
              <ul>
                {tip.examples.map((example, idx) => (
                  <li key={idx}>{example}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderResourcesTab = () => (
    <div className="resource-section">
      <div className="section-header">
        <h2>External Resources</h2>
        <p>Carefully curated resources to supplement learning</p>
      </div>
      
      <div className="resources-grid">
        {externalResources.map((resource, index) => (
          <div key={index} className="resource-card">
            <div className="resource-header">
              <h3>{resource.title}</h3>
              <div className="resource-meta">
                <span className={`resource-type ${resource.type}`}>
                  {resource.type}
                </span>
                <span className="age-group">{resource.ageGroup}</span>
              </div>
            </div>
            <p className="resource-description">{resource.description}</p>
            <a 
              href={resource.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="resource-link"
            >
              Visit Resource →
            </a>
          </div>
        ))}
      </div>
    </div>
  );

  const renderWorksheetsTab = () => (
    <div className="resource-section">
      <div className="section-header">
        <h2>Practice Worksheets</h2>
        <p>Printable worksheets for additional practice at home</p>
      </div>
      
      <div className="worksheets-grid">
        {worksheetTopics.map((worksheet, index) => (
          <div key={index} className="worksheet-card">
            <h3>{worksheet.title}</h3>
            <p>{worksheet.description}</p>
            <div className="worksheet-actions">
              <button className="download-btn" disabled>
                📄 Download PDF
              </button>
              <Link to={`/exercise/${worksheet.area}`} className="practice-btn">
                Practice Online
              </Link>
            </div>
            <small className="coming-soon">PDF downloads coming soon!</small>
          </div>
        ))}
      </div>
    </div>
  );

  const renderParentGuideTab = () => (
    <div className="resource-section">
      <div className="section-header">
        <h2>Parent Guide</h2>
        <p>Evidence-based strategies for supporting your child's math learning</p>
      </div>
      
      <div className="parent-guide-grid">
        {Object.entries(parentGuideContent).map(([key, guide]) => (
          <div key={key} className="guide-card">
            <h3>{guide.title}</h3>
            <ul className="guide-points">
              {guide.points.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="additional-support">
        <h3>Additional Support</h3>
        <div className="support-links">
          <div className="support-item">
            <h4>🏫 School Communication</h4>
            <p>Regular communication with your child's teacher about progress and any concerns can help create a consistent learning approach between home and school.</p>
          </div>
          <div className="support-item">
            <h4>👥 Study Groups</h4>
            <p>Consider organizing small study groups with classmates for peer learning and social motivation.</p>
          </div>
          <div className="support-item">
            <h4>🎯 Professional Support</h4>
            <p>If struggles persist, consider consulting with a math tutor or educational specialist for personalized strategies.</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="resource-library">
      <div className="resource-header">
        <h1>📚 Learning Resource Library</h1>
        <p>Comprehensive resources to support Ethan and Daniel's math learning journey</p>
      </div>

      <div className="resource-tabs">
        <button 
          className={`tab-button ${activeTab === 'tips' ? 'active' : ''}`}
          onClick={() => setActiveTab('tips')}
        >
          💡 Study Tips
        </button>
        <button 
          className={`tab-button ${activeTab === 'resources' ? 'active' : ''}`}
          onClick={() => setActiveTab('resources')}
        >
          🌐 External Resources
        </button>
        <button 
          className={`tab-button ${activeTab === 'worksheets' ? 'active' : ''}`}
          onClick={() => setActiveTab('worksheets')}
        >
          📄 Worksheets
        </button>
        <button 
          className={`tab-button ${activeTab === 'parent-guide' ? 'active' : ''}`}
          onClick={() => setActiveTab('parent-guide')}
        >
          👨‍👩‍👧‍👦 Parent Guide
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'tips' && renderTipsTab()}
        {activeTab === 'resources' && renderResourcesTab()}
        {activeTab === 'worksheets' && renderWorksheetsTab()}
        {activeTab === 'parent-guide' && renderParentGuideTab()}
      </div>
    </div>
  );
};

export default ResourceLibrary;