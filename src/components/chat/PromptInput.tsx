import classes from "./Chat.module.css";
import { CgAttachment } from "react-icons/cg";
import { SubmitButton } from "./SubmitButton";
import { useState } from "react";
export const PromptInput = ({ submitHandler , placeholder}) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const val = e.target.value;
    setValue(val);

    val === "" ? setIsDisabled(true) : setIsDisabled(false);
  };
  const handleSubmit = () => {
    //TODO HANDLE SUBMIT
    //
    submitHandler(value);
  };

  return (
    <div className={classes["prompt"]}>
      <div className={classes["prompt__attach"]}>
        <CgAttachment size={24} className={classes["prompt__attach--icon"]} />
      </div>
      <input
        type="text"
        onChange={handleChange}
        name="prompt-input"
        placeholder={placeholder || "Message ChatGPT..."}
        className={classes["prompt__input"]}
      />
      <SubmitButton disabled={isDisabled} handleSubmit={handleSubmit} />
    </div>
  );
};
