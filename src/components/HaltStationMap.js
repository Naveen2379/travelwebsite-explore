import React from 'react';
import '../styles/HaltStationMap.css';
/*import "leaflet/dist/leaflet.css";*/
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import {isEmpty} from "lodash";
import L from 'leaflet';

/*delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});*/

L.Icon.Default.imagePath='public/img';
export default class HaltStationMap extends React.Component {
    state = {
        zoom: 13,
    }

    render() {
        console.log(this.props.latLongObject);
        const latLongObject = this.props.latLongObject;
        const latLongVal = isEmpty(latLongObject) ? '' : Object.values(latLongObject.position);
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
