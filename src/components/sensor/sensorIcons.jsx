import React from 'react';
import {MOTION_ICON_COLOR_ON, SENSOR_ICON_COLOR_OFF, SENSOR_ICON_COLOR_ON} from "../../settings/colors";

export const sensorHeaderIcon = (type) => {
    switch(type) {
        case 'motion':
            return 'transfer_within_a_station';
        case 'button':
            return <i className="fa fa-dot-circle-o" aria-hidden="true"> </i>;
        case 'temperature':
            return <i className="fa fa-thermometer-empty" aria-hidden="true"> </i>;
        case 'lock':
            return <i className="fa fa-lock" aria-hidden="true"> </i>;
        default:
            return 'device_unknown';
    }
};

export const sensorContentIcon = (type, on) => {
    switch (type) {
        case 'motion':
            return on ? 'directions_walk' : 'hotel';
        case 'lock':
            return on ? 'lock' : 'lock_open';
        default:
            return on ? 'toggle_on' : 'toggle_off';
    }
};

export const sensorTip = (type, on) => {
    switch (type) {
        case 'motion':
            return on ? 'Motion detected' : 'No motion';
        case 'lock':
            return on ? 'Lock closed' : 'Lock open';
        default:
            return on ? 'ON' : 'OFF';
    }
};

export const sensorIconColor = (type, on) => {
    switch (type) {
        case 'motion':
            return  on ? MOTION_ICON_COLOR_ON : SENSOR_ICON_COLOR_OFF;
        default:
            return on ? SENSOR_ICON_COLOR_ON : SENSOR_ICON_COLOR_OFF;
    }

};