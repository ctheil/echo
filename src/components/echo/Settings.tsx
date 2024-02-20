import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Slider,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { IoSettings, IoSettingsOutline } from "react-icons/io5";
import classes from "./Echo.module.css";

const marks = [
  {
    value: 0,
    label: "0%",
  },
  {
    value: 30,
    label: "30%",
  },
  {
    value: 50,
    label: "50%",
  },
  {
    value: 70,
    label: "70%",
  },
  {
    value: 100,
    label: "100%",
  },
];

type Props = {
  setThreshold: (val: number) => void;
  threshold: number;
};

const Settings = ({ setThreshold, threshold }: Props) => {
  const [open, setOpen] = useState(false);

  const handleSliderChange = ({ target }: { target: { value: number } }) => {
    console.log(target.value);
    setThreshold(target.value);
  };

  return (
    <>
      <SettingsButton handleClick={() => setOpen(true)} />
      {open && (
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Echo Settings</DialogTitle>
          <DialogContent>
            <Box>
              <Typography variant="h6">Threshold</Typography>
              <Typography variant="body1">
                Alter this threshold to show fewer or more suggestions based on
                how much they stand to improve the prompt.
              </Typography>
              <Box sx={{ marginTop: "1rem" }}>
                <Slider
                  aria-label="Temperature"
                  defaultValue={threshold}
                  onChange={handleSliderChange}
                  // getAriaValueText={valuetext}
                  valueLabelDisplay="auto"
                  shiftStep={10}
                  step={10}
                  marks={marks}
                  min={0}
                  max={100}
                  color="secondary"
                />
              </Box>
            </Box>
          </DialogContent>
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
