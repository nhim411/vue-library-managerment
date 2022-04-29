<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar :has-right-visible="false">
      Dashboard
    </hero-bar>
    <section class="section is-main-section">
      <tiles>
        <card-widget
          class="tile is-child"
          type="is-primary"
          icon="account-multiple"
          :number="$store.getters.userTotal || 0"
          label="Users"
        />
        <card-widget
          class="tile is-child"
          type="is-info"
          icon="book"
          :number="$store.getters.bookTotal || 0"
          label="Books"
        />
      </tiles>
    </section>
  </div>
</template>

<script>
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
import Tiles from '@/components/Tiles.vue'
import CardWidget from '@/components/CardWidget.vue'

export default {
  name: 'Home',
  components: {
    CardWidget,
    Tiles,
    HeroBar,
    TitleBar
  },
  data () {
    return {
      titleStack: ['Admin', 'Dashboard'],
      chartData: null
    }
  }
}
</script>
