import { useEffect, useState } from "react";
import { logout } from "../../store/feature/authSlice";
import { useDispatch } from "react-redux";
import "../../styles/loading.css";
import API from "../../services/axios";
import { setAccessToken } from "../../services/token";
import { HandleCartFetch } from "../../store/feature/cartSlice";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch: any = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: refreshData } = await API.post("/auth/refresh");
        setAccessToken(refreshData.accessToken);

        const { data: profileData } = await API.get("/auth/profile");
        const raw = profileData.data ?? profileData;
        // normalize backend snake_case -> frontend camelCase
        const profilePayload = {
          userId: raw.userId ?? raw.user_id ?? raw.user_id?.toString(),
          userName: raw.userName ?? raw.user_name,
          firstName: raw.firstName ?? raw.first_name,
          secondName: raw.secondName ?? raw.second_name,
          emailAddr: raw.emailAddr ?? raw.email_addr,
          phone: raw.phone ?? raw.phone,
          idNo: raw.idNo ?? raw.id_no,
          accessToken: raw.accessToken ?? raw.access_token,
        };
        // dispatch via plain action object to avoid TS action-creator typing mismatch in this file
        dispatch({ type: 'auth/setSession', payload: profilePayload } as any);

        const profileUserId = profilePayload.userId;
        if (profileUserId) {
          dispatch(HandleCartFetch(profileUserId));
        }
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