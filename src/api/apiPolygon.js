import axios from 'axios'

export default axios.create( {
  baseURL: 'https://api.polygon.io/v3/reference/',
  params: { apiKey: import.meta.env.VITE_POLYGON_API_KEY  }
} )