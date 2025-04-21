import { GEMINI_API_KEY } from '../utils/config';

/**
 * Service for interacting with the Gemini API
 */
class GeminiService {
  constructor() {
    this.apiKey = GEMINI_API_KEY;
    this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models';
    this.model = 'gemini-pro';
  }

  /**
   * Check if the Gemini API is configured
   * @returns {boolean} Whether Gemini is available
   */
  isAvailable() {
    return this.apiKey && this.apiKey !== 'enter your api key here';
  }

  /**
   * Generate a response from the Gemini API
   * @param {string} prompt - The user prompt
   * @param {Object} options - Additional options for the API call
   * @returns {Promise<Object>} The API response
   */
  async generateResponse(prompt, options = {}) {
    if (!this.isAvailable()) {
      throw new Error('Gemini API is not enabled or API key is not configured');
    }

    const url = `${this.baseUrl}/${this.model}:generateContent?key=${this.apiKey}`;
    
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ],
      generationConfig: {
        temperature: options.temperature || 0.7,
        topK: options.topK || 40,
        topP: options.topP || 0.95,
        maxOutputTokens: options.maxTokens || 1024,
        stopSequences: options.stopSequences || []
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
      ]
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Gemini API error: ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw error;
    }
  }

  /**
   * Extract the text from a Gemini API response
   * @param {Object} response - The API response
   * @returns {string} The extracted text
   */
  extractTextFromResponse(response) {
    try {
      return response.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Error extracting text from Gemini response:', error);
      return '';
    }
  }
}

const geminiService = new GeminiService();
export default geminiService;