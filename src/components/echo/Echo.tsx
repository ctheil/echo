import { AnalyzedPrompt } from "./AnalyzedPrompt";
import classes from "./Echo.module.css";
export const Echo = ({ response }) => {
  const exampleRes = [
    {
      chunk: "This is part of the prompt.",
      threshold: 0.4,
      heading: "This is the section heading",
      suggestions: ["This is a suggestion", "Chip", "another suggestion"],
      adversity: 0.9,
      analyzed: {
        weight: 0.9,
        reason: "This is an example reason.",
      },
    },
    {
      chunk:
        "This is another part of the prompt. This is a test I am testing how this will work out.",
      threshold: 0.4,
      heading: "This is the section heading",
      suggestions: ["This is a suggestion", "Chip", "another suggestion"],
      adversity: 0.9,
      analyzed: {
        weight: 0.3,
        reason: "This is an example reason.",
      },
    },
  ];

  return (
    <div className={classes["echo"]}>
      <h3 className={classes["echo__heading"]}>Echo</h3>
      <AnalyzedPrompt response={exampleRes} />
    </div>
  );
};
