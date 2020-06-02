import store from './store'
/* eslint-disable no-new */
new Vue({
  template: `
  <div>
    <navbar />
    <section class="section">
      <div class="container is-fluid">
        <router-view></router-view>
      </div>
    </section>
  </div>
  `,
  router,
  store,
  components: {
    navbar
  }
}).$mount('#app')
