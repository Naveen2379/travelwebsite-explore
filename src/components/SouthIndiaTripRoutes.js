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

    showVisitingPlaces(clickedHaltStation) {
        const haltStationName = clickedHaltStation;
        /*const fetchLatLongObj = fetch('https://api.tomtom.com/search/2/geocode/'+haltStationName+'.json?limit=1&countrySet=IN&key=rB2GfD4OaR2sxZtB3Za3BSWDWZhTE6Rf')
            .then(response => response.json())
            .then(result => result.results[0]);*/
        if(this.state.clickedHaltStation === haltStationName) {
            const imgSrc = './src/images/bang_vidhana_soudha_1.jpg';
            if(isEmpty(this.state.haltStationImgSrc)) {
                    this.setState({
                        haltStationImgSrc: imgSrc,
                    });
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
            const imgSrc = './src/images/bang_vidhana_soudha_1.jpg';
            this.setState({
                haltStationImgSrc: imgSrc,
                clickedHaltStation: haltStationName,
                isHaltStationExisted: true
            }, ()=>console.log(this.state.haltStationImgSrc));
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
            <React.Fragment>
                    <Col lg="1.5" className='route-names'>
                        { isEmpty(this.state.routesDetails) ? '' : this.state.routesDetails.map( (routeDetails) => {
                            return (
                                <SouthIndiaTripRoute key={routeDetails.routeID}
                                                     routeDetails={routeDetails}
                                                     showRoute={this.showRoute}
                                                     routeId={parseInt(this.state.routeId)} />
                            )
                        })}
                    </Col>
                    <Col lg="10.5" className='map-halt-station'>
                        {isEmpty(this.state.haltStationsInfo) ? '' : <React.Fragment>
                            <Row className='tomtom-map'><MapBoxGL haltstations={this.state.haltStationsInfo} /></Row>
                            <Row className='halt-stations'>{showHaltStations}</Row>
                            {this.state.clickedHaltStation && !isEmpty(this.state.haltStationImgSrc) ? <Row className='haltstation-image-description'><img src={require('../images/bora-bora.jpg')} alt='image' width='auto' height='auto' /></Row> : '' }
                        </React.Fragment>}
                       {/* {this.state.clickedHaltStation ? <Row className='tomtom-map'><TestFetchTomTom haltStationName={this.state.clickedHaltStation} /></Row> : ''}*/}
                        {/*{this.state.clickedHaltStation && !isEmpty(this.state.latLongObject) ? <Row className='tomtom-map'><HaltStationMap latLongObject={this.state.latLongObject} /></Row> : '' }*/}
                    </Col>
            </React.Fragment>
        );
    }
}