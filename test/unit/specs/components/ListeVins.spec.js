import Vue from 'vue'
import ListeVins from '@/components/ListeVins'
import VueResource from 'vue-resource'
import BootstrapVue from 'bootstrap-vue'
import Vuex from 'vuex'
import * as jdd from '../mockJDD.js'

Vue.use(BootstrapVue)
Vue.use(VueResource)
Vue.use(Vuex)

describe('ListeVins.vue', () => {
  let vm
  let store
  let actions
  let getters

  beforeEach(function () {
    actions = {
      supprimerVin: sinon.stub()
    }
    getters = {
      listeFiltree () {
        return [jdd.v1, jdd.v2]
      }
    }
    store = new Vuex.Store({
      state: {
      },
      actions,
      getters
    })
    const Constructor = Vue.extend(ListeVins)
    vm = new Constructor({store}).$mount()
  })

  it('should check the name of my vue', () => {
    expect(vm.$options.name).to.equal('listeVins')
  })
  it('should map listeFiltree to store', () => {
    expect(vm.listeFiltree.length).to.equal(2)
  })
  it('should show list of cards', () => {
    expect(vm.$el.querySelectorAll('.cardVin').length).to.equal(2)
  })
})
