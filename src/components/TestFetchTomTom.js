import React from 'react';
import {Col, Row} from "react-bootstrap";
import {isEmpty} from "lodash";

export default class TestFetchTomTom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nearByPlaces: [],
            haltStationName: '',
            latLong : {}
        }
    }

    componentDidMount() {
        console.log(this.props.haltStationName);
        const placeName = this.props.haltStationName;
        fetch('https://api.tomtom.com/search/2/geocode/'+placeName+'.json?limit=1&countrySet=IN&key=rB2GfD4OaR2sxZtB3Za3BSWDWZhTE6Rf')
            .then(response=>response.json())
            .then(result=> { console.log(result.results[0])
                this.setState({
                    latLong: result.results[0]
                }, ()=>console.log(this.state.latLong))
            });

        /*const testURL = 'https://api.tomtom.com/search/2/nearbySearch/.json?lat=17.3850&lon=78.4867&limit=100&countrySet=IN&radius=1000&categorySet=7315%2C7320&key=rB2GfD4OaR2sxZtB3Za3BSWDWZhTE6Rf'
        fetch(testURL)
            .then(response=>response.json())
            .then(fetchResult => {
                this.setState({
                    nearByPlaces: fetchResult.results
                });
            })
            .catch(err=>console.log(err));*/
    }

    showMap() {
        const latLongObject = this.state.latLong;
        console.log(latLongObject);
        const latLong = Object.values(latLongObject.position);
        const script = document.createElement('script');
        script.src = process.env.PUBLIC_URL + '/sdk/tomtom.min.js';
        document.body.appendChild(script);
        script.async = true;
        script.onload = function () {
            console.log('onload map');
            window.tomtom.L.map('map', {
                source: 'vector',
                key: 'rB2GfD4OaR2sxZtB3Za3BSWDWZhTE6Rf',
                center: latLong,
                basePath: '/sdk',
                zoom: 15
            });
        }
        return <div id='map' style={{width: '1200px', height: '500px'}} />;
    }

    render() {
        //console.log(this.state.nearByPlaces);
        /*const showMap = this.state.nearByPlaces.map((nearByPlace) => {
            return <h1 key={nearByPlace.id}>{nearByPlace.address.freeformAddress}</h1>;
        });*/
        return (
            <React.Fragment>
                {/*{this.state.nearByPlaces && this.props.haltStationName ? <div>{showMap}</div> : 'empty'}*/}
                {isEmpty(this.state.latLong) ? '' : this.showMap()}
            </React.Fragment>
        );
    }
}