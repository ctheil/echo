import { useState } from "react";
import { AnalyzedPrompt } from "./AnalyzedPrompt";
import classes from "./Echo.module.css";
import { Divider, Skeleton, ThemeProvider, Typography } from "@mui/material";
import { Suggestions } from "./Suggestions";
import { Response } from "../@types/response.interface";
import { theme } from "../muiPalette";
import { revisePrompt } from "../../util/openAi";

type Props = {
  response: Response[] | null;
  loading: boolean;
};

export const Echo = ({ response, loading }: Props) => {
  const [revised, setRevised] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (data: { [key: string]: string }) => {
    setIsLoading(true);
    const completionRequest = `Please revise the the provided prompt in the form of JSON and improve it based on the attached clarifications. The JSON is structured so that the original string of the prompt is the key of the object, and the value is the clarification. ${JSON.stringify(
      data,
    )}. Your response should take the form of standard plain text as the revised prompt to be inputted directly into ChatGPT`;
    console.log("Completion Request: ", completionRequest);
    const newPrompt = await revisePrompt(completionRequest);
    console.log(newPrompt);
    setRevised(newPrompt);
    setIsLoading(false);
  };
  if (!response && !loading) return;
  //const sample = `Please revise the the provided prompt in the form of JSON and improve it based on the attached clarifications. The JSON is structured so that the original string of the prompt is the key of the object, and the value is the clarification.`;
  if (isLoading) {
    return (
      <ThemeProvider theme={theme}>
        <div className={classes["echo"]}>
          <h3 className={classes["echo__heading"]}>Echo: Revised Prompt</h3>
          <Skeleton variant="text" sx={{ fontWeight: 14 }} />
        </div>
      </ThemeProvider>
    );
  }
  if (revised) {
    return (
      <ThemeProvider theme={theme}>
        <div className={classes["echo"]}>
          <h3 className={classes["echo__heading"]}>Echo: Revised Prompt</h3>
          <Typography>{revised}</Typography>
        </div>
      </ThemeProvider>
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <div className={classes["echo"]}>
        <h3 className={classes["echo__heading"]}>Echo</h3>
        <AnalyzedPrompt response={response} loading={loading} />
        <Divider sx={{ borderColor: "#444654" }} />
        <Suggestions
          onSubmit={submitHandler}
          response={response}
          loading={loading}
        />
      </div>
    </ThemeProvider>
  );
};
