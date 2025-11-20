import { useAuth } from "../context/AuthContext";

export function useAdminAuth() {
  const { user } = useAuth();
  
  const isAdmin = user && user.role === "admin";
  
  return {
    isAdmin,
    user
  };
}