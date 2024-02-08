import {
  Switch,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
} from "@mui/material";
import classes from "./Echo.module.css";
import Settings from "./Settings";
import { useState } from "react";
import {
  IoIosInformationCircle,
  IoIosInformationCircleOutline,
} from "react-icons/io";

type Props = {
  enabled: boolean;
  toggle: () => void;
  heading: string;
};
export const EchoHeading = ({ enabled, toggle, heading }: Props) => {
  const [infoHover, setInfoHover] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  return (
    <div className={classes["echo__heading--flex"]}>
      <h3 className={classes["echo__heading"]}>{heading}</h3>
      <div className={classes["echo__settings"]}>
        <Settings />
        <Switch
          label="enable"
          checked={enabled}
          onChange={toggle}
          color="secondary"
        />
        <IconButton
          onMouseEnter={() => setInfoHover(true)}
          onMouseLeave={() => setInfoHover(false)}
          onClick={() => setOpenInfo(true)}
        >
          {infoHover ? (
            <IoIosInformationCircle />
          ) : (
            <IoIosInformationCircleOutline />
          )}
          <EchoInfo open={openInfo} handleClose={() => setOpenInfo(false)} />
        </IconButton>
      </div>
    </div>
  );
};

type EchoInfoProps = {
  open: boolean;
  handleClose: () => void;
};
const EchoInfo = (props: EchoInfoProps) => {
  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>Echo prompt engineering and analysis</DialogTitle>
      <DialogContent>
        <Typography>
          <Box sx={{ typography: "h6" }}>
            Enhance your prompts with Echo Analysis!
          </Box>
          Get instant feedback on your input to refine clarity and
          effectiveness. Enable now to explore smarter interactions.
        </Typography>
      </DialogContent>
    </Dialog>
  );
};
export default EchoInfo;
