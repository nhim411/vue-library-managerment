<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar>
      {{ heroTitle }}
      <router-link
        slot="right"
        :to="heroRouterLinkTo"
        class="button"
      >
        {{ heroRouterLinkLabel }}
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component
        :title="
          formCardTitle"
        icon="account-edit"
        class="tile is-child"
      >
        <form @submit.prevent="submit">
          <b-field
            v-if="isEditBook"
            label="ID"
            horizontal
          >
            {{ $route.params.id }}
          </b-field>
          <b-field
            label="Book's name"
            message="Book's name"
            horizontal
          >
            <b-input
              v-model="form.name"
              placeholder="Book's name"
              required
            />
          </b-field>
          <b-field
            label="author"
            message="Book's author"
            horizontal
          >
            <b-input
              v-model="form.author"
              message="Book's author"
              required
            />
          </b-field>
          <b-field
            label="Publisher"
            message="Publisher"
            horizontal
          >
            <b-input
              v-model="form.publisher"
              message="Book's publisher"
              required
            />
          </b-field>
          <b-field
            label="Category"
            message="Category"
            horizontal
          >
            <b-select
              v-model="form.categoryId"
              placeholder="Select a category"
              message="Book's Category"
              required
            >
              <option
                v-for="(category, index) in categories"
                :key="index"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </b-select>
          </b-field>
          <b-field
            label="Description"
            message="Description"
            horizontal
          >
            <b-input
              v-model="form.description"
              message="Book's description"
              required
            />
          </b-field>
          <b-field
            label="inventory"
            message="inventory"
            horizontal
          >
            <b-input
              v-model="form.inventory"
              message="Book's author"
              required
            />
          </b-field>
          <b-field horizontal>
            <b-button
              type="is-info"
              :loading="isLoading"
              native-type="submit"
            >
              {{ isEditBook ? 'Edit' : 'Add' }}
            </b-button>
          </b-field>
        </form>
      </card-component>
    </section>
  </div>
</template>

<script>
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
import CardComponent from '@/components/CardComponent.vue'

import bookApi from '@/api/bookApi'

export default {
  name: 'BookManagerForm',
  components: {
    CardComponent,
    HeroBar,
    TitleBar
  },
  props: {
    id: {
      type: [String, Number],
      default: null
    }
  },
  data () {
    return {
      isLoading: false,
      categories: this.$store.state.categories,
      form: {
        name: 'Cây cam ngọt của tôi',
        author: 'Hoài Nam',
        publisher: 'Nhã Nam',
        description: 'đây là một cuốn sách tuyệt vời',
        categoryId: null,
        inventory: 10
      },
      isEditBook: false,
      createdReadable: null
    }
  },
  computed: {
    titleStack () {
      return [
        'Admin',
        'Books',
        this.isEditBook ? 'Edit Book' : 'New Book'
      ]
    },
    heroTitle () {
      return this.isEditBook ? 'Edit Book' : 'Create New Book'
    },
    heroRouterLinkTo () {
      return { name: 'BookManager' }
    },
    heroRouterLinkLabel () {
      return 'Book Manager'
    },
    formCardTitle () {
      return this.isEditBook ? 'Edit book' : 'Add new book'
    }
  },
  created () {
    this.isEditBook = !isNaN(this.$route.params.id)
    if (this.isEditBook) {
      const book = this.$store.getters.bookById(this.$route.params.id)
      if (book) {
        console.log(book)
        this.form.name = book.name
        this.form.author = book.author
        this.form.categoryId = book.categoryId
        this.form.publisher = book.publisher
        this.form.inventory = book.inventory
      }
    }
  },
  methods: {
    submit () {
      if (this.isEditBook) {
        const newBook = {
          name: this.form.name,
          author: this.form.author,
          publisher: this.form.publisher,
          categoryId: this.form.categoryId,
          description: this.form.description,
          inventory: this.form.inventory
        }
        for (const property in newBook) {
          if (newBook[property] === '') {
            delete newBook[property]
          }
        }
        bookApi.edit(this.$route.params.id, newBook).then((res) => {
          this.$buefy.snackbar.open({
            message: 'Sửa thông tin sách thành công',
            queue: false
          })
        }).catch(e => {
          this.$buefy.snackbar.open({
            message: 'Lỗi: không thể sửa thông tin sách',
            queue: false
          })
        }).finally(() => { this.isLoading = false })
      } else {
        this.isLoading = true
        const newBook = {
          name: this.form.name,
          author: this.form.author,
          publisher: this.form.publisher,
          category: this.categories[this.form.categoryId],
          categoryId: this.form.categoryId,
          description: this.form.description,
          inventory: this.form.inventory
        }
        bookApi.add(newBook).then((res) => {
          this.$buefy.snackbar.open({
            message: 'Thêm sách mới thành công',
            queue: false
          })
        }).catch(e => {
          this.$buefy.snackbar.open({
            message: 'Lỗi: không thể thêm sách',
            queue: false
          })
        }).finally(() => { this.isLoading = false })
      }
    }
  }
}
</script>
