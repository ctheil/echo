import { Switch } from "@mui/material";
import classes from "./Echo.module.css";

type Props = {
  enabled: boolean;
  toggle: Function;
  heading: string;
};
export const EchoHeading = ({ enabled, toggle, heading }: Props) => {
  return (
    <div className={classes["echo__heading--flex"]}>
      <h3 className={classes["echo__heading"]}>{heading}</h3>
      <Switch
        label="enable"
        checked={enabled}
        onChange={toggle}
        color="secondary"
      />
    </div>
  );
};
