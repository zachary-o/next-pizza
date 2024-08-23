import { Ingredient } from "@prisma/client"
import { axiosInstance } from "./axios-instance"
import { ApiRoutes } from "./constants"

export const getAll = async (): Promise<Ingredient[]> => {
  return (await axiosInstance.get<Ingredient[]>(ApiRoutes.INGREDIENTS)).data
}
