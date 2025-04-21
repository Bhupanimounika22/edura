import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google Generative AI with your API key
const API_KEY = 'Enter your API key here';
const genAI = new GoogleGenerativeAI(API_KEY);

// Get the Gemini 1.5 Pro model
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

// Mock data for fallback when API fails - 20 diverse jobs
const MOCK_JOBS = [
  {
    id: 'job-1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120,000 - $150,000',
    description: 'We are looking for an experienced Frontend Developer to join our team and help build innovative web applications.',
    requirements: ['5+ years of React experience', 'TypeScript', 'CSS/SCSS', 'Testing frameworks'],
    skills: ['React', 'TypeScript', 'CSS/SCSS'],
    postedDate: '3 days ago',
    postedDays: 3,
    url: 'https://linkedin.com/jobs/view/senior-frontend-developer',
    source: 'LinkedIn',
    logo: 'https://logo.clearbit.com/techcorp.com'
  },
  {
    id: 'job-2',
    title: 'Backend Engineer',
    company: 'DataSystems',
    location: 'Remote',
    type: 'Full-time',
    salary: '$130,000 - $160,000',
    description: 'Join our backend team to develop scalable APIs and microservices for our data platform.',
    requirements: ['Node.js', 'Python', 'AWS', 'MongoDB', 'Microservices architecture'],
    skills: ['Node.js', 'Python', 'AWS'],
    postedDate: '1 day ago',
    postedDays: 1,
    url: 'https://indeed.com/jobs/backend-engineer',
    source: 'Indeed',
    logo: 'https://logo.clearbit.com/datasystems.io'
  },
  {
    id: 'job-3',
    title: 'Machine Learning Intern',
    company: 'AI Innovations',
    location: 'Boston, MA',
    type: 'Internship',
    salary: '$30 - $40 per hour',
    description: 'Summer internship opportunity for students interested in machine learning and AI research.',
    requirements: ['Currently pursuing CS degree', 'Python', 'Basic ML knowledge', 'TensorFlow or PyTorch'],
    skills: ['Python', 'Machine Learning', 'TensorFlow'],
    postedDate: '5 days ago',
    postedDays: 5,
    url: 'https://glassdoor.com/jobs/machine-learning-intern',
    source: 'Glassdoor',
    logo: 'https://logo.clearbit.com/aiinnovations.ai'
  },
  {
    id: 'job-4',
    title: 'DevOps Engineer',
    company: 'CloudScale',
    location: 'Seattle, WA',
    type: 'Full-time',
    salary: '$125,000 - $155,000',
    description: 'Help us build and maintain our cloud infrastructure and CI/CD pipelines.',
    requirements: ['Kubernetes', 'Docker', 'AWS/Azure', 'Terraform', 'CI/CD'],
    skills: ['Kubernetes', 'Docker', 'AWS'],
    postedDate: '2 days ago',
    postedDays: 2,
    url: 'https://linkedin.com/jobs/view/devops-engineer',
    source: 'LinkedIn',
    logo: 'https://logo.clearbit.com/cloudscale.io'
  },
  {
    id: 'job-5',
    title: 'Product Manager',
    company: 'UserFirst',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$130,000 - $170,000',
    description: 'Lead product development for our SaaS platform, working closely with design and engineering teams.',
    requirements: ['3+ years in product management', 'SaaS experience', 'Agile methodologies', 'Technical background'],
    skills: ['Product Management', 'SaaS', 'Agile'],
    postedDate: '4 days ago',
    postedDays: 4,
    url: 'https://indeed.com/jobs/product-manager',
    source: 'Indeed',
    logo: 'https://logo.clearbit.com/userfirst.com'
  },
  {
    id: 'job-6',
    title: 'UX/UI Designer',
    company: 'DesignHub',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$90,000 - $120,000',
    description: 'Create beautiful, intuitive user interfaces for web and mobile applications.',
    requirements: ['3+ years of UX/UI design experience', 'Figma', 'Adobe Creative Suite', 'User research'],
    skills: ['Figma', 'UI Design', 'User Research'],
    postedDate: '2 days ago',
    postedDays: 2,
    url: 'https://linkedin.com/jobs/view/ux-ui-designer',
    source: 'LinkedIn',
    logo: 'https://logo.clearbit.com/designhub.com'
  },
  {
    id: 'job-7',
    title: 'Data Science Intern',
    company: 'DataMinds',
    location: 'Chicago, IL',
    type: 'Internship',
    salary: '$25 - $35 per hour',
    description: 'Join our data science team to analyze large datasets and build predictive models.',
    requirements: ['Currently pursuing degree in Statistics, Math, or CS', 'Python', 'R', 'SQL', 'Basic ML knowledge'],
    skills: ['Python', 'R', 'SQL'],
    postedDate: '3 days ago',
    postedDays: 3,
    url: 'https://glassdoor.com/jobs/data-science-intern',
    source: 'Glassdoor',
    logo: 'https://logo.clearbit.com/dataminds.ai'
  },
  {
    id: 'job-8',
    title: 'Full Stack Developer',
    company: 'WebSolutions',
    location: 'Remote',
    type: 'Full-time',
    salary: '$110,000 - $140,000',
    description: 'Develop end-to-end web applications using modern JavaScript frameworks.',
    requirements: ['React', 'Node.js', 'MongoDB', 'Express', 'RESTful APIs'],
    skills: ['React', 'Node.js', 'MongoDB'],
    postedDate: '1 day ago',
    postedDays: 1,
    url: 'https://indeed.com/jobs/full-stack-developer',
    source: 'Indeed',
    logo: 'https://logo.clearbit.com/websolutions.io'
  },
  {
    id: 'job-9',
    title: 'iOS Developer',
    company: 'AppWorks',
    location: 'Los Angeles, CA',
    type: 'Full-time',
    salary: '$115,000 - $145,000',
    description: 'Build and maintain iOS applications for our suite of mobile products.',
    requirements: ['Swift', 'Objective-C', 'iOS SDK', 'CocoaPods', 'Git'],
    skills: ['Swift', 'iOS', 'Objective-C'],
    postedDate: '4 days ago',
    postedDays: 4,
    url: 'https://linkedin.com/jobs/view/ios-developer',
    source: 'LinkedIn',
    logo: 'https://logo.clearbit.com/appworks.dev'
  },
  {
    id: 'job-10',
    title: 'Android Developer Intern',
    company: 'MobileFirst',
    location: 'Seattle, WA',
    type: 'Internship',
    salary: '$28 - $35 per hour',
    description: 'Assist in developing Android applications and learn from experienced developers.',
    requirements: ['Java or Kotlin', 'Android Studio', 'Basic Android SDK knowledge'],
    skills: ['Kotlin', 'Android', 'Java'],
    postedDate: '2 days ago',
    postedDays: 2,
    url: 'https://glassdoor.com/jobs/android-developer-intern',
    source: 'Glassdoor',
    logo: 'https://logo.clearbit.com/mobilefirst.tech'
  },
  {
    id: 'job-11',
    title: 'Data Engineer',
    company: 'DataFlow',
    location: 'Remote',
    type: 'Full-time',
    salary: '$125,000 - $155,000',
    description: 'Design and implement data pipelines and infrastructure for our analytics platform.',
    requirements: ['Python', 'SQL', 'Apache Spark', 'Airflow', 'AWS/GCP'],
    skills: ['Python', 'SQL', 'Apache Spark'],
    postedDate: '3 days ago',
    postedDays: 3,
    url: 'https://indeed.com/jobs/data-engineer',
    source: 'Indeed',
    logo: 'https://logo.clearbit.com/dataflow.io'
  },
  {
    id: 'job-12',
    title: 'QA Engineer',
    company: 'QualityTech',
    location: 'Denver, CO',
    type: 'Full-time',
    salary: '$90,000 - $120,000',
    description: 'Ensure software quality through manual and automated testing processes.',
    requirements: ['Selenium', 'Jest', 'Cypress', 'JIRA', 'Test planning'],
    skills: ['Selenium', 'Cypress', 'Test Automation'],
    postedDate: '5 days ago',
    postedDays: 5,
    url: 'https://linkedin.com/jobs/view/qa-engineer',
    source: 'LinkedIn',
    logo: 'https://logo.clearbit.com/qualitytech.com'
  },
  {
    id: 'job-13',
    title: 'Cybersecurity Analyst',
    company: 'SecureNet',
    location: 'Washington, DC',
    type: 'Full-time',
    salary: '$110,000 - $140,000',
    description: 'Monitor and protect our systems and data from security threats and vulnerabilities.',
    requirements: ['Network security', 'Penetration testing', 'SIEM tools', 'Security certifications'],
    skills: ['Network Security', 'SIEM', 'Penetration Testing'],
    postedDate: '2 days ago',
    postedDays: 2,
    url: 'https://indeed.com/jobs/cybersecurity-analyst',
    source: 'Indeed',
    logo: 'https://logo.clearbit.com/securenet.io'
  },
  {
    id: 'job-14',
    title: 'Marketing Intern',
    company: 'GrowthLabs',
    location: 'New York, NY',
    type: 'Internship',
    salary: '$20 - $25 per hour',
    description: 'Assist with digital marketing campaigns, social media, and content creation.',
    requirements: ['Marketing or Communications student', 'Social media knowledge', 'Basic analytics'],
    skills: ['Digital Marketing', 'Social Media', 'Content Creation'],
    postedDate: '1 day ago',
    postedDays: 1,
    url: 'https://glassdoor.com/jobs/marketing-intern',
    source: 'Glassdoor',
    logo: 'https://logo.clearbit.com/growthlabs.com'
  },
  {
    id: 'job-15',
    title: 'Cloud Solutions Architect',
    company: 'CloudArch',
    location: 'Remote',
    type: 'Full-time',
    salary: '$140,000 - $180,000',
    description: 'Design and implement cloud-based solutions for enterprise clients.',
    requirements: ['AWS/Azure/GCP certification', 'IaC (Terraform/CloudFormation)', 'Microservices', 'Kubernetes'],
    skills: ['AWS', 'Terraform', 'Cloud Architecture'],
    postedDate: '4 days ago',
    postedDays: 4,
    url: 'https://linkedin.com/jobs/view/cloud-solutions-architect',
    source: 'LinkedIn',
    logo: 'https://logo.clearbit.com/cloudarch.io'
  },
  {
    id: 'job-16',
    title: 'Blockchain Developer',
    company: 'ChainTech',
    location: 'Miami, FL',
    type: 'Full-time',
    salary: '$130,000 - $170,000',
    description: 'Develop blockchain applications and smart contracts for our financial platform.',
    requirements: ['Solidity', 'Ethereum', 'Web3.js', 'Smart contracts', 'Cryptography'],
    skills: ['Solidity', 'Ethereum', 'Smart Contracts'],
    postedDate: '3 days ago',
    postedDays: 3,
    url: 'https://indeed.com/jobs/blockchain-developer',
    source: 'Indeed',
    logo: 'https://logo.clearbit.com/chaintech.io'
  },
  {
    id: 'job-17',
    title: 'Technical Writer',
    company: 'DocuTech',
    location: 'Portland, OR',
    type: 'Full-time',
    salary: '$85,000 - $110,000',
    description: 'Create clear, concise technical documentation for our software products.',
    requirements: ['Technical writing experience', 'Markdown/HTML', 'API documentation', 'Technical background'],
    skills: ['Technical Writing', 'API Documentation', 'Markdown'],
    postedDate: '2 days ago',
    postedDays: 2,
    url: 'https://linkedin.com/jobs/view/technical-writer',
    source: 'LinkedIn',
    logo: 'https://logo.clearbit.com/docutech.com'
  },
  {
    id: 'job-18',
    title: 'Game Development Intern',
    company: 'GameWorks',
    location: 'Austin, TX',
    type: 'Internship',
    salary: '$25 - $35 per hour',
    description: 'Assist in developing video games using Unity or Unreal Engine.',
    requirements: ['Unity or Unreal Engine', 'C# or C++', 'Game design principles', 'Computer Science student'],
    skills: ['Unity', 'C#', 'Game Development'],
    postedDate: '5 days ago',
    postedDays: 5,
    url: 'https://glassdoor.com/jobs/game-development-intern',
    source: 'Glassdoor',
    logo: 'https://logo.clearbit.com/gameworks.dev'
  },
  {
    id: 'job-19',
    title: 'AI Research Scientist',
    company: 'DeepMind Technologies',
    location: 'Boston, MA',
    type: 'Full-time',
    salary: '$150,000 - $200,000',
    description: 'Conduct cutting-edge research in artificial intelligence and machine learning.',
    requirements: ['PhD in CS, ML, or related field', 'Publication record', 'PyTorch/TensorFlow', 'Deep learning expertise'],
    skills: ['Machine Learning', 'Deep Learning', 'PyTorch'],
    postedDate: '1 day ago',
    postedDays: 1,
    url: 'https://indeed.com/jobs/ai-research-scientist',
    source: 'Indeed',
    logo: 'https://logo.clearbit.com/deepmind.ai'
  },
  {
    id: 'job-20',
    title: 'Embedded Systems Engineer',
    company: 'IoTech',
    location: 'San Diego, CA',
    type: 'Full-time',
    salary: '$120,000 - $150,000',
    description: 'Design and develop firmware for IoT devices and embedded systems.',
    requirements: ['C/C++', 'Microcontrollers', 'RTOS', 'Embedded Linux', 'Hardware interfaces (I2C, SPI, UART)'],
    skills: ['C/C++', 'Embedded Systems', 'RTOS'],
    postedDate: '4 days ago',
    postedDays: 4,
    url: 'https://linkedin.com/jobs/view/embedded-systems-engineer',
    source: 'LinkedIn',
    logo: 'https://logo.clearbit.com/iotech.io'
  }
];

