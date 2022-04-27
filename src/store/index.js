import Vue from 'vue'
import Vuex from 'vuex'
import userApi from '@/api/userApi'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    /* User */
    user: null,
    userName: null,
    userEmail: null,
    userAvatar: null,
    users: null,

    /* NavBar */
    isNavBarVisible: true,

    /* FooterBar */
    isFooterBarVisible: true,

    /* Aside */
    isAsideVisible: true,
    isAsideMobileExpanded: false

  },
  getters: {
    users (state) {
      return state.users
    },
    userById (state) {
      return function (id) {
        return state.users.find(user => user.id === id)
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
    },
    setUsers (state, payload) {
      state.users = payload
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
