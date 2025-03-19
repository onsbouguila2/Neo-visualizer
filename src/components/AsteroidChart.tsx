import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { AsteroidData } from '../Types';

interface Props {
  data: AsteroidData[];
}

const AsteroidChart: React.FC<Props> = ({ data }) => {
  return (
    <div className='flex flex-col items-center'>
    <ResponsiveContainer width={900} height={600}>
      <BarChart data={data} layout="vertical" barCategoryGap={15} barGap={10}>
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
        <Legend verticalAlign="top" align="center" wrapperStyle={{ paddingBottom: 40 }} />
        <Bar dataKey="estimated_diameter_min" name="Min estimated diameter" fill="#2288E3" barSize={30} />
        <Bar dataKey="estimated_diameter_max" name="Max estimated diameter" fill="#E32227" barSize={20} />
      </BarChart>
    </ResponsiveContainer>
    </div>

  );
};

export default AsteroidChart;
