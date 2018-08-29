import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import lightActions from "../../reflux/light/lightActions";

const styles = {
    root: {
        flexGrow: 1,
      },
};

class LinearWaitingProgress extends React.Component {
    timer = null;

    state = {
        completed: 0,
    };

    componentDidMount() {
        this.timer = setInterval(this.progress, this.props.time/50);
    }

    componentWillUnmount() {
        clearInterval(this.progress);
        // this.setState({ completed: 0 });
    }

    onComplete () {
        clearInterval(this.progress);
        this.setState({ completed: 0 });
        lightActions.status(this.props.dev_id, 'error');
    }

    progress = () => {
        let { completed } = this.state;
        const diff = 2;


        if (completed === 100) {
            // setTimeout(this.onComplete.bind(this), 100);
            this.onComplete();
        } else {
            this.setState({ completed: completed + diff });
        }
    };

    render() {
        const { classes } = this.props;
        return (
                <div style={{display:this.props.display}}>
                    <LinearProgress variant="determinate" value={this.state.completed} />
                </div>
        );
    }
}

LinearWaitingProgress.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LinearWaitingProgress);
