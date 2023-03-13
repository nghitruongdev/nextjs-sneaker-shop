type Order = {
  id: number
  status: string
  time: Date
  subTotals: number
  active?: boolean
}

export default Order
