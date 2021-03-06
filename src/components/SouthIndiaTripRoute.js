import React from "react";
import {Row, Col} from "react-bootstrap";
import '../styles/SouthIndiaTripRoute.css';


export default class SouthIndiaTripRoute extends React.Component {
    constructor(props) {
        super(props);
        this.handleRouteChange = this.handleRouteChange.bind(this);
    }

    handleRouteChange(event) {
        const clickedRouteId = event.target.value;
        this.props.showRoute(clickedRouteId);
    };

    render() {
        const routeDetails = this.props.routeDetails;
        return (
            <div className='route-item-sidebar'>
                <label>
                    <input type="radio" value={routeDetails.routeID} onChange={this.handleRouteChange} checked={this.props.routeId === parseInt(routeDetails.routeID)} />
                    <b>&nbsp;{routeDetails.routeName}</b>
                </label>
            </div>
        );
    }
}