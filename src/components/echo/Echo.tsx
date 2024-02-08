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

type Props = {
  response: Response[] | null;
  loading: boolean;
  toggle: () => void;
  enabled: boolean;
  sendPrompt: (message: string) => void;
  refreshResponse: () => void;
};

export const Echo = ({
  response,
  loading,
  toggle,
  enabled,
  sendPrompt,
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
  if ((!response && !loading) || !enabled) {
    return (
      <ThemeProvider theme={theme}>
        <AnimatePresence>
          <motion.div
            className={classes[enabled ? "echo__enabled" : "echo__disabled"]}
            initial={{ translateY: "6rem", opacity: 0 }}
            animate={{ translateY: "9rem", opacity: 0.7 }}
            exit={{ translateY: "3rem", opacity: 0.7 }}
            transition={{ type: "spring", ease: "easeOut", duration: 0.4 }}
            whileHover={{ translateY: "1.5rem", scale: 1, opacity: 1 }}
            style={{ padding: "0.3rem 1.2rem 0.7rem 1.2rem", scale: 0.99 }}
          >
            <EchoHeading heading="Echo" enabled={enabled} toggle={toggle} />
            <Typography component="div" sx={{ marginBottom: 3 }}>
              <Box sx={{ typography: "h6" }}>
                Enhance your prompts with Echo Analysis!
              </Box>
              Get instant feedback on your input to refine clarity and
              effectiveness. Enable now to explore smarter interactions.
            </Typography>
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
        <Typography>{revised}</Typography>
      </motion.div>
    </ErrorBoundary>
  );
  const errorRes = [
    {
      chunk: "I need help building a brand",
      threshold: 0.8,
      heading: "Specify the type of brand",
      suggestions: ["Product brand", "Service brand", "Personal brand"],
      adversity: {
        threshold: 0.8,
        reason: "The chunk is vague without context.",
      },
      analyzed: {
        weight: 0.3,
        reason:
          "This chunk is less informative because it lacks specificity about the type of brand needed to be built.",
      },
    },
    {
      chunk: "from scratch",
      threshold: 0.9,
      heading: "Clarify the scope of work",
      suggestions: [
        "Brand strategy",
        "Logo design",
        "Brand identity development",
      ],
      adversity: {
        threshold: 0.9,
        reason:
          "The term 'from scratch' can be ambiguous and may require clarification.",
      },
      // analyzed: {
      //   weight: 0.7,
      //   reason:
      //     "This chunk indicates a desire to start from the beginning in building the brand, but it would benefit from more specifics about the exact scope of work required.",
      // },
    },
  ];
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
        <div className={classes[enabled ? "echo__enabled" : "echo__disabled"]}>
          {!enabled && disabledState}
          {isLoading && revisedLoading}
          {revised && revisedState}
          {!isLoading && !revised && echoState}
        </div>
      </AnimatePresence>
    </ThemeProvider>
  );
};
