import React from "react";
import '../styles/HaltStation.css';
import isEmpty from 'lodash';
import Geocode from 'react-geocode';

import {Button, Col, Row} from "react-bootstrap";
/*import MyMapContainer from "./MyMapContainer";*/
import TestFetchTomTom from "./TestFetchTomTom";

export default function HaltStation(props) {
    const haltStationName = props.haltStationDetails.haltStation;
    return (
        <div>
            <Button className='haltStationClickStyle' onClick={() => props.showVisitingPlacesMap(haltStationName)}>{haltStationName}</Button>
            <span><hr className="horizontal"/></span>
            <div>{(props.isHaltStationExisted && (props.clickedHaltStation === haltStationName)) ? <TestFetchTomTom haltStationName={haltStationName}/> : ''}</div>
        </div>
    );
}