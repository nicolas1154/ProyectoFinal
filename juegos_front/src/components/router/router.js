import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from '../login/login';
import Inicio from '../index/index';
import PrivateRoute from '../auth/privaterouter';
import Trabajadores from "../trabajadores/trabajadores.buscar"

export default function AppRoutes(){

    return (
        <Router>
            <Switch>
                
            <PrivateRoute exact path={ [ "/trabajadores" ] } component={ Trabajadores } />
                <Route exact path={ ["/login" ] } component={ Login } />
                <Route exact path={ ["/", "/index" ] } component={ Inicio } />
                <Route path={ "*" } component={ () => (
                        <h1 style={{ marginTop: 300 }}>
                        404
                        <br/>
                        Página no encontrada
                        </h1>
                    ) } />
            </Switch>
        </Router>
    );
}