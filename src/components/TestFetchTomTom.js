import React from 'react';


export default class TestFetchTomTom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nearByPlaces: [],
            haltStationName: ''
        }
    }

    componentDidMount() {
        const testURL = 'https://api.tomtom.com/search/2/nearbySearch/.json?lat=17.3850&lon=78.4867&limit=100&countrySet=IN&radius=1000&categorySet=7315%2C7320&key=rB2GfD4OaR2sxZtB3Za3BSWDWZhTE6Rf'
        fetch(testURL)
            .then(response=>response.json())
            .then(fetchResult => {
                this.setState({
                    nearByPlaces: fetchResult.results
                });
            })
            .catch(err=>console.log(err));
    }

    render() {
        console.log(this.state.nearByPlaces);
        const showMap = this.state.nearByPlaces.map((nearByPlace) => {
            return <h1 key={nearByPlace.id}>{nearByPlace.address.freeformAddress}</h1>;
        });
        return (
            <div>
                <h1>{this.props.haltStationName}</h1>
                {this.state.nearByPlaces && this.props.haltStationName ? <div>{showMap}</div> : 'empty'}
            </div>
        );
    }

}