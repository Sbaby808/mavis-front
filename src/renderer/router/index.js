import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'container',
      component: require('@/components/Container/container').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
