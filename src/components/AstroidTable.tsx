import React from 'react';
import { AsteroidData } from '../Types';

interface Props {
  data: AsteroidData[];
}

const AsteroidTable: React.FC<Props> = ({ data }) => {
  return (
    <div className="overflow-x-auto flex justify-center">
    <table className="w-4/5 table-auto border-collapse rounded-lg table-layout-fixed px-10">
      <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
        <tr>
          <th className="border px-4 py-2">ID</th>
          <th className="border px-4 py-2">Neo Name</th>
          <th className="border px-4 py-2">Min Estimated Diameter (km)</th>
          <th className="border px-4 py-2">Max Estimated Diameter (km)</th>
        </tr>
      </thead>
      <tbody className="text-gray-800 text-md font-light">
      {data?.length === 0 ? (
            <tr>
              <td colSpan={4} className="border px-4 py-2 text-center text-gray-500 font-semibold">
                No data available
              </td>
            </tr>
          ) : (
            data?.map((asteroid, index) => (
              <tr
                key={index}
                className={`border-t  border-gray-100 h-15  ${index % 2 === 0 ? '' : 'bg-blue-50'} rounded-sm`}
              >
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{asteroid.name}</td>
                <td className="border px-4 py-2">{asteroid.estimated_diameter_min}</td>
                <td className="border px-4 py-2">{asteroid.estimated_diameter_max}</td>
              </tr>
            ))
          )}
      </tbody>
    </table>
  </div>
  
  );
};

export default AsteroidTable;
