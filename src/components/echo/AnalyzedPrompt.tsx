import { Skeleton } from "@mui/material";
import { AnalyzedString } from "./AnalyzedString";
import classes from "./Echo.module.css";
import { Response } from "../@types/response.interface.ts";
type Weight = number;
const weightColors: { [key in Weight]: { color: string; font: string } } = {
  1: {
    color: "#2196F3",
    font: "#fff",
  },
  0.9: {
    color: "#2196F3",
    font: "#fff",
  },
  0.8: {
    color: "#1a78c2",
    font: "#fff",
  },
  0.7: {
    color: "#1769aa",
    font: "#fff",
  },
  0.6: {
    color: "#145a92",
    font: "#fff",
  },
  0.5: {
    color: "#114b7a",
    font: "#fff",
  },
  0.4: {
    color: "#0d3c61",
    font: "#fff",
  },
  0.3: {
    color: "#0a2d49",
    font: "#fff",
  },
  0.2: {
    color: "#071e31",
    font: "#fff",
  },
  0.1: {
    color: "#071e31",
    font: "#fff",
  },
  0: {
    color: "#071e31",
    font: "#fff",
  },
};
const adversityColors: { [key in Weight]: { color: string; font: string } } = {
  1: {
    color: "#FF4B6E",
    font: "#000",
  },
  0.9: {
    color: "#FF4B6E",
    font: "#000",
  },
  0.8: {
    color: "#e64463",
    font: "#fff",
  },
  0.7: {
    color: "#cc3c58",
    font: "#fff",
  },
  0.6: {
    color: "#b3354d",
    font: "#fff",
  },
  0.5: {
    color: "#992d42",
    font: "#fff",
  },
};

type Props = {
  loading: boolean;
  response: Response[];
};
export const AnalyzedPrompt = ({ response, loading }: Props) => {
  if (loading) {
    //return skeleton
    return (
      <div className={classes["prompt__skeleton"]}>
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
      </div>
    );
  }
  if (!response) return;
  return (
    <div className={classes["analyzed"]}>
      <p className={classes["analyzed__p"]}>
        {response.map((s: Response) => {
          const { weight } = s.analyzed;
          const color = weightColors[weight];
          const adversityColor = adversityColors[s.adversity.threshold];

          return (
            <AnalyzedString
              response={s}
              color={color}
              adversityColor={adversityColor}
            />
          );
        })}
      </p>
    </div>
  );
};
