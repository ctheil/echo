import { useState } from "react";
import { StringToolTip } from "./StringToolTip";
import { Response } from "../@types/response.interface";

type Props = {
  response: Response;
  color: {
    color: string;
    font: string;
  };
  adversityColor: {
    color: string;
    font: string;
  };
};

export const AnalyzedString = ({ response, color, adversityColor }: Props) => {
  const [hover, setHover] = useState(false);

  console.log("STRING", response, color);

  return (
    <StringToolTip
      response={response}
      adversityColor={adversityColor}
      color={color}
    >
      <span
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          textDecorationColor: color.color,
          backgroundColor: hover ? color.color : "transparent",
          color: hover ? color.font : "",
        }}
      >
        {" " + response.chunk}
      </span>
    </StringToolTip>
  );
};
