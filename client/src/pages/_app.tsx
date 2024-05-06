import NavBar from "@/components/NavBar";
import { AuthProvider } from "@/context/auth";
import "@/styles/globals.css";
import axios from "axios";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { SWRConfig } from "swr";

export default function App({ Component, pageProps }: AppProps) {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL + "/api";
  axios.defaults.withCredentials = true; //전역 지정. axios call마다 withCredential : true 안줘도됨.

  const { pathname } = useRouter();
  const authRoutes = ["/register", "/login"];
  const authRoute = authRoutes.includes(pathname);

  const fetcher = async (url: string) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error: any) {
      throw error.response.data;
    }
  };

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
          integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm"
          crossOrigin="anonymous"
        />
      </Head>
      <SWRConfig value={{ fetcher }}>
        <AuthProvider>
          {!authRoute && <NavBar />}
          <div className={authRoute ? "" : "pt-16"}></div>
          <Component {...pageProps} />
        </AuthProvider>
      </SWRConfig>
    </>
  );
}
