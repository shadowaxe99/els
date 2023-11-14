```javascript
// config/api_keys.js

// This file contains sensitive API keys and should not be committed to version control.
// Ensure this file is included in your .gitignore.

const API_KEYS = {
  openAI: {
    apiKey: process.env.OPENAI_API_KEY
  },
  ethereum: {
    infuraProjectId: process.env.INFURA_PROJECT_ID,
    infuraProjectSecret: process.env.INFURA_PROJECT_SECRET
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  },
  azure: {
    clientId: process.env.AZURE_CLIENT_ID,
    clientSecret: process.env.AZURE_CLIENT_SECRET,
    tenantId: process.env.AZURE_TENANT_ID,
    subscriptionId: process.env.AZURE_SUBSCRIPTION_ID
  },
  oauth: {
    clientId: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET
  },
  otherIntegrations: {
    calendarApiKey: process.env.CALENDAR_API_KEY,
    messagingPlatformApiKey: process.env.MESSAGING_PLATFORM_API_KEY,
    productivityToolApiKey: process.env.PRODUCTIVITY_TOOL_API_KEY
  }
};

module.exports = API_KEYS;
```