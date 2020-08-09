import React from "react";
import SouthIndiaTripRoutes from './SouthIndiaTripRoutes';
import LehLadakhTrip from "./LehLadakhTrip";
import '../styles/TravelHomePage.css';

import {Row, Container} from "react-bootstrap";
import NorthEastTrip from "./NorthEastTrip";

export default class TravelHomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tripName: ''
        };
        this.handleTripChange = this.handleTripChange.bind(this);
    }
    handleTripChange(event) {
        this.setState({
           tripName:  event.target.value
        });
    }

    render() {
        function getTrip(tripName) {
            switch(tripName) {
                case "SouthIndia Trip":
                    return <Row className='selected-trip'><SouthIndiaTripRoutes /></Row>;
                case "NorthEast Trip":
                    return <Row className='selected-trip'><NorthEastTrip /></Row>;
                case "LehLadakh Trip":
                    return <Row className='selected-trip'><LehLadakhTrip /></Row>;
                default:
                    return '';
            }
        }
        return (
            <React.Fragment /*className='containerStyle'*/>
                {/*<Row className='appHeader'></Row>*/}
                <Row className='header-trip'>
                    <Row className='appHeader'><p>Route Planner</p></Row>
                    <Row className='trip-selection'>
                        <label className="labelStyle">
                        <input type="radio" name="trip" value="SouthIndia Trip" onChange={this.handleTripChange} />
                            SouthIndia Trip
                        </label>
                        <label className="labelStyle">
                            <input type="radio" name="trip" value="NorthEast Trip" onChange={this.handleTripChange} />
                            NorthEast Trip
                        </label>
                        <label className="labelStyle">
                            <input type="radio" name="trip" value="LehLadakh Trip" onChange={this.handleTripChange} />
                            LehLadakh Trip
                        </label>
                    </Row>
                </Row>
                {getTrip(this.state.tripName)}
            </React.Fragment >
        );
    }


}