import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import 'bootstrap/dist/css/bootstrap.css';
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import ScrollRestoration from 'react-scroll-restoration'
import Scrollbar from './components/UIKit/Scrollbar';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import "moment/locale/ru";
import Echo from "laravel-echo";
import { domain } from "./constants";



function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


ReactDOM.render(
  <React.StrictMode>
      <MuiPickersUtilsProvider utils={MomentUtils} locale={'ru'}>
        <Provider store={store}>
            <BrowserRouter>
                  <ScrollToTop />
                  <App />
            </BrowserRouter>
        </Provider>
      </MuiPickersUtilsProvider>
  </React.StrictMode>,
  document.getElementById("root")
);