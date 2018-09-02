import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Icon from "@material-ui/core/Icon/Icon";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Grid from "@material-ui/core/Grid/Grid";

const styles = theme => ({
    icon: {
        // position: 'relative',
        // left: 99,
        // top: -19,
        fontSize: 50,
        marginTop: -10,
    },
});


class MotionIcon extends React.Component {
    render () {
        const {classes} = this.props;
        const icon = this.props.on ? 'directions_walk' : 'hotel';
        const color = this.props.on ? '#ff0000a1' :  'rgba(0,0,0,0.3)';
        const state = this.props.on ? 'Motion detected' : 'No motion';

        return (
            <Grid container justify='center' alignItems='center'>
                <Tooltip title={state} placement="top">
                    <Icon className={classes.icon} style={{color:color}}>
                        {icon}
                    </Icon>
                </Tooltip>
            </Grid>
        )
    }
}

MotionIcon.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MotionIcon)

