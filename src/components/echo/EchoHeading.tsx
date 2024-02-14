import { IconButton, Switch } from "@mui/material";
import classes from "./Echo.module.css";
import { useState } from "react";
import { BiHelpCircle, BiSolidHelpCircle } from "react-icons/bi";
import { EchoTut } from "./EchoTut";

type Props = {
  enabled: boolean;
  toggle: () => void;
  heading: string;
};
export const EchoHeading = ({ enabled, toggle, heading }: Props) => {
    const [hoverHelp, setHoverHelp ] = useState(false)
    const [openTut, setOpenTut] = useState(false)

    const closeTut = () => setOpenTut(false)
  return (
    <div className={classes["echo__heading--flex"]}>
    <EchoTut open={openTut} handleClose={closeTut}/>
      <h3  onClick={toggle} style={{cursor: "pointer"}} className={classes["echo__heading"]}>{heading}</h3>
      <div className={classes["echo__settings"]}>
      <IconButton onClick={() => setOpenTut(true)} sx={{opacity: 0.6}} onMouseEnter={() => setHoverHelp(true)} onMouseLeave={() => setHoverHelp(false)}>
        {hoverHelp ? 
        <BiSolidHelpCircle />
        :
        <BiHelpCircle />
        } 
      </IconButton>
        <Switch
          checked={enabled}
          onChange={toggle}
          color="secondary"
        />
      </div>
    </div>
  );
};
// <Settings 
// />
//
//   // <Typography component="div" sx={{ marginBottom: 3 }}>
  //   <Box sx={{ typography: "h6" }}>
  //     Enhance your prompts with Echo Analysis!
  //   </Box>
  //   Get instant feedback on your input to refine clarity and
  //   effectiveness. Enable now to explore smarter interactions.
  // </Typography>

