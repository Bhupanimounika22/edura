import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google Generative AI with your API key
const API_KEY = 'Enter your API key here';
const genAI = new GoogleGenerativeAI(API_KEY);

// Get the Gemini 1.5 Pro model
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

/**
 * Get career advice from Gemini AI
 * @param {string} query - User's career question
 * @returns {Promise<Object>} - Career advice data
 */
export const getCareerAdvice = async (query) => {
  try {
    // Create a prompt for the AI
    const prompt = `
    You are a career advisor specializing in technology and software development careers.
    
    User query: "${query}"
    
    Based on the user's query, provide career advice focusing on:
    1. Future-proof tech roles and jobs
    2. Skills that will be in demand
    3. Career paths with growth potential
    
    Format your response as a JSON object with the following structure:
    {
      "summary": "Brief summary of your advice",
      "roles": [
        {
          "title": "Role title",
          "description": "Brief description of the role",
          "growthPotential": "High/Medium/Low",
          "salaryRange": "Salary range (e.g., $80K-120K)"
        }
      ],
      "skills": [
        {
          "name": "Skill name",
          "description": "Why this skill is important",
          "importance": "High/Medium/Low"
        }
      ],
      "learningPath": "Suggested learning path or steps to take",
      "additionalAdvice": "Any other relevant advice"
    }
    
    Include 3-5 roles and 4-6 skills. Make sure your advice is specific, actionable, and based on current industry trends.
    If the user's query is about a specific role or skill, focus your response on that area.
    `;

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract the JSON from the response
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/```\n([\s\S]*?)\n```/) || [null, text];
    const jsonString = jsonMatch[1] || text;
    
    try {
      // Parse the JSON
      const adviceData = JSON.parse(jsonString.trim());
      return adviceData;
    } catch (parseError) {
      console.error('Error parsing JSON from AI response:', parseError);
      // Try to clean the response and parse again
      const cleanedJson = jsonString
        .replace(/^```json\s*/, '')
        .replace(/\s*```$/, '')
        .trim();
      return JSON.parse(cleanedJson);
    }
  } catch (error) {
    console.error('Error getting career advice:', error);
    throw new Error('Failed to get career advice. Please try again later.');
  }
};