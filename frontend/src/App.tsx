import { authClient } from "@/lib/auth-client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ForgotPassword from "./components/auth/forgot-password";
import Onboarding from "./components/auth/onboarding";
import ResetPassword from "./components/auth/reset-password";
import SignIn from "./components/auth/sign-in";
import { SignUp } from "./components/auth/sign-up";
import VerifyEmail from "./components/auth/verify-email";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { useSession } = authClient;
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <Navigate to="/sign-in" replace />;
  }

  return <>{children}</>;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/onboarding"
          element={
            <ProtectedRoute>
              <Onboarding />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
