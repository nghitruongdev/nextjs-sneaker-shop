import { Address } from './Address'

export type User = {
  id: number
  login: string
  firstName: string
  lastName: string
  fullName: string
  email: string
  phone: string
  birthdate: Date | null
  note: string
  imageUrl: string
  address: Address | null
}
