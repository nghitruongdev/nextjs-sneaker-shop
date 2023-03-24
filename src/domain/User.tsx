import { Address } from './Address'

export type User = {
  id: number
  login: string
  firstName: string
  lastName: string
  fullName: string
  gender: string
  email: string
  phone: string
  birthdate: string
  note: string
  imageUrl: string
  address: Address | null
  deletedDate?: Date
  _links: any
}
