import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import AdminUsers from "./pages/AdminUsers.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  const location = useLocation();
  const noNavbarRoutes = ["/login", "/signup"];

  const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" replace />;
  };

  return (
    <div>
      {/* Hide Navbar on Login & Signup */}
      {!noNavbarRoutes.includes(location.pathname) && <Navbar />}

      <div style={{ padding: 16 }}>
        <Routes>
          {/* Default page → Signup */}
          <Route path="/" element={<Signup />} />

          {/* Auth Pages */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Admin Dashboard (Protected) */}
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminUsers />
              </PrivateRoute>
            }
          />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
