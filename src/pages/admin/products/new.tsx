import { NextPageWithLayout } from '@/pages/_app'
import {
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  Select,
  Icon,
  Flex,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Button,
  VStack,
} from '@chakra-ui/react'
import { getAdminLayout } from '../../../components/layout/admin/AdminLayout'
import NewSelectItem from '@/components/common/NewSelectItem'
import OptionItem from '@/components/common/OptionItem'
import { FiUploadCloud } from 'react-icons/fi'

const NewProductPage: NextPageWithLayout = () => {
  return (
    <>
      {/* Upload image */}
      <SimpleGrid
        columns={2}
        spacingX={1}
        spacingY={1}
        bg={'white'}
      >
        <VStack
          p={4}
          spacing={10}
        >
          {/* Product name */}
          <FormControl>
            <FormLabel>Product Name</FormLabel>
            <Input />
            <FormHelperText fontSize={'xs'}>
              Do not exceed 20 characters in product name.
            </FormHelperText>
            <FormErrorMessage>Error message</FormErrorMessage>
          </FormControl>

          <FormControl>
            <FormLabel>Price</FormLabel>
            <Input />
            <FormHelperText fontSize={'xs'}>
              Do not exceed 20 characters in product name.
            </FormHelperText>
            <FormErrorMessage>Error message</FormErrorMessage>
          </FormControl>

          <div className="grid grid-cols-2 space-x-2 w-full">
            {/* Product category */}
            <FormControl display={'inline-block'}>
              <FormLabel>Category</FormLabel>
              <Select placeholder="Select Category">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
              <NewSelectItem name="New Category" />
            </FormControl>

            {/* Product Brand */}
            <FormControl display={'inline-block'}>
              <FormLabel>Brand</FormLabel>
              <Select placeholder="Select Brand">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
              <NewSelectItem name="New Brand" />
            </FormControl>
          </div>

          {/* Product collection */}

          <Flex>
            <FormControl>
              <FormLabel>Collection</FormLabel>
              <Select placeholder="Select Collection">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
              <NewSelectItem name="New Collection" />
            </FormControl>
          </FormControl>
            <FormControl display={'inline-block'}>
              <FormLabel>Discount</FormLabel>
              <Select placeholder="Select Category">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
              <NewSelectItem name="New Discount" />
            </FormControl>
          </Flex>
        </VStack>
        <div>
          <Card mb="10">
            <CardHeader>
              <Heading size="md">Product Images</Heading>
            </CardHeader>

            <CardBody
              h={200}
              className="grid grid-cols-2 space-x-5"
            >
              {/* <BsUpload /> */}
              {/* <FaUpload /> */}
              {/* <FiUpload /> */}
              {/* <div className=" span border-2 border-gray-300 bg-red-200 flex items-center justify-center"> */}
              <Icon
                p={10}
                borderWidth="1px"
                borderColor={'gray.400'}
                color="gray.500"
                boxSize="full"
                as={FiUploadCloud}
              />
              <div className="flex flex-col">
                {/* <div className="flex flex-wrap flex-grow items-center justify-center mx-auto">
                  {Array(9)
                    .fill('')
                    .map((value, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 border-2 mr-2 mt-1 w-16 h-16"
                      ></span>
                    ))}
                </div> */}
                <Button fontSize="xs">Add more images</Button>
              </div>

              {/* </div> */}
            </CardBody>
          </Card>

          {/* <FormControl>
            <FormLabel>Option</FormLabel>
            <Input placeholder="Search for options" />
            <NewSelectItem name="Create new option" />
          </FormControl> */}

          <Card>
            <CardHeader>
              <Heading size="md">Product Options</Heading>
            </CardHeader>

            <CardBody>
              <Stack
                divider={<StackDivider />}
                spacing="4"
              >
                <OptionItem />
                <OptionItem />
              </Stack>
            </CardBody>
          </Card>
          <div className="my-4 flex justify-end space-x-5">
            <Button>Save Product</Button>
            <Button>Publish Product</Button>
          </div>
        </div>
      </SimpleGrid>

      {/* Form goes here */}
    </>
  )
}

NewProductPage.getLayout = getAdminLayout
export default NewProductPage
