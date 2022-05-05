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
        :title="formCardTitle"
        icon="account-edit"
        class="tile is-child"
      >
        <form @submit.prevent="submit">
          <b-field
            v-if="isEditCategory"
            label="ID"
            horizontal
          >
            {{ $route.params.id }}
          </b-field>
          <b-field
            label="Category's name"
            message="Category's name"
            horizontal
          >
            <b-input
              v-model="form.name"
              placeholder="Category's name"
              required
            />
          </b-field>

          <b-field horizontal>
            <b-button
              type="is-info"
              :loading="isLoading"
              native-type="submit"
            >
              {{ isEditCategory ? 'Edit' : 'Add' }}
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

import categoryApi from '@/api/categoryApi'

export default {
  name: 'CategoryManagerForm',
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
      form: {
        name: 'Truyện trinh thám'
      },
      isEditCategory: false,
      createdReadable: null
    }
  },
  computed: {
    titleStack () {
      return [
        'Admin',
        'Category',
        this.isEditCategory ? 'Edit Category' : 'New Category'
      ]
    },
    heroTitle () {
      return this.isEditCategory ? 'Edit Category' : 'Create New Category'
    },
    heroRouterLinkTo () {
      return { name: 'CategoryManager' }
    },
    heroRouterLinkLabel () {
      return 'Category Manager'
    },
    formCardTitle () {
      return this.isEditCategory ? 'Edit Category' : 'Add new Category'
    }
  },
  created () {
    this.isEditCategory = !isNaN(this.$route.params.id)
    if (this.isEditCategory) {
      const category = this.$store.getters.categoryById(this.$route.params.id)
      if (category) {
        this.form.name = category.name
      }
    }
  },
  methods: {
    submit () {
      if (this.isEditCategory) {
        const newCategory = {
          name: this.form.name

        }
        for (const property in newCategory) {
          if (newCategory[property] === '') {
            delete newCategory[property]
          }
        }
        categoryApi.edit(this.$route.params.id, newCategory).then((res) => {
          this.$buefy.snackbar.open({
            message: 'Sửa thông tin sách thành công',
            queue: false
          })
          this.$store.dispatch('fetchCategories')
        }).catch(e => {
          this.$buefy.snackbar.open({
            message: 'Lỗi: không thể sửa thông tin sách',
            queue: false
          })
        }).finally(() => { this.isLoading = false })
      } else {
        this.isLoading = true
        const newCategory = {
          name: this.form.name,
          author: this.form.author,
          publisher: this.form.publisher,
          category: this.form.category,
          description: this.form.description,
          inventory: this.form.inventory
        }
        categoryApi.add(newCategory).then((res) => {
          this.$buefy.snackbar.open({
            message: 'Thêm bộ sưu tập mới mới thành công',
            queue: false
          })
        }).catch(e => {
          this.$buefy.snackbar.open({
            message: 'Lỗi: không thể thêm bộ sưu tập',
            queue: false
          })
        }).finally(() => { this.isLoading = false })
      }
    }
  }
}
</script>
