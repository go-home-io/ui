import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import SlidersHeader from "../common/SlidersHeader";
import lightActions from "../../reflux/light/lightActions";
import Slider from "@material-ui/lab/Slider/Slider";
import SliderActions from "../common/SliderActions";

const styles = () => ({
    root : {
        marginTop:20,
        width:250,
        height:110,
        cursor: "default",
    },
    slider: {
        width:"90%",
        marginLeft:3
    }
});

class BrightnessSlider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.level,
        };
        this.setValue = this.setValue.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange (event, value) {
        const level = Math.floor(value);
        this.setState({ value:level });
    }

    setValue() {
        const { dev_id, close} = this.props;
        const { value } = this.state;
        lightActions.setBrightness(dev_id, value);
        close();
    }

    render () {
        const { classes, close } = this.props;
        const { value } = this.state;

        return (
            <div className = { classes.root }>
                <SlidersHeader
                    caption = 'Set brightness'
                    level = { value }
                />
                <div className = { classes.slider }>
                    <Slider value = { value } onChange = { this.handleChange } />
                </div>
                <SliderActions
                    save = { this.setValue }
                    close = { close }
                />
            </div>
        );
    }

}

BrightnessSlider.propTypes = {
    classes: PropTypes.object.isRequired,
    dev_id: PropTypes.string.isRequired,
    close: PropTypes.func.isRequired,
    level: PropTypes.number.isRequired,
    // actionSetValue: PropTypes.func.isRequired
};

export default withStyles(styles)(BrightnessSlider);
