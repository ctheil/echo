import { useState } from "react";
import { Echo } from "../echo/Echo";
import { PromptInput } from "./PromptInput";
import classes from "./Chat.module.css";
import { submitCompletion, submitPrompt } from "../../util/openAi";
import { Response } from "../@types/response.interface";
export const Chat = () => {
  const [response, setResponse] = useState<null | Response[]>(null);
  const [workingPrompt, setWorkingPrompt] = useState("");
  const [echoEnabled, setEchoEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [promptStarted, setPromptStarted] = useState(false);
  const [conversation, setConversation] = useState<
    {
      role: string;
      message: string;
    }[]
  >([
    { role: "user", message: "I need help building a website from scratch." },
    { role: "system", message: "This is a response" },
  ]);
  console.log("[promptStarted: ]", promptStarted);

  const handleSubmit = async (data: string) => {
    if (!echoEnabled) {
      return sendMessage(data);
    }
    try {
      setLoading(true);
      setWorkingPrompt(data);
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
          started={promptStarted}
          enabled={echoEnabled}
          response={response}
          loading={loading}
          sendPrompt={sendMessage}
          refreshResponse={() =>
            workingPrompt
              ? handleSubmit(workingPrompt)
              : window.location.reload()
          }
        />
        <PromptInput
          className="prompt__main"
          submitHandler={handleSubmit}
          placeholder="Message ChatGPT..."
          setStarted={setPromptStarted}
          toggleEcho={() => setEchoEnabled(!echoEnabled)}
        />
      </div>
    </main>
  );
};
