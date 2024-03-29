import { Provider, useDispatch } from "react-redux";
import Head from "next/head";
import { AppProps } from 'next/app';
import { ConnectedRouter } from "connected-next-router";
import store from "./../reducer/rootReducer"
import "./../styles/app.scss";

import Header from "./../components/Header";
import FooterTab from "../components/FooterTab";
import { Drawer } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Advice from "./advice";
import Login from "./tai-khoan/dang-nhap";
import Register from "./tai-khoan/dang-ky";
import Verify from "./tai-khoan/xac-thuc";
import ForgetPassword from "./tai-khoan/quen-mat-khau";
import Account from "./tai-khoan";
import Footer from "../components/Footer";
import Calories from "./tai-khoan/calories";
import Cart from "./gio-hang";
import Loading from "../components/Loading";
import HistoryOrder from "./tai-khoan/lich-su-don-hang";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isAuthPage, setIsAuthPage] = useState({ boolean: false, route: '' })



  useEffect(() => {
    router.events.on("routeChangeStart", (url) => {
      setLoading(true);
    });
    router.events.on("routeChangeComplete", (url) => {
      setLoading(false);
    });
    router.events.on("routeChangeError", (err, url) => {
      setLoading(false);
    });
  }, [router.events]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.pathname === '/tai-khoan/dang-nhap' || window.location.pathname === '/tai-khoan/dang-ky' || window.location.pathname === '/tai-khoan/xac-thuc'
        || window.location.pathname === '/tai-khoan/quen-mat-khau' || window.location.pathname === '/tai-khoan/calories' || window.location.pathname === '/gio-hang'
        // window.location.pathname === '/tai-khoan/lich-su-don-hang'
        ) {
        setIsAuthPage({ boolean: true, route: window.location.pathname })
      } else {
        setIsAuthPage({ boolean: false, route: window.location.pathname })
      }
    }
  }, [router])



  return (
    <>
      <Head>
        <title>Clean food</title>
        <meta name="description" content="Generated by create next app" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>
      <Provider store={store}>
        <ConnectedRouter>
          {!isAuthPage.boolean ?
            <div className={`page-wrapper`}>
              <div className={`page-container ${loading ? 'slide' : 'normal'}`}>
                <Header />
                <Loading />
                <Component {...pageProps} />
                <Footer />
                <FooterTab />
              </div>
            </div> :
            <div className={`page-wrapper`}>
              <Loading />
              <div className={`page-container auth-page ${loading ? 'slide' : 'normal'}`}>
                {isAuthPage.route === '/tai-khoan/dang-nhap' && <Login />}
                {isAuthPage.route === '/tai-khoan/dang-ky' && <Register />}
                {isAuthPage.route === '/tai-khoan/xac-thuc' && <Verify />}
                {isAuthPage.route === '/tai-khoan/quen-mat-khau' && <ForgetPassword />}
                {isAuthPage.route === '/tai-khoan/calories' && <Calories />}
                {isAuthPage.route === '/gio-hang' && <Cart />}
                {/* {isAuthPage.route === '/tai-khoan/lich-su-don-hang' && <HistoryOrder />} */}
                {/* {isAuthPage.route === '/tai-khoan' && <Account/>} */}
              </div>
            </div>}
        </ConnectedRouter>
      </Provider>
    </>
  )
}

export default MyApp
