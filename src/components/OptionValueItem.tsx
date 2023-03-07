import { Avatar, Box, Text, Badge, CloseButton, Input } from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react'

interface ItemProps {
  name: string
}
const OptionValueItem = ({ name }: ItemProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [enteredName, setEnteredName] = useState(name)
  const clickHandler = () => {
    setIsClicked(true)
  }
  const inputBlurHandler = () => {
    setIsClicked(false)
  }
  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEnteredName(event.target.value)
  }
  return (
    <Badge
      onClick={clickHandler}
      cursor="pointer"
      pos={'relative'}
      rounded="3px"
      fontSize={'sm'}
      // colorScheme={'blackAlpha'}
      px={3}
      py={1}
      fontWeight={'light'}
      textTransform={'uppercase'}
      onMouseEnter={() => {
        setIsHovered(true)
      }}
      onMouseLeave={() => {
        setIsHovered(false)
      }}
    >
      {isHovered && !isClicked && (
        <p className="flex justify-center items-center text-xs absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-white cursor-pointer active:bg-red-500">
          x
        </p>
      )}
      {isClicked && (
        <Input
          onChange={inputChangeHandler}
          variant={'unstyled'}
          value={enteredName}
          onBlur={inputBlurHandler}
          borderColor={'transparent'}
          bg="transparent"
          size="xs"
          focusBorderColor="transparent"
        />
      )}
      {!isClicked && enteredName}
    </Badge>

    // <p className="flex items-center w-12 font-semibold text-xl justify-center rounded-full p-2 border text-center border-slate-700">
    //   V
    // </p>
  )
}
export default OptionValueItem