/**
 * Fetch latest jobs and internships using Gemini AI
 * @param {Object} filters - Filters for job search
 * @param {string} filters.role - Job role/title
 * @param {string} filters.location - Job location
 * @param {string} filters.experience - Experience level
 * @param {string} filters.type - Job type (full-time, part-time, internship)
 * @returns {Promise<Array>} - List of jobs
 */
/**
 * Filter mock jobs based on provided filters
 * @param {Object} filters - Filters for job search
 * @returns {Array} - Filtered mock jobs
 */
const filterMockJobs = (filters = {}) => {
  const { role = '', location = '', experience = '', type = '' } = filters;
  
  console.log('Filtering mock jobs with criteria:', { role, location, type });
  
  // Return all mock jobs if no filters are provided
  if (!role && !location && !type) {
    return MOCK_JOBS;
  }
  
  // Filter the mock jobs based on the provided filters
  return MOCK_JOBS.filter(job => {
    // Filter by role/title
    if (role && !job.title.toLowerCase().includes(role.toLowerCase())) {
      return false;
    }
    
    // Filter by location
    if (location && !job.location.toLowerCase().includes(location.toLowerCase())) {
      return false;
    }
    
    // Filter by job type
    if (type && job.type.toLowerCase() !== type.toLowerCase()) {
      return false;
    }
    
    return true;
  });
};

