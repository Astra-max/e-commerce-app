import { useEffect, useState } from "react";
import { setSession, logout } from "../../store/feature/authSlice";
import { useDispatch } from "react-redux";
import API from "../../util/axios";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res: any = await API.get("/auth/profile");
        console.log(res)

        dispatch(setSession(res));
      } catch {
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="items-center text-align-middle">
        Checking session...
      </div>
    );
  }

  return <>{children}</>;
}