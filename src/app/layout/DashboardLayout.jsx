import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/UserAuthContext";
import { useNavigation } from "../../hooks/(global_hook)/useNavigation";
import { useConfirmationModal } from "../../hooks/shared/useConfirmationModal";
import DashboardNavbar from "../../components/(global_components)/DashboardNavbar";
import ConfirmationModal from "../../components/shared/ConfirmationModal";
import LoadingModal from "../../components/shared/LoadingModal";

export default function DashboardLayout() {
  // Retrieve current authenticated user and logout function from context
  const { user, logout } = useAuth();

  // Get navigation items from custom hook
  const { navItems } = useNavigation();

  // React Router's navigate function for programmatic navigation
  const navigate = useNavigate();

  // Local state to manage loading state during async operations
  const [loading, setLoading] = useState(false);

  // Initialize a reusable confirmation modal for logging out
  const logoutModal = useConfirmationModal(
    "Logout Confirmation",
    "Are you sure you want to log out?"
  );

  /**
   * Handles the logout process
   * Opens the confirmation modal first.
   * If user confirms:
   *  1. Shows loading modal
   *  2. Simulates delay for async operation (e.g., API call)
   *  3. Calls logout function from context
   *  4. Hides loading modal
   *
   * @returns {void}
   */
  const handleLogout = () => {
    logoutModal.open(async () => {
      setLoading(true);

      // Simulate async delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1500));

      await logout();
      setLoading(false);
    });
  };

  /**
   * Navigate to the user's profile page
   *
   * @returns {void}
   */
  const handleProfileClick = () => navigate("/profile");

  return (
    <div className="d-flex flex-column vh-100">
      {/* Navbar component displaying user info and navigation items */}
      <DashboardNavbar
        user={user}
        navItems={navItems}
        onLogout={handleLogout}
        onProfileClick={handleProfileClick}
      />

      {/* Main content area for nested routes */}
      <main className="flex-grow-1 overflow-auto p-4 bg-light">
        <Outlet />
      </main>

      {/* Logout confirmation modal */}
      <ConfirmationModal
        show={logoutModal.show}
        onConfirm={logoutModal.confirm}
        onCancel={logoutModal.cancel}
        title={logoutModal.title}
        message={logoutModal.message}
      />

      {/* Loading modal displayed during logout operation */}
      <LoadingModal loading={loading} content="Logging out..." />
    </div>
  );
}
