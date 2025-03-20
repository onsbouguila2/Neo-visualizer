import React, { useState, useEffect } from 'react';
import { fetchAsteroids } from '../api/nasaApi';

import { AsteroidData } from '../Types';
import AsteroidChart from './AsteroidChart';
import AsteroidTable from './AstroidTable';

const Layout: React.FC = () => {
  const [data, setData] = useState<AsteroidData[]>([]);
  const [orbitalBody, setOrbitalBody] = useState<string>('');
  const [filteredData, setFilteredData] = useState<AsteroidData[]>([]);
  const [activeTab, setActiveTab] = useState<'chart' | 'table'>('chart'); 

  // Fetch data from NASA API
  useEffect(() => {
    const getData = async () => {
      try {
        const asteroids = await fetchAsteroids();
        setData(asteroids);
        setFilteredData(asteroids);  
      } catch (error) {
        console.error('Erreur lors de la récupération des données', error);
      }
    };

    getData();
  }, []);

  // handle orbital body change function
  const handleOrbitalBodyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBody = event.target.value;
    setOrbitalBody(selectedBody);

    if (selectedBody) {
      const filtered = data.filter((asteroid) => asteroid.orbiting_body === selectedBody);
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };

  // handle tab change function
  const handleTabChange = (tab: 'chart' | 'table') => {
    setActiveTab(tab);
  };

   // Convert data to CSV and download
   const downloadCSV = () => {
    const header = ['ID', 'Neo Name', 'Min Estimated Diameter (km)', 'Max Estimated Diameter (km)', 'Orbiting Body'];
    const rows = filteredData.map((asteroid, index) => [
      index + 1,
      asteroid.name,
      asteroid.estimated_diameter_min,
      asteroid.estimated_diameter_max,
      asteroid.orbiting_body,
    ]);

    const csvContent = [
      header.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'asteroids_data.csv';
    link.click();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex justify-center items-center pt-5 gap-5">
        <h4 className="text-lg font-semibold p-2">Filter by orbital body:</h4>
        <select
          id="orbitalBody"
          onChange={handleOrbitalBodyChange}
          value={orbitalBody}
          className="w-full max-w-xs p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        >
          <option value="">All</option>
          <option value="Earth">Earth</option>
          <option value="Juptr">Juptr</option>
          <option value="Mars">Mars</option>
          <option value="Merc">Merc</option>
          <option value="Venus">Venus</option>
        </select>
    
        <button
          className={`tab-button px-5 py-2 rounded-lg cursor-pointer ${activeTab === 'chart' ? 'bg-blue-900 text-white' : 'bg-gray-200'}`}
          onClick={() => handleTabChange('chart')}
        >
          Chart
        </button>
        <button
          className={`tab-button px-5 py-2 rounded-lg cursor-pointer ${activeTab === 'table' ? 'bg-blue-900 text-white' : 'bg-gray-200'}`}
          onClick={() => handleTabChange('table')}
        >
          Table
        </button>
        <button
          className={`tab-button px-5 py-2 rounded-lg cursor-pointer bg-[#4CAF50] text-white`}
          onClick={downloadCSV}
        >
          Download 
        </button>
      </div>

     {/* Display Actif element */}
      {activeTab === 'chart' ? (
        <AsteroidChart data={filteredData} />
      ) : (
        <AsteroidTable data={filteredData} />
      )}
    </div>
  );
};

export default Layout;
