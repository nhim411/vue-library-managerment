<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar>
      User Manager
      <router-link
        slot="right"
        :to="heroRouterLinkTo"
        class="button"
      >
        Add new user
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component
        class="has-table has-mobile-sort-spaced"
        title="Clients"
        icon="account-multiple"
      >
        <user-manager-table
          checkable
        />
      </card-component>

      <hr>
    </section>
  </div>
</template>

<script>
import UserManagerTable from './UserManagerTable.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'

export default {
  name: 'Tables',
  components: {
    HeroBar,
    TitleBar,
    CardComponent,
    UserManagerTable
  },
  data () {
    return {
      titleStack: ['Admin', 'Tables'],
      heroRouterLinkTo: { name: 'users.new' }
    }
  }
}
</script>
