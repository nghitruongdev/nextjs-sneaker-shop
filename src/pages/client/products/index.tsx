import { NextPageWithLayout } from "@/pages/_app";
import { ReactElement } from "react";
import ClientLayout from "@/components/layout/ClientLayout";
import ProductList from "../../../components/client/ProductList";
import Filter from '../products/components/Filter';
const ProductPage: NextPageWithLayout = () => {
  return (
    <>
      {/* <section>This is product page</section> */}
      <Filter/>
      <ProductList />
    </>
  )
}

ProductPage.getLayout = (page: ReactElement) => {
  return <ClientLayout>{page}</ClientLayout>
}

export default ProductPage;