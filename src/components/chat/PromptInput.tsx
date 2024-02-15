import classes from "./Chat.module.css";
import { CgAttachment } from "react-icons/cg";
import { SubmitButton } from "./SubmitButton";
import React, { useEffect, useRef, useState } from "react";
type Props = {
  submitHandler: (data: string) => void;
  placeholder: string;
  className?: string;
  handleChange: (data: string) => void;
  disabledSubmit: boolean;
  setStarted: (started: boolean) => void;
  toggleEcho: () => void;
};
export const PromptInput = (props: Props) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [value, setValue] = useState("");
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    console.log("running use effect...");
    if (ref.current) {
      ref.current.style.height = "inherit";
      const scrollHeight = ref.current.scrollHeight;
      if (scrollHeight > 47) {
        ref.current.style.maxHeight = "none";
      }

      ref.current.style.height = `${scrollHeight}px`;
      const height = +ref.current.style.height.split("px")[0];
      if (height <= 66) {
        ref.current.style.maxHeight = "44px";
      }
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (props.handleChange) {
      return props.handleChange(val);
    }
    setValue(val);
    props.setStarted(!!val);

    val === "" ? setIsDisabled(true) : setIsDisabled(false);
  };
  const handleSubmit = () => {
    //TODO HANDLE SUBMIT
    //
    props.submitHandler(value);
  };
  console.log("[value]: ", value ? "promt__active" : "prompt");

  const promptClass = value ? "prompt__active" : "prompt";

  return (
    <div className={classes[props.className || promptClass]}>
      <div className={classes["prompt__attach"]}>
        <CgAttachment size={24} className={classes["prompt__attach--icon"]} />
      </div>
      <textarea
        tabIndex={0}
        onKeyDown={(e) => {
          // Listen for return and submit
          console.log(e.key === "Enter" && !e.shiftKey);
          if (e.key === "Enter" && !e.shiftKey) {
            ref.current?.blur();
            handleSubmit();
          }
          if (e.key === "Tab" && e.shiftKey) {
            e.preventDefault();
            props.toggleEcho();
            ref.current.focus();
          }
        }}
        ref={ref}
        onChange={handleChange}
        name="prompt-input"
        placeholder={props.placeholder || "Message ChatGPT..."}
        className={classes["prompt__input"]}
        style={{ height: "52px" }}
      />
      {!props.disabledSubmit && (
        <SubmitButton disabled={isDisabled} handleSubmit={handleSubmit} />
      )}
    </div>
  );
};
