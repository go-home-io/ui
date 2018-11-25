import React from "react";
import "material-design-icons/iconfont/material-icons.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faThermometerHalf,
    faLock,
    faBatteryThreeQuarters,
    faBatteryFull,
    faSpinner,
    faBatteryHalf,
    faBatteryQuarter,
    faBatteryEmpty,
    faCompass,
} from "@fortawesome/free-solid-svg-icons";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import indexRoutes from "../src/routes/indexRoutes";
import { customTheme } from "./settings/customTheme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

library.add(faThermometerHalf, faBatteryEmpty, faSpinner,
    faLock, faBatteryFull, faBatteryHalf, faBatteryQuarter,
    faBatteryThreeQuarters, faCompass );

const hist = createBrowserHistory();

class App extends React.Component {
    render() {
        return (
            // eslint-disable-next-line
            <MuiThemeProvider theme = { customTheme } >
                <Router history = { hist }>
                    <Switch>
                        {indexRoutes.map((prop) => {
                            const { path, component } = prop;
                            return (
                                <Route
                                    exact path = { path }
                                    component = { component }
                                    key = { path }
                                />
                            );
                        })}
                    </Switch>
                </Router>
            </MuiThemeProvider>
        );
    }
}

export default App;