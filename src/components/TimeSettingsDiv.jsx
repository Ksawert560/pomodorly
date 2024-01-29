import React from "react";

function TimeSettings(props){
return (
    <div className="focusTime">
    <div>
        <span className="timeControl" onClick={props.clickFuncMinus}>-</span>
        <div className="timeTxt">
            <span className="timeHeading">{props.type} Time</span>
            <span className="timeSet">{props.time}:00</span>
        </div>
        <span className="timeControl" onClick={props.clickFuncPlus}>+</span>
    </div>
    </div>
)
}

export default TimeSettings