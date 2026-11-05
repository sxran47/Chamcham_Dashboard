import React from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import ConfirmModal from "../modals/ConfirmModal";
import { useState } from "react";
import logo from "../../assets/cham-chamnan-logo.png";

/**
 * SimpleHeader Component
 * Displays the App Logo/Title and a Logout button.
 */
const SimpleHeader = ({ isDark = false }) => {
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleSignOut = async () => {
    try {
      await authService.logout();
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Logout Error:", err);
      // Even if logout fails, navigate to login page for safety
      navigate("/", { replace: true });
    }
  };

  return (
    <>
      <header
        className={`h-20 shrink-0 px-8 flex items-center justify-between sticky top-0 z-50 transition-all duration-500 ${
          isDark
            ? "bg-transparent text-white border-b border-white/10"
            : "bg-white/80 backdrop-blur-md text-gray-900 border-b border-gray-100"
        }`}
      >
        {/* Brand / Logo Area */}
        <div className="group cursor-pointer">
          <img src={logo} alt="Cham-Chamnan" className="w-[120px] h-auto" />
        </div>

        {/* Actions Area */}
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className={`flex items-center gap-3 px-5 py-2.5 rounded-2xl transition-all duration-300 font-bold text-sm border group ${
            isDark
              ? "text-gray-300 hover:text-white border-white/10 hover:bg-white/5"
              : "text-inactive hover:text-primary border-transparent hover:bg-primary/5"
          }`}
        >
          <LogOut
            size={18}
            strokeWidth={2.5}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span>ออกจากระบบ</span>
        </button>
      </header>

      <ConfirmModal
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={handleSignOut}
        title="ออกจากระบบ"
        message="คุณต้องการออกจากระบบใช่หรือไม่?"
        confirmText="ออกจากระบบ"
        isDestructive={true}
      />
    </>
  );
};

export default SimpleHeader;
