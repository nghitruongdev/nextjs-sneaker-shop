import { ReactElement } from "react";
import ClientLayout from "../../components/layout/ClientLayout";
import { NextPageWithLayout } from "../_app";


const ClientPage: NextPageWithLayout = () => {
  return <>Hello there im client page</>
}

ClientPage.getLayout = (page: ReactElement) => {
  return <ClientLayout>{page}</ClientLayout>
}

export default ClientPage;