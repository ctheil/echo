import { useState } from "react";

export const AnalyzedString = ({ string, weight, reason, color }) => {
  const [hover, setHover] = useState(false);

  return (
    <span
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        textDecorationColor: color,
        backgroundColor: hover ? color : "transparent",
      }}
    >
      {" " + string}
    </span>
  );
};
