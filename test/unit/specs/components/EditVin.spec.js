import Vue from 'vue'
import EditVin from '@/components/EditVin'
import VueResource from 'vue-resource'
import BootstrapVue from 'bootstrap-vue'
import Router from 'vue-router'
import Vuex from 'vuex'

Vue.use(BootstrapVue)
Vue.use(VueResource)
Vue.use(Vuex)

describe('EditVin.vue', () => {
  let vm
  let store
  let actions
  let router

  beforeEach(function () {
    actions = {
      ajouterVin: sinon.stub().returnsPromise()
    }
    store = new Vuex.Store({
      state: {
        items: []
      },
      actions
    })
    router = new Router({route: []})
    const Constructor = Vue.extend(EditVin)
    vm = new Constructor({store, router}).$mount()
  })

  it('should check the name of my vue', () => {
    expect(vm.$options.name).to.equal('editVin')
  })

  it('should show a message if nom is empty', done => {
    vm.$data.vin.nom = 'TOTO'
    Vue.nextTick(() => {
      vm.$data.vin.nom = ''
      Vue.nextTick(() => {
        expect(vm.$data.error.nom).to.equal('Le champ nom est obligatoire')
        done()
      })
    })
  })

  it('should\'nt show a message if nom is fullfilled', done => {
    vm.$data.vin.nom = 'nom'
    Vue.nextTick(() => {
      expect(vm.$data.error.nom).to.equal('')
      done()
    })
  })

  it('should show a message if annee is incorrecte', done => {
    vm.$data.vin.annee = 12345
    Vue.nextTick(() => {
      expect(vm.$data.error.annee).to.equal('Veuillez saisir une année correcte')
      done()
    })
  })

  it('shouldn\'t show a message if annee is correcte', done => {
    vm.$data.vin.annee = 2010
    Vue.nextTick(() => {
      expect(vm.$data.error.annee).to.equal('')
      done()
    })
  })

  describe('submitForm', () => {
    it('should call ajouterVin', () => {
      actions.ajouterVin.resolves()
      var preventDefault = sinon.stub()
      sinon.spy(vm, 'okAjout')
      vm.$data.vin.nom = 'test create'
      vm.submitForm({preventDefault})
      expect(preventDefault).to.have.been.called
      expect(actions.ajouterVin).to.have.been.called
      // FIXME Verifier les parametres d'appel
      expect(vm.okAjout).to.have.been.called
    })
    it('doit logguer une erreur si l\'appel echoue', () => {
      var expectedErr = new Error('Expected error')
      actions.ajouterVin.rejects(expectedErr)
      var preventDefault = sinon.stub()
      sinon.spy(vm, 'okAjout')
      vm.$data.vin.nom = 'test create'
      vm.submitForm({preventDefault})
      expect(preventDefault).to.have.been.called
      expect(actions.ajouterVin).to.have.been.called
      // FIXME Verifier les parametres d'appel
      expect(vm.okAjout).to.not.have.been.called
    })
  })

  describe('updateAppellations', () => {
    it('doit alimenter les listes a partir d\'une region connue', () => {
      vm.regionSelectionnee = 'Bordeaux'
      vm.updateAppellations()
      expect(vm.listeAppellations.length).to.be.greaterThan(0)
    })
    it('doit alimenter les listes a partir d\'une region non trouvee', () => {
      vm.regionSelectionnee = 'TOTO'
      vm.updateAppellations()
      expect(vm.listeAppellations.length).to.be.equal(0)
    })
  })
})
