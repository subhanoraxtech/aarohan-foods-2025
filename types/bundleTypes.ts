import { BUNDLE_STATUS } from "./enums"
import { OrderType } from "./Order"
import { ServicedPremisesType } from "./ServicedPremises"
import { DeliveryAgent, Supplier } from "./User"



export interface BundleType {
    _id?: string
    bundleNumber: number
    totalOrders: number
    premisesName: string
    servicedPremisesId: ServicedPremisesType
    assignedDeliveryAgent: DeliveryAgent| string | null
    assignedSupplier: Supplier | string | null
    orderIds: string[] | OrderType[]
    status: BUNDLE_STATUS
    supplierAssignedStatus:"assigned" | "not-assigned"
    deliveryAgentAssignedStatus:"assigned" | "not-assigned"
    bundleDate?: string
    createdAt?: string
    updatedAt?: string
  }

