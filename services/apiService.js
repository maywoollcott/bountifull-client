import axios from 'axios'
const key = ''
const path = 'https://api.nal.usda.gov/fdc/v1/foods'

const apiService = {};

apiService.searchNutritionApiBranded= (query) => {
  return axios.get(`${path}/search?api_key=${key}&query=${query}&dataType=Branded`)
};

apiService.searchNutritionApiAll= (query) => {
  return axios.get(`${path}/search?api_key=${key}&query=${query}`)
};

apiService.searchNutritionApiNonBranded= (query) => {
  return axios.get(`${path}/search?api_key=${key}&query=${query}&dataType=Foundation,Survey,SR%20Legacy`)
};

apiService.searchNutritionApiByItem= (id) => {
  return axios.post(`${path}?api_key=${key}`, {
    fdcIds: [id],
    format: 'abridged',
    nutrients: [
      203,
      291,
      318,
      404,
      405,
      406,
      415,
      418,
      417,
      401,
      301,
      303,
      304,
      306,
      307,
      309
    ]
  })
};


export default apiService;