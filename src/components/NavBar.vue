<template>
  <nav
    v-show="isNavBarVisible"
    id="navbar-main"
    class="navbar is-fixed-top"
  >
    <div class="navbar-brand">
      <a
        class="navbar-item is-hidden-desktop"
        @click.prevent="asideToggleMobile"
      >
        <b-icon :icon="asideMobileIcon" />
      </a>
      <a
        class="navbar-item is-hidden-touch is-hidden-widescreen is-desktop-icon-only"
        @click.prevent="asideDesktopOnlyToggle"
      >
        <b-icon icon="menu" />
      </a>
    </div>
    <div class="navbar-brand is-right">
      <a
        class="navbar-item navbar-item-menu-toggle is-hidden-desktop"
        @click.prevent="menuToggle"
      >
        <b-icon
          :icon="menuToggleIcon"
          custom-size="default"
        />
      </a>
    </div>
    <div
      class="navbar-menu fadeIn animated faster"
      :class="{ 'is-active': isMenuActive }"
    >
      <div class="navbar-end">
        <nav-bar-menu class="has-divider has-user-avatar">
          <user-avatar />
          <div class="is-user-name">
            <span>{{ userName }}</span>
          </div>

          <div
            slot="dropdown"
            class="navbar-dropdown"
          >
            <router-link
              to="/profile"
              class="navbar-item"
              exact-active-class="is-active"
            >
              <b-icon
                icon="account"
                custom-size="default"
              />
              <span>{{ $t('navbar.profile') }}</span>
            </router-link>
            <hr class="navbar-divider">
            <a
              class="navbar-item"
              @click="logout"
            >
              <b-icon
                icon="logout"
                custom-size="default"
              />
              <span>{{ $t('navbar.logout') }}</span>
            </a>
          </div>
        </nav-bar-menu>
        <nav-bar-menu class="has-divider">
          <b-icon
            icon="translate"
            custom-size="default"
          />
          <div
            slot="dropdown"
            class="navbar-dropdown"
          >
            <a
              class="navbar-item"
              @click="$i18n.locale = 'en'"
            >
              <span>English</span>
            </a>
            <hr class="navbar-divider">
            <a
              class="navbar-item"
              @click="$i18n.locale = 'vi'"
            >
              <span>Tiếng việt</span>
            </a>
          </div>
        </nav-bar-menu>
        <a
          class="navbar-item is-desktop-icon-only"
          title="Log out"
          @click="logout"
        >
          <b-icon
            icon="logout"
            custom-size="default"
          />
          <span>Log out</span>
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
import NavBarMenu from '@/components/NavBarMenu.vue'
import UserAvatar from '@/components/UserAvatar.vue'

export default {
  name: 'NavBar',
  components: {
    UserAvatar,
    NavBarMenu
  },
  data () {
    return {
      isMenuActive: false
    }
  },
  computed: {
    asideMobileIcon () {
      return this.isAsideMobileExpanded ? 'backburger' : 'forwardburger'
    },
    menuToggleIcon () {
      return this.isMenuActive ? 'close' : 'dots-vertical'
    },
    ...mapState([
      'isAsideMobileExpanded',
      'isNavBarVisible',
      'userName'
    ])
  },
  mounted () {
    this.$router.afterEach(() => {
      this.isMenuActive = false
    })
  },
  methods: {
    asideToggleMobile () {
      this.$store.commit('asideMobileStateToggle')
    },
    asideDesktopOnlyToggle () {
      this.$store.dispatch('asideDesktopOnlyToggle')
    },
    menuToggle () {
      this.isMenuActive = !this.isMenuActive
    },
    logout () {
      this.$buefy.snackbar.open({
        message: 'Log out sucess',
        queue: false
      })
      this.$store.dispatch('logOut')
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
