import { Button, Skeleton } from "@mui/material";
import classes from "./Echo.module.css";
import { Suggestion } from "./Suggestion";
import { useState } from "react";
import { Response } from "../@types/response.interface";

type SuggestionProps = {
  loading: boolean;
  response: Response[];
  onSubmit: (suggestions: { [key: string]: string }) => void;
  threshold: number;
};
export const Suggestions = ({
  response,
  loading,
  onSubmit,
  threshold,
}: SuggestionProps) => {
  const [suggestions, setSuggestions] = useState({});
  if (loading) {
    //return skeleton
    return (
      <div className={classes["prompt__skeleton"]}>
        <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
        <div className={classes["chips"]}>
          <Skeleton
            variant="rectangular"
            height={25}
            width={80}
            sx={{ borderRadius: "20px" }}
          />
          <Skeleton
            variant="rectangular"
            height={25}
            width={80}
            sx={{ borderRadius: "20px" }}
          />
          <Skeleton
            variant="rectangular"
            height={25}
            width={80}
            sx={{ borderRadius: "20px" }}
          />
        </div>
        <Skeleton
          variant="rectangular"
          height={45}
          width={"100%"}
          sx={{ borderRadius: "13px" }}
        />
      </div>
    );
  }
  const submitHandler = (data: string, chunk: string) => {
    const out: { [key: string]: string | boolean } = suggestions || {};

    out[chunk] = data;
    out.hasSuggestions = true;
    console.log(out);
    return setSuggestions(out);
  };
  const finalizeSubmit = () => {
    onSubmit(suggestions);
  };

  if (!response) return;
  return (
    <div className={classes["suggestions"]}>
      {response.map((s: Response, i: number) => {
        const userThreshold = threshold / 100;
        if (s.threshold < userThreshold) return;
        return (
          <Suggestion
            key={i}
            last={i === response.length - 1}
            handleSubmit={submitHandler}
            response={s}
          />
        );
      })}
      <Button
        sx={{ marginTop: 1 }}
        fullWidth
        variant="contained"
        onClick={finalizeSubmit}
        color="secondary"
      >
        Revise Prompt
      </Button>
    </div>
  );
};
