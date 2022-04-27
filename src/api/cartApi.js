import axiosClient from './axiosClient'

const cartApi = {
  getAll () {
    const url = '/carts'
    return axiosClient.get(url)
  },
  getCartOfUser (params) {
    const url = '/carts'
    return axiosClient.get(url, { params })
  }
}

export default cartApi
