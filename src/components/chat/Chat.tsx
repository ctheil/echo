import { Echo } from "../echo/Echo";
import { PromptInput } from "./PromptInput";
import classes from "./chat.module.css";
export const Chat = () => {
  const handleSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <main className={classes["chat"]}>
      <Echo />
      <PromptInput submitHandler={handleSubmit} />
    </main>
  );
};
