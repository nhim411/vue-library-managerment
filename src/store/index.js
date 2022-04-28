import Vue from 'vue'
import Vuex from 'vuex'
import userApi from '@/api/userApi'
import bookApi from '@/api/bookApi'

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

    // Book
    books: null,

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
      state.user = payload
    },

    removeUserInfo (state) {
      state.userName = null
      state.userEmail = null
      state.userAvatar = null
      state.user = null
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
