import "./App.scss";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	withRouter,
	useHistory,
	Redirect, RouteComponentProps
} from "react-router-dom";
import ApplicationsWithArchive from "./components/pages/ApplicationsWithArchive";
import Employees from "./components/pages/Employees";
import Home from "./components/pages/Home";
import './styles/common.scss';
import Questionnaires from "./components/pages/Questionnaires";
import Auth from "./components/pages/Auth";
import ClientProfile from "./components/pages/ClientProfile";
import React, { useEffect } from "react";
import PrivateRoute from "./components/UIKit/PrivateRoute";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { getEmployees } from "./features/employeesSlice";
import { authMe, authSelector, clearState } from "./features/authSlice";
import { domain } from "./constants";
import { getNotifications } from "./features/notificationsSlice";
import Navbar from "./components/UIKit/Navbar";
// import Echo from "laravel-echo";


// declare global {
//     interface Window {
//         io:any,
//         Echo: any
//     }
//   }


//   window.io = require('socket.io-client');

//   window.Echo = new Echo({
//     broadcaster: 'socket.io',
//     host: `${domain}:6001`
//   });



// @ts-ignore
function App({location}: RouteComponentProps) {

    const dispatch = useAppDispatch();
    const history = useHistory();
    const isAuth = useAppSelector(authSelector).isAuth;

    useEffect(() => {
        dispatch(authMe({}));
    }, [])

    useEffect(() => {
			if (location.pathname !== "/auth") {
        const interval = setInterval(() => {
            dispatch(authMe({}));
          }, 10000);
        return () => clearInterval(interval);
			}
    }, [])

    useEffect(() => {
        if (!isAuth) {
            dispatch(clearState());
            localStorage.removeItem('token');
            history.push('/auth');
        }
      }, [isAuth]);

    useEffect(() => {
    	if (location.pathname !== "/auth") {
				dispatch(getNotifications({}))
				const interval = setInterval(() => {
					dispatch(getNotifications({}))
				}, 10000);
				return () => clearInterval(interval);
			}
    }, [])


    return (
            <div className={"app"}>
							{
								location.pathname === "/auth" ? null :
								<Navbar/>
							}
							<div className={"page-outer"}>
								<Switch>
									<Route exact path={"/auth"} component={Auth}/>
									<PrivateRoute exact path={"/"} component={Home}/>
									<PrivateRoute path={"/home"} component={Home}/>
									<PrivateRoute path={"/employees"} component={Employees}/>
									<PrivateRoute path={'/applications'} component={ApplicationsWithArchive}/>
									<PrivateRoute exact path={'/questionnaires'} component={Questionnaires}/>
									<PrivateRoute path={'/auth'} component={Auth}/>
									<PrivateRoute path={'/questionnaires/:id'}>
										<ClientProfile/>
									</PrivateRoute>
								</Switch>
							</div>
            </div>
    );
}

export default withRouter(App);
