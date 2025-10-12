export type Menu = {
  _id?: string
  dayOfMonth: number
  name: string
  description: string
  image: string
  price: number
  isActive: boolean
  type: 'veg' | 'non-veg'
  createdAt?: string
  updatedAt?: string
}
