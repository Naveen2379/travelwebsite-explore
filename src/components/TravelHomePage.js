import React from "react";
import NorthEastTripRoutes from '../components/NorthEastTripRoutes';
import SouthIndiaTrip from "./SouthIndiaTrip";
import LehLadakhTrip from "./LehLadakhTrip";
import '../styles/TravelHomePage.css';

import {Row, Container} from "react-bootstrap";

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
                case "NorthEast Trip":
                    return <Row className='selectedTripStyle'><NorthEastTripRoutes /></Row>;
                case "SouthIndia Trip":
                    return <Row className='selectedTripStyle'><SouthIndiaTrip /></Row>;
                case "LehLadakh Trip":
                    return <Row className='selectedTripStyle'><LehLadakhTrip /></Row>;
                default:
                    return '';
            }
        }
        return (
            <Container className='containerStyle'>
                <Row className="appHeaderContent"><h1 className='appHeader'>Route Planner</h1></Row>
                <Row className='tripSelection'>
                    <label className="labelStyle">
                        <input type="radio" name="trip" value="NorthEast Trip" onChange={this.handleTripChange} />
                        NorthEast Trip
                    </label>
                    <label className="labelStyle">
                        <input type="radio" name="trip" value="SouthIndia Trip" onChange={this.handleTripChange} />
                        SouthIndia Trip
                    </label>
                    <label className="labelStyle">
                        <input type="radio" name="trip" value="LehLadakh Trip" onChange={this.handleTripChange} />
                        LehLadakh Trip
                    </label>
                </Row>
                {getTrip(this.state.tripName)}
            </Container>
        );
    }


}