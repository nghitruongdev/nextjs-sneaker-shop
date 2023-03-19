import { OptionValue } from './ProductOption'
export type ProductVariant = {
  id: number
  enabled?: boolean
  stockOnHand: number
  stockAllocated: number
  availableQuantity: number
  optionValues: OptionValue[]
}
