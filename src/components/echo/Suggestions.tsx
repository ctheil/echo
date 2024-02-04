import { Button, Skeleton, Typography } from "@mui/material";
import classes from "./Echo.module.css";
import { Suggestion } from "./Suggestion";
import { useState } from "react";
import { SubmitButton } from "../chat/SubmitButton";

type SuggestionProps = {
  loading: boolean;
  response: Response;
  onSubmit: Function;
};
export const Suggestions = ({ response, loading, onSubmit }) => {
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
    const out = suggestions || {};

    out[chunk] = data;
    setSuggestions(out);
    console.log(suggestions);
  };
  const finalizeSubmit = () => {
    onSubmit(suggestions);
  };
  if (!response) return;
  return (
    <div className={classes["suggestions"]}>
      {response.map((s: Response, i: number) => (
        <Suggestion
          key={i}
          last={i === response.length - 1}
          handleSubmit={submitHandler}
          response={s}
        />
      ))}
      <Button onClick={finalizeSubmit}>Revise Prompt</Button>
    </div>
  );
};
