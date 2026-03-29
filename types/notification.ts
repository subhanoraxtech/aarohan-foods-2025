import { BundleType } from "./bundleTypes";
import { NOTIFICATION_TYPE } from "./enums";
import { Menu } from "./Menu";

export interface NotificationType {
  _id?: string;
  type?: NOTIFICATION_TYPE;
  title?: string;
  message?: string;
  image?: string;
  expiresAt?: string;
  deliveryDate?: string;
  targetUsers: any;
  metadata: {
    menuId?: { $oid: string } | Menu | null;
    bundleId?: { $oid: string }[] | string[] | BundleType[] | null;
  };
  createdAt?: string;
  updatedAt?: string;
}
