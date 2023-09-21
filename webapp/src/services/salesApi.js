//recup donnees API et le contexte appelle l'API
import axios from "axios"

const baseUrl = "//localhost:3001/sales"

const getAll = () => axios.get(baseUrl).then(response => response.data);

const getOneById = (id) => axios.get('${baseUrl}/${id}').then(response => response.data);

const deleteOneById = (id) => axios.delete('${baseUrl}/${id}').then(response => response.data);

const createSale = (newObject) => {
  return axios.post(baseUrl, newObject).then(response => response.data);
}

const salesAPI = {
  getAll,
  getOneById,
  deleteOneById,
  createSale
}

export default salesAPI