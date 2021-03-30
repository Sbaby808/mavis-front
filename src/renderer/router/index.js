import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: require('@/components/Login/login').default
    },
    {
      path: '/index',
      name: 'container',
      component: require('@/components/Container/container').default
    },
    {
      path: '*',
      redirect: '/index'
    }
  ]
})
