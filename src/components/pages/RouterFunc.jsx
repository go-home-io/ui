import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import DevicePage from "./DevicePage";
import {customTheme} from "../../settings/customTheme";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import storage from "../../services/storage";
import {AppContext} from "../../context/AppContextProvider";
import LogsPage from "./LogsPage";
import StatusManager from "../status/StatusManager";
import Layout from "./Layout";

const RouterFunc = props => {
    const { generalState, status, worker } = props;
    let { active_page: page, setLocation, setPage,
        setUOM, setLogsAvailable, statusPageAvailable } = useContext(AppContext);
    const { logs_available } = generalState;

    const displayDevices = () => ( page === "devices" ? "block" : "none" );

    // -----   Set active_page, active_location and uom to AppContext when Component did mount ------
    let active_location = storage.get("location") ? storage.get("location") : "Default";
    let active_page = storage.get("page") ? storage.get("page") : "devices";
    active_page =  ( ! logs_available && active_page === "logs") ? "devices" : active_page;

    useEffect(() => {
        const { logs_available, uom } = generalState;
        setLocation(active_location);
        setPage(active_page);
        setUOM(uom);
        setLogsAvailable(logs_available);
    },
    // eslint-disable-next-line
   []);

    return (
        <ThemeProvider theme = { customTheme }>

            <div style = { {display: displayDevices()} }>
                { generalState &&
                    <DevicePage
                        generalState = { generalState }
                        pageVisible = { page === "devices" }
                    />
                }
            </div>

            { page === "status" && statusPageAvailable &&
                <Layout>
                    <StatusManager
                        status = { status }
                        worker = { worker }
                    />
                </Layout>
            }

            { page === "logs" && logs_available &&
                <Layout>
                    <LogsPage/>
                </Layout>
            }

        </ThemeProvider>
    );
};

RouterFunc.propTypes = {
    generalState: PropTypes.object.isRequired,
    status: PropTypes.array,
    worker: PropTypes.array
};

export default RouterFunc;