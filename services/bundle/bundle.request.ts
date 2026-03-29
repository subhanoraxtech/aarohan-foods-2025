export interface ListAllBundlesRequest {
    payload: {
      _id?: string | string[];
      search?: string;
      status?: string;
      bundleDate?: string;
      limit?: string;
      page?: string;
      supplierAssignedStatus?: string;
      deliveryAgentAssignedStatus?: string;
    }
  }
  