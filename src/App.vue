<template>
  <div id="app">
    <nav-bar />
    <aside-menu :menu="menu" />
    <router-view />
    <!-- <footer-bar /> -->
  </div>
</template>

<script>
import menu from '@/menu.js'
import NavBar from '@/components/NavBar.vue'
import AsideMenu from '@/components/AsideMenu.vue'
import checkIsAdmin from '@/utils/permission'

export default {
  name: 'Home',
  components: {
    AsideMenu,
    NavBar
  },
  data () {
    return {
      menu
    }
  },
  created () {
    // fake data login
    // const fakeUser = {
    //   name: 'Nam',
    //   email: 'nam@example.com',
    //   avatar: 'https://avatars.dicebear.com/v2/gridy/John-Doe.svg',
    //   role: 'admin'
    // }
    // this.$store.commit('user', fakeUser)
    // this.$store.commit('setUser', fakeUser)

    this.$store.dispatch('fetchBooks')
    this.$store.dispatch('fetchCategories')
    if (checkIsAdmin) {
      this.$store.dispatch('fetchUsers')
    }
  }
}
</script>
