import { Chip, Divider, Typography } from "@mui/material";
import { Response } from "../@types/response.interface";
import classes from "./Echo.module.css";
import { PromptInput } from "../chat/PromptInput";
import { useState } from "react";

type Props = {
  response: Response;
  handleSubmit: Function;
  last: boolean;
};
export const Suggestion = ({ response, handleSubmit, last }: Props) => {
  const [selectedChip, setSelectedChip] = useState();
  const handleChipClick = (chip: string) => {
    setSelectedChip(chip);
    handleSubmit(chip, response.chunk);
  };
  const submitHandler = (data: string) => {
    response.suggestions.push(data);
    setSelectedChip(data);
    handleSubmit(data, response.chunk);
  };
  return (
    <div className={classes["suggestion"]}>
      <h3 className={classes["echo__heading"]}>{response.heading}</h3>
      <p className={classes["suggestion__chunk"]}>{response.chunk}</p>
      <div className={classes["chips"]}>
        {response.suggestions.map((s, i) => (
          <Chip
            key={i}
            variant={selectedChip === s ? "filled" : "outlined"}
            label={s}
            onClick={handleChipClick.bind(this, s)}
          />
        ))}
      </div>
      <PromptInput placeholder="Suggestion..." submitHandler={submitHandler} />

      {!last && <Divider sx={{ margin: "1.0rem 0 0.5rem 0" }}></Divider>}
    </div>
  );
};
