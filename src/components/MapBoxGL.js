import React, {useRef, useEffect, useState} from "react";
import mapboxgl from "mapbox-gl";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/mapboxgl.css';

import {Container, Row, Col} from "react-bootstrap";

mapboxgl.accessToken = 'pk.eyJ1IjoibmF2ZWVuMjM3OSIsImEiOiJja2Q0c2V3ZnIyMDgxMzFwZzZlajFmcm95In0.BYh74oyo9p0QGXEqynQW4w';

const MapBoxGL = (props) => {
    const [haltstations, sethaltstations] = useState(props.haltstations);
    const mapContainerRef = useRef(null);
    const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }));

    // initialize map when component mounts
    useEffect(() => {
        const coordinates = [props.haltstations[0].coordinates[1], props.haltstations[0].coordinates[0]]
        sethaltstations(props);

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            // See style options here: https://docs.mapbox.com/api/maps/#styles
            style: 'mapbox://styles/mapbox/streets-v11',
            center: coordinates,
            zoom: 6,
            preserveDrawingBuffer: true
        });

        // add navigation control (zoom buttons)
        map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

        map.on("load", () => {
            console.log(props.haltstations);
            const featuresExtracted_Points = props.haltstations.map( (haltstation) => {
                const coordinates = [haltstation.coordinates[1], haltstation.coordinates[0]];
                return {
                            'type': 'Feature',
                            'properties': {
                                'description' : haltstation.importance,
                                'icon': 'rocket',
                                color: '#f7455d'
                            },
                            'geometry': {
                                'type': 'Point',
                                'coordinates':  coordinates
                            }
                        }
            });

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
            console.log(featuresExtracted_Points);
            console.log(featuresExtracted_Routes);

            // add the data source for new a feature collection with no features
            map.addSource('points', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': featuresExtracted_Points
                }
            });

            map.addSource('routes', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': featuresExtracted_Routes
                }
            });
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
            map.addLayer({
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
               }

            })
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

    return <Container className='appContainer'>
        <Col>
            <Row className="mapContainer" ref={mapContainerRef} />
        </Col>
    </Container>
};

export default MapBoxGL;