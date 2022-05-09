// api/axiosClient.js
import axios from 'axios'
import queryString from 'query-string'
// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request-
// config` for the full list of configs

const axiosClient = axios.create({
  baseURL: 'https://mock-api-2.herokuapp.com',
  timeout: 5000,
  paramsSerializer: (params) => queryString.stringify(params)
})

// Add a request interceptor
axiosClient.interceptors.request.use((config) => {
  console.log('request:', config)
  // Handle token here ...
  return config
},
error => {
  // do something with request error
  console.log(error) // for debug
  return Promise.reject(error)
})
// Add a response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    console.log('response:', response)
    return response
  },
  (error) => {
    // Handle errors
    throw error
  }
)
export default axiosClient