export const fetchJobs = async (filters = {}) => {
  try {
    const { role = '', location = '', experience = '', type = '', fallback = false } = filters;
    
    // If fallback is explicitly requested, use mock data immediately
    if (fallback) {
      console.log('Fallback explicitly requested, using mock data');
      return filterMockJobs(filters);
    }
    
    // Create a prompt for the AI
    const prompt = `
    You are a job search assistant that helps users find the latest tech jobs and internships.
    
    Please find the latest ${type || 'jobs and internships'} for ${role || 'tech roles'} 
    ${location ? `in ${location}` : ''} 
    ${experience ? `for ${experience} level` : ''}.
    
    Focus on jobs from LinkedIn, Indeed, Glassdoor, AngelList, and other major job platforms.
    Make sure to include only real, current job postings that would likely be found on these platforms.
    
    Format your response as a JSON array with the following structure:
    [
      {
        "id": "unique-id",
        "title": "Job title",
        "company": "Company name",
        "location": "Job location",
        "type": "Full-time/Part-time/Internship/Contract",
        "salary": "Salary range if available",
        "description": "Brief job description",
        "requirements": ["requirement1", "requirement2", ...],
        "postedDate": "When the job was posted (e.g., '2 days ago')",
        "url": "URL to the job posting",
        "source": "LinkedIn/Indeed/Glassdoor/etc.",
        "logo": "Company logo URL (use a placeholder if not available)"
      }
    ]
    
    Include 10-15 diverse job listings that match the criteria. Make sure the jobs are realistic and represent what would actually be found on these platforms today.
    For URLs, use realistic URLs that would point to actual job listings on these platforms.
    For logos, use placeholder URLs like "https://logo.clearbit.com/[company-domain].com".
    `;

    console.log('Attempting to fetch jobs from API with filters:', filters);
    
    try {
      // Generate content
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Extract the JSON from the response
      const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/```\n([\s\S]*?)\n```/) || [null, text];
      const jsonString = jsonMatch[1] || text;
      
      try {
        // Parse the JSON
        const jobsData = JSON.parse(jsonString.trim());
        
        // Add skills array and postedDays if missing (for compatibility with the UI)
        const enhancedJobsData = jobsData.map(job => {
          const enhancedJob = { ...job };
          
          // Add skills if missing
          if (!enhancedJob.skills && enhancedJob.requirements) {
            enhancedJob.skills = enhancedJob.requirements.slice(0, 3); // Use first 3 requirements as skills
          } else if (!enhancedJob.skills) {
            enhancedJob.skills = ['JavaScript', 'React', 'Node.js']; // Default skills
          }
          
          // Add postedDays if missing
          if (!enhancedJob.postedDays && enhancedJob.postedDate) {
            const match = enhancedJob.postedDate.match(/(\d+)/);
            if (match) {
              enhancedJob.postedDays = parseInt(match[1], 10);
            } else {
              enhancedJob.postedDays = 3; // Default value
            }
          }
          
          return enhancedJob;
        });
        
        console.log(`Successfully fetched ${enhancedJobsData.length} jobs from API`);
        return enhancedJobsData;
      } catch (parseError) {
        console.error('Error parsing JSON from AI response:', parseError);
        // Try to clean the response and parse again
        const cleanedJson = jsonString
          .replace(/^```json\s*/, '')
          .replace(/\s*```$/, '')
          .trim();
        
        try {
          const parsedData = JSON.parse(cleanedJson);
          
          // Add skills array and postedDays if missing (for compatibility with the UI)
          const enhancedJobsData = parsedData.map(job => {
            const enhancedJob = { ...job };
            
            // Add skills if missing
            if (!enhancedJob.skills && enhancedJob.requirements) {
              enhancedJob.skills = enhancedJob.requirements.slice(0, 3); // Use first 3 requirements as skills
            } else if (!enhancedJob.skills) {
              enhancedJob.skills = ['JavaScript', 'React', 'Node.js']; // Default skills
            }
            
            // Add postedDays if missing
            if (!enhancedJob.postedDays && enhancedJob.postedDate) {
              const match = enhancedJob.postedDate.match(/(\d+)/);
              if (match) {
                enhancedJob.postedDays = parseInt(match[1], 10);
              } else {
                enhancedJob.postedDays = 3; // Default value
              }
            }
            
            return enhancedJob;
          });
          
          console.log(`Successfully parsed ${enhancedJobsData.length} jobs after cleanup`);
          return enhancedJobsData;
        } catch (secondParseError) {
          console.error('Failed to parse cleaned JSON:', secondParseError);
          console.log('Falling back to mock data due to parsing error');
          return filterMockJobs(filters);
        }
      }
    } catch (apiError) {
      console.error('API error:', apiError);
      console.log('Falling back to mock data due to API error');
      return filterMockJobs(filters);
    }
  } catch (error) {
    console.error('Error fetching jobs:', error);
    console.log('Falling back to mock data due to general error');
    return filterMockJobs(filters);
  }
};

/**
 * Get detailed information about a specific job
 * @param {Object} job - Basic job information
 * @returns {Promise<Object>} - Detailed job information
 */
// Mock job details for fallback
const MOCK_JOB_DETAILS = {
  fullDescription: "This position offers an exciting opportunity to work on cutting-edge technology in a collaborative environment. The ideal candidate will have strong technical skills and a passion for innovation.",
  responsibilities: [
    "Design and implement new features and functionality",
    "Write clean, maintainable, and efficient code",
    "Collaborate with cross-functional teams",
    "Participate in code reviews and technical discussions",
    "Troubleshoot and fix bugs and performance issues"
  ],
  qualifications: {
    required: [
      "Bachelor's degree in Computer Science or related field",
      "Strong programming skills",
      "Experience with modern development tools and practices",
      "Excellent problem-solving abilities"
    ],
    preferred: [
      "Master's degree in Computer Science or related field",
      "Previous experience in a similar role",
      "Contributions to open source projects",
      "Knowledge of cloud platforms (AWS, Azure, GCP)"
    ]
  },
  benefits: [
    "Competitive salary and equity options",
    "Health, dental, and vision insurance",
    "Flexible work arrangements",
    "Professional development budget",
    "Generous paid time off"
  ],
  companyInfo: {
    description: "Our company is dedicated to building innovative solutions that solve real-world problems. We value creativity, collaboration, and continuous learning.",
    industry: "Technology",
    size: "51-200 employees",
    founded: "2018",
    website: "https://company-website.com"
  },
  applicationTips: "Highlight your relevant experience and include examples of projects you've worked on. Be prepared to discuss technical challenges you've overcome.",
  similarRoles: [
    "Software Developer",
    "Application Engineer",
    "Full Stack Developer",
    "Systems Engineer"
  ]
};

