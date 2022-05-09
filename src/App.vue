<template>
  <div id="app">
    <template v-if="!isLoading">
      <nav-bar />
      <aside-menu :menu="menu" />
      <router-view />
    </template>
    <!-- <footer-bar /> -->
    <b-loading
      v-model="isLoading"
      :is-full-page="false"
      :can-cancel="true"
    />
  </div>
</template>

<script>
import menu from '@/menu.js'
import NavBar from '@/components/NavBar.vue'
import AsideMenu from '@/components/AsideMenu.vue'
import storage from '@/utils/localStorage'

export default {
  name: 'Home',
  components: {
    AsideMenu,
    NavBar
  },
  data () {
    return {
      menu,
      isLoading: false
    }
  },
  async created () {
    // fake data login
    // const fakeUser = {
    //   name: 'Nam',
    //   email: 'nam@example.com',
    //   avatar: 'https://avatars.dicebear.com/v2/gridy/John-Doe.svg',
    //   role: 'admin'
    // }
    // this.$store.commit('user', fakeUser)
    // this.$store.commit('setUser', fakeUser)
    if (storage.get('token')) {
      this.isLoading = true
      const userId = storage.get('user')
      await this.$store.dispatch('getUserById', userId)
      await this.$store.dispatch('fetchBooks')
      await this.$store.dispatch('fetchCategories')
      await this.$store.dispatch('fetchUsers')
      this.isLoading = false
    }
  }
}
</script>
