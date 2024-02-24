// App.js

import React, { useState, useEffect } from 'react';
import PlanetCard from './components/PlanetCard';
import Pagination from './components/Pagination';
import './App.css';

const App = () => {
  const [planets, setPlanets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchPlanets(currentPage);
  }, [currentPage]);

  const fetchPlanets = async (page) => {
    try {
      const response = await fetch(`https://swapi.dev/api/planets/?format=json&page=${page}`);
      const data = await response.json();
      setPlanets(data.results);
      setTotalPages(Math.ceil(data.count / 10)); // Assuming 10 planets per page
    } catch (error) {
      console.error('Error fetching planets:', error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="App">
      <h1>Star Wars Planets Directory</h1>
      <div className="planet-container">
        {planets.map((planet, index) => (
          <PlanetCard key={index} planet={planet} />
        ))}
      </div>
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
    </div>
  );
};

export default App;
