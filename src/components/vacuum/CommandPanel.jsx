import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import vacuumActions from "../../reflux/vacuum/vacuumActions";
import Grid from "@material-ui/core/Grid/Grid";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Icon from "@material-ui/core/Icon/Icon";
import { commandButtonsBehavior } from "./commandButtonsBehavior";

const styles = () => ( {
    root: {
        marginTop: 5,
    },
    button: {
        height:30,
        width: 30,
        margin: "0 auto"
    }
});

class CommandPanel extends React.Component {

    handleClick = command => ()  => {
        const { dev_id } = this.props;
        vacuumActions[command](dev_id);
    };

    render() {
        const { classes, vac_status, commands } = this.props;
        const { start, stop, find, dock } = commandButtonsBehavior[vac_status];

        return (
            <Grid container justify = 'center' className = { classes.root } >
                { commands.includes("on") ?
                    <IconButton
                        className = { classes.button }
                        aria-label = "Start"
                        color = "primary"
                        disabled = { start.disabled }
                        onClick = { this.handleClick(start.command) }
                    >
                        <Icon>
                            {start.icon}
                        </Icon>
                    </IconButton> :
                    null
                }
                { commands.includes("off") ?
                    <IconButton
                        className = { classes.button }
                        aria-label = "Stop"
                        disabled = { stop.disabled }
                        color = "secondary"
                        onClick = { this.handleClick(stop.command) }
                    >
                        <Icon>
                            {stop.icon}
                        </Icon>
                    </IconButton> :
                    null
                }
                { commands.includes("dock") ?
                    <IconButton
                        className = { classes.button }
                        aria-label = "Dock"
                        color = "primary"
                        disabled = { dock.disabled }
                        onClick = { this.handleClick(dock.command) }
                    >
                        <Icon>
                            {dock.icon}
                        </Icon>
                    </IconButton> :
                    null
                }
                { commands.includes("find-me") ?
                    <IconButton
                        className = { classes.button }
                        aria-label = "Find me"
                        color = "primary"
                        disabled = { find.disabled }
                        onClick = { this.handleClick(find.command) }
                    >
                        <Icon>
                            {find.icon}
                        </Icon>
                    </IconButton> :
                    null
                }
            </Grid>
        );
    }
}

CommandPanel.propTypes = {
    classes: PropTypes.object.isRequired,
    vac_status: PropTypes.string.isRequired,
    dev_id: PropTypes.string.isRequired,
    commands: PropTypes.array.isRequired
};

export default withStyles(styles)(CommandPanel);
