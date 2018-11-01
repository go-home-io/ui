import React from "react";
import Reflux from "reflux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ViewListIcon from "@material-ui/icons/ViewList";
import DevicesIcon from "@material-ui/icons/Devices";
import { Link } from "react-router-dom";
import AppStore from "../../reflux/application/AppStore";
import appActions from "../../reflux/application/appActions";
import { withRouter } from "react-router-dom";
import LocationDropdown from "./LocationDropdown";
// import ListSubheader from "@material-ui/core/ListSubheader/ListSubheader";

const styles = theme => ({
    root: {
        width: "100%",
        maxWidth: 195,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing.unit * 7,
    },
    expand: {
        position: "relative",
        left: 8,
        top:1,
        color:"rgba(0, 0, 0, 0.54)",
    },
    icon: {
        color:"rgba(0, 0, 0, 0.54)"
    }
});

class NavBar extends Reflux.Component {
    static defaultProps = {
        dropdown: {}
    };
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
        this.store = AppStore;

        this.handleClick = this.handleClick.bind(this);
        this.closeAfterClick = this.closeAfterClick.bind(this);
    }
    handleClick ()  {
        this.setState(prevState => {
            return { open: ! prevState.open };
        });
    }
    closeAfterClick () {
        if (this.state.openMenu) {
            appActions.toggleMenu();
        }
    }
    render() {
        const { classes, dropdown } = this.props;
        const { name, icon, items } = dropdown;
        const path = this.props.location.pathname; // Window Location from Router

        return (
            <div className = { classes.root } >
                <List
                    component = "nav"
                    // subheader = { <ListSubheader component="div"> GO-HOME </ListSubheader> }
                >
                    <ListItem
                        button
                        onClick = { this.closeAfterClick }
                        component = { Link }
                        to = { "/" }
                    >
                        <ListItemIcon>
                            <DevicesIcon />
                        </ListItemIcon>
                        <ListItemText inset primary = "Devices" />
                    </ListItem>

                    <ListItem
                        button
                        onClick = { this.closeAfterClick }
                        component = { Link }
                        to = { "/status" }
                    >
                        <ListItemIcon>
                            <ViewListIcon />
                        </ListItemIcon>
                        <ListItemText inset primary = "Status" />
                    </ListItem>
                    { path === "/" &&
                        <LocationDropdown
                            classes = { classes }
                            icon = { icon }
                            handleClick = { this.handleClick }
                            open = { this.state.open }
                            name = { name }
                            items = { items }
                            path = { path }
                        />
                    }
                </List>
            </div>
        );
    }
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
    dropdown: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(NavBar));
