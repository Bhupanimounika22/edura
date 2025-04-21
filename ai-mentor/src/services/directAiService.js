import geminiService from './geminiService';

/**
 * Service for direct client-side AI interactions without going through the backend
 * This is useful for features that don't need to store conversation history
 */
class DirectAIService {
  constructor() {
    this.service = geminiService;
  }

  /**
   * Get the Gemini service
   * @returns {Object} The Gemini service
   */
  getService() {
    // Check if Gemini is available
    if (geminiService.isAvailable()) {
      return geminiService;
    }
    
    // If not available, throw an error
    throw new Error('Gemini API service is not available. Please check your API key in the .env file.');
  }

  /**
   * Generate a response using Gemini
   * @param {string|Array} input - The input prompt string or messages array
   * @param {Object} options - Additional options for the API call
   * @returns {Promise<string>} The generated text response
   */
  async generateResponse(input, options = {}) {
    const service = this.getService();
    
    try {
      // Convert input to a string prompt if it's an array of messages
      const prompt = typeof input === 'string' ? input : this.convertMessagesToPrompt(input);
      const response = await service.generateResponse(prompt, options);
      return service.extractTextFromResponse(response);
    } catch (error) {
      console.error('Error generating AI response:', error);
      throw error;
    }
  }

  /**
   * Convert an array of chat messages to a single prompt string for Gemini
   * @param {Array} messages - The conversation messages
   * @returns {string} A formatted prompt string
   */
  convertMessagesToPrompt(messages) {
    return messages.map(msg => {
      const role = msg.role === 'assistant' ? 'AI' : msg.role === 'system' ? 'System' : 'User';
      return `${role}: ${msg.content}`;
    }).join('\n\n');
  }

  /**
   * Generate a roadmap based on user profile and preferences
   * @param {Object} userProfile - The user's profile information
   * @returns {Promise<string>} The generated roadmap
   */
  async generateRoadmap(userProfile) {
    const prompt = `
      Create a detailed learning roadmap for a ${userProfile.title} with ${userProfile.experience} experience.
      
      Their interests include: ${userProfile.interests.join(', ')}
      Their current skills: ${userProfile.skills.join(', ')}
      Their goals: ${userProfile.goals.join(', ')}
      
      The roadmap should include:
      1. Clear milestones and learning objectives
      2. Recommended resources for each stage
      3. Projects to build for practical experience
      4. Estimated timeline for completion
      
      Format the roadmap in a structured way with clear sections and bullet points.
    `;
    
    return this.generateResponse(prompt, {
      temperature: 0.7,
      maxTokens: 2048
    });
  }

  /**
   * Generate career advice based on user profile
   * @param {Object} userProfile - The user's profile information
   * @param {string} question - The specific career question
   * @returns {Promise<string>} The generated advice
   */
  async generateCareerAdvice(userProfile, question) {
    const prompt = `
      As a career advisor for someone in the ${userProfile.title} field with ${userProfile.experience} experience,
      please provide advice on the following question:
      
      "${question}"
      
      Consider their background:
      - Skills: ${userProfile.skills.join(', ')}
      - Interests: ${userProfile.interests.join(', ')}
      - Goals: ${userProfile.goals.join(', ')}
      
      Provide practical, actionable advice with specific steps they can take.
    `;
    
    return this.generateResponse(prompt, {
      temperature: 0.7,
      maxTokens: 1500
    });
  }
}

const directAiService = new DirectAIService();
export default directAiService;