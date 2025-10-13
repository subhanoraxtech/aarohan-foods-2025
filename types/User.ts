import { Role } from "./enums";
import { ServicedPremises } from "./ServicedPremises";

export interface Address {
  addressLine1: string
  addressLine2?: string
  area?: string
  city?: string
  state?: string
  pincode?: string
  country?: string
}

export interface DeliveryAgent {
  _id?: string
  userId?: User
  deliveryAgentNumber?: number
  firstName: string
  lastName: string
  vehicleType: 'Bike' | 'Car' | 'Van' | string
  vehicleNumber: string
  age?: number
  gender?: 'male' | 'female' | 'others'
  mobile: string
  altMobile?: string
  photo?: string | File
  aadharNumber?: string
  aadharCopy?: string | File
  panNumber?: string
  panCopy?: string | File
  drivingLicenseNumber?: string
  drivingLicenseExpiryDate?: string
  drivingLicenseCopy?: string
  address?: Address
  bankAccountNumber?: string
  bankIfscCode?: string
  createdAt?: string
  updatedAt?: string
}

export interface Supplier{
  _id?: string
  supplierNumber?: number
  userId?: User
  firstName: string
  lastName: string
  photo?: string | File
  panCopy?: string | File
  businessName: string
  age?: number
  gender?: 'male' | 'female' | 'others'
  businessType: 'Sole Proprietorship' | 'Partnership' | 'Private Limited' | 'LLP' | string
  address?: Address
  mobile: string
  altMobile?: string
  landline?: string
  panNumber?: string
  bankAccountNumber?: string
  bankIfscCode?: string
  upiId?: string
  maxSupplyCapacity?: number
  createdAt?: string
  updatedAt?: string
}


export interface User {
  _id?: string
  email?: string
  phone?: string
  password?: string
  isActive?: boolean
  role: 'admin' | 'delivery_agent' | 'supplier' | 'customer' | 'security'
  supplierId?: Supplier
  deliveryAgentId?: DeliveryAgent
  banReason?: string
  createdAt?: string
  updatedAt?: string
}


export interface CustomerType {
  userId?: User
  _id?: string
  customerNumber?: number
  firstName?: string
  lastName?: string
  address?: CustomerAddressType[]
  createdAt?: string
  updatedAt?: string
}
export interface CustomerAddressType {
  isActive?: boolean
  apartmentNumber?: string
  blockNumber?: string
  premises?: ServicedPremises
}

