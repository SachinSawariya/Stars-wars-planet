// PlanetCard.js

import React, { useState, useEffect } from 'react';

const PlanetCard = ({ planet }) => {
  const [residents, setResidents] = useState([]);
  const [showAllResidents, setShowAllResidents] = useState(false);
  const [loadingResidents, setLoadingResidents] = useState(false);

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        setLoadingResidents(true);
        const residentPromises = planet.residents.map(async (residentUrl) => {
          const response = await fetch(residentUrl);
          const data = await response.json();
          return data;
        });
        const residentData = await Promise.all(residentPromises);
        setResidents(residentData);
      } catch (error) {
        console.error('Error fetching residents:', error);
      } finally {
        setLoadingResidents(false);
      }
    };

    fetchResidents();
  }, [planet]);

  const toggleShowAllResidents = () => {
    setShowAllResidents(!showAllResidents);
  };

  return (
    <div className="planet-card">
      <h2>Planet Name: {planet.name}</h2>
      <p>Climate: {planet.climate}</p>
      <p>Gravity : {planet.gravity}</p>
      <p>Population: {planet.population}</p>
      <p>Terrain: {planet.terrain}</p>

      <h3>Residents: {residents.length} </h3>
      <div className="resident-container">
        {loadingResidents ? (
          <p>Loading residents...</p>
        ) : residents.length === 0 ? (
          <p>No residents</p>
        ) : (
          <>
            <button onClick={toggleShowAllResidents}>
              {showAllResidents ? 'Hide Residents' : 'Show All Residents'}
            </button>
            {showAllResidents && (
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Height</th>
                    <th>Mass</th>
                    <th>Gender</th>
                  </tr>
                </thead>
                <tbody>
                  {residents.map((resident, index) => (
                    <tr key={index}>
                      <td>{resident.name}</td>
                      <td>{resident.height}</td>
                      <td>{resident.mass}</td>
                      <td>{resident.gender}</td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PlanetCard;
