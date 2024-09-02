import { User } from "@prisma/client";
import { axiosInstance } from "./axios-instance";

export const getMe = async () => {
  return (await axiosInstance.get<User>("/auth/me")).data;
};
