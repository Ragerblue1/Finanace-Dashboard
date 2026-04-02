import { createRoot } from "react-dom/client";
import App from "./App";

import { UserProvider } from "./context/UserContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css"; // Make sure this line exists!
createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </ThemeProvider>
);