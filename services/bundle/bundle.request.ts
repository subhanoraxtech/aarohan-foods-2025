export interface ListAllBundlesRequest {
    payload: {
      search?: string
      status?: string
      bundleDate?: string
      limit?: string
      page?: string
      supplierAssignedStatus?: string; // Added for supplier-assigned bundles
    deliveryAgentAssignedStatus?: string; // Added for delivery agent-assigned bundles
    }
  }
  