import classes from "./Chat.module.css";
import { FaArrowUp } from "react-icons/fa";
type Props = {
  disabled: boolean;
  handleSubmit: () => void;
};
export const SubmitButton = ({ disabled, handleSubmit }: Props) => {
  return (
    <button
      onClick={handleSubmit}
      className={classes[`${disabled ? "submit__disabled" : "submit"}`]}
    >
      <FaArrowUp size={20} className={classes["submit__icon"]} />
    </button>
  );
};
