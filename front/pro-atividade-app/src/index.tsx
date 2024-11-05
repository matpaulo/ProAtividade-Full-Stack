import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import Menu from "./components/Menu";
import "bootswatch/dist/flatly/bootstrap.min.css";
import { BrowserRouter as Router, useLocation } from "react-router-dom";

function LoginPage() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <>
      {!isLoginPage && <Menu />}
      <div>
        <App />
      </div>
    </>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Router>
      <LoginPage />
    </Router>
  </React.StrictMode>
);
