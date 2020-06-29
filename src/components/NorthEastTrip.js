import React from "react";
import HaltStation from "./HaltStation";
import '../styles/NorthEastTrip.css';
import {Row, Col} from "react-bootstrap";
import { isEmpty } from 'lodash';
import Chart from "react-google-charts";
import MyMapContainer from "./MyMapContainer";

export default class NorthEastTrip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            route: {},
            visitingPlaces: [],
            clickedHaltStation: '',
            isShowVisitingPlacesMapCalled: false
        };
        this.showVisitingPlacesMap = this.showVisitingPlacesMap.bind(this);
    };

    showVisitingPlacesMap(clickedHaltStation) {
        if(this.state.clickedHaltStation === clickedHaltStation) {
            console.log('same haltstations');
            this.setState({
                clickedHaltStation: clickedHaltStation,
                isShowVisitingPlacesMapCalled: !this.state.isShowVisitingPlacesMapCalled,
                isClickedHaltStation: true
            }, () => {
                console.log(/*this.state.extraVar, this.state.isShowVisitingPlacesMapCalled*/);
            });
        }
        else {
            this.setState({
                clickedHaltStation: clickedHaltStation,
                isShowVisitingPlacesMapCalled: true,
                isClickedHaltStation: true
            });
        }
    }

    render() {
        const routeInfo = this.props.haltStationsInfo;
        //console.log(routeInfo);
        /*function showVisitingPlaces(visitingPlaces) {
            let dataArr = ['x'];
            visitingPlaces.map(visitingPlace => {
                dataArr.push(visitingPlace.placeName, {role: 'annotation'});
            });
            dataArr.push('');
            let data=[];
            data.push(dataArr);
            for(let index=0;index<visitingPlaces.length+1;index++) {
                if(index === 0) {
                    let startingIndArr = [];
                    startingIndArr.push(0);
                    let counter =0;
                    for(let fillZeroInd=0;fillZeroInd<visitingPlaces.length*2;fillZeroInd++) {
                        counter = counter + 1;
                        if(fillZeroInd%2 === 0) {
                            startingIndArr.push(0);
                        }
                        else {
                            startingIndArr.push('');}
                    }
                    startingIndArr.push(0);
                    data.push(startingIndArr);
                }
                else {
                    let data1 =[];
                    data1.push(index);
                    for (let inInd=0;inInd<visitingPlaces.length;inInd++) {
                        if((visitingPlaces[inInd].distanceFromHaltStation === index) || (visitingPlaces[inInd].distanceFromHaltStation === -(index))) {
                            if((visitingPlaces[inInd].distanceFromHaltStation === -(index))) {
                                data1.push(-(index),visitingPlaces[inInd].placeName);
                            }
                            else {
                                data1.push(index,visitingPlaces[inInd].placeName);
                            }
                        }
                        else {
                            data1.push('','');
                        }
                    }
                    data1.push(0);
                    data.push(data1);
                }
            }

            return ( isEmpty(visitingPlaces) ? '' : <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="LineChart"
                    loader={<div>Loading Chart</div>}
                    data={data}
                    options={{
                        hAxis: {
                            title: '',
                            baselineColor: '#fff',
                            gridlineColor: '#fff',
                            textPosition: 'none'
                        },
                        vAxis: {
                            title: '',
                            baselineColor: '#fff',
                            gridlineColor: '#fff',
                            textPosition: 'none',
                            scaleLabel: {
                                display: true,
                                labelString: 'Y text'
                            }
                        },
                        series: {
                            1: { curveType: 'function' },
                        },
                        legend: {
                            position: 'none'
                        },
                        enableInteractivity: false,
                        annotation: {
                            style: 'point'
                        },

                    }}
                    rootProps={{ 'data-testid': '2' }}
                />
            )
        };*/
        function showMap(clickedHaltStationName) {
            return <MyMapContainer haltStationName={clickedHaltStationName} />;
        }
        const haltStationInfo = <Col>
                    <Row className="routeStyle">
                        <Row><h2 className='routeNameStyle'>Route Name: {routeInfo.routeName}</h2></Row>
                        <Row  className='haltStationStyle'>{ routeInfo.stations.map( (eachHaltStationDetails) => { //console.log(eachHaltStationDetails);
                                return <HaltStation key={eachHaltStationDetails.haltStation} details={eachHaltStationDetails}  showVisitingPlacesMap={this.showVisitingPlacesMap} isShowVisitingPlacesMapCalled={this.state.isShowVisitingPlacesMapCalled} />
                            })
                        }
                        </Row>
                        <Row>{ (this.state.isShowVisitingPlacesMapCalled) ? showMap(this.state.clickedHaltStation) : '' }</Row>
                    </Row>
                </Col>;
        return (
            <div className='routeInfoStyle'>{haltStationInfo}</div>
        );
    }
}