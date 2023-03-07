import { NextPageWithLayout } from "@/pages/_app";
import { ReactElement } from "react";
import ClientLayout from "@/components/layout/ClientLayout";

const CollectionPage: NextPageWithLayout = () => {
  return (
    <>
      <section>This is collection page</section>
    </>
  )
}

CollectionPage.getLayout = (page: ReactElement) => {
  return <ClientLayout>{page}</ClientLayout>
}

export default CollectionPage;