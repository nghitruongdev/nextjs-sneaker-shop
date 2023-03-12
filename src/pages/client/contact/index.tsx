import { NextPageWithLayout } from '@/pages/_app';
import { ReactElement } from 'react';
import ClientLayout from '@/components/layout/ClientLayout';
import Test from '../../../components/client/Test';
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Text,
  Icon,
} from '@chakra-ui/react';
import { BsPhone } from 'react-icons/bs';
import {FiMail} from 'react-icons/fi';
import { CopyIcon } from '@chakra-ui/icons';

import Contact from './components/ContactForm';
const ContactPage: NextPageWithLayout = () => {
  return (
    <>
      <Contact />
    </>
  )
}

ContactPage.getLayout = (page: ReactElement) => {
  return <ClientLayout>{page}</ClientLayout>
}

export default ContactPage
