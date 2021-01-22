import React from 'react';
import { isEmpty } from 'lodash';
import SouthIndiaTripRoute from './SouthIndiaTripRoute';
import HaltStation from "./HaltStation";
import '../styles/SouthIndiaTripRoutes.css'
import {Row, Col, Container} from "react-bootstrap";
import MapBoxGL from "./MapBoxGL";


export default class SouthIndiaTripRoutes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            routesDetails: [],
            haltStationsInfo: [],
            routeId: null,
            isHaltStationExisted: false,
            clickedHaltStation: '',
            haltStationImgSrc: ''
        };
        this.showRoute = this.showRoute.bind(this);
        this.showVisitingPlaces = this.showVisitingPlaces.bind(this);
    }

    componentDidMount() {
        const northEastTripRoutesDetailsURL = 'http://localhost:8080/routedetails';
        fetch(northEastTripRoutesDetailsURL)
        .then(response => response.json())
        .then(result =>  this.setState({
                routesDetails: result
            }, () => console.log(this.state.routesDetails))
        )
            .catch(error => console.log('error', error));
    };

    showRoute(changedRouteId) {
        console.log(changedRouteId);
        const routeInfoURL = "http://localhost:8080/routedetails/"+ changedRouteId +"/haltstations";
        fetch(routeInfoURL)
            .then( response => response.json())
            .then( result => { console.log(result);
                return (
                    this.setState({
                        haltStationsInfo: result,
                        routeId: changedRouteId,
                        isHaltStationExisted: false,
                        clickedHaltStation: ''
                    })
                )
            })
            .catch(err => console.log(err));
    }

    arrayBufferToBase64(buffer) {
        console.log(buffer);
        let binary = '';
        const bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    }

    showVisitingPlaces(clickedHaltStation) {
        const haltStationName = clickedHaltStation;
        const routeID = this.state.routeId;

        if(this.state.clickedHaltStation === haltStationName) {

            if(isEmpty(this.state.haltStationImgSrc)) {
                fetch("http://localhost:8080/routedetails/"+routeID+"/haltstations/"+haltStationName)
                    .then(response => response.json())
                    .then(result => {
                        const base64Flag = 'data:image/jpeg;base64,';
                        const imageStr = this.arrayBufferToBase64(result.imageSrc.data.data);
                        this.setState({
                            haltStationImgSrc: base64Flag + imageStr,
                        })
                    })
            }
            else {
                this.setState({
                    latLongObject: {},
                    haltStationImgSrc: '',
                    isHaltStationExisted: !this.state.isHaltStationExisted,
                });
            }
        }
        else {
            console.log(routeID, haltStationName);
            fetch("http://localhost:8080/routedetails/"+routeID+"/haltstations/"+haltStationName)
                .then(response => response.json())
                .then(result => {
                    console.log(result);
                    const base64Flag = 'data:image/jpeg;base64,';
                    const imageStr = this.arrayBufferToBase64(result.imageSrc.data.data);
                    this.setState({
                        haltStationImgSrc: base64Flag + imageStr,
                        clickedHaltStation: haltStationName,
                        isHaltStationExisted: true
                    }, ()=>console.log(this.state.haltStationImgSrc));
                });
        }
    }

    render() {
        console.log(this.state);
        const haltStationImgSrc = this.state.haltStationImgSrc;
        console.log(haltStationImgSrc);
        const showHaltStations = this.state.haltStationsInfo.map( (haltStationDetails) => {
            return <HaltStation key={haltStationDetails.haltStationID}
                                haltStationDetails={haltStationDetails}
                                showVisitingPlacesMap={this.showVisitingPlaces}
                                clickedHaltStation={this.state.clickedHaltStation}
                                isHaltStationExisted = {this.state.isHaltStationExisted} />
        });

        return (
            <>
                    <Col className='route-names'>
                        { isEmpty(this.state.routesDetails) ? '' : this.state.routesDetails.map( (routeDetails) => {
                            return (
                                <SouthIndiaTripRoute key={routeDetails.routeID}
                                                     routeDetails={routeDetails}
                                                     showRoute={this.showRoute}
                                                     routeId={parseInt(this.state.routeId)} />
                            )
                        })}
                    </Col>
                    <Col className='map-halt-station'>
                        {
                            isEmpty(this.state.haltStationsInfo) ? ''
                                : <>
                                    <Col className='halt-stations'>{showHaltStations}</Col>
                                    <MapBoxGL haltstations={this.state.haltStationsInfo} />
                                </>
                        }
                       {/* {this.state.clickedHaltStation ? <Row className='tomtom-map'><TestFetchTomTom haltStationName={this.state.clickedHaltStation} /></Row> : ''}*/}
                        {/*{this.state.clickedHaltStation && !isEmpty(this.state.latLongObject) ? <Row className='tomtom-map'><HaltStationMap latLongObject={this.state.latLongObject} /></Row> : '' }*/}
                    </Col>

                    {
                        this.state.clickedHaltStation && !isEmpty(this.state.haltStationImgSrc) ?
                            <Row className='haltstation-image-description'>
                                <img src={this.state.haltStationImgSrc} alt='image' width='auto' height='auto' />
                            </Row>
                        : ''
                    }
            </>
        );
    }

}