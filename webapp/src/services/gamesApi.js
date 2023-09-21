
import axios from "axios"

const baseUrl = "//localhost:3001/games"

const getAll = () => axios.get(baseUrl).then(response => response.data)

const getOneById = (id) => axios.get('${baseUrl}/${id}').then(response => response.data);


const gamesAPI = {
  getAll ,
  getOneById
  //create
}

export default gamesAPI