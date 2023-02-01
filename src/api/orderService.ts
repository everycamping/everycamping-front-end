import { authAxios } from './authAxios';

export const postOrders = async (orderInfo : {  
  name: string;
  phone: string;
  address: string;
  request: string;
  orderProductFormList : object[];
}) => {
    const result = await authAxios.post('/api/orders', orderInfo)
    return result
}

export const getUserOrderLIst = async (sort?: { type: string; sort: string }, searchDate?: {
  startDate: string;
  endDate: string;
}) => {
  if (searchDate) {
    const result = await authAxios.get(`/api/orders/customer?sort=${sort?.type},${sort?.sort}&startDate=${
    searchDate?.startDate}&endDate=${searchDate?.endDate}`)
    return result.data.content
  } else {
    const result = await authAxios.get(`/api/orders/customer?sort=${sort?.type},${sort?.sort}`)
    return result.data.content
  }
}
export const getUserOrderDetail = async (orderId : number) => {
  const result = await authAxios.get(`/api/orders/customer/${orderId}`)
  return result.data
}

export const getSellerOrderLIst = async () => {
  const result = await authAxios.get(`/api/orders/seller`)
  return result.data.content
}
export const getSellerOrderDetail = async (orderId : number) => {
  const result = await authAxios.get(`/api/orders/seller/${orderId}`)
  return result.data
}

export const patchOrderCancel = async (id : number) => {
  const result = await authAxios.patch(`/api/orders/${id}/cancel`)
  return result
}
export const patchOrderConfirm = async (id : number) => {
  const result = await authAxios.patch(`/api/orders/${id}/confirm`)
  return result
}