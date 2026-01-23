import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layout
import MainLayout from "./layouts/MainLayout";

// Pages
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Loans from "./pages/Loans";
import Customers from "./pages/Customers";
import Transactions from "./pages/Transactions";
import Analytics from "./pages/Analytics";
import Notifications from "./pages/Notifications";
import ChangePassword from "./pages/ChangePassword";
import Profile from "./pages/Profile";

// Auth utils
import { getAuth } from "./utils/authStorage";

import { useEffect } from "react";
import { syncProfile } from "./utils/authSync";

// ===============================
// 🔐 PROTECTED ROUTE
// ===============================
function ProtectedRoute({ children }) {
  const auth = getAuth();

  if (!auth || !auth.token) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}

// ===============================
// 🚪 PUBLIC AUTH ROUTE
// ===============================
function PublicAuthRoute({ children }) {
  const auth = getAuth();

  if (auth?.token) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

// ===============================
// 🚀 APP
// ===============================
function App() {

  // seEffect(() => {
  //   🔥 force TopBar + others to re-read auth on refresh
  //   window.dispatchEvent(new Event("auth-updated"));
  // }, []);

  useEffect(() => {
    syncProfile(); 
  }, []);

  return (
    <BrowserRouter>
      <Routes>

        {/* LANDING */}
        <Route path="/" element={<LandingPage />} />

        {/* AUTH */}
        <Route
          path="/auth"
          element={
            <PublicAuthRoute>
              <AuthPage />
            </PublicAuthRoute>
          }
        />

        {/* PROTECTED */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/loans" element={<Loans />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/notifications" element={<Notifications />} />
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
