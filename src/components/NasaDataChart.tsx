import  { useState, useEffect } from 'react';
import { fetchAsteroids } from '../api/nasaApi';  
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { AsteroidData } from '../Types';

const NasaDataChart = () => {
  const [data, setData] = useState<AsteroidData[]>([]);  
const [orbitalBody, setOrbitalBody] = useState<string>('');
const [filteredData, setFilteredData] = useState<AsteroidData[]>([]);
useEffect(() => {
  const getData = async () => {
    try {
      const asteroids = await fetchAsteroids();
      setData(asteroids);
      setFilteredData(asteroids);  // get all data by default
    } catch (error) {
      console.error('Erreur lors de la récupération des données', error);
    }
  };

  getData();
}, []);
  const handleOrbitalBodyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBody = event.target.value;
    setOrbitalBody(selectedBody);

    if (selectedBody) {
      const filtered = data?.filter((asteroid) => asteroid?.orbiting_body === selectedBody);
      setFilteredData(filtered);
    } else {
      setFilteredData(data); 
    }
  };

  return (
    <div className='pb-5'>
       <div className="mb-6 flex justify-center items-center pt-5">
      <h4  className="text-lg font-semibold p-2">Filter by orbital body:</h4>
        <select
          id="orbitalBody"
          onChange={handleOrbitalBodyChange}
          value={orbitalBody}
          className="w-full max-w-xs  p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        >
          <option value="">All</option>
          <option value="Earth">Earth</option>
          <option value="Juptr">Juptr</option>
          <option value="Mars">Mars</option>
          <option value="Merc">Merc</option>
          <option value="Venus">Venus</option>
        </select>
      </div>
      <ResponsiveContainer width={900} height={600}>
      <BarChart data={filteredData} layout="vertical" barCategoryGap={15} barGap={10} >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          type="number" 
          label={{ value: "Min estimated diameter (km)", position: "insideBottom", offset: -5}} 
        />
        <YAxis 
          dataKey="name" 
          type="category" 
          textAnchor="end"
          fontSize={12} 
          width={200} 
          label={{ value: "Neo Name", angle: -90, position: "insideLeft", offset: 3 }}
        />
        <Tooltip />
        <Legend verticalAlign="top" align="center"     wrapperStyle={{ paddingBottom: 40 }} />
        <Bar dataKey="estimated_diameter_min" name="Min estimated diameter" fill="#2288E3" barSize={30} />
        <Bar dataKey="estimated_diameter_max"  name="Max estimated diameter" fill="#E32227" barSize={20} />
      </BarChart>
    </ResponsiveContainer>
    </div>


  );
};

export default NasaDataChart;
