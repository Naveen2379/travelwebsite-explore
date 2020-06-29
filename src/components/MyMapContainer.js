/*global google*/
import React from "react";
import { compose, withProps, withHandlers, withState } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import Geocode from 'react-geocode';
import { isEmpty } from 'lodash';

const MyMap = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places&key=AIzaSyB5lBwCVnPJUjqzlxEkmGDbewTEUhfo9mU",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />
    }),
    withScriptjs,
    withGoogleMap,
    withState('places', 'updatePlaces', ''),
    withHandlers(() => {
        const refs = {
            map: undefined,
        };

        return {
            onMapMounted: () => ref => {
                refs.map = ref
            },
            fetchPlaces: ({ updatePlaces }) => {
                let places;
                const bounds = refs.map.getBounds();
                const service = new google.maps.places.PlacesService(refs.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);
                const request = {
                    bounds: bounds,
                    type: ['tourist_attraction']
                };
                service.nearbySearch(request, (results, status) => {
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        console.log(results);
                        updatePlaces(results);
                    }
                })
            },
            onToggleOpen:''
        }
    })
)((props) => {
    console.log(props.latLng);
    /*console.log(props.latLng.lat);
    console.log(props.latLng.lng);*/
    return ( <GoogleMap
            onTilesLoaded={props.fetchPlaces}
            ref={props.onMapMounted}
            defaultZoom={8}
            center={{lat: props.latLng.lat, lng: props.latLng.lng}}
            >
            {props.places && props.places.map((place, i) =>
                <Marker key={i} position={{ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }} onClick={props.onToggleOpen} />
            )}
        </GoogleMap>
    )
});

export default class  MyMapContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            latLng: {}
        };
    }

    componentDidMount() {
        //console.log(this.props.haltStationName);
        /*Geocode.setApiKey("AIzaSyB5lBwCVnPJUjqzlxEkmGDbewTEUhfo9mU");
        Geocode.setLanguage("en");
        Geocode.fromAddress(this.props.haltStationName).then(
            response => {
                this.setState({
                    latLng: response.results[0].geometry.location
                }, () => {
                    //console.log(this.state.latLng);
                });
            },
            error => {
                console.error(error);
            }
        );*/
        this.setState({
            latLng: {lat: 20, lng: 30}
        });
    }

    render() {
        const haltStationName = this.props.haltStationName;
        //console.log(this.props.haltStationName);
        return (
            <div style={{width: '1000px'}}>
                { isEmpty(this.state.latLng) ? '' : <MyMap latLng={this.state.latLng} /> }
                {/*{ isEmpty(this.state.latLng) ? '' : <h1>{haltStationName}</h1> }*/}
            </div>
        );
    }
}