import Vue from 'vue'
import App from '@/App'
import VueResource from 'vue-resource'
import BootstrapVue from 'bootstrap-vue'
import Vuex from 'vuex'
import Router from 'vue-router'

Vue.use(BootstrapVue)
Vue.use(VueResource)
Vue.use(Vuex)
Vue.use(Router)

describe('App.vue', () => {
  let vm
  let store
  let actions
  let router

  beforeEach(function () {
    actions = {
      initListe: sinon.stub()
    }
    store = new Vuex.Store({
      state: {
        items: []
      },
      actions
    })
    router = new Router({route: []})
    const Constructor = Vue.extend(App)
    vm = new Constructor({store, router}).$mount()
  })

  it('should check the name of my vue', () => {
    expect(vm.$options.name).to.equal('app')
  })

  it('should init liste', () => {
    expect(actions.initListe).to.have.been.called
  })
})
