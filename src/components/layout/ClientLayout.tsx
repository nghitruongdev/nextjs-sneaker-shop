import { ReactNode } from "react";
// import Navbar from "../../components/client/Navbar";
import Store from "../client/Store";
import Footer from "../../components/client/Footer";
import AnoNav from "../client/AnoNav";
const ClientLayout = ({children} : {children : ReactNode}) => {
    return (
        <>
            <AnoNav/> 
            <main>{children}</main>
            <Footer/>
        </>
    )
}

export default ClientLayout;