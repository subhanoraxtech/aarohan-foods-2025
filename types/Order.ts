import { BundleType } from "./bundleTypes"
import { ORDER_STATUS } from "./enums"
import { Menu } from "./Menu"
import { PaymentType } from "./PaymentType"
import { CustomerType } from "./User"

export interface OrderType {
  _id?: string
  orderNumber: number
  menuId: Menu
  quantity: number
  totalAmount: number
  bundleId: BundleType | string
  status: ORDER_STATUS
  customerId?: CustomerType
  paymentId?: PaymentType
  deliveryDate: string
  createdAt?: string
  updatedAt?: string
}