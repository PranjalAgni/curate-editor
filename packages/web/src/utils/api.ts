import { AxiosResponse, Method } from "axios";
import axiosInstance from "./axios";

export type APICallConfig = {
  url: string;
  method?: Method;
  payload: any;
};

export const makeAPICall = async ({
  url,
  method = "POST",
  payload
}: APICallConfig): Promise<AxiosResponse> => {
  const BASE_API_URL = "http://localhost:5000/api";
  const API_URL = `${BASE_API_URL}${url}`;

  const response = await axiosInstance({
    url: API_URL,
    method,
    data: JSON.stringify(payload)
  });

  return response;
};
