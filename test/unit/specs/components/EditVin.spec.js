import Vue from 'vue'
import EditVin from '@/components/EditVin'
import VueResource from 'vue-resource'
import BootstrapVue from 'bootstrap-vue'
import Vuex from 'vuex'

Vue.use(BootstrapVue)
Vue.use(VueResource)
Vue.use(Vuex)

describe('EditVin.vue', () => {
  let vm
  let store
  let actions

  beforeEach(function () {
    actions = {
      ajouterVin: sinon.stub()
    }
    store = new Vuex.Store({
      state: {
        items: []
      },
      actions
    })
    const Constructor = Vue.extend(EditVin)
    vm = new Constructor({store}).$mount()
  })

  it('should check the name of my vue', () => {
    expect(vm.$options.name).to.equal('editVin')
  })
/*
  it('should show a message if nom is empty', done => {
    // FIXME le callback n'est pas appele
    vm.$data.vin.nom = ''
    Vue.nextTick(() => {
      expect(vm.$data.error.nom).equal.to('Le champ nom est obligatoire')
      done()
    })
  })

  it('should\'nt show a message if nom is fullfilled', done => {
    // FIXME le callback n'est pas appele
    vm.$data.vin.nom = 'nom'
    Vue.nextTick(() => {
      expect(vm.$data.error.nom).equal.to('')
      done()
    })
  })

  it('should show a message if annee is incorrecte', done => {
    // FIXME le callback n'est pas appele
    vm.$data.vin.annee = 12345
    Vue.nextTick(() => {
      expect(vm.$data.error.annee).equal.to('Veuillez saisir une année correcte')
      done()
    })
  })

  it('shouldn\'t show a message if annee is correcte', done => {
    // FIXME le callback n'est pas appele
    vm.$data.vin.annee = 2010
    Vue.nextTick(() => {
      expect(vm.$data.error.annee).equal.to('')
      done()
    })
  })
*/
  describe('submitForm', () => {
    it('should call ajouterVin', () => {
      var preventDefault = sinon.stub()
      vm.$data.vin.nom = 'test create'
      vm.submitForm({preventDefault})
      expect(preventDefault).to.have.been.called
      expect(actions.ajouterVin).to.have.been.called
      // FIXME Verifier les parametres d'appel
    })
  })
})
