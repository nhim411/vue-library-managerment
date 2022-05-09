<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar>
      {{ heroBarTitle }}
      <router-link
        slot="right"
        :to="{name: 'BookManager'}"
        class="button"
      >
        Book Manager
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component
        class="has-table has-mobile-sort-spaced"
        :title="book.category + ' / ' + book.name"
        icon="book-open-variant"
      >
        <div class="columns">
          <div
            class="column is-two-fifths"
            style="padding: 50px"
          >
            <figure class="image is-square">
              <img :src="book.image">
            </figure>
          </div>
          <div
            class="column"
            style="padding: 50px 0"
          >
            <p class="block title is-3">
              {{ book.name }}
            </p>
            <div class="block subtitle is-5">
              <p>Tác giả: {{ book.author }}</p>
              <p>Thể loại: {{ book.category }}</p>
              <p>Nhà xuất bản: {{ book.publisher }}</p>
            </div>
            <div class="block subtitle is-6">
              <p>{{ book.description }}</p>
            </div>

            <b-button type="is-success is-light">
              Thuê sách
            </b-button>
          </div>
        </div>
      </card-component>
      <card-component
        class="has-table has-mobile-sort-spaced"
        title="Tác phẩm tương tự"
        icon="account-multiple"
      >
        <b-carousel-list
          :data="books"
          :items-to-show="5"
        >
          <template #item="list">
            <div class="card">
              <div
                class="card-image"
                style="padding: 10px;"
              >
                <figure class="image is-1by1">
                  <a @click="$router.push({ name: 'book.show', params: { id: list.id } })"><img :src="list.image"></a>
                </figure>
              </div>
              <div
                class="card-content"
                style="padding: 10px 0"
              >
                <div
                  class="content"
                  style="padding: 0 10px"
                >
                  <p
                    class="title is-6 line-wrap"
                  >
                    {{ list.name }}
                  </p>
                  <p class="subtitle is-7 line-wrap">
                    {{ list.author }}
                  </p>
                  <!-- <b-field grouped>
                    <p
                      class="control"
                      style="margin-left: auto"
                    >
                      <router-link
                        :to="{ name: 'book.show', params: { id: list.id } }"
                        class="button is-small is-success"
                      >
                        <b-icon
                          icon="information-variant"
                          size="is-small"
                        />
                      </router-link>
                    </p>
                  </b-field> -->
                </div>
              </div>
            </div>
          </template>
        </b-carousel-list>
      </card-component>
      <hr>
    </section>
  </div>
</template>

<script>
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
export default {
  name: 'BookCart',
  components: {
    HeroBar,
    TitleBar,
    CardComponent
  },
  props: ['id'],
  data () {
    return {
      titleStack: ['User', 'Book detail'],
      heroRouterLinkTo: { name: 'category' },
      heroBarTitle: 'Book detail'
    }
  },
  computed: {
    book () {
      return this.$store.getters.bookById(this.id)
    },
    books () {
      return this.$store.getters.books
    }
  }
}
</script>

<style scoped>
.line-wrap {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
