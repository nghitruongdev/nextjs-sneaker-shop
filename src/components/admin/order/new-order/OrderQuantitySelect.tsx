import { Select } from '@chakra-ui/react'
import { ChangeEvent, ChangeEventHandler, useEffect } from 'react'

type Props = {
  availableQty: number | undefined | null
  quantity: number | undefined
  updateQuantity: (value: number) => void
}

const OrderQuantitySelect = ({
  availableQty,
  quantity,
  updateQuantity,
}: Props) => {
  // * update quantity
  useEffect(() => {
    if (quantity && availableQty && quantity > availableQty)
      updateQuantity(availableQty)
  }, [availableQty, quantity, updateQuantity])

  const MAX_QUANTITY = availableQty && availableQty <= 10 ? availableQty : 10
  return (
    <Select
      placeholder="Số lượng"
      value={quantity}
      onChange={(event) => updateQuantity(+event.target.value)}
    >
      {[...Array(MAX_QUANTITY).keys()].map((item) => (
        <option
          key={item}
          value={item + 1}
        >
          {item + 1}
        </option>
      ))}
    </Select>
  )
}
export default OrderQuantitySelect
