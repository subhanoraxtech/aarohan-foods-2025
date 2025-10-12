import { PAYMENT_STATUS } from "./enums"

export interface PaymentType {
    _id?: string
    transactionId?: string
    status?: PAYMENT_STATUS
    amount?: number
    paidAmount?: number
    pendingAmount?: number
    orderId?: string
    createdAt?: string
    updatedAt?: string
  }