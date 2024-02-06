import { Typography } from "@mui/material";
import classes from "./Error.module.css";
import { useState } from "react";
import { MdError, MdErrorOutline } from "react-icons/md";
import { IoReload } from "react-icons/io5";
type ErrProps = {
  message: string;
  handleClick: () => void;
};
const ErrorComponent = (props: ErrProps) => {
  const [hover, setHover] = useState(false);
  return (
    <button
      className={classes["error"]}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={props.handleClick}
    >
      {hover ? (
        <MdError size={22} className={classes["error__icon"]} />
      ) : (
        <MdErrorOutline size={22} className={classes["error__icon"]} />
      )}
      <Typography sx={{ marginRight: "auto" }}>
        {props.message}. Retry?
      </Typography>
      {hover && <IoReload size={22} />}
    </button>
  );
};

export default ErrorComponent;
