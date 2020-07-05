import React from 'react';
import { isEmpty } from 'lodash';
import NorthEastTripRoute from './NorthEastTripRoute';
import HaltStation from "./HaltStation";
import '../styles/NorthEastTripRoutes.css'

import {Row, Col, Container} from "react-bootstrap";
import TestFetchTomTom from "./TestFetchTomTom";
import ReactLeafLetExample from "./HaltStationMap";


export default class NorthEastTripRoutes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            routesDetails: [],
            haltStationsInfo: [],
            routeId: null,
            isHaltStationExisted: false,
            clickedHaltStation: '',
            latLongObject: {}
        };
        this.showRoute = this.showRoute.bind(this);
        this.showVisitingPlaces = this.showVisitingPlaces.bind(this);
    }

    componentDidMount() {
        const northEastTripRoutesDetailsURL = 'http://localhost:3001/routeDetails';
        fetch(northEastTripRoutesDetailsURL)
        .then(response => response.json())
        .then(result => {
            return this.setState({
                routesDetails: result
            })
        })
            .catch(error => console.log('error', error));
    };

    showRoute(changedRouteId) {
        const routeInfoURL = "http://localhost:3001/route/"+ changedRouteId +"/haltStations";
        fetch(routeInfoURL)
            .then( response => response.json())
            .then( result => {
                return (
                    this.setState({
                        haltStationsInfo: result[0].stations,
                        routeId: changedRouteId,
                        isHaltStationExisted: false,
                        clickedHaltStation: ''
                    })
                )})
            .catch(err => console.log(err));
    }

    showVisitingPlaces(clickedHaltStation) {
        const haltStationName = clickedHaltStation;
        const fetchLatLongObj = fetch('https://api.tomtom.com/search/2/geocode/'+haltStationName+'.json?limit=1&countrySet=IN&key=rB2GfD4OaR2sxZtB3Za3BSWDWZhTE6Rf')
            .then(response => response.json())
            .then(result => result.results[0]);
        if(this.state.clickedHaltStation === haltStationName) {
            console.log('in if');
            if(isEmpty(this.state.latLongObject)) {
                fetchLatLongObj.then( (latLongObj) => {
                    this.setState({
                        latLongObject: latLongObj
                    });
                })
            }
            else {
                this.setState({
                    latLongObject: {},
                    isHaltStationExisted: !this.state.isHaltStationExisted,
                });
            }
        }
        else {
            fetchLatLongObj.then( (latLongObj) => this.setState({
                latLongObject: latLongObj,
                clickedHaltStation: haltStationName,
                isHaltStationExisted: true
            }, ()=>console.log(this.state.latLongObject)));
        }
    }

    render() {
        console.log(this.state);
        const showHaltStations = this.state.haltStationsInfo.map( (haltStationDetails) => {
            return <HaltStation key={haltStationDetails.haltStation}
                                haltStationDetails={haltStationDetails}
                                showVisitingPlacesMap={this.showVisitingPlaces}
                                clickedHaltStation={this.state.clickedHaltStation}
                                isHaltStationExisted = {this.state.isHaltStationExisted} />
        });

        return (
            <Container>
                <Row className='routesStyle'>
                    <Col lg='4' className='routeNumberStyle'>
                        { isEmpty(this.state.routesDetails) ? '' : this.state.routesDetails.map( (routeDetails) => {
                            return (
                                <NorthEastTripRoute key={routeDetails.routeId}
                                                    routeDetails={routeDetails}
                                                    showRoute={this.showRoute}
                                                    routeId={parseInt(this.state.routeId)} />
                            )
                        })}
                    </Col>
                    <Col lg='8' className='haltStations'>
                        {isEmpty(this.state.haltStationsInfo) ? '' : <Row className='haltStationsRow'>{showHaltStations}</Row>}
                       {/* {this.state.clickedHaltStation ? <Row className='tomtom-map'><TestFetchTomTom haltStationName={this.state.clickedHaltStation} /></Row> : ''}*/}
                        {this.state.clickedHaltStation && !isEmpty(this.state.latLongObject) ? <Row className='tomtom-map'><ReactLeafLetExample latLongObject={this.state.latLongObject} /></Row> : '' }
                    </Col>
                </Row>
            </Container>
        );
    }
}