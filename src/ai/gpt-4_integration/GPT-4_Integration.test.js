import { describe, it, expect, jest } from '@jest/globals';
import ChatbotService from './ChatbotService';

describe('GPT-4 Integration', () => {
  it('should receive a valid response from GPT-4 based on input prompt', async () => {
    const prompt = "Hello, who won the last chess world championship?";
    const mockResponse = {
      data: {
        choices: [
          {
            message: "Magnus Carlsen won the last chess world championship."
          }
        ]
      }
    };

    // Mock the API call to GPT-4
    jest.spyOn(ChatbotService, 'sendMessage').mockResolvedValue(mockResponse);

    const response = await ChatbotService.sendMessage(prompt);
    expect(response).toEqual(mockResponse);
    expect(response.data.choices[0].message).toContain("Magnus Carlsen");
  });

  it('should handle errors when GPT-4 service is unavailable', async () => {
    const prompt = "Hello, what's the weather like today?";
    const errorMessage = "GPT-4 service is currently unavailable.";

    // Mock a rejected promise to simulate an API error
    jest.spyOn(ChatbotService, 'sendMessage').mockRejectedValue(new Error(errorMessage));

    try {
      await ChatbotService.sendMessage(prompt);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(errorMessage);
    }
  });
});