import { useMe } from "@/hooks/useMe";
import { API } from "@/services/api";
import { dispatch } from "@/store";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";

export const useLogin = () => {
  const { mutate } = useMe();
  return useMutation({
    mutationFn: async (data: any) => API.login(data),
    onSuccess: (response) => {
      dispatch.auth.login(response.accessToken);
      mutate();
    },
    onError: (error: any) => {
      if (error?.response?.data?.message) {
        message.error(error?.response?.data?.message);
      } else {
        message.error(error?.message);
      }
    },
  });
};
