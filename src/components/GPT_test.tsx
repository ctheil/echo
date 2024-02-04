import { FormEventHandler, useState } from "react";
import { submitCompletion } from "../util/openAi";
import { GptResponse } from "./GptResponse";

export const GptInput = () => {
  const [val, setVal] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<null | IResponse[]>(null);

  const handleSubmit = async (e: FormEventHandler<HTMLFormElement>) => {
    // TODO: OpenAI Completion
    e.preventDefault();
    setLoading(true);
    // const response = await submitCompletion(val);
    // setResponse(response);
    setResponse(
      JSON.parse(`[
        {
            "chunk": "I am looking for some programming assistance",
            "threshold": 0.8,
            "heading": "Clarify the programming language or concept",
            "suggestions": [
                "Python",
                "Java",
                "HTML",
                "Data structures",
                "Object-oriented programming"
            ]
        }
    ]`),
    );
    setLoading(false);
  };

  const handleChange = (e: { target: { value: string } }) => {
    console.log(e.target.value);
    setVal(e.target.value);
  };

  return (
    <>
      <div>
        {loading && <p>Loading...</p>}
        {response &&
          response.map((r: IResponse, index) => (
            <GptResponse key={index} response={r} />
          ))}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="input"
            name="gpt-input"
            onChange={handleChange}
          />
          <button type="submit" className="button">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};
