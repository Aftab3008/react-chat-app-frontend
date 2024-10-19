import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState, useTransition } from "react";
import { apiClient } from "@/lib/api-client";
import { VERIFY_EMAIL } from "@/utils/constants";
import { toast } from "sonner";
import { useAppStore } from "@/store";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setUserInfo } = useAppStore();
  const token = searchParams.get("token");

  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      startTransition(async () => {
        try {
          const response = await apiClient.get(`${VERIFY_EMAIL}/${token}`, {
            withCredentials: true,
          });

          if (response.status === 200) {
            setUserInfo(response.data.user);
            setLoading(false);
            if (response.data.user.profileSetup) {
              toast.success("Email verified successfully");
              navigate("/chat");
            } else {
              navigate("/profile");
            }
          } else if (response.status === 201) {
            setLoading(false);
            toast.message(response.data.message);
          }
        } catch (err) {
          setLoading(false);
          toast.error(err.message);
        }
      });
    } else {
      setLoading(false);
    }
  }, [token, startTransition, setUserInfo, navigate]);

  if (isPending || loading) {
    return <div>Loading...</div>;
  }

  return <div>{token ? `Token: ${token}` : "No token found"}</div>;
}
