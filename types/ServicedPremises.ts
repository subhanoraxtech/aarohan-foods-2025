export interface ServicedPremises {
  _id?: string;
  apartmentName?: string;
  areaName?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  createdAt?: Date;
  updatedAt?: Date;
}


export interface ServicedPremisesType {
  apartmentName: string;
  areaName: string;
  city: string;
  state: string;
  country: string;
  pincode?: string;
  status?: "active" | "inactive" | "stopped";
  reason_stop?: string;
  security_contact_name?: string;
  security_contact_phone?: string;
  security_email?: string;
  management_contact_name?: string;
  management_contact_phone?: string;
  management_email?: string;
  service_start_date?: Date;
  service_end_date?: Date;
  total_flats?: number;
  total_towers?: number;
  user_name?: string;
  user_phone: string;
  user_email?: string;
  apartmentcode?: string;
  otp?: string;
  otpExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}