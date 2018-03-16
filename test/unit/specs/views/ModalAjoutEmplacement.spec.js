import Vue from 'vue'
import ModalAjoutEmplacement from '@/views/ModalAjoutEmplacement'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)

describe('ModalAjoutEmplacement.vue', () => {
  let vm

  beforeEach(function () {
    const Constructor = Vue.extend(ModalAjoutEmplacement)
    vm = new Constructor().$mount()
  })

  it('should check the name of my component', () => {
    expect(vm.$options.name).to.equal('modalAjoutEmplacement')
  })

  describe('getNom', () => {
    it('doit afficher vide si undefined', () => {
      expect(vm.getNom).to.equal('')
    })
    it('doit afficher nom si item renseigne', () => {
      const Constructor = Vue.extend(ModalAjoutEmplacement)
      vm = new Constructor({propsData: {item: {nom: 'Nom'}}}).$mount()
      expect(vm.getNom).to.equal('Nom')
    })
  })

  describe('clear', () => {
    it('doit reinitialiser les champs', () => {
      vm.rangee = 'A'
      vm.colonne = '2'
      vm.clear()
      expect(vm.rangee).to.equal('')
      expect(vm.colonne).to.equal('')
    })
  })

  describe('submit', () => {
    let e
    beforeEach(() => {
      e = {cancel: sinon.stub()}
      sinon.spy(vm, '$emit')
    })
    it('doit emettre un evenement si OK', () => {
      vm.rangee = 'A'
      vm.colonne = '2'
      vm.submit(e)
      expect(e.cancel).to.not.have.been.called
      expect(vm.$emit).to.have.been.calledWith('okModale', {rangee: 'A', colonne: '2'})
    })
    it('doit afficher une erreur si rangee est nulle', () => {
      vm.rangee = ''
      vm.submit(e)
      // TODO Verifier que l'alerte est bien levée
      expect(e.cancel).to.have.been.called
    })
    it('doit afficher une erreur si la colonne est nulle', () => {
      vm.rangee = 'A'
      vm.colonne = ''
      vm.submit(e)
      // TODO Verifier que l'alerte est bien levée
      expect(e.cancel).to.have.been.called
    })
  })
})
