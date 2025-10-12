import { OrderType } from "@/types/Order"

export interface ListAllOrdersResponse {
  orders: OrderType[]
  meta: {
    limit: number
    page: number
    total: number
  }
}