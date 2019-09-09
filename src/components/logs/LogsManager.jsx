import React, {useContext, useState} from "react";
import PropTypes from "prop-types";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import LogStateView from "./LogStateView";
import { formatTimeDate } from "../../utils/formatTimeDate";
import {LogsContext} from "../../context/LogsContext";
import FilterInput from "./FilterInput";
import Button from "@material-ui/core/Button";

const getMuiTheme = () => createMuiTheme({
    overrides: {
        MUIDataTableBodyCell: {
            root: {
                cursor: "pointer",
                "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.05)"
                }
            }
        }
    }
});

const filterFields = [
    "ToUTC",
    "LogLevel",
    "System",
    "DeviceID",
    "Provider",
    "WorkerID"
];

const logIncludesProperties = device => {
    const { properties } = device;
    return Object.keys(properties).length > 0;
};

// -------------------------------------------------------------------------------

const LogsManager = props => {
    const { logs, apply } = props;
    const { filter, setFilter } = useContext(LogsContext);

    const [open, setOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [properties, setProperties] = useState({});
    const [filterKey, setFilterKey ] = useState("");
    const [tableFieldValue, setTableFieldValue] = useState("");

    const setFilterValue = value => {
        setFilter(filterKey, value);
        setDialogOpen(false);
    };

    const handleRowClick = (colData, cellMeta) => {
        const colIndex = cellMeta.colIndex;
        // Property row click, show property if exists
        if (colIndex === 7 && colData === "+") {
            const devProperties = logs[cellMeta.rowIndex].properties;
            setProperties(devProperties);
            setOpen(true);
        }

        // Set filter key
        if (colIndex > 0 && colIndex < 6) {
            setFilterKey(filterFields[colIndex]);
            setDialogOpen(true);
            setTableFieldValue(colData);
        }
    };




    // ------------------  Mui-datatable -------------------------------

    const logsColumns = [
        "Time", "LogLevel", "System", "DeviceID", "Provider",
        "WorkerID ", "Message", "Has Properties"
    ];

    const logsOptions = {
        filter: true,
        pagination: true,
        onCellClick: (colData, cellMeta) => handleRowClick(colData, cellMeta),
        viewColumns: false,
        print: false,
        download: false,
        selectableRows: "none",
        rowHover: false
    };

    // Prepare data for mui-datatable
    let logsData = [];
    // eslint-disable-next-line
    logs.map(item => {
        const { timestamp, log_level, system,  provider, device_id, worker, message } = item;
        logsData.push([
            formatTimeDate(timestamp), log_level, system, device_id,
            provider, worker, message, logIncludesProperties(item) ? "+" : "-"
        ]);
    });

    // ------------------------------------------------------------------------------------------

    const fromUTC = formatTimeDate(filter.FromUTC);
    const toUTC = formatTimeDate(filter.ToUTC);

    // console.log("Logs Manager, logs: ", logs);
    // console.log("Logs Manager, filters: ", filter);
    return (
        logs &&
            <div>
                <Button
                    variant = "outlined"
                    onClick = { () => apply() }
                    color = "primary"
                    style = { {marginBottom: 10} }
                >
                    apply
                </Button>
                <MuiThemeProvider theme = { getMuiTheme() }>
                    <MUIDataTable
                        title = { "Logs from " + fromUTC + " to " +  toUTC }
                        data = { logsData }
                        columns = { logsColumns }
                        options = { logsOptions }
                    />
                </MuiThemeProvider>
                <LogStateView
                    open = { open }
                    properties = { properties }
                    handleClose = { () => setOpen(false) }
                />
                <FilterInput
                    open = { dialogOpen }
                    variant = "text"
                    setFilterValue = { (value) => setFilterValue(value) }
                    cancelInput = { () => setDialogOpen(false) }
                    initialValue = { tableFieldValue }
                    filterKey = { filterKey }
                />
            </div>
    );
};

LogsManager.propTypes = {
    logs: PropTypes.array.isRequired,
    apply: PropTypes.func.isRequired,
    appliedFilters: PropTypes.object.isRequired
};

export default LogsManager;