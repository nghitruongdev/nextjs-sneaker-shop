import { NextPageWithLayout } from "@/pages/_app";
import { ReactElement } from "react";
import Filter from "./components/Filter";
// import Store from "../../../components/client/Store";
import Card from "../../../components/client/Card";
import ClientLayout from "@/components/layout/ClientLayout";

const ProductPage: NextPageWithLayout = () => {
  return (
    <>
      <section>This is product page</section>
      {/* <Card /> */}
    </>
  )
}

ProductPage.getLayout = (page: ReactElement) => {
  return <ClientLayout>{page}</ClientLayout>
}

export default ProductPage;