import { useState } from "react";
import { AnalyzedPrompt } from "./AnalyzedPrompt";
import classes from "./Echo.module.css";
import {
  Box,
  Divider,
  Skeleton,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Suggestions } from "./Suggestions";
import { Response } from "../@types/response.interface";
import { theme } from "../muiPalette";
import { revisePrompt } from "../../util/openAi";
import { AnimatePresence, motion } from "framer-motion";
import { EchoHeading } from "./EchoHeading";
import ErrorBoundary from "../errors/ErrorBoundary";
import ErrorComponent from "../errors/ErrorComponent";
import getOS from "../../util/detectOs";

type Props = {
  response: Response[] | null;
  loading: boolean;
  toggle: () => void;
  enabled: boolean;
  sendPrompt: (message: string) => void;
  refreshResponse: () => void;
  started: boolean;
};

export const Echo = ({
  response,
  loading,
  toggle,
  enabled,
  started,
  refreshResponse,
}: Props) => {
  const [revised, setRevised] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [workingRevision, setWorkingRevision] = useState<{
    [key: string]: string;
  }>();

  const submitHandler = async (data: { [key: string]: string }) => {
    setIsLoading(true);
    setWorkingRevision(data);
    const completionRequest = `Please revise the the provided prompt in the form of JSON and improve it based on the attached clarifications. The JSON is structured so that the original string of the prompt is the key of the object, and the value is the clarification. ${JSON.stringify(
      data,
    )}. Your response should take the form of standard plain text as the revised prompt to be inputted directly into ChatGPT`;
    const newPrompt = await revisePrompt(completionRequest);
    setRevised(newPrompt);
    setIsLoading(false);
  };
  if (started && !loading && !response) {
    return (
      <ThemeProvider theme={theme}>
        {started && (
          <AnimatePresence>
            <motion.div
              className={classes["echo"]}
              initial={{ translateY: "4rem", opacity: 0.5 }}
              animate={{ translateY: "1.7rem", opacity: 0.7 }}
              exit={{ translateY: "4rem", opacity: 0.7 }}
              transition={{ type: "spring", duration: 0.5 }}
              // whileHover={{ translateY: "1.5rem", scale: 1, opacity: 1 }}
              style={{ padding: "0.3rem 1.2rem 0.7rem 1.2rem", scale: 0.99 }}
            >
              <EchoHeading
                heading={
                  enabled
                    ? "Echo will analyze and provide suggestions after you hit send."
                    : `Need help with this prompt?`
                }
                enabled={enabled}
                toggle={toggle}
              />
            </motion.div>
          </AnimatePresence>
        )}
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
    <ErrorBoundary
      component={
        <ErrorComponent
          handleClick={() => submitHandler(workingRevision)}
          message="Malformatted Response"
        />
      }
    >
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
        <Typography contentEditable>{revised}</Typography>
      </motion.div>
    </ErrorBoundary>
  );
  const echoState = (
    <ErrorBoundary
      component={
        <ErrorComponent
          handleClick={refreshResponse}
          message="Malformatted Response"
        />
      }
    >
      <motion.div
        initial={{ height: 1, opacity: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 1 }}
      >
        <EchoHeading heading="Echo" enabled={enabled} toggle={toggle} />
        <AnalyzedPrompt response={response!} loading={loading} />
        <Divider sx={{ borderColor: "#444654" }} />
        <Suggestions
          onSubmit={submitHandler}
          response={response!}
          loading={loading}
        />
      </motion.div>
    </ErrorBoundary>
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
