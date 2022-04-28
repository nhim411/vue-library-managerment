import axiosClient from './axiosClient'

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
    return axiosClient.post(url, newUser)
  },
  edit (id, user) {
    const url = '/users/' + id
    return axiosClient({
      method: 'patch',
      url: url,
      data: user
    })
  }
}

export default userApi
