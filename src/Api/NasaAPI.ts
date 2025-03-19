import axios from 'axios';
import { AsteroidData } from '../Types';

// Function to get asteroids data
export const fetchAsteroids = async (): Promise<AsteroidData[]> => {
  try {
    const response = await axios.get('http://api.nasa.gov/neo/rest/v1/neo/browse?page=0&size=20&api_key=DEMO_KEY');
    return response.data.near_earth_objects.map((asteroid: any) => {
      return {
        name: asteroid.name,
        estimated_diameter_min: asteroid.estimated_diameter.kilometers.estimated_diameter_min,
        estimated_diameter_max: asteroid.estimated_diameter.kilometers.estimated_diameter_max,
      };
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des données', error);
    throw error; 
  }
};
