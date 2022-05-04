<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar>
      {{ heroBarTitle }}
      <router-link
        v-if="checkIsAdmin"
        slot="right"
        :to="heroRouterLinkTo"
        class="button"
      >
        {{ routerLinkButton }}
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component
        class="has-table has-mobile-sort-spaced"
        title="Category Manager"
        icon="account-multiple"
      >
        <category-manager-table />
      </card-component>

      <hr>
    </section>
  </div>
</template>

<script>
import CategoryManagerTable from './CategoryManagerTable.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
import checkIsAdmin from '@/utils/permission'

export default {
  name: 'CategoryManager',
  components: {
    HeroBar,
    TitleBar,
    CardComponent,
    CategoryManagerTable
  },
  data () {
    return {
      titleStack: ['Admin', 'Category'],
      heroRouterLinkTo: { name: 'category.new' },
      heroBarTitle: 'Category Manager',
      routerLinkButton: 'Add new category'
    }
  },
  computed: { checkIsAdmin }
}
</script>
