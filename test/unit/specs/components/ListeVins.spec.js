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
      ajouterEmplacement: sinon.stub().returnsPromise(),
      supprimerEmplacement: sinon.stub().returnsPromise()
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

  describe('showModalAjouterEmpl', () => {
    it('doit emetttre l\'evenement d\'affichage', () => {
      sinon.spy(vm.$root, '$emit')
      vm.showModalAjouterEmpl(jdd.v1)
      expect(vm.current).to.be.equal(jdd.v1)
      expect(vm.$root.$emit).to.have.been.calledWith('show::modal', 'modalAjoutEmpl')
    })
  })

  describe('showModalSupprEmpl', () => {
    it('doit emetttre l\'evenement d\'affichage', () => {
      sinon.spy(vm.$root, '$emit')
      vm.showModalSupprEmpl(jdd.v1)
      expect(vm.current).to.be.equal(jdd.v1)
      expect(vm.$root.$emit).to.have.been.calledWith('show::modal', 'modalSupprEmpl')
    })
  })

  describe('validerAjoutEmplacement', () => {
    it('doit fermer la fenetre secondaire si OK', () => {
      actions.ajouterEmplacement.resolves()
      sinon.spy(vm.$root, '$emit')
      vm.current = jdd.v1
      vm.validerAjoutEmplacement(jdd.eC5)
      expect(actions.ajouterEmplacement).to.have.been.called
      // FIXME Verifier les parametres d'appel
      expect(vm.$root.$emit).to.have.been.calledWith('show::hide', 'modalAjoutEmpl')
    })
    it('doit afficher une erreur si le service est OK', () => {
      actions.ajouterEmplacement.rejects({statusText: 'Erreur test'})
      vm.current = jdd.v1
      vm.validerAjoutEmplacement(jdd.eC5)
      expect(vm.msgAlerte).to.be.equal('Erreur test')
      expect(vm.showAlerte).to.be.equal(true)
    })
  })

  describe('validerSupprimerEmplacement', () => {
    it('doit fermer la fenetre secondaire si OK', () => {
      actions.supprimerEmplacement.resolves()
      sinon.spy(vm.$root, '$emit')
      vm.current = jdd.v1
      vm.validerSupprimerEmplacement(jdd.eC5)
      expect(actions.supprimerEmplacement).to.have.been.called
      // FIXME Verifier les parametres d'appel
      expect(vm.$root.$emit).to.have.been.calledWith('show::hide', 'modalSupprEmpl')
    })
    it('doit afficher une erreur si le service est OK', () => {
      actions.supprimerEmplacement.rejects({statusText: 'Erreur test'})
      vm.current = jdd.v1
      vm.validerSupprimerEmplacement(jdd.eC5)
      expect(vm.msgAlerte).to.be.equal('Erreur test')
      expect(vm.showAlerte).to.be.equal(true)
    })
  })
})
