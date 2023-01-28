const openaiLib = require('openai');

const configuration = new openaiLib.Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new openaiLib.OpenAIApi(configuration);

exports.OpenAiClient = function() {};
exports.OpenAiClient.prototype = function() {	
    async function generate( prompt ) {
      if (!configuration.apiKey) {
        return { result: "OpenAI API key not configured. Get the key from openai.com and set OPENAI_API_KEY env variable." };
      }
    
      try {
        const completion = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: prompt,
          max_tokens: 2048,
          temperature: 0.6,
          presence_penalty: 1.0
        });

        // console.log(completion.data.choices);
        return { result: completion.data.choices[0].text };
      } catch(error) {
        // Consider adjusting the error handling logic for your use case
        if (error.response) {
          console.error(error.response.status, error.response.data);
        } else {
          console.error(`Error with OpenAI API request: ${error.message}`);
        }
      }
    }

    return {
        generate : generate
    };
}();