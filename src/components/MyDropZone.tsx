import { Box, Icon, Input } from '@chakra-ui/react'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { AiOutlineUpload } from 'react-icons/ai'
import { BiChevronsUp, BiCloudUpload } from 'react-icons/bi'
import { BsCloudUploadFill, BsDashCircleFill } from 'react-icons/bs'
import { FiUpload, FiUploadCloud } from 'react-icons/fi'
import { GrUploadOption } from 'react-icons/gr'
import { HiUpload } from 'react-icons/hi'
import { ImUpload } from 'react-icons/im'
import { RiChatUploadLine, RiUploadFill } from 'react-icons/ri'

const MyDropZone = () => {
  const onDrop = useCallback((acceptedFiles: any) => {
    console.log('acceptedFiles', acceptedFiles)
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <Box
      {...getRootProps()}
      py="1"
      px="3"
      bg="white"
      fontWeight="light"
      color="blue.500"
      rounded="20"
      display="flex"
      alignItems="center"
      textAlign="center"
      cursor="pointer"
      w="250px"
      h="200px"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <Box
          bg="white"
          rounded="10"
          border="dashed"
          p="5"
          borderWidth={2}
          borderColor="gray.300"
          display="flex"
          fontSize="xs"
          flexDir="column"
          alignItems="center"
        >
          <Icon
            as={BsCloudUploadFill}
            boxSize="20"
            fontWeight="light"
            transition="transform 0.1s linear"
            _hover={{
              transform: 'translateY(-5px)',
            }}
          />
          <p>{`Drag 'n' drop some files here, or click to select files`}</p>
        </Box>
      )}
    </Box>
  )
}
export default MyDropZone
