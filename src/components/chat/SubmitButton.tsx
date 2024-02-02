import classes from "./Chat.module.css";
import { FaArrowUp } from "react-icons/fa";
export const SubmitButton = ({ disabled, handleSubmit }) => {
  return (
    <button
      onClick={handleSubmit}
      className={classes[`${disabled ? "submit__disabled" : "submit"}`]}
    >
      <FaArrowUp size={20} className={classes["submit__icon"]} />
    </button>
  );
};
