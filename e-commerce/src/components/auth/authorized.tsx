import { useEffect, useState } from "react";
import { setSession, logout } from "../../store/feature/authSlice";
import { useDispatch } from "react-redux";
import "../../styles/loading.css";
import API from "../../services/axios";
import { setAccessToken } from "../../services/token";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: refreshData } = await API.post("/auth/refresh");
        setAccessToken(refreshData.accessToken);

        const { data: profileData } = await API.get("/auth/profile");
        dispatch(setSession(profileData.data ?? profileData));
      } catch {
        setAccessToken(null);
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [dispatch]);

  if (loading) {
    return <div className="sessionCont">Loading session...</div>;
  }

  return <>{children}</>;
}