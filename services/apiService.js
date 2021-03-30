import axios from 'axios'
// const API_URL = 'http://192.168.0.181:3001';
const API_URL = process.env.API_URI;
import * as SecureStore from 'expo-secure-store';

const apiService = {};

apiService.searchNutritionApi= async ({type, query}) => {
  console.log('Here!');
  console.log(type, query);
  const token = await SecureStore.getItemAsync('BOUNTIFULL_TOKEN_AUTH');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${API_URL}/search`, {
    type,
    query,
  }, config);
  console.log('Axios response:', response);
  return response;
};

apiService.searchNutritionApiByItem= async (id) => {
  const token = await SecureStore.getItemAsync('BOUNTIFULL_TOKEN_AUTH');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/nutrition/${id}`, config);
  console.log(response);
  return response;
};


export default apiService;