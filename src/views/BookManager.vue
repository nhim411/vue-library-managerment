<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar>
      {{ checkIsAdmin ? "Book Manager" : "Book List" }}
      <router-link
        v-if="checkIsAdmin"
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
        :title="checkIsAdmin ? 'Book Manager' : 'Book list'"
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
import checkIsAdmin from '@/utils/permission'

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
      titleStack: [this.getTitleStack('Admin', 'Book'), this.getTitleStack('Book Manager', 'Book List')],
      heroRouterLinkTo: { name: 'books.new' }
    }
  },
  computed: { checkIsAdmin },
  methods: {
    getTitleStack (stack1, stack2) {
      return this.checkIsAdmin ? stack1 : stack2
    }
  }
}
</script>
