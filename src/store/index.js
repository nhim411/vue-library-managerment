import Vue from 'vue'
import Vuex from 'vuex'
import userApi from '@/api/userApi'
import bookApi from '@/api/bookApi'
import categoryApi from '@/api/categoryApi'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    /* User */
    userName: null,
    userEmail: null,
    userAvatar: null,
    userRole: null,
    userId: null,
    users: null,
    user: null,

    // Book
    books: null,

    // Book
    categories: null,

    /* NavBar */
    isNavBarVisible: true,

    /* FooterBar */
    isFooterBarVisible: false,

    /* Aside */
    isAsideVisible: true,
    isAsideMobileExpanded: false

  },
  getters: {
    users (state) {
      return state.users
    },
    books (state) {
      return state.books
    },
    user (state) {
      return state.user
    },
    userById (state) {
      return function (id) {
        return state.users.find(user => user.id === id)
      }
    },
    bookById (state) {
      return function (id) {
        return state.books.find(book => book.id === id)
      }
    },
    categoryById (state) {
      return function (id) {
        return state.categories.find(category => category.id === id)
      }
    },
    userTotal (state) {
      return state.users.length
    },
    bookTotal (state) {
      return state.books.length
    },
    categories (state) {
      return state.categories.map(category => {
        let numberOfBook = 0
        state.books.forEach(book => {
          if (book.categoryId === category.id) numberOfBook += book.inventory
        })
        let retailQuantity = 0
        state.books.forEach(book => {
          if (book.categoryId === category.id) retailQuantity += book.retailQuantity
        })
        return { ...category, numberOfBook, retailQuantity }
      })
    }
  },
  mutations: {
    /* A fit-them-all commit */
    basic (state, payload) {
      state[payload.key] = payload.value
    },

    /* User */
    user (state, payload) {
      if (payload.name) {
        state.userName = payload.name
      }
      if (payload.email) {
        state.userEmail = payload.email
      }
      if (payload.avatar) {
        state.userAvatar = payload.avatar
      }
      if (payload.role) {
        state.userRole = payload.role
      }
      if (payload.id) {
        state.userId = payload.id
      }
    },
    setUsers (state, payload) {
      state.users = payload
    },

    setUser (state, payload) {
      const newUser = { ...state.user, ...payload }
      if (newUser.password) { delete newUser.password }
      state.user = newUser
    },

    removeUserInfo (state) {
    /* User */
      state.userName = null
      state.userEmail = null
      state.userAvatar = null
      state.userRole = null
      state.userId = null
      state.users = null
      state.user = null

      // Book
      state.books = null
    },

    deleteUser (state, payload) {
      const index = state.users.findIndex(user => user.id === payload)
      if (index >= 0) {
        state.users.splice(index, 1)
      }
    },
    // Books
    setBooks (state, payload) {
      state.books = payload
    },
    deleteBook (state, payload) {
      const index = state.books.findIndex(book => book.id === payload)
      if (index >= 0) {
        state.books.splice(index, 1)
      }
    },
    // Categories
    setCategories (state, payload) {
      state.categories = payload
    },
    deleteCategory (state, payload) {
      const index = state.categories.findIndex(category => category.id === payload)
      if (index >= 0) {
        state.categories.splice(index, 1)
      }
    },

    /* Aside Mobile */
    asideMobileStateToggle (state, payload = null) {
      const htmlClassName = 'has-aside-mobile-expanded'

      let isShow

      if (payload !== null) {
        isShow = payload
      } else {
        isShow = !state.isAsideMobileExpanded
      }

      if (isShow) {
        document.documentElement.classList.add(htmlClassName)
      } else {
        document.documentElement.classList.remove(htmlClassName)
      }

      state.isAsideMobileExpanded = isShow
    },

    /* Full Page mode */
    fullPage (state, payload) {
      state.isNavBarVisible = !payload
      state.isAsideVisible = !payload
      state.isFooterBarVisible = !payload
    }
  },
  actions: {
    logOut ({ commit }) {
      commit('removeUserInfo')
    },
    async deleteUser ({ commit }, payload) {
      commit('deleteUser', payload)
      userApi.delete(payload)
    },
    async fetchUsers ({ state, commit }) {
      const users = await userApi.getAll()
      if (users && users instanceof Array && users.length > 0) {
        commit('setUsers', users)
      } else { throw new Error('Cannot Fetch User List') }
    },
    async fetchBooks ({ state, commit }) {
      const books = await bookApi.getAll()
      if (books && books instanceof Array && books.length > 0) {
        commit('setBooks', books)
      } else { throw new Error('Cannot Fetch Book List') }
    },
    async deleteBook ({ commit }, payload) {
      commit('deleteBook', payload)
      bookApi.delete(payload)
    },
    // Category Manager
    async fetchCategories ({ state, commit }) {
      const categories = await categoryApi.getAll()
      if (categories && categories instanceof Array && categories.length > 0) {
        commit('setCategories', categories)
      } else { throw new Error('Cannot Fetch Category List') }
    },
    async deleteCategory ({ commit }, payload) {
      commit('deleteCategory', payload)
      categoryApi.delete(payload)
    },

    asideDesktopOnlyToggle (store, payload = null) {
      let method

      switch (payload) {
        case true:
          method = 'add'
          break
        case false:
          method = 'remove'
          break
        default:
          method = 'toggle'
      }
      document.documentElement.classList[method]('has-aside-desktop-only-visible')
    },
    toggleFullPage ({ commit }, payload) {
      commit('fullPage', payload)
      document.documentElement.classList[!payload ? 'add' : 'remove']('has-aside-left', 'has-navbar-fixed-top')
    }
  }
})

export default store

export function useStore () {
  return store
}
