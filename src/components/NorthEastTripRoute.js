import React from "react";
import {Row, Col} from "react-bootstrap";
import '../styles/NorthEastTripRoute.css'
import HaltStation from "./HaltStation";


export default class NorthEastTripRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHaltStationExisted: true
        };
        this.handleRouteChange = this.handleRouteChange.bind(this);
    }

    handleRouteChange(event) {
        const clickedRouteId = event.target.value;
        this.props.showRoute(clickedRouteId);
    };

    render() {
        const routeDetails = this.props.routeDetails;
        return (<Col>
            <Row className='routeItemSidebar'>
                <label>
                    <span>
                    <input type="radio" value={routeDetails.routeId} onChange={this.handleRouteChange} checked={this.props.routeId === routeDetails.routeId} />
                    <h6>{routeDetails.routeName}</h6>
                </span>
                </label>
            </Row>
            </Col>
        );
    }
}