import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthProvider   from "./hooks/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";

import Login      from "./pages/Login";
import Register   from "./pages/Register";
import Dashboard  from "./pages/Dashboard";
import Adoption   from "./pages/Adoption";
import LostPets   from "./pages/LostPets";
import Report     from "./pages/Report";
import ReportForm from "./pages/ReportForm";
import Tips       from "./pages/Tips";
import Settings   from "./pages/Settings";
import Donations  from "./pages/Donations";
import CameraPage from "./pages/Camera";
import Alerts     from "./pages/Alerts";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Públicas */}
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protegidas */}
          <Route path="/dashboard"   element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/adoption"    element={<ProtectedRoute><Adoption /></ProtectedRoute>} />
          <Route path="/lost"        element={<ProtectedRoute><LostPets /></ProtectedRoute>} />
          <Route path="/report"      element={<ProtectedRoute><Report /></ProtectedRoute>} />
          <Route path="/report/form" element={<ProtectedRoute><ReportForm /></ProtectedRoute>} />
          <Route path="/tips"        element={<ProtectedRoute><Tips /></ProtectedRoute>} />
          <Route path="/settings"    element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/donate"      element={<ProtectedRoute><Donations /></ProtectedRoute>} />
          <Route path="/camera"      element={<ProtectedRoute><CameraPage /></ProtectedRoute>} />
          <Route path="/alerts"      element={<ProtectedRoute><Alerts /></ProtectedRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}