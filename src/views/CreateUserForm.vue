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
            v-if="isEditUser"
            label="ID"
            horizontal
          >
            {{ $route.params.id }}
          </b-field>
          <b-field
            label="Name"
            message="User name"
            horizontal
          >
            <b-input
              v-model="form.name"
              placeholder="le hoai nam"
              required
            />
          </b-field>
          <b-field
            label="Password"
            validation-message="Password length must be greater than 6"
            horizontal
          >
            <b-input
              v-model="form.password"

              validation-message="Password length must be greater than 6"
              type="password"
              placeholder="111111"
              password-reveal
              required
              minlength="6"
            />
          </b-field>
          <b-field
            label="Email"
            message="User's email"
            horizontal
          >
            <b-input
              v-model="form.email"
              placeholder="user@user.com"
              required
            />
          </b-field>
          <b-field
            label="Role"
            horizontal
          >
            <b-radio
              v-model="form.role"
              name="role"
              native-value="admin"
              required
            >
              Admin
            </b-radio>
            <b-radio
              v-model="form.role"
              name="role"
              native-value="user"
              selected
            >
              User
            </b-radio>
          </b-field>
          <b-field horizontal>
            <b-button
              type="is-info"
              :loading="isLoading"
              native-type="submit"
            >
              {{ isEditUser ? 'Edit' : 'Add' }}
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

import userApi from '@/api/userApi'

export default {
  name: 'CreateUserForm',
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
        name: 'user 1',
        email: 'user1@user.com',
        role: 'user',
        password: '111111',
        isEditUser: false
      },
      createdReadable: null
    }
  },
  computed: {
    titleStack () {
      return [
        'Admin',
        'Users',
        this.isEditUser ? 'Edit User' : 'New Users'
      ]
    },
    heroTitle () {
      return this.isEditUser ? 'Edit User' : 'Create New Users'
    },
    heroRouterLinkTo () {
      return { name: 'UserManager' }
    },
    heroRouterLinkLabel () {
      return 'User Manager'
    },
    formCardTitle () {
      return this.isEditUser ? 'Edit user' : 'Add new user'
    }
  },
  created () {
    this.isEditUser = !isNaN(this.$route.params.id)
    if (this.isEditUser) {
      const user = this.$store.getters.userById(this.$route.params.id)
      if (user) {
        this.form.name = user.name
        this.form.email = user.email
        this.form.role = user.role
        this.form.password = user.password
      }
    }
  },
  methods: {
    submit () {
      if (this.isEditUser) {
        const newUser = {
          name: this.form.name,
          password: this.form.password,
          role: this.form.role,
          email: this.form.email
        }
        userApi.edit(this.$route.params.id, newUser).then(data => console.log(data)).then((res) => {
          this.$buefy.snackbar.open({
            message: 'Chỉnh sửa thành công',
            queue: false
          })
        })
      } else {
        this.isLoading = true
        const newUser = {
          name: this.form.name,
          password: this.form.password,
          role: this.form.role,
          email: this.form.email,
          avatar: 'https://placekitten.com/200/200'
        }
        userApi.add(newUser).then((res) => {
          this.$buefy.snackbar.open({
            message: 'Thêm người dùng thành công',
            queue: false
          })
        }).catch(e => {
          this.$buefy.snackbar.open({
            message: 'Lỗi: không thể thêm user',
            queue: false
          })
        }).finally(() => { this.isLoading = false })
      }
    }
  }
}
</script>
