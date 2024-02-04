import { useState } from "react";
import { AnalyzedPrompt } from "./AnalyzedPrompt";
import classes from "./Echo.module.css";
import {
  Divider,
  Skeleton,
  Switch,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Suggestions } from "./Suggestions";
import { Response } from "../@types/response.interface";
import { theme } from "../muiPalette";
import { revisePrompt } from "../../util/openAi";
import { AnimatePresence, motion } from "framer-motion";
import { EchoHeading } from "./EchoHeading";

type Props = {
  response: Response[] | null;
  loading: boolean;
  toggle: Function;
  enabled: boolean;
};

export const Echo = ({ response, loading, toggle, enabled }: Props) => {
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
  if ((!response && !loading) || !enabled) {
    return (
      <ThemeProvider theme={theme}>
        <AnimatePresence>
          <motion.div
            className={classes["echo"]}
            initial={{ translateY: "3rem", opacity: 0 }}
            animate={{ translateY: "1.5rem", opacity: 0.7 }}
            exit={{ translateY: "3rem", opacity: 0.7 }}
            whileHover={{ translateY: "1.3rem", scale: 1, opacity: 1 }}
            style={{ padding: "0.3rem 1.2rem 0.7rem 1.2rem", scale: 0.99 }}
          >
            <EchoHeading heading="Echo" enabled={enabled} toggle={toggle} />
          </motion.div>
        </AnimatePresence>
      </ThemeProvider>
    );
  }
  if (!response && !loading) return;
  const revisedLoading = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <EchoHeading
        heading="Echo: Revised Prompt"
        enabled={enabled}
        toggle={toggle}
      />
      <Skeleton variant="text" sx={{ fontWeight: 14 }} />
    </motion.div>
  );
  const revisedState = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <EchoHeading
        heading="Echo: Revised Prompt"
        enabled={enabled}
        toggle={toggle}
      />
      <Typography>{revised}</Typography>
    </motion.div>
  );
  const echoState = (
    <motion.div
      initial={{ height: 1, opacity: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 1 }}
    >
      <EchoHeading heading="Echo" enabled={enabled} toggle={toggle} />
      <AnalyzedPrompt response={response} loading={loading} />
      <Divider sx={{ borderColor: "#444654" }} />
      <Suggestions
        onSubmit={submitHandler}
        response={response}
        loading={loading}
      />
    </motion.div>
  );
  const disabledState = (
    <motion.div
      initial={{ height: 1, opacity: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 1 }}
    >
      <h3 className={classes["echo__heading"]}>Echo</h3>
      <AnalyzedPrompt response={response} loading={loading} />
      <Divider sx={{ borderColor: "#444654" }} />
      <Suggestions
        onSubmit={submitHandler}
        response={response}
        loading={loading}
      />
    </motion.div>
  );
  return (
    <ThemeProvider theme={theme}>
      <AnimatePresence>
        <div className={classes["echo"]}>
          {!enabled && disabledState}
          {isLoading && revisedLoading}
          {revised && revisedState}
          {!isLoading && !revised && echoState}
        </div>
      </AnimatePresence>
    </ThemeProvider>
  );
};
