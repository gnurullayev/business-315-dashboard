import type { AxiosError } from "axios";
import { toast } from "react-toastify";

export const handleError = (error: AxiosError) => {
  const isError: any = error.response?.data;

  if (isError?.errors) {
    Object.entries(isError?.errors).forEach(([field, messages]) => {
      if (Array.isArray(messages)) {
        messages.forEach((msg) => {
          toast.error(`${field}: ${msg}`);
        });
      }
    });
  } else if (isError?.message) {
    if (isError?.message !== "Network Error")
      toast.error(`Xatolik yuz berdi: ${isError.message}`);
  } else {
    if (error.message !== "Network Error")
      toast.error(`Xatolik yuz berdi: ${error.message}`);
  }
};
