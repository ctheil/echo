import classes from "./Chat.module.css";
import { CgAttachment } from "react-icons/cg";
import { SubmitButton } from "./SubmitButton";
import React, { useState } from "react";
type Props = {
  submitHandler: (data: string) => void;
  placeholder: string;
  className?: string;
  handleChange: (data: string) => void;
  disabledSubmit: boolean;
};
export const PromptInput = (props: Props) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (props.handleChange) {
      return props.handleChange(val);
    }
    setValue(val);

    val === "" ? setIsDisabled(true) : setIsDisabled(false);
  };
  const handleSubmit = () => {
    //TODO HANDLE SUBMIT
    //
    props.submitHandler(value);
  };

  return (
    <div className={classes[props.className || "prompt"]}>
      <div className={classes["prompt__attach"]}>
        <CgAttachment size={24} className={classes["prompt__attach--icon"]} />
      </div>
      <input
        type="text"
        onChange={handleChange}
        name="prompt-input"
        placeholder={props.placeholder || "Message ChatGPT..."}
        className={classes["prompt__input"]}
      />
      {!props.disabledSubmit && (
        <SubmitButton disabled={isDisabled} handleSubmit={handleSubmit} />
      )}
    </div>
  );
};
