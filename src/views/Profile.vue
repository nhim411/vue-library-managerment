<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar>
      {{ $t('profile.herobar') }}
      <router-link
        slot="right"
        to="/books"
        class="button"
      >
        {{ $t('profile.herolink') }}
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <tiles>
        <profile-update-form class="tile is-child" />
        <card-component
          :title="$t('profile.title')"
          icon="account"
          class="tile is-child"
        >
          <user-avatar class="image has-max-width is-aligned-center" />
          <hr>
          <b-field :label="$t('profile.labelname')">
            <b-input
              :value="userName"
              custom-class="is-static"
              readonly
            />
          </b-field>
          <hr>
          <b-field :label="$t('profile.labelemail')">
            <b-input
              :value="userEmail"
              custom-class="is-static"
              readonly
            />
          </b-field>
        </card-component>
      </tiles>
      <!-- <password-update-form /> -->
    </section>
  </div>
</template>

<script>
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
import ProfileUpdateForm from '@/components/ProfileUpdateForm.vue'
import Tiles from '@/components/Tiles.vue'
import UserAvatar from '@/components/UserAvatar.vue'

export default {
  name: 'Profile',
  components: {
    UserAvatar,
    Tiles,
    ProfileUpdateForm,
    HeroBar,
    TitleBar,
    CardComponent
  },
  data () {
    return {
      titleStack: ['Profile', this.$store.state.user.name]
    }
  },
  computed: {
    userName () {
      return this.$store.state.user.name
    },
    userEmail () {
      return this.$store.state.user.email
    }
  }
}
</script>
