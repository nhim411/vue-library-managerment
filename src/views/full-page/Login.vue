<template>
  <card-component
    title="Login"
    icon="lock"
  >
    <form
      method="POST"
      @submit.prevent="submit"
    >
      <b-field :label="$t('loginView.username')">
        <b-input
          v-model="form.username"
          name="username"
          type="text"
          required
        />
      </b-field>

      <b-field :label="$t('loginView.password')">
        <b-input
          v-model="form.password"
          type="password"
          name="password"
          required
        />
      </b-field>

      <b-field>
        <b-checkbox
          v-model="form.remember"
          type="is-black"
          class="is-thin"
        >
          {{ $t('loginView.remember') }}
        </b-checkbox>
      </b-field>

      <hr>

      <div>
        <b-field
          grouped
        >
          <div class="control">
            <b-button
              native-type="submit"
              type="is-black"
              :loading="isLoading"
            >
              {{ $t('loginView.login') }}
            </b-button>
          </div>
          <div class="control">
            <b-button
              to="/register"
              class="button is-outlined is-black"
              @click="isComponentModalActive = true"
            >
              {{ $t('loginView.register') }}
            </b-button>
          </div>
          <div class="control ml-auto">
            <b-button
              to="/register"
              class="button"
              @click="toggleLanguage"
            >
              <b-icon
                icon="translate"
                custom-size="default"
              />
            </b-button>
          </div>
        </b-field>
      </div>
    </form>
    <b-modal
      v-model="isComponentModalActive"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-label="Example Modal"
      close-button-aria-label="Close"
      aria-modal
    >
      <template #default="props">
        <ModalRegisterForm
          @close="props.close"
        />
      </template>
    </b-modal>
  </card-component>
</template>

<script>
import CardComponent from '@/components/CardComponent.vue'
import ModalRegisterForm from '@/views/full-page/ModalRegisterForm.vue'
import userApi from '@/api/userApi'
import storage from '@/utils/localStorage'
// import checkIsAdmin from '@/utils/permission'

export default {
  name: 'Login',
  components: { CardComponent, ModalRegisterForm },
  data () {
    return {
      isLoading: false,
      isComponentModalActive: false,
      form: {
        username: 'admin@admin',
        password: '111111',
        remember: true
      }
    }
  },
  created () {
    // fake data login
    // const fakeUser = {
    //   name: 'Nam',
    //   email: 'nam@example.com',
    //   avatar: 'https://avatars.dicebear.com/v2/gridy/John-Doe.svg',
    //   role: 'admin'
    // }
    // this.$store.commit('user', fakeUser)
    // this.$store.commit('setUser', fakeUser)

    // this.$store.dispatch('fetchBooks')
    // this.$store.dispatch('fetchCategories')
    // this.$store.dispatch('fetchUsers')
    // this.$router.push({ name: 'BookManager' })
  },
  methods: {
    submit () {
      userApi.login({ email: this.form.username, password: this.form.password })
        .then(res => {
          if (res.status === 200) {
            storage.set('token', res.data.access_token)
            return userApi.getUser({ email: this.form.username })
          } else {
            this.$buefy.snackbar.open({
              message: 'Đăng nhập thất bại',
              queue: false
            })
          }
        }).then((res) => {
          if (res && res.data instanceof Array && res.data.length > 0) {
            storage.set('user', res.data[0].id)
            this.$store.commit('user', res.data[0])
            this.$store.commit('setUser', res.data[0])
            this.$buefy.snackbar.open({
              message: 'Đăng nhập thành công',
              queue: false
            })
            this.$router.push('/books')
          } else {
            this.$buefy.snackbar.open({
              message: 'Đăng nhập thất bại',
              queue: false
            })
          }
        })
        .catch(e => console.log(e))
      // this.isLoading = true
      // userApi.getUser({ name: this.form.username })
      //   .then((data) => {
      //     if (data && data instanceof Array && data.length > 0) {
      //       console.log('login response:', data)
      //       this.$store.commit('user', data[0])
      //       this.$store.commit('setUser', data[0])
      //       this.$buefy.snackbar.open({
      //         message: 'Đăng nhập thành công',
      //         queue: false
      //       })
      //       this.$router.push('/books')
      //     } else {
      //       this.$buefy.snackbar.open({
      //         message: 'Đăng nhập thất bại',
      //         queue: false
      //       })
      //     }
      //   }).catch(e => {
      //     console.log('cannot get user', e)
      //     this.$buefy.snackbar.open({
      //       message: 'Đăng nhập thất bại, không thể truy cập server',
      //       queue: false
      //     })
      //   })
      //   .finally(() => {
      //     this.isLoading = false
      //   })
    },
    toggleLanguage () {
      this.$i18n.locale = this.$i18n.locale === 'vi' ? 'en' : 'vi'
    }
  }
}
</script>
