import { Route, Routes, Navigate } from "react-router-dom";

import { LoginPage } from "../pages/LoginPage";
import { SignUpPage } from "../pages/SignUpPage";
import { DashboardPage } from "../pages/DashboardPage";
import { useAuth } from "../contexts/AppProvider";

export const AppRouter = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      {isLoggedIn ? (
        <>
          <Route path="/dashboard" element={<DashboardPage />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
};
