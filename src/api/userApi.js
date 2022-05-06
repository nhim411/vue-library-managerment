import axiosClient from './axiosClient'
import storage from '@/utils/localStorage'

const userApi = {
  getAll () {
    const url = '/users'
    const headers = storage.get('token') ? { Authorization: `Bearer ${storage.get('token')}` } : ''
    return axiosClient({
      method: 'get',
      url: url,
      headers
    })
  },
  getUser (params) {
    const url = '/users'
    const headers = storage.get('token') ? { Authorization: `Bearer ${storage.get('token')}` } : ''
    return axiosClient({
      method: 'get',
      url: url,
      params,
      headers
    })
  },
  getUserById (id) {
    const url = '/users/' + id
    const headers = storage.get('token') ? { Authorization: `Bearer ${storage.get('token')}` } : ''
    return axiosClient({
      method: 'get',
      url: url,
      headers
    })
  },
  delete (id) {
    const url = '/users/' + id
    const headers = storage.get('token') ? { Authorization: `Bearer ${storage.get('token')}` } : ''
    return axiosClient({
      method: 'delete',
      url: url,
      headers
    })
  },
  add (newUser) {
    const url = '/users'
    // return axiosClient.post(url, newUser)
    const headers = storage.get('token') ? { Authorization: `Bearer ${storage.get('token')}` } : ''
    return axiosClient({
      method: 'post',
      url: url,
      data: newUser,
      headers
    })
  },
  edit (id, user) {
    const url = '/users/' + id
    return axiosClient({
      method: 'patch',
      url: url,
      data: user
    })
  },
  login (user) {
    const url = '/auth/login'
    return axiosClient({
      method: 'post',
      url: url,
      data: user
    })
  },
  register (user) {
    const url = '/auth/register'
    return axiosClient({
      method: 'post',
      url: url,
      data: user
    })
  }
}

export default userApi
