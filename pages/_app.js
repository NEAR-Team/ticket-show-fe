import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import AppProvider from "../context/app.context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <>
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </>
    </AppProvider>
  );
}

export default MyApp;
