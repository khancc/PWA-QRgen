import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register service worker for PWA functionality
serviceWorkerRegistration.register({
  onSuccess: (registration) => {
    console.log("PWA installed successfully");
  },
  onUpdate: (registration) => {
    console.log("New PWA version available");
    // Optionally show update notification to user
    if (window.confirm("New version available. Reload to update?")) {
      window.location.reload();
    }
  },
});

// Performance monitoring
reportWebVitals(console.log);
