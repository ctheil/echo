import OpenAI from "openai";
import { IResponse } from "../components/GPT_test";

//const client = OpenAI();
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
console.log(OPENAI_API_KEY);

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});
export const submitPrompt = async (input: string): Promise<string> => {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: input }],
    model: "gpt-3.5-turbo",
  });
  return completion.choices[0].message.content as string;
};
export const revisePrompt = async (input: string): Promise<string> => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are a very talented prompt engineer who specalizes in engineering prompts for LLMs and ChatGPT. Please revise the provided prompt (which is formatted in JSON) and improve it based on the attached clarifications. The JSON is structured so that the original string of the prompt is the key of the object, and the value is the clarification. Your response should take the form of standard plain text as the revised prompt ready to be inputted directly into ChatGPT. The prompt should be as clear and as well engineered as possible. The prompt should be as specific as possible based on the information you are given and should include any additional information relevant to the prompt to detter help the user get what they need from their initial prompt.
            Desired Format:
            Basic plain text to be outputted raw directly to the user. This should not contain any information or analysis, only the revised prompt.
          `,
      },
      // {
      //   role: "system",
      //   content: `This engineered prompt is analyzed based on the following engineering prompt. You should do your best to avoid adding content to the engineered prompt that would result in this prompt flagging it as needing additional context:
      //  Engineering Prompt: """
      //   ${INITIAL_ENGINEER_PROMPT}
      //   """
      //       `,
      // },
      {
        role: "system",
        name: "example_user",
        content: `{"I need help building":"Blog","a website from scratch":"Custom design and development"}`,
      },
      {
        role: "system",
        name: "example_assistant",
        content:
          "I need help building a blog, including custom desgin and development if a webite from scratch.",
      },
      {
        role: "user",
        content: `Prompt: """
          ${input}
          """
          `,
      },
    ],
    model: "gpt-3.5-turbo",
  });
  return completion.choices[0].message.content as string;
};
const INITIAL_ENGINEER_PROMPT =
  "Analyze the user's prompt and return a JSON array. Each object represents a 'chunk' of the prompt and includes a 'threshold' score between 0 and 1. A higher 'threshold' score indicates that the chunk is less clear and should be displayed in the UI for clarification. Include a 'heading' for UI section titles and 'suggestions' with actionable items for the user. If a chunk introduces potential contradictions or confusion, detail this in 'adversity' with a severity 'threshold' and a 'reason', if the chunk does not introduce and issues, deatils this in 'adversity' with a severity of 0.1 or 0. The 'analyzed' section should inform the user of the chunk's relative impact on the overall prompt, with a 'weight' indicating the extent of this impact, and a 'reason' detailing why. The goal is to enhance the clarity and effectiveness of the prompt.";
export const submitCompletion = async (input: string): Promise<IResponse[]> => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: INITIAL_ENGINEER_PROMPT,
      },
      {
        role: "system",
        content:
          "You should focus your efforts on the additioanl elements, subordinate clauses, or phrases in the prompt. For the main clause an analyis is still welcome, but the JSON object for this object should use very low thresholds so that it does not appear in the UI.",
      },
      {
        role: "system",
        content:
          "For example: in the context of this sentence, 'I need help building something,' the main clause 'I need help' is not relevant to our analysis. Please provide suggestions rather for the phrase 'building something,' considering it as the key area of interest.",
      },
      {
        role: "system",
        content: `Desired Format: JSON Array - This is a strict format, so each chunk must have each element of this schema.
              [
        {
          "chunk": string, // chunk of the prompt
          "threshold": float, // between 0 and 1- 1 meaning it needs clarification, determining how much this part of the prompt would benefit from further clarification
          "heading": "string, // UI heading indicating how to improve this part of the prompt
          "suggestions": string[], // array of auto suggestions to improve the prompt
          "adversity": {
            "threshold": float, // between 0-1- 1 meaning it is adverse, determines how adversly this chunk effects the overall prompt
            "reason": string, // reasoning for the threshold value
          },
          "analyzed": {
            "weight": 0.3, // between 0-1- 1 meaning it has a major effect, determines the weight this chunk has on the prompt 
            "reason": string // reasoning for the weight
          }
        },
          ]
              
              `,
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
        {
          "chunk": "I am looking for some help",
          "threshold": 0.8,
          "heading": "Specify the type of help needed",
          "suggestions": ["Overview", "In-depth assistance", "Theory exploration", "Practice problems"],
          "adversity": {
            "threshold": 0.9,
            "reason": "The chunk is vague without context."
          },
          "analyzed": {
            "weight": 0.3,
            "reason": "This chunk is less informative because it lacks specificity about the type of help needed."
          }
        },
        {
          "chunk": "with math",
          "threshold": 0.9,
          "heading": "Identify Math Topics",
           "suggestions": ["Fractions", "Multiplication", "Algebra", "Calculus"],
          "adversity": {
            "threshold": 0.8,
            "reason": "While 'math' is a clearer subject area, it is still a broad category without specifics."
          },
          "analyzed": {
            "weight": 0.7,
            "reason": "This chunk provides a subject area which is more informative and narrows down the type of assistance required."
          }
        }
      ]`,
      },
      {
        role: "system",
        name: "example_assistant",
        content: `
        [
  {
    "chunk": "I am looking for some assistance",
    "threshold": 0.8,
    "heading": "Specify the type of assistance needed",
    "suggestions": [
      "Essay writing",
      "Concept clarification",
      "Research guidance",
      "Critical analysis"
    ],
    "adversity": {
      "threshold": 0.9,
      "reason": "The chunk is vague without context."
    },
    "analyzed": {
      "weight": 0.3,
      "reason": "This chunk is less informative because it lacks specificity about the type of assistance needed."
    }
  },
  {
    "chunk": "in philosophy",
    "threshold": 0.5,
    "heading": "Specify a Subject Area",
    "suggestions": [
      "Ethics",
      "Metaphysics",
      "Logic"
    ],
    "adversity": {
      "threshold": 0.5,
      "reason": "Pholosophy is a large academic subject, which could effect the specificity of the response."
    },
    "analyzed": {
      "weight": 0.9,
      "reason": "This chunk provides a specific subject area, which is highly informative and narrows down the type of assistance required to philosophy-related topics."
    }
  }
]
      `,
      },
      {
        role: "user",
        content: `Prompt: """
          ${input}
          """
          `,
      },
    ],
    model: "gpt-3.5-turbo",
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
