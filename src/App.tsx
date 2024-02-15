import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Chat } from "./components/chat/Chat";
import { KeyInputDialog } from "./components/KeyInputModal";

function App() {
  return (
    <>
      <KeyInputDialog />
      <Chat />
    </>
  );
}

export default App;
