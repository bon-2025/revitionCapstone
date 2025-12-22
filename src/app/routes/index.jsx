import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense } from "react";
import { useAuth } from "../context/UserAuthContext";
import DashboardLayout from "../layout/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "../../pages/notFound/NotFound";
import { ROUTE_CONFIG } from "../config/routeConfig";

import LoadingModal from "../../components/shared/LoadingModal";

const renderRouteElement = (route, user) => {

  // Role-based dashboard
  if (route.elementByRole) {
    if (!user) return <Navigate to="/" replace />;
    const Component = route.elementByRole[user.role];
    return Component ? <Component /> : <Navigate to="/" replace />;
  }

  // Protected route
  if (route.roles) {
    const Component = route.element;
    return (
      <ProtectedRoute allowedRoles={route.roles}>
        <Component />
      </ProtectedRoute>
    );
  }

  // Public route
  const Component = route.element;
  return <Component />;
};

export default function AppRoutes() {
  const { user } = useAuth();

  const publicRoutes = ROUTE_CONFIG.filter(
    r => !r.roles && !r.path.startsWith("/dashboard")
  );

  const dashboardRoutes = ROUTE_CONFIG.filter(
    r => r.roles || r.path.startsWith("/dashboard")
  );

  return (
    <Suspense fallback={<LoadingModal loading content="Loading... Please wait"/>}>
      <Routes>
        {/* Public routes */}
        {publicRoutes.map(route => {
          const Component = route.element;
          return (
            <Route
              key={route.path}
              path={route.path}
              element={<Component />}
            />
          );
        })}

        {/* Login */}
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" replace /> : renderRouteElement({ element: route => route }, user)}
        />

        {/* Dashboard layout */}
        <Route element={<DashboardLayout />}>
          {dashboardRoutes.map(route => (
            <Route
              key={route.path}
              path={route.path.replace(/^\//, "")}
              element={renderRouteElement(route, user)}
            />
          ))}
        </Route>

        {/* Not found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
