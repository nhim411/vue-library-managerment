import axiosClient from './axiosClient'
import storage from '@/utils/localStorage'

const categoryId = {
  getAll (params) {
    const url = '/categories'
    // return axiosClient.get(url, { params })
    const headers = storage.get('token') ? { Authorization: `Bearer ${storage.get('token')}` } : ''
    return axiosClient({
      method: 'get',
      url: url,
      headers
    })
  },
  getCategory (params) {
    const url = '/categories'
    // return axiosClient.get(url, { params })
    const headers = storage.get('token') ? { Authorization: `Bearer ${storage.get('token')}` } : ''
    return axiosClient({
      method: 'get',
      url: url,
      headers,
      params
    })
  },
  delete (id) {
    const url = '/categories/' + id
    // return axiosClient.delete(url)
    const headers = storage.get('token') ? { Authorization: `Bearer ${storage.get('token')}` } : ''
    return axiosClient({
      method: 'delete',
      url,
      headers
    })
  },
  add (newBook) {
    const url = '/categories'
    // return axiosClient.post(url, newBook)
    const headers = storage.get('token') ? { Authorization: `Bearer ${storage.get('token')}` } : ''
    return axiosClient({
      method: 'post',
      url: url,
      headers,
      data: newBook
    })
  },
  edit (id, book) {
    const url = '/categories/' + id
    // return axiosClient({
    //   method: 'patch',
    //   url: url,
    //   data: book
    // })
    const headers = storage.get('token') ? { Authorization: `Bearer ${storage.get('token')}` } : ''
    return axiosClient({
      method: 'patch',
      url: url,
      headers,
      data: book
    })
  }
}

export default categoryId
