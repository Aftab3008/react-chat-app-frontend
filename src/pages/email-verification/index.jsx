import { apiClient } from "@/lib/api-client";
import { useAppStore } from "@/store";
import { USER_VERIFIED } from "@/utils/constants";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function EmailVerification() {
  const { userInfo } = useAppStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        if (userInfo && userInfo.email) {
          const response = await apiClient.get(USER_VERIFIED, {
            params: { email: userInfo.email },
          });

          if (response.status === 200) {
            if (response.data.isVerified) {
              window.location.href = "/chat";
            } else {
              toast.message("Your email is not verified yet.");
            }
          } else {
            setError("Unexpected response from the server.");
          }
        } else {
          setError("No user information available.");
        }
      } catch (err) {
        setError("An error occurred while checking verification.");
        toast.error(
          err.message || "An error occurred while checking verification."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [userInfo]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {error ? (
        <div>{error}</div>
      ) : (
        <div>Please check your email to verify your account.</div>
      )}
    </div>
  );
}
