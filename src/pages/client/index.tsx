import { ReactElement } from "react";
import ClientLayout from "../../components/layout/ClientLayout";
import { NextPageWithLayout } from "../_app";
import Hero from '../../components/client/Hero';

const ClientPage: NextPageWithLayout = () => {
  return (
    <>
      <Hero />
    </>
  )
}

ClientPage.getLayout = (page: ReactElement) => {
  return <ClientLayout>{page}</ClientLayout>
}

export default ClientPage;