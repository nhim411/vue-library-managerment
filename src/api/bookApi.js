import axiosClient from './axiosClient'

const bookApi = {
  getAll (params) {
    const url = '/books'
    return axiosClient.get(url, { params })
  },
  getBook (params) {
    const url = '/books'
    return axiosClient.get(url, { params })
  },
  delete (id) {
    const url = '/books/' + id
    return axiosClient.delete(url)
  },
  add (newBook) {
    const url = '/books'
    return axiosClient.post(url, newBook)
  },
  edit (id, book) {
    const url = '/books/' + id
    return axiosClient({
      method: 'patch',
      url: url,
      data: book
    })
  }
}

export default bookApi
