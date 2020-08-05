import React from "react";
import '../styles/HaltStation.css';
import {Button} from "react-bootstrap";

export default function HaltStation(props) {
    const haltStationDetails = props.haltStationDetails;
    //console.log(haltStationDetails);
    //console.log(haltStationDetails.haltStationName);
    return (
        <div className='buttonLineAlignment'>
                <Button className='haltStationClickStyle' onClick={() => props.showVisitingPlacesMap(haltStationDetails.haltStationName)}>{haltStationDetails.haltStationName}</Button>
                <span><hr className="horizontal"/></span>
                {/*<div>{(props.isHaltStationExisted && (props.clickedHaltStation === haltStationName)) ? <TestFetchTomTom haltStationName={haltStationName}/> : ''}</div>*/}
        </div>
        /*<Button onClick={() => props.showVisitingPlacesMap(haltStationDetails.haltStationName)}>{haltStationDetails.haltStationName}</Button>*/
        /*<div className="wrapper">
            {/!*<button className="inst-btn" type="submit">Classes Now!</button>*!/}
        </div>*/
        /*<h2><span className="line-center">Test</span></h2>*/
    );
}