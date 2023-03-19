import { NextPageWithLayout } from "@/pages/_app";
import { ReactElement } from "react";
import ClientLayout from "@/components/layout/ClientLayout";
import ProductList from "../../../components/client/ProductList";
const ProductPage: NextPageWithLayout = () => {
  return (
    <>
      <section>This is product page</section>
      <ProductList/>
    </>
  )
}

ProductPage.getLayout = (page: ReactElement) => {
  return <ClientLayout>{page}</ClientLayout>
}

export default ProductPage;