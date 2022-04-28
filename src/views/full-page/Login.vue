<template>
  <card-component
    title="Login"
    icon="lock"
  >
    <form
      method="POST"
      @submit.prevent="submit"
    >
      <b-field label="E-mail Address">
        <b-input
          v-model="form.username"
          name="username"
          type="text"
          required
        />
      </b-field>

      <b-field label="Password">
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
          Remember me
        </b-checkbox>
      </b-field>

      <hr>

      <b-field grouped>
        <div class="control">
          <b-button
            native-type="submit"
            type="is-black"
            :loading="isLoading"
          >
            Login
          </b-button>
        </div>
        <div class="control">
          <b-button
            to="/register"
            class="button is-outlined is-black"
            @click="register"
          >
            Register
          </b-button>
        </div>
      </b-field>
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
            this.$router.push('/users')
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
    }
  }
}
</script>
