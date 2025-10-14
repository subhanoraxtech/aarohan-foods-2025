
export enum Role {
  CUSTOMER = "customer",
  SUPPLIER = "supplier",
  DELIVERY_AGENT = "delivery_agent",
  SECURITY="security",
  ADMIN = "admin",
}

export enum BUNDLE_STATUS {
  PENDING = 'pending',
  ASSIGNED = 'assigned',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export enum STATUS {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}


 export enum PAYMENT_STATUS {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed'
}

export enum NOTIFICATION_TYPE {
  MENU_PLACED = 'menu_placed',
  BUNDLE_AVAILABLE = 'bundle_available',
  ORDER_COMPLETED = 'order_completed',
  ORDER_READY = 'order_ready',
  DELIVERY_REQUEST_APPROVED = 'delivery_request_approved',
  DELIVERY_REQUEST_REJECTED = 'delivery_request_rejected',
  SUPPLIER_REQUEST_APPROVED = 'supplier_request_approved',
  SUPPLIER_REQUEST_REJECTED = 'supplier_request_rejected'
}


export enum ORDER_STATUS {
  PENDING = "pending",
  PLACED = "placed",
  READY = "ready",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}
