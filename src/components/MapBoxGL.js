import React, {useRef, useEffect, useState} from "react";
import mapboxgl from "mapbox-gl";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/mapboxgl.css';
import geojsonExtent from '@mapbox/geojson-extent';
import {Container, Row, Col} from "react-bootstrap";

mapboxgl.accessToken = 'pk.eyJ1IjoibmF2ZWVuMjM3OSIsImEiOiJja2Q0c2V3ZnIyMDgxMzFwZzZlajFmcm95In0.BYh74oyo9p0QGXEqynQW4w';

const MapBoxGL = (props) => {
    const [haltstations, sethaltstations] = useState(props.haltstations);
    const mapContainerRef = useRef(null);
    const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }));

    // initialize map when component mounts
    useEffect(() => {
        const coordinates = [props.haltstations[0].coordinates[1], props.haltstations[0].coordinates[0]];
        console.log(props.haltstations[0])
        console.log(coordinates);
        sethaltstations(props);

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            // See style options here: https://docs.mapbox.com/api/maps/#styles
            style: 'mapbox://styles/mapbox/streets-v11',
            center: coordinates,
            zoom: 1.5,
            preserveDrawingBuffer: true
        });

        const featuresExtracted_Points = props.haltstations.map( (haltstation) => {
            const coordinates = [haltstation.coordinates[1], haltstation.coordinates[0]];
            //returning each feature in featurecollection of type geojson
            return {
                'type': 'Feature',
                'properties': {
                    'title': haltstation.haltStationName,
                    'description' : haltstation.importance,
                    color: '#f7455d'
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates':  coordinates
                },
            }
        });

        //HTML element for each feature
        featuresExtracted_Points.forEach( (feature, index) => {
            if(!(index === featuresExtracted_Points.length-1)) {
                console.log('haltstation name  ', feature.properties.title);
                const haltStationNumber = index+1;
                const element = document.createElement('div');
                element.className = 'marker';
                element.innerHTML = '<span><b>'+ haltStationNumber +'</b></span>';

                //make marker for each feature and add it to the map
                new mapboxgl.Marker(element)
                    .setLngLat(feature.geometry.coordinates)
                    .addTo(map);
            }
        });


        const extracted_for_geojsonextent = {
            'type': 'FeatureCollection',
            'features': featuresExtracted_Points
        };

        const points = {
            'type': 'geojson',
            'data': extracted_for_geojsonextent
        }

        //bounding box and center to show map to markers
        const bounds = new geojsonExtent(extracted_for_geojsonextent);
        console.log(bounds);


        map.fitBounds([[bounds[0],bounds[1]], [bounds[2],bounds[3]]],  { padding: 25 });
        // add navigation control (zoom buttons)
        map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

        map.on("load", () => {

            const featuresExtracted_Routes = props.haltstations.map( (haltstation, index) => {
                const coordinates = [haltstation.coordinates[1], haltstation.coordinates[0]];
                let nextCoordinates = [props.haltstations[0].coordinates[1], props.haltstations[0].coordinates[0]];
                if(index<props.haltstations.length-1) {
                    nextCoordinates = [props.haltstations[index+1].coordinates[1], props.haltstations[index+1].coordinates[0]];
                }
                return {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [coordinates, nextCoordinates]
                    }
                }
            });

            const routes = {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': featuresExtracted_Routes
                }
            };

            // add the data source for new a feature collection with features, declared at the top to get the bounding box and center to show map to markers
            map.addSource('points', points);

            // add the data source for new a feature collection with features
            map.addSource('routes', routes);

            // now add the layer, and reference the data source above by name
            map.addLayer({
                id: "routes",
                source: "routes",
                type: "line",
                paint: {
                  'line-width': 2,
                  'line-color': ['get', 'color']
                }
            });
            /*map.addLayer({
                id: 'points',
                source: 'points',
                type: 'symbol',
                layout: {
                   // full list of icons here: https://labs.mapbox.com/maki-icons
                    'icon-image': 'airport-15',
                    'icon-rotate': ['get', 'bearing'],
                    'icon-rotation-alignment': 'map',
                    'icon-allow-overlap': true,
                    'icon-ignore-placement': true
                    /!*
                    // get the title name from the source's "title" property
                    'text-field': ['get', 'title'],
                    'text-font': [
                        'Open Sans Semibold',
                        'Arial Unicode MS Bold'
                    ],
                    'text-offset': [0, 1.25],
                    'text-anchor': 'top'
                    *!/
                }
            })*/
        });

        // change cursor to pointer when user hovers over a clickable feature
        map.on("mouseenter", "lines", e => {
            if (e.features.length) {
                map.getCanvas().style.cursor = "pointer";
            }
        });

        // reset cursor to default when user is no longer hovering over a clickable feature
        map.on("mouseleave", "lines", () => {
            map.getCanvas().style.cursor = "";
        });

        // add popup when user clicks a point
        map.on("click", "lines", (e) => {
            console.log('clicked');
            //setMapScreenshot(map.getCanvas().toDataURL())
            /*map.flyTo({center: e.features[0].geometry.coordinates, zoom:10});*/
        });

        // clean up on unmount
        return () => map.remove();

    }, [props.haltstations]); // eslint-disable-line react-hooks/exhaustive-deps

    return <Col className="map-container" ref={mapContainerRef} />
};

export default MapBoxGL;