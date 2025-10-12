import { BundleType } from "@/types/bundleTypes"

export interface ListAllBundlesResponse {
  bundles: BundleType[]
  meta: {
    limit: number
    page: number
    total: number
  }
}