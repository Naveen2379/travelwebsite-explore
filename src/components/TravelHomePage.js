import React, {useEffect, useState} from "react";
import SouthIndiaTripRoutes from './SouthIndiaTripRoutes';
import LehLadakhTrip from "./LehLadakhTrip";
import '../styles/TravelHomePage.css';
import NorthEastTrip from "./NorthEastTrip";

import {Row, Container, Col} from "react-bootstrap";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    useHistory
} from "react-router-dom";


function TravelHomePage(props) {

    let history = useHistory();
    const [tripName, setTripName] = useState('');
    const handleTripChange = (event) => {
        //setTripName(event.target.value);
        const newTripName = event.target.value;
        setTripName(newTripName);
        console.log(newTripName)
        console.log(history);
        console.log(props);
        //history.push(`/${tripName}`);
    }

    useEffect( () => {
        if(tripName) {
            history.push(tripName);
        }
    }, [tripName]);

        return (
            <>
                <Row className='app-header'>
                    <h1>Route Planner</h1>
                </Row>
                <Row className='trip-selection'>
                    <div className='trip-selection-radio'>
                        <label className="labelStyle">
                            <input type="radio"
                                   name="trip"
                                   checked={tripName === 'SouthIndiaTrip'}
                                   value="SouthIndiaTrip" onChange={handleTripChange} />
                            <b>South India</b>
                        </label>
                        <label className="labelStyle">
                            <input type="radio"
                                   name="trip"
                                   checked={tripName === 'NorthEastTrip'}
                                   value="NorthEastTrip"
                                   onChange={handleTripChange} />
                            <b>NorthEast India</b>
                        </label>
                        <label className="labelStyle">
                            <input type="radio"
                                   name="trip"
                                   checked={tripName === 'LehLadakhTrip'}
                                   value="LehLadakhTrip" onChange={handleTripChange} />
                            <b>Leh-Ladakh</b>
                        </label>
                    </div>
                </Row>
                <Switch>
                    <Route path='/SouthIndiaTrip'>
                        <Row className='selected-trip'><SouthIndiaTripRoutes /></Row>
                    </Route>
                    <Route path='/NorthEastTrip'>
                        <Row className='selected-trip'><NorthEastTrip /></Row>
                    </Route>Router
                    <Route path='/LehLadakhTrip'>
                        <Row className='selected-trip'><LehLadakhTrip /></Row>
                    </Route>
                </Switch>
            </>
        )
}

export default TravelHomePage;