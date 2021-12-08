import NavBar from "../components/NavBar";
import AppProvider from "../context/app.context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <>
        <NavBar />
        <Component {...pageProps} />
      </>
    </AppProvider>
  );
}

export default MyApp;
