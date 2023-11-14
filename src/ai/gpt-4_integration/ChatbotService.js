```javascript
const { OpenAIAPI } = require('openai');
const { authToken } = require('../../config/api_keys');

class ChatbotService {
  constructor() {
    this.openai = new OpenAIAPI({
      apiKey: authToken
    });
  }

  async sendMessage(message) {
    try {
      const response = await this.openai.createChatCompletion({
        model: "gpt-4",
        messages: [{
          role: "system",
          content: "You are a helpful assistant."
        }, {
          role: "user",
          content: message
        }]
      });
      return response.data.choices[0].message.content.trim();
    } catch (error) {
      console.error('Error sending message to GPT-4:', error);
      throw error;
    }
  }
}

module.exports = ChatbotService;
```