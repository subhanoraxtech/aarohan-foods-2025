import { BUNDLE_STATUS } from "./enums";
import { OrderType } from "./Order";
import { ServicedPremisesType } from "./ServicedPremises";
import { DeliveryAgent, Supplier } from "./User";

export interface BundleType {
  _id?: string;
  bundleNumber?: number;
  totalOrders?: number;
  deliveredOrders?: number;
  servicedPremisesId?: ServicedPremisesType;
  deliveryAgentId?: DeliveryAgent | string | null;
  supplierId: Supplier | string | null;
  orderIds: string[] | OrderType[];
  status: BUNDLE_STATUS;
  bundleDate?: string;
  deliveryDate?: string;
  availableFrom?: string;
  availableTo?: string;
  cancelReason: string | null;
  createdAt?: string;
  updatedAt?: string;
}
