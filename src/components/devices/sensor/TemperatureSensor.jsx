import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography/Typography";
import TemperatureSymbol from "../../common/elements/TemperatureSymbol";
import ComponentUpperInfo from "../../common/elements/ComponentUpperInfo";
import Battery from "../../common/elements/Battery";


const TemperatureSensor = (props) => {
    const { temperature, humidity, battery_level } = props;
    const temperatureFormatted = temperature.toFixed(1);
    const humidityFormatted = humidity.toFixed(1);

    return (
        <div>
            <ComponentUpperInfo
                rightField = {
                    <Battery
                        battery_level = { battery_level }
                    />
                }
            />

            <Typography variant = 'h4' color = "textSecondary" style = { {textAlign: "center"} }>
                { temperatureFormatted }
                <TemperatureSymbol/>
            </Typography>

            <Typography variant = 'body1' style = { {textAlign: "center"} } color = "textSecondary">
                Humidity
                {" "}
                {humidityFormatted}
                {"%"}
            </Typography>
        </div>
    );
};

TemperatureSensor.propTypes = {
    temperature: PropTypes.number.isRequired,
    humidity: PropTypes.number.isRequired,
    battery_level: PropTypes.number
};

export default  TemperatureSensor;

