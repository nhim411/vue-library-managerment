<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar>
      Book Manager
      <router-link
        slot="right"
        :to="heroRouterLinkTo"
        class="button"
      >
        Add new book
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component
        class="has-table has-mobile-sort-spaced"
        title="Book Manager"
        icon="account-multiple"
      >
        <book-manager-table />
      </card-component>
      <hr>
    </section>
  </div>
</template>

<script>
import BookManagerTable from './BookManagerTable.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'

export default {
  name: 'BookManager',
  components: {
    HeroBar,
    TitleBar,
    CardComponent,
    BookManagerTable
  },
  data () {
    return {
      titleStack: ['Admin', 'Book Manager'],
      heroRouterLinkTo: { name: 'books.new' }
    }
  }
}
</script>
