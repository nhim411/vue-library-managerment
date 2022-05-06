<template>
  <section class="section hero is-fullheight is-error-section wrapper">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-6-tablet is-5-desktop">
            <router-view />
          </div>
        </div>
      </div>
    </div>
    <div class="hero-foot has-text-centered">
      <div class="logo" />
    </div>
  </section>
</template>

<script>
export default {
  name: 'FullPage',
  created () {
    this.$store.dispatch('toggleFullPage', true)
  },
  beforeDestroy () {
    this.$store.dispatch('toggleFullPage', false)
  }
}
</script>

<style scoped>
.wrapper {
  position: relative;
  overflow: hidden;
}

.wrapper:before {
  content: ' ';
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;
  background-image: url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1290&q=80');
  background-repeat: no-repeat;
  background-position: 50% 0;
  background-size: cover;
}
</style>
