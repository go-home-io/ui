import React from "react";
import Reflux from "reflux";
import WebSocketStore from "../../reflux/socket/WebSocketStore";
import appActions from "../../reflux/application/appActions";
import PropTypes from "prop-types";
import Layout from "./Layout";
import Grid from "@material-ui/core/Grid";
import GroupManager from "../group/GroupManager";
import Devices from "../common/Devices";
import AppStore from "../../reflux/application/AppStore";
import {Collapse, Slide} from "@material-ui/core";
import ExpandedGroupHeader from "../group/ExpandedGroupHeader";
import {AppContext} from "../../context/AppContextProvider";

const groupMemberDevices = (group_id, groups) => {
    // console.log('group Members', group_id, groups);
    const this_group = groups.find( grp => {
        return grp.id === group_id;
    });
    return this_group.devices;
};


class DevicePage extends Reflux.Component {
    constructor(props){
        super(props);
        this.stores = [AppStore, WebSocketStore];
    }
    componentDidMount () {
        // Set UOM scheme to AppStore
        appActions.setUOM(this.props.generalState.uom);
    }

    getActiveGroupObject = (devices, activeGroupId) => (
        devices.find( dev => (dev.id === activeGroupId))
    );

    isDeviceInActiveLocation = (activeLocationName, locations, dev_id) => {
        const activeLocation = locations.find( location => (location.name === activeLocationName));
        return activeLocation ? activeLocation.devices.includes(dev_id) : false;
    };

    isDeviceInActiveGroup = (groups, activeGroupId, dev_id) => {
        const activeGroup = groups.find( grp => ( grp.id === activeGroupId));
        return activeGroup.devices.includes(dev_id);
    };

    render () {
        const { generalState, pageVisible } = this.props;
        const { devices, locations, groups } = generalState;
        const { active_location, active_group, active_group_on } = this.state;

        const dropdownInfo = {
            name: "Locations",
            icon: "edit_location",
            items: locations,
        };

        const isComponentVisible = (dev_id) => {
            if (active_group) {
                return this.isDeviceInActiveGroup(groups, active_group, dev_id);
            } else {
                return this.isDeviceInActiveLocation(active_location, locations, dev_id);
            }
        };

        return (
            <Layout dropdown = { dropdownInfo }>
                <Collapse in = { Boolean(active_group) }>
                    { active_group &&
                        <ExpandedGroupHeader
                            id = { active_group }
                            groupObj = { this.getActiveGroupObject(devices, active_group) }
                            on = { active_group_on }
                        />
                    }
                </Collapse>
                <Slide in = { pageVisible } direction = "up" timeout = { {enter: 1500} }>
                    <Grid container justify = 'center' alignItems = 'center'>
                        { devices.map( (device) => {
                            const deviceType = device.type;
                            const visible = isComponentVisible(device.id);

                            // value.setDeviceState(device.id, device.state)

                            return(
                                deviceType === "group" ?
                                    <GroupManager
                                        key = { device.id }
                                        visible = { visible }
                                        dev_id = { device.id }
                                        members = { groupMemberDevices(device.id, groups) }
                                        device_info = { device }
                                        all_device_states = { devices }
                                    />
                                    :
                                    <Devices
                                        key = { device.id }
                                        deviceType = { deviceType }
                                        visible = { visible }
                                        id = { device.id }
                                        device_info = { device }
                                    />
                            );})
                        }
                    </Grid>
                </Slide>
            </Layout>
        );
    }
}

DevicePage.propTypes = {
    generalState: PropTypes.object.isRequired
};

DevicePage.contextType = AppContext;

export default (DevicePage);