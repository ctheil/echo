import { AnalyzedString } from "./AnalyzedString";
import classes from "./Echo.module.css";
const weightColors = {
  0.9: "#FF4B6E",
  0.3: "#0D47A1",
};
export const AnalyzedPrompt = ({ response }) => {
  console.log(response);
  return (
    <div className={classes["analyzed"]}>
      <p className={classes["analyzed__p"]}>
        {response.map((s) => {
          const { weight, reason } = s.analyzed;
          // return (
          //   <span style={{ textDecorationColor: weightColors[weight] }}>
          //     {" " + s.chunk}
          //   </span>
          // );
          return (
            <AnalyzedString
              string={s.chunk}
              weight
              reason
              color={weightColors[weight]}
            />
          );
        })}
      </p>
    </div>
  );
};
