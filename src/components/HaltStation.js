import React from "react";
import '../styles/HaltStation.css';
import {Button} from "react-bootstrap";

export default function HaltStation(props) {
    const haltStationName = props.haltStationDetails.haltStation;
    return (
        <div className='buttonLineAlignment'>
                <Button className='haltStationClickStyle' onClick={() => props.showVisitingPlacesMap(haltStationName)}>{haltStationName}</Button>
                <span><hr className="horizontal"/></span>
                {/*<div>{(props.isHaltStationExisted && (props.clickedHaltStation === haltStationName)) ? <TestFetchTomTom haltStationName={haltStationName}/> : ''}</div>*/}
        </div>
    );
}