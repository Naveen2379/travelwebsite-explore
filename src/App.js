import React from 'react';
import './App.css';
import TravelHomePage from "./components/TravelHomePage";
import {Container} from "react-bootstrap";
import {
    BrowserRouter as Router
} from "react-router-dom";
function App() {
  return (
    <Container className='App' fluid>
        <Router>
            <TravelHomePage />
        </Router>
    </Container>
  );
}

export default App;
