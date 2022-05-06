import axiosClient from './axiosClient'
import storage from '@/utils/localStorage'

const bookApi = {
  getAll () {
    const url = '/books'
    // return axiosClient.get(url, { params })
    const headers = storage.get('token') ? { Authorization: `Bearer ${storage.get('token')}` } : ''
    return axiosClient({
      method: 'get',
      url: url,
      headers
    })
  },
  getBook (params) {
    const url = '/books'
    // return axiosClient.get(url, { params })
    const headers = storage.get('token') ? { Authorization: `Bearer ${storage.get('token')}` } : ''
    return axiosClient({
      method: 'get',
      url: url,
      params,
      headers
    })
  },
  delete (id) {
    const url = '/books/' + id
    // return axiosClient.delete(url)
    const headers = storage.get('token') ? { Authorization: `Bearer ${storage.get('token')}` } : ''
    return axiosClient({
      method: 'delete',
      url: url,
      headers
    })
  },
  add (newBook) {
    const url = '/books'
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
    const url = '/books/' + id
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

export default bookApi
