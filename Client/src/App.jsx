import { StackHandler, StackTheme } from "@stackframe/react";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login.jsx";
import { stackClientApp } from "./stack/client.ts";

function HandlerRoutes() {
  return <StackHandler app={stackClientApp} fullPage />;
}

export default function App() {
  return (
    <Suspense fallback={"Loading..."}>
      <BrowserRouter>
        <StackTheme>
          <Routes>
            <Route path="/handler/*" element={<HandlerRoutes />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </StackTheme>
      </BrowserRouter>
    </Suspense>
  );
}
