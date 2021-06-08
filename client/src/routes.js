import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {LinksPage} from './pages/LinksPage'
import {CreatePage} from './pages/CreatePage'
import {DatailPage} from './pages/DatailPage'
import { AuthPage } from './pages/AuthPage'

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/links" exact><LinksPage /></Route>
                <Route path="/create" exact><CreatePage /></Route>
                <Route path="/datail/:id" exact><DatailPage /></Route>
                <Redirect to="/create" />
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/" exact><AuthPage /></Route>
            <Redirect to="/" />
        </Switch>
    )
}