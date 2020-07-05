import React, { Component } from 'react';
import '../styles/ReactLeaflet.css';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';


export default class ReactLeafLetExample extends React.Component {
    state = {
        lat: 51.505,
        lng: -0.09,
        zoom: 13,
    }

    render() {
        console.log(this.props.latLongObject);
        const latLongVal = Object.values(this.props.latLongObject.position)
        const position = [this.state.lat, this.state.lng];
        console.log('react leaflet map');
        console.log(latLongVal);
        return (
            <Map center={latLongVal} zoom={this.state.zoom}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={latLongVal}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </Map>
        )
    }
}