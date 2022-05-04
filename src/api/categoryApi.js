import axiosClient from './axiosClient'

const categoryId = {
  getAll (params) {
    const url = '/categories'
    return axiosClient.get(url, { params })
  },
  getCategory (params) {
    const url = '/categories'
    return axiosClient.get(url, { params })
  },
  delete (id) {
    const url = '/categories/' + id
    return axiosClient.delete(url)
  },
  add (newBook) {
    const url = '/categories'
    return axiosClient.post(url, newBook)
  },
  edit (id, book) {
    const url = '/categories/' + id
    return axiosClient({
      method: 'patch',
      url: url,
      data: book
    })
  }
}

export default categoryId
