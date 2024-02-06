import { Switch, IconButton } from "@mui/material";
import classes from "./Echo.module.css";
import Settings from "./Settings";

type Props = {
  enabled: boolean;
  toggle: () => void;
  heading: string;
};
export const EchoHeading = ({ enabled, toggle, heading }: Props) => {
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
      </div>
    </div>
  );
};
