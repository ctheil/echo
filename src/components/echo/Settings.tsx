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

const thresholdExplanations: { [key: number]: string } = {
  0: "The lowest threshold. With this low of a threshold all suggestions, regardless of their estimated impact on the promt will be visible.",
  10: "With a threshold between 10 and 30, most suggestions will appear and have a nominal effect on the prompt",
  20: "With a threshold between 10 and 30, most suggestions will appear and have a nominal effect on the prompt",
  30: "With a threshold between 10 and 30, most suggestions will appear and have a nominal effect on the prompt",
  40: "A threshold between 40 and 60 will filter out the unneeded suggestions and only target those that have a greater effect on the prompt.",
  50: "A threshold between 40 and 60 will filter out the unneeded suggestions and only target those that have a greater effect on the prompt.",
  60: "A threshold between 40 and 60 will filter out the unneeded suggestions and only target those that have a greater effect on the prompt.",
  70: "A high threshold between 70 and 90 will only show suggestions that have a major impact on the prompt, giving you only needed suggestions in vague or ambigous areas of the original prompt.",
  80: "A high threshold between 70 and 90 will only show suggestions that have a major impact on the prompt, giving you only needed suggestions in vague or ambigous areas of the original prompt.",
  90: "A high threshold between 70 and 90 will only show suggestions that have a major impact on the prompt, giving you only needed suggestions in vague or ambigous areas of the original prompt.",
  100: "A max threshold will rarely show suggestions unless an area of the prompt is incredibly vague and requires clarification.",
};

type Props = {
  setThreshold: (val: number) => void;
  threshold: number;
};

const Settings = ({ setThreshold, threshold }: Props) => {
  const [open, setOpen] = useState(false);

  const handleSliderChange = (_: Event, value: number | number[]) => {
    setThreshold(value as number);
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
                  defaultValue={50}
                  value={threshold}
                  onChange={handleSliderChange}
                  valueLabelDisplay="auto"
                  step={10}
                  marks={marks}
                  min={0}
                  max={100}
                  color="secondary"
                />
              </Box>
              <Typography variant="h6" color="secondary">
                {threshold}
              </Typography>
              <Typography variant="body2">
                {thresholdExplanations[threshold]}
              </Typography>
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
