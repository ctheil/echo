import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { useState } from "react";
import { IoSettings, IoSettingsOutline } from "react-icons/io5";
import classes from "./Echo.module.css";

const Settings = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SettingsButton handleClick={() => setOpen(true)} />
      {open && (
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Echo Settings</DialogTitle>
          <DialogContent></DialogContent>
        </Dialog>
      )}
    </>
  );
};
type ButtonProps = {
  handleClick: () => void;
};

const SettingsButton = ({ handleClick }: ButtonProps) => {
  const [hover, setHover] = useState(false);
  return (
    <IconButton
      className={classes["settings__icon"]}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
    >
      {hover ? (
        <IoSettings className={classes["settings__icon"]} />
      ) : (
        <IoSettingsOutline className={classes["settings__icon"]} />
      )}
    </IconButton>
  );
};

export default Settings;
