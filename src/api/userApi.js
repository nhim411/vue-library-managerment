import axiosClient from './axiosClient'
import axios from 'axios'

const userApi = {
  getAll (params) {
    const url = '/users'
    return axiosClient.get(url, { params })
  },
  getUser (params) {
    const url = '/users'
    return axiosClient.get(url, { params })
  },
  delete (id) {
    const url = '/users/' + id
    return axiosClient.delete(url)
  },
  add (newUser) {
    const url = '/users'
    console.log({ data: newUser })
    return axiosClient.post(url, newUser)
  },
  edit (id, user) {
    const url = '/users/' + id
    console.log(url, user)
    return axiosClient({
      method: 'patch',
      url: url,
      data: user
    })
  }
}

export default userApi
