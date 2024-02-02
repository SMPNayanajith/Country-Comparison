import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Country.css'



      const API_URL = 'https://restcountries.com/v2/all';

  export default function Country() {
   
    
  const [countries, setCountries] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState({ country1: null, country2: null });

  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  const handleCountrySelect = (country, position) => {
    setSelectedCountries(prevState => ({ ...prevState, [position]: country }));
  };

  const renderCountryOptions = () => {
    return countries.map(country => (
      <option key={country.alpha3Code} value={JSON.stringify(country)}>
        {country.name}
      </option>
    ));
  };

  const renderCountryInfo = (country, position) => {
    if (!country) {
      return <p>Select a country</p>;
    }

    return (
      
      <div className="country-info">
        
        <h2>{country.name}</h2>
        
        <div className="info-section">
          <p><strong>Capital:</strong> {country.capital}</p>
          <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
          <p><strong>Area:</strong> {country.area.toLocaleString()} sq km</p>
          <p><strong>Languages:</strong> {country.languages.map(lang => lang.name).join(', ')}</p>
          
        </div>
      </div>
    );
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Select Country 1</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => handleCountrySelect(JSON.parse(e.target.value), 'country1')}
            >
              <option value="">Select a country</option>
              {renderCountryOptions()}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Select Country 2</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => handleCountrySelect(JSON.parse(e.target.value), 'country2')}
            >
              <option value="">Select a country</option>
              {renderCountryOptions()}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          {renderCountryInfo(selectedCountries.country1, 'country1')}
        </Col>
        <Col md={6}>
          {renderCountryInfo(selectedCountries.country2, 'country2')}
        </Col>
      </Row>
    </Container>
  );
   
}
