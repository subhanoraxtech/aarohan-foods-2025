import { NOTIFICATION_TYPE } from "./enums"

export interface NotificationType {
    _id?: string
    type?: NOTIFICATION_TYPE
    title?: string
    message?: string
    expiryTime?: string
    bundleDate?:string
    createdAt?: string
    updatedAt?: string
  }

  