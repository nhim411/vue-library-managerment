<template>
  <card-component
    title="Edit Profile"
    icon="account-circle"
  >
    <form @submit.prevent="submit">
      <!-- <b-field
        horizontal
        label="Avatar"
      >
        <file-picker type="is-info" />
      </b-field>
      <hr> -->
      <b-field
        horizontal
        label="Name"
        message="Required. Your name"
      >
        <b-input
          v-model="form.userName"
          name="name"
          required
        />
      </b-field>
      <b-field
        horizontal
        label="E-mail"
        message="Required. Your e-mail"
      >
        <b-input
          v-model="form.userEmail"
          name="email"
          type="email"
          required
        />
      </b-field>
      <hr>
      <b-field horizontal>
        <b-field grouped>
          <div class="control">
            <b-button
              native-type="submit"
              type="is-info"
              :loading="isLoading"
            >
              Submit
            </b-button>
          </div>
          <!-- <div class="control">
            <b-button
              type="is-info"
              native-type="button"
              outlined
            >
              Reset
            </b-button>
          </div> -->
        </b-field>
      </b-field>
    </form>
  </card-component>
</template>

<script>
import CardComponent from '@/components/CardComponent.vue'
import userApi from '@/api/userApi'

export default {
  name: 'ProfileUpdateForm',
  components: {
    CardComponent
    // FilePicker
  },
  data () {
    return {
      isLoading: false,
      form: {
        userName: null,
        userEmail: null
      }
    }
  },
  // computed: {
  //   userName: {
  //     get: function () {
  //       return this.$store.state.userName
  //     },
  //     set: function (name) {
  //       this.$store.commit('user', { name })
  //     }
  //   },
  //   userEmail: {
  //     get: function () {
  //       return this.$store.state.userEmail
  //     },
  //     set: function (email) {
  //       this.$store.commit('user', { email })
  //     }
  //   }
  // },
  created () {
    this.form.userName = this.$store.state.useName
    this.form.userEmail = this.$store.state.userEmail
  },
  methods: {
    submit () {
      this.isLoading = true

      const newUser = {
        email: this.form.userEmail,
        name: this.form.userName
      }

      userApi.edit(this.$store.state.user.id, newUser).then((res) => {
        this.$store.commit('user', newUser)
        console.log('Profile Update respone:', res)

        this.$buefy.snackbar.open({
          message: 'Chỉnh sửa thông tin người dùng thành công',
          queue: false
        })
      }).catch(e => {
        this.$buefy.snackbar.open({
          message: 'Lỗi: chỉnh sửa thất bại',
          queue: false
        })
      }).finally(() => { this.isLoading = false })
    }
  }
}
</script>
