import { NextPageWithLayout } from "@/pages/_app";
import { ReactElement } from "react";
import ClientLayout from "@/components/layout/ClientLayout";

const ContactPage: NextPageWithLayout = () => {
  return (
    <>
      <section>This is contact page</section>
    </>
  )
}

ContactPage.getLayout = (page: ReactElement) => {
  return <ClientLayout>{page}</ClientLayout>
}

export default ContactPage;