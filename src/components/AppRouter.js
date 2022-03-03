import { Route, Routes } from "react-router-dom";

import { LoginPage } from "../pages/LoginPage";
import { SignUpPage } from "../pages/SignUpPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
    </Routes>
  );
};
