<template>
  <form action="">
    <div
      class="modal-card"
      style="width: auto"
    >
      <header class="modal-card-head">
        <p class="modal-card-title">
          Register
        </p>
        <button
          type="button"
          class="delete"
          @click="$emit('close')"
        />
      </header>
      <section class="modal-card-body">
        <b-field label="Username">
          <b-input
            type="text"
            :value="username"
            placeholder="Your email"
            required
          />
        </b-field>
        <b-field label="Email">
          <b-input
            type="email"
            :value="email"
            placeholder="Your email"
            required
          />
        </b-field>

        <b-field label="Password">
          <b-input
            type="password"
            :value="password"
            password-reveal
            placeholder="Your password"
            required
          />
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <b-button
          label="Close"
          @click="$emit('close')"
        />
        <b-button
          label="Register"
          type="is-primary"
          @click="register"
        />
      </footer>
    </div>
  </form>
</template>

<script>
import userApi from '@/api/userApi'

export default {
  name: 'ModalRegisterForm',
  props: ['username', 'password'],
  data () {
    return { email: 'user@user' }
  },
  methods: {
    register () {
      const newUser = {
        name: this.username,
        password: this.password,
        role: 'user',
        email: this.email,
        avatar: 'https://placekitten.com/200/200'
      }
      userApi.add(newUser).then((res) => {
        this.$buefy.snackbar.open({
          message: 'Đăng kí thành công',
          queue: false
        })
      }).catch(e => {
        this.$buefy.snackbar.open({
          message: 'Đăng kí thất bại',
          queue: false
        })
      })
    }
  }
}
</script>

<style>

</style>
