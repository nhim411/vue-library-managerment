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
              @click="register"
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
  </card-component>
</template>

<script>
import CardComponent from '@/components/CardComponent.vue'
import userApi from '@/api/userApi'

export default {
  name: 'Login',
  components: { CardComponent },
  data () {
    return {
      isLoading: false,
      form: {
        username: 'admin',
        password: '111111',
        remember: false
      }
    }
  },
  methods: {
    submit () {
      this.isLoading = true
      userApi.getUser({ name: this.form.username })
        .then((data) => {
          if (data && data instanceof Array && data.length > 0) {
            console.log('login response:', data)
            this.$store.commit('user', data[0])
            this.$store.commit('setUser', data[0])
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
        }).catch(e => {
          console.log('cannot get user', e)
          this.$buefy.snackbar.open({
            message: 'Đăng nhập thất bại, không thể truy cập server',
            queue: false
          })
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    register () {
      console.log('Form đăng kí')
    },
    toggleLanguage () {
      this.$i18n.locale = this.$i18n.locale === 'vi' ? 'en' : 'vi'
    }
  }
}
</script>
