import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./components/App";
import { QuizProvider } from "./Context/QuizContext";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
  <QuizProvider>
    <App />
  </QuizProvider>
  </StrictMode>
);
