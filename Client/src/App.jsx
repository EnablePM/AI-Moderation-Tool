import { StackTheme } from "@stackframe/react";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login.jsx";
import Dashboard from "./Dashboard.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import AuthCallback from "./AuthCallback.jsx";
import HandlerRedirect from "./HandlerRedirect.jsx";

export default function App() {
  return (
    <Suspense fallback={"Loading..."}>
      <BrowserRouter>
        <StackTheme>
          <Routes>
            {/* Catch Stack Auth's default handler route and redirect */}
            <Route path="/handler/magic-link-callback" element={<HandlerRedirect />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/" element={<Login />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </StackTheme>
      </BrowserRouter>
    </Suspense>
  );
}
