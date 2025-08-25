import { routes } from "@/constants/routes";
import { API } from "@/services/api";
import { dispatch } from "@/store";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

export const useMe = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async () => API.me(),
    onSuccess: (response) => {
      dispatch.userData.setUserAndLogin(response.data);
      navigate(routes.DASHBOARD);
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
