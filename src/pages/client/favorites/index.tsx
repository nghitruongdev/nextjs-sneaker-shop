import { ReactElement } from "react";
import ClientLayout from "../../../components/layout/ClientLayout";
import { NextPageWithLayout } from "../../_app";
import FavCard from '../favorites/components/FavCard';

const ClientPage: NextPageWithLayout = () => {
  return (
    <FavCard/>
  );
}

ClientPage.getLayout = (page: ReactElement) => {
  return <ClientLayout>{page}</ClientLayout>
}

export default ClientPage;