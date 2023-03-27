import { ProductOption, OptionType } from '@/domain/ProductOption'
import { useRadioGroup, HStack } from '@chakra-ui/react'
import OptionValueCheckbox from './OptionValueCheckbox'

// Step 2: Use the `useRadioGroup` hook to control a group of custom radios.
const ProductOptionGroup = ({
  type,
  filteredOptions,
  updateSelectedOption,
  removeSelectedOptionType,
}: {
  type: OptionType | null
  filteredOptions: ProductOption[]
  updateSelectedOption: (option: ProductOption) => void
  removeSelectedOptionType: () => void
}) => {
  const handleRadioChange = (next: string) => {
    const selected = filteredOptions.find(
      (filtered) => filtered.id + '' === next
    )
    if (selected) updateSelectedOption(selected)
  }

  const { getRootProps, getRadioProps, value, setValue } = useRadioGroup({
    name: type?.name,
    onChange: handleRadioChange,
  })

  const group = getRootProps({})
  return (
    <>
      {type?.values && (
        <HStack {...group}>
          {type?.values.map((option) => {
            const radio = getRadioProps({
              value: `${option.id}`,
              isDisabled:
                filteredOptions.findIndex(
                  (filtered) => filtered.id === option.id
                ) === -1,
            })
            return (
              <OptionValueCheckbox
                uncheck={() => (setValue(''), removeSelectedOptionType())}
                key={option.id}
                {...radio}
              >
                {option.value}
              </OptionValueCheckbox>
            )
          })}
        </HStack>
      )}
    </>
  )
}

export default ProductOptionGroup
