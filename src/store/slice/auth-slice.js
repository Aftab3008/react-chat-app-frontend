import { apiClient } from "@/lib/api-client";
import { CHECK_AUTH } from "@/utils/constants";

export const createAuthSlice = (set) => ({
  userInfo: undefined,
  setUserInfo: (userInfo) => {
    set({ userInfo });
  },
  checkAuthentication: async (token) => {
    try {
      if (!token) return;
      const response = await apiClient.get(CHECK_AUTH, {
        params: { token },
        withCredentials: true,
      });
      set({ userInfo: response.data.user });
    } catch (error) {
      console.error(error);
    }
  },
});
