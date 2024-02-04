import { useState } from "react";
import { Echo } from "../echo/Echo";
import { PromptInput } from "./PromptInput";
import classes from "./chat.module.css";
import { submitCompletion, submitPrompt } from "../../util/openAi";
import { Response } from "../@types/response.interface";
export const Chat = () => {
  const [response, setResponse] = useState<null | Response[]>(null);
  const [echoEnabled, setEchoEnabled] = useState(false);
  const [conversation, setConversation] = useState<
    {
      role: string;
      message: string;
    }[]
  >([
    { role: "user", message: "I need help building a website from scratch." },
    { role: "system", message: "This is a response" },
  ]);

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (data: string) => {
    if (!echoEnabled) {
      return sendMessage(data);
    }
    try {
      setLoading(true);
      const res = await submitCompletion(data);
      setResponse(res as Response[]);
      console.log(response);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };
  const sendMessage = async (message: string) => {
    const c = conversation;
    c.push({ role: "user", message: message });
    setConversation(c);
    const response = await submitPrompt(message);
    c.push({ role: "system", message: response });
  };
  return (
    <main className={classes["chat"]}>
      <div className={classes["chat__actions"]}>
        <Echo
          toggle={() => setEchoEnabled(!echoEnabled)}
          enabled={echoEnabled}
          response={response}
          loading={loading}
          submitPrompt={sendMessage}
        />
        <PromptInput
          submitHandler={handleSubmit}
          placeholder="Message ChatGPT..."
        />
      </div>
    </main>
  );
};
