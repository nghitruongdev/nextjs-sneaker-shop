import ClientLayout from "@/components/layout/ClientLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { ReactElement } from "react";

const CartPage:NextPageWithLayout = () => {
    return (
        <div>this is cart page</div>
    );
}
CartPage.getLayout = (page: ReactElement) => {
    return <ClientLayout>{page}</ClientLayout>
}

export default CartPage;