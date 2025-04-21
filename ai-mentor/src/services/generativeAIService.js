import { GoogleGenerativeAI } from '@google/generative-ai';
 
const API_KEY = 'Enter your API key here';
const genAI = new GoogleGenerativeAI(API_KEY);
 
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

/**
 * Generate a learning roadmap based on user role and preferred languages
 * @param {string} role - User's role (e.g., "frontend", "backend", "fullstack", "data science")
 * @param {Array} languages - Array of user's preferred programming languages
 * @param {string} experienceLevel - User's experience level (e.g., "beginner", "intermediate", "advanced")
 * @returns {Promise<Object>} - Generated roadmap data
 */
export const generateRoadmap = async (role, languages = [], experienceLevel = 'beginner') => {
  try {
 
    const languagesText = languages.length > 0 
      ? `The user prefers the following programming languages: ${languages.join(', ')}.`
      : 'The user has not specified any preferred programming languages.';
    
    const prompt = `
    Generate a detailed learning roadmap for a ${experienceLevel} ${role} developer.
    
    ${languagesText}
    
    Format the response as a JSON object with the following structure:
    {
      "title": "Roadmap title",
      "description": "Brief description of the roadmap",
      "estimatedTimeToComplete": "Estimated time to complete the roadmap",
      "stages": [
        {
          "id": "unique-id",
          "title": "Stage title",
          "description": "Stage description",
          "timeToComplete": "Estimated time to complete this stage",
          "milestones": [
            {
              "id": "unique-id",
              "title": "Milestone title",
              "description": "Detailed description of what to learn",
              "resources": [
                {
                  "type": "video|article|book|course|tool",
                  "title": "Resource title",
                  "url": "URL to the resource",
                  "description": "Brief description of the resource"
                }
              ],
              "projects": [
                {
                  "title": "Project title",
                  "description": "Project description",
                  "difficulty": "beginner|intermediate|advanced",
                  "skills": ["skill1", "skill2"]
                }
              ]
            }
          ]
        }
      ]
    }
    
    Make sure to include at least 4-6 stages with 3-5 milestones each. For each milestone, include 2-4 resources and 1-2 project ideas.
    Resources should be real, popular, and high-quality learning materials with actual URLs.
    `;
 
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
  
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/```\n([\s\S]*?)\n```/) || [null, text];
    const jsonString = jsonMatch[1] || text;
    
    try {
 
      const roadmapData = JSON.parse(jsonString.trim());
      return roadmapData;
    } catch (parseError) {
      console.error('Error parsing JSON from AI response:', parseError);
 
      const cleanedJson = jsonString
        .replace(/^```json\s*/, '')
        .replace(/\s*```$/, '')
        .trim();
      return JSON.parse(cleanedJson);
    }
  } catch (error) {
    console.error('Error generating roadmap:', error);
    throw new Error('Failed to generate roadmap. Please try again later.');
  }
};

/**
 * Generate detailed content for a specific milestone
 * @param {Object} milestone - The milestone object
 * @param {string} role - User's role
 * @param {string} experienceLevel - User's experience level
 * @returns {Promise<Object>} - Enhanced milestone with detailed content
 */
export const generateMilestoneContent = async (milestone, role, experienceLevel) => {
  try {
    const prompt = `
    Generate detailed learning content for the following milestone in a ${role} developer roadmap for ${experienceLevel} level:
    
    Milestone: ${milestone.title}
    Description: ${milestone.description}
    
    Please provide:
    1. A comprehensive explanation of the concepts
    2. Step-by-step learning approach
    3. Common pitfalls and how to avoid them
    4. Practical examples
    5. Additional resources (videos, articles, books)
    
    Format the response as a JSON object with the following structure:
    {
      "content": "Detailed markdown content explaining the concepts",
      "examples": [
        {
          "title": "Example title",
          "code": "Code snippet or example",
          "explanation": "Explanation of the example"
        }
      ],
      "additionalResources": [
        {
          "type": "video|article|book|course",
          "title": "Resource title",
          "url": "URL to the resource",
          "description": "Brief description of the resource"
        }
      ]
    }
    `;
 
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
   
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/```\n([\s\S]*?)\n```/) || [null, text];
    const jsonString = jsonMatch[1] || text;
    
    try {
 
      const contentData = JSON.parse(jsonString.trim());
      return {
        ...milestone,
        detailedContent: contentData
      };
    } catch (parseError) {
      console.error('Error parsing JSON from AI response:', parseError);
 
      const cleanedJson = jsonString
        .replace(/^```json\s*/, '')
        .replace(/\s*```$/, '')
        .trim();
      return {
        ...milestone,
        detailedContent: JSON.parse(cleanedJson)
      };
    }
  } catch (error) {
    console.error('Error generating milestone content:', error);
    throw new Error('Failed to generate milestone content. Please try again later.');
  }
};