export const getJobDetails = async (job) => {
  try {
    // If job is missing required fields, use fallback immediately
    if (!job || !job.title || !job.company) {
      console.log('Job missing required fields, using mock details');
      return {
        ...job,
        ...MOCK_JOB_DETAILS
      };
    }
    
    // Create a prompt for the AI
    const prompt = `
    You are a job search assistant that provides detailed information about job postings.
    
    Based on this basic job information:
    - Title: ${job.title}
    - Company: ${job.company}
    - Location: ${job.location}
    - Type: ${job.type}
    
    Please provide more detailed information about this job posting.
    
    Format your response as a JSON object with the following structure:
    {
      "fullDescription": "Detailed job description in markdown format",
      "responsibilities": ["responsibility1", "responsibility2", ...],
      "qualifications": {
        "required": ["required skill/qualification 1", "required skill/qualification 2", ...],
        "preferred": ["preferred skill/qualification 1", "preferred skill/qualification 2", ...]
      },
      "benefits": ["benefit1", "benefit2", ...],
      "companyInfo": {
        "description": "Brief company description",
        "industry": "Company industry",
        "size": "Company size (e.g., '1-50 employees', '51-200 employees', etc.)",
        "founded": "Year founded",
        "website": "Company website URL"
      },
      "applicationTips": "Tips for applying to this job",
      "similarRoles": ["similar role 1", "similar role 2", ...]
    }
    
    Make sure the information is realistic and represents what would actually be found for this type of job at this company.
    `;

    console.log('Fetching job details for:', job.title, 'at', job.company);
    
    try {
      // Generate content
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Extract the JSON from the response
      const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/```\n([\s\S]*?)\n```/) || [null, text];
      const jsonString = jsonMatch[1] || text;
      
      try {
        // Parse the JSON
        const jobDetails = JSON.parse(jsonString.trim());
        return {
          ...job,
          ...jobDetails
        };
      } catch (parseError) {
        console.error('Error parsing JSON from AI response:', parseError);
        // Try to clean the response and parse again
        const cleanedJson = jsonString
          .replace(/^```json\s*/, '')
          .replace(/\s*```$/, '')
          .trim();
        
        try {
          return {
            ...job,
            ...JSON.parse(cleanedJson)
          };
        } catch (secondParseError) {
          console.error('Failed to parse cleaned JSON:', secondParseError);
          console.log('Falling back to mock job details due to parsing error');
          return {
            ...job,
            ...MOCK_JOB_DETAILS
          };
        }
      }
    } catch (apiError) {
      console.error('API error:', apiError);
      console.log('Falling back to mock job details due to API error');
      return {
        ...job,
        ...MOCK_JOB_DETAILS
      };
    }
  } catch (error) {
    console.error('Error getting job details:', error);
    console.log('Falling back to mock job details due to general error');
    return {
      ...job,
      ...MOCK_JOB_DETAILS
    };
  }
};