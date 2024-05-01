import NavBar from "@/components/NavBar";
import { AuthProvider } from "@/context/auth";
import "@/styles/globals.css";
import axios from "axios";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL + "/api";
  axios.defaults.withCredentials = true; //전역 지정. axios call마다 withCredential : true 안줘도됨.

  const { pathname } = useRouter();
  const authRoutes = ["/register", "/login"];
  const authRoute = authRoutes.includes(pathname);
  return (
    <AuthProvider>
      {!authRoute && <NavBar />}
      <div className={authRoute ? "" : "pt-16"}></div>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
