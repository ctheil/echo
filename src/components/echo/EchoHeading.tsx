import { IconButton, Switch } from "@mui/material";
import classes from "./Echo.module.css";
import { useState } from "react";
import { BiHelpCircle, BiSolidHelpCircle } from "react-icons/bi";
import { EchoTut } from "./EchoTut";
import getOS from "../../util/detectOs";

type Props = {
  enabled: boolean;
  toggle: () => void;
  heading: string;
};
export const EchoHeading = ({ enabled, toggle, heading }: Props) => {
  const [hoverHelp, setHoverHelp] = useState(false);
  const [openTut, setOpenTut] = useState(false);
  const os = getOS();
  let osShortcut = null;

  if (os === "mac") {
    osShortcut = "⌘K";
  } else if (os === "win" || os === "Linux") {
    osShortcut = "Ctrl+K";
  }

  const closeTut = () => setOpenTut(false);
  return (
    <div className={classes["echo__heading--flex"]}>
      <EchoTut open={openTut} handleClose={closeTut} />
      <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
        <Switch checked={enabled} onChange={toggle} color="secondary" />
        <h3
          onClick={toggle}
          style={{ cursor: "pointer" }}
          className={classes["echo__heading"]}
        >
          {heading}
        </h3>
      </div>
      <div className={classes["echo__settings"]}>
        {osShortcut && (
          <p
            className={
              classes[`echo__shortcut--${enabled ? "enabled" : "disabled"}`]
            }
          >
            {osShortcut}
          </p>
        )}
        <IconButton
          onClick={() => setOpenTut(true)}
          sx={{ opacity: 0.6 }}
          onMouseEnter={() => setHoverHelp(true)}
          onMouseLeave={() => setHoverHelp(false)}
        >
          {hoverHelp ? <BiSolidHelpCircle /> : <BiHelpCircle />}
        </IconButton>
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
