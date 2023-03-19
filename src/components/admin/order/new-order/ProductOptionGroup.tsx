import { ProductOption, OptionValue } from '@/domain/ProductOption'
import { useRadioGroup, HStack } from '@chakra-ui/react'
import OptionValueCheckbox from './OptionValueCheckbox'

// Step 2: Use the `useRadioGroup` hook to control a group of custom radios.
const ProductOptionGroup = ({
  option,
  filteredValues,
  updateSelectedOptionValue,
  removeSelectedOption,
}: {
  option: ProductOption | null
  filteredValues: OptionValue[]
  updateSelectedOptionValue: (optionValue: OptionValue) => void
  removeSelectedOption: () => void
}) => {
  const handleRadioChange = (next: string) => {
    const selected = filteredValues.find(
      (filtered) => filtered.id + '' === next
    )
    if (selected) updateSelectedOptionValue(selected)
  }

  const { getRootProps, getRadioProps, value, setValue } = useRadioGroup({
    name: option?.type?.name,
    onChange: handleRadioChange,
  })

  const group = getRootProps({})
  return (
    <>
      {option?.values && (
        <HStack {...group}>
          {option.values.map((optionValue) => {
            const radio = getRadioProps({
              value: `${optionValue.id}`,
              isDisabled:
                filteredValues.findIndex(
                  (filtered) => filtered.id === optionValue.id
                ) === -1,
            })
            return (
              <OptionValueCheckbox
                uncheck={() => (setValue(''), removeSelectedOption())}
                key={optionValue.id}
                {...radio}
              >
                {optionValue.name}
              </OptionValueCheckbox>
            )
          })}
        </HStack>
      )}
    </>
  )
}

export default ProductOptionGroup
