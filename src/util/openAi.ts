import OpenAI from "openai";
import { IResponse } from "../components/GPT_test";

//const client = OpenAI();
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});
export const submitCompletion = async (input: string): Promise<IResponse[]> => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "your task is to analyze the provided prompt in terms of effectiveness when communicating with a large language model. Your response should take the form of JSON, where you identif different aspects of the prompt that could benefit from clarification. Your response should break the prompt down into chunks into a JSON array where each chunk is assigned a threshold from 0-1 where 1 does not require clarification and 0 requires lots of clarification. Each json object should contain the original chunk of the prompt, the threshold raiting, a heading for the UI and an array of clarification suggestions.",
      },
      {
        role: "system",
        name: "example_user",
        content: "I am looking for some help with math.",
      },
      {
        role: "system",
        name: "example_assistant",
        content: `[
          {"chunk": "I am looking for some help", "threshold": 0.7, heading: "Clarify the type of help",suggestions: ["Overviews", "in-depth assistance", "theory", "practice problems"],
          {"chunk": "help with math", "threshold": 0.9, heading: "What is/are the topics or ares of math you are looking for help with?", suggestions: ["Fractions", "Multiplication", "Algebra", "Calculus"]
      ]`,
      },
      { role: "user", content: input },
    ],
    model: "gpt-3.5-turbo",
    // response_format: { type: "json_object" },
  });
  const response = completion.choices[0];
  const jsonRes = JSON.parse(response.message.content);
  console.log(jsonRes);
  return jsonRes;
};

// NOTE: Calling fns
/*
import OpenAI from "openai";
const openai = new OpenAI();


Example dummy function hard coded to return the same weather
In production, this could be your backend API or an external API
function getCurrentWeather(location, unit = "fahrenheit") {
  if (location.toLowerCase().includes("tokyo")) {
    return JSON.stringify({ location: "Tokyo", temperature: "10", unit: "celsius" });
  } else if (location.toLowerCase().includes("san francisco")) {
    return JSON.stringify({ location: "San Francisco", temperature: "72", unit: "fahrenheit" });
  } else if (location.toLowerCase().includes("paris")) {
    return JSON.stringify({ location: "Paris", temperature: "22", unit: "fahrenheit" });
  } else {
    return JSON.stringify({ location, temperature: "unknown" });
  }
}


async function runConversation() {
  // Step 1: send the conversation and available functions to the model
  const messages = [
    { role: "user", content: "What's the weather like in San Francisco, Tokyo, and Paris?" },
  ];
  const tools = [
    {
      type: "function",
      function: {
        name: "get_current_weather",
        description: "Get the current weather in a given location",
        parameters: {
          type: "object",
          properties: {
            location: {
              type: "string",
              description: "The city and state, e.g. San Francisco, CA",
            },
            unit: { type: "string", enum: ["celsius", "fahrenheit"] },
          },
          required: ["location"],
        },
      },
    },
  ];


  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
    messages: messages,
    tools: tools,
    tool_choice: "auto", // auto is default, but we'll be explicit
  });
  const responseMessage = response.choices[0].message;

  // Step 2: check if the model wanted to call a function
  const toolCalls = responseMessage.tool_calls;
  if (responseMessage.tool_calls) {
    // Step 3: call the function
    // Note: the JSON response may not always be valid; be sure to handle errors
    const availableFunctions = {
      get_current_weather: getCurrentWeather,
    }; // only one function in this example, but you can have multiple
    messages.push(responseMessage); // extend conversation with assistant's reply
    for (const toolCall of toolCalls) {
      const functionName = toolCall.function.name;
      const functionToCall = availableFunctions[functionName];
      const functionArgs = JSON.parse(toolCall.function.arguments);
      const functionResponse = functionToCall(
        functionArgs.location,
        functionArgs.unit
      );
      messages.push({
        tool_call_id: toolCall.id,
        role: "tool",
        name: functionName,
        content: functionResponse,
      }); // extend conversation with function response
    }
    const secondResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      messages: messages,
    }); // get a new response from the model where it can see the function response
    return secondResponse.choices;
  }
}


runConversation().then(console.log).catch(console.error);
*/
