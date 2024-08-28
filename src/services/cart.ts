import { axiosInstance } from "./axios-instance"
import { CartDTO, CreateCartItemValues } from "./dto/cart.dto"

export const getCart = async (): Promise<CartDTO> => {
  return (await axiosInstance.get<CartDTO>("/cart")).data
}

export const updateCartItemQuantity = async (
  itemId: number,
  quantity: number
): Promise<CartDTO> => {
  return (
    await axiosInstance.patch<CartDTO>("/cart/" + itemId, {
      quantity,
    })
  ).data
}

export const removeCartItem = async (itemId: number): Promise<CartDTO> => {
  return (await axiosInstance.delete<CartDTO>("/cart/" + itemId)).data
}

export const addCartItem = async (
  values: CreateCartItemValues
): Promise<CartDTO> => {
  return (await axiosInstance.post<CartDTO>("/cart/", values)).data
}
