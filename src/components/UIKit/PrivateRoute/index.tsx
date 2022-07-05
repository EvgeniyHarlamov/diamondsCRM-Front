import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({component, ...rest}: any) => {

    const routeComponent = (props: any) => (
        localStorage.getItem('token')
            ? React.createElement(component, props)
            : <Redirect to={{pathname: '/auth'}}/>
    );
    return <Route {...rest} render={routeComponent}/>;
};


export default PrivateRoute;