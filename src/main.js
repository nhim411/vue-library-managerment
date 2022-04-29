/* Styles */
import '@/scss/main.scss'

/* Core */
import Vue from 'vue'
import Buefy from 'buefy'

/* Router & Store */
import router from '@/router/'
import store from '@/store'

import i18n from './lang' // internationalization

/* Vue. Main component */
import App from './App.vue'

/* Default title tag */
const defaultDocumentTitle = 'Library managerment'

/* Collapse mobile aside menu on route change & set document title from route meta */
router.afterEach(to => {
  store.commit('asideMobileStateToggle', false)

  if (to.meta && to.meta.title) {
    document.title = `${to.meta.title} — ${defaultDocumentTitle}`
  } else {
    document.title = defaultDocumentTitle
  }
})

Vue.config.productionTip = false

Vue.use(Buefy)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
