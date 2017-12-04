import Vue from 'vue'
import Router from 'vue-router'
import ListeVins from '@/components/ListeVins'
import EditVin from '@/components/EditVin'
import Cave from '@/components/Cave'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ListeVins',
      component: ListeVins
    },
    {
      path: '/a',
      name: 'EditVin',
      component: EditVin
    },
    {
      path: '/c',
      name: 'Cave',
      component: Cave
    }
  ]
})
