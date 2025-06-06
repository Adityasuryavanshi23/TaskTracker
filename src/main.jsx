import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <Toaster />
      <App />
    </Router>
  </Provider>
);
