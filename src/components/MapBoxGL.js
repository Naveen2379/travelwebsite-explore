import React, {useRef, useEffect, useState} from "react";
import mapboxgl from "mapbox-gl";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/mapboxgl.css';

import {Container, Row, Col} from "react-bootstrap";

mapboxgl.accessToken = 'pk.eyJ1IjoibmF2ZWVuMjM3OSIsImEiOiJja2Q0c2V3ZnIyMDgxMzFwZzZlajFmcm95In0.BYh74oyo9p0QGXEqynQW4w';

const MapBoxGL = (props) => {
    console.log(props.haltstations);
    const [haltstations, sethaltstations] = useState(props.haltstations);
    const mapContainerRef = useRef(null);
    const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }));

    // initialize map when component mounts
    useEffect(() => {
        const coordinates = [props.haltstations[0].coordinates[1], props.haltstations[0].coordinates[0]]
        console.log(props.haltstations[0].coordinates);
        console.log(haltstations, props);
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
            //console.log(map.getCanvas().toDataURL());
            const featuresExtracted = props.haltstations.map( (haltstation, index) => {
                //console.log(index);
                const coordinates = [haltstation.coordinates[1], haltstation.coordinates[0]];
                console.log(coordinates);
                let nextCoordinates = [props.haltstations[0].coordinates[1], props.haltstations[0].coordinates[0]];
                if(index<props.haltstations.length-1) {
                    //console.log(props.haltstations[index+1].coordinates[1], props.haltstations[index+1].coordinates[0]);
                    nextCoordinates = [props.haltstations[index+1].coordinates[1], props.haltstations[index+1].coordinates[0]];
                }
                console.log(nextCoordinates);
                return {
                    'type': 'Feature',
                    'properties': {
                        'description' : haltstation.importance,
                        'icon': 'rocket',
                        color: '#f7455d'
                    },
                    'geometry': {
                        'type': 'LineString',
                        'coordinates':  [coordinates, nextCoordinates]
                    }
                }
            });
            console.log(featuresExtracted);
            // add the data source for new a feature collection with no features
            map.addSource('lines', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': featuresExtracted
                        /*[
                        {
                            'type': 'Feature',
                            'properties': {
                                'description':
                                    '<strong>Make it Mount Pleasant</strong><p><a href="http://www.mtpleasantdc.com/makeitmtpleasant" target="_blank" title="Opens in a new window">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>',
                                'icon': 'theatre'
                            },
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [-77.038659, 38.931567]
                            }
                        },
                        {
                            'type': 'Feature',
                            'properties': {
                                'description':
                                    '<strong>Mad Men Season Five Finale Watch Party</strong><p>Head to Lounge 201 (201 Massachusetts Avenue NE) Sunday for a <a href="http://madmens5finale.eventbrite.com/" target="_blank" title="Opens in a new window">Mad Men Season Five Finale Watch Party</a>, complete with 60s costume contest, Mad Men trivia, and retro food and drink. 8:00-11:00 p.m. $10 general admission, $20 admission and two hour open bar.</p>',
                                'icon': 'theatre'
                            },
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [-77.003168, 38.894651]
                            }
                        },
                        {
                            'type': 'Feature',
                            'properties': {
                                'description':
                                    '<strong>Big Backyard Beach Bash and Wine Fest</strong><p>EatBar (2761 Washington Boulevard Arlington VA) is throwing a <a href="http://tallulaeatbar.ticketleap.com/2012beachblanket/" target="_blank" title="Opens in a new window">Big Backyard Beach Bash and Wine Fest</a> on Saturday, serving up conch fritters, fish tacos and crab sliders, and Red Apron hot dogs. 12:00-3:00 p.m. $25.grill hot dogs.</p>',
                                'icon': 'bar'
                            },
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [-77.090372, 38.881189]
                            }
                        },
                        {
                            'type': 'Feature',
                            'properties': {
                                'description':
                                    '<strong>Ballston Arts & Crafts Market</strong><p>The <a href="http://ballstonarts-craftsmarket.blogspot.com/" target="_blank" title="Opens in a new window">Ballston Arts & Crafts Market</a> sets up shop next to the Ballston metro this Saturday for the first of five dates this summer. Nearly 35 artists and crafters will be on hand selling their wares. 10:00-4:00 p.m.</p>',
                                'icon': 'art-gallery'
                            },
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [-77.111561, 38.882342]
                            }
                        },
                        {
                            'type': 'Feature',
                            'properties': {
                                'description':
                                    '<strong>Seersucker Bike Ride and Social</strong><p>Feeling dandy? Get fancy, grab your bike, and take part in this year\'s <a href="http://dandiesandquaintrelles.com/2012/04/the-seersucker-social-is-set-for-june-9th-save-the-date-and-start-planning-your-look/" target="_blank" title="Opens in a new window">Seersucker Social</a> bike ride from Dandies and Quaintrelles. After the ride enjoy a lawn party at Hillwood with jazz, cocktails, paper hat-making, and more. 11:00-7:00 p.m.</p>',
                                'icon': 'bicycle'
                            },
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [-77.052477, 38.943951]
                            }
                        },
                        {
                            'type': 'Feature',
                            'properties': {
                                'description':
                                    '<strong>Capital Pride Parade</strong><p>The annual <a href="http://www.capitalpride.org/parade" target="_blank" title="Opens in a new window">Capital Pride Parade</a> makes its way through Dupont this Saturday. 4:30 p.m. Free.</p>',
                                'icon': 'rocket'
                            },
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [-77.043444, 38.909664]
                            }
                        },
                        {
                            'type': 'Feature',
                            'properties': {
                                'description':
                                    '<strong>Muhsinah</strong><p>Jazz-influenced hip hop artist <a href="http://www.muhsinah.com" target="_blank" title="Opens in a new window">Muhsinah</a> plays the <a href="http://www.blackcatdc.com">Black Cat</a> (1811 14th Street NW) tonight with <a href="http://www.exitclov.com" target="_blank" title="Opens in a new window">Exit Clov</a> and <a href="http://godsilla.bandcamp.com" target="_blank" title="Opens in a new window">Gods’illa</a>. 9:00 p.m. $12.</p>',
                                'icon': 'music'
                            },
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [-77.031706, 38.914581]
                            }
                        },
                        {
                            'type': 'Feature',
                            'properties': {
                                'description':
                                    '<strong>A Little Night Music</strong><p>The Arlington Players\' production of Stephen Sondheim\'s  <a href="http://www.thearlingtonplayers.org/drupal-6.20/node/4661/show" target="_blank" title="Opens in a new window"><em>A Little Night Music</em></a> comes to the Kogod Cradle at The Mead Center for American Theater (1101 6th Street SW) this weekend and next. 8:00 p.m.</p>',
                                'icon': 'music'
                            },
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [-77.020945, 38.878241]
                            }
                        },
                        {
                            'type': 'Feature',
                            'properties': {
                                'description':
                                    '<strong>Truckeroo</strong><p><a href="http://www.truckeroodc.com/www/" target="_blank">Truckeroo</a> brings dozens of food trucks, live music, and games to half and M Street SE (across from Navy Yard Metro Station) today from 11:00 a.m. to 11:00 p.m.</p>',
                                'icon': 'music'
                            },
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [-77.007481, 38.876516]
                            }
                        }
                    ]*/
                }
            });
            // now add the layer, and reference the data source above by name
            map.addLayer({
                id: "lines",
                source: "lines",
                type: "line",
                paint: {
                  'line-width': 5,
                  'line-color': ['get', 'color']
                },
                /*layout: {
                    // full list of icons here: https://labs.mapbox.com/maki-icons
                    "icon-image": "{icon}-15", // this will put little croissants on our map
                    "icon-padding": 0,
                    "icon-allow-overlap": true
                }*/
            });
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
            //console.log(map.getCanvas().toDataURL());
            console.log('clicked');
            //setMapScreenshot(map.getCanvas().toDataURL())
            /*const image = new Image();
            map.flyTo({center: e.features[0].geometry.coordinates, zoom:15});
            console.log(map.getCanvas());
            image.src = map.getCanvas().toDataURL();
            console.log(image.src);
            //setMapScreenshot('map screenshot');
            //setMapScreenshot(image.src);
            /!*const mapCanvas = map.getCanvas();
            image.src = map.getCanvas();*!/*/

            /*if (e.features.length) {
                const feature = e.features[0];
                // create popup node
                const popupNode = document.createElement("div");
                ReactDOM.render(<Popup feature={feature} />, popupNode);
                // set popup on map
                popUpRef.current
                    .setLngLat(feature.geometry.coordinates)
                    .setDOMContent(popupNode)
                    .addTo(map);
            }*/
            /*map.flyTo({center: e.features[0].geometry.coordinates, zoom:10});*/
        });

        // clean up on unmount
        return () => map.remove();

    }, [props.haltstations]); // eslint-disable-line react-hooks/exhaustive-deps

    return <Container className='appContainer'>
        <Col>
            <Row className="mapContainer" ref={mapContainerRef} />
            {/*<Row className='mapScreenshot'><img src={mapScreenshot} alt='map screenshot'/></Row>*/}
            <Row></Row>
        </Col>
    </Container>
};

export default MapBoxGL;