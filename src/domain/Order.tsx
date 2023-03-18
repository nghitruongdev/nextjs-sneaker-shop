type Order = {
  id: number
  status: string
  time: Date
  subTotal: number
  active?: boolean
  user?: {
    id: number
    login: string
  }
  shippingAddress?: {
    id: number
    name?: string
    email?: string
    phone?: string
  }
  _links: any
}

export default Order
