import axios from 'axios'
const key = 'EerTU5HKMdt8k2anMPctiBGkZwwEKaTKwV1Jncm3'
const path = 'https://api.nal.usda.gov/fdc/v1/foods'

const apiService = {};

apiService.searchNutritionApiBranded= (query) => {
  return axios.get(`${path}/search?api_key=${key}&query=${query}`)
};

// apiService.searchNutritionApiByItems= (items) => {
//   return axios.get(`${path}?api_key=${key}`)
// };


export default apiService;