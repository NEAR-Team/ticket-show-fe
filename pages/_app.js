import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import AppProvider from "../context/app.context";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ToastContainer />
      <AppProvider>
        <>
          <NavBar />
          <div className="pt-16">
            <Component {...pageProps} />
          </div>
          <Footer />
        </>
      </AppProvider>
    </>
  );
}

export default MyApp;
