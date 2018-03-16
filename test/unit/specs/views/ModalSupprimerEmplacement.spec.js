import Vue from 'vue'
import ModalSupprimerEmplacement from '@/views/ModalSupprimerEmplacement'
import BootstrapVue from 'bootstrap-vue'
import * as jdd from '../mockJDD.js'

Vue.use(BootstrapVue)

describe('ModalSupprimerEmplacement.vue', () => {
  let vm

  beforeEach(function () {
    const Constructor = Vue.extend(ModalSupprimerEmplacement)
    vm = new Constructor().$mount()
  })

  it('should check the name of my component', () => {
    expect(vm.$options.name).to.equal('modalSupprimerEmplacement')
  })

  describe('getNom', () => {
    it('doit afficher vide si undefined', () => {
      expect(vm.getNom).to.equal('')
    })
    it('doit afficher nom si item renseigne', () => {
      const Constructor = Vue.extend(ModalSupprimerEmplacement)
      vm = new Constructor({propsData: {item: {nom: 'Nom'}}}).$mount()
      expect(vm.getNom).to.equal('Nom')
    })
  })

  describe('init', () => {
    it('initialiser la liste a partir d\'une liste vide', () => {
      const Constructor = Vue.extend(ModalSupprimerEmplacement)
      vm = new Constructor({propsData: {item: {emplacements: []}}}).$mount()

      vm.init()
      expect(vm.options).to.be.a('array')
      expect(vm.options.length).to.equal(0)
      expect(vm.selected).to.be.null
    })
    it('initialiser la liste a partir d\'un element', () => {
      const Constructor = Vue.extend(ModalSupprimerEmplacement)
      vm = new Constructor({propsData: {item: {emplacements: [jdd.eC5]}}}).$mount()
      vm.init()
      expect(vm.options).to.be.a('array')
      expect(vm.options.length).to.equal(1)
      expect(vm.selected).to.be.null
    })
    it('initialiser la liste a partir de plusieurs elements', () => {
      const Constructor = Vue.extend(ModalSupprimerEmplacement)
      vm = new Constructor({propsData: {item: {emplacements: [jdd.eC5, jdd.eB5]}}}).$mount()
      vm.init()
      expect(vm.options).to.be.a('array')
      expect(vm.options.length).to.equal(2)
      expect(vm.selected).to.be.null
    })
  })

  describe('submit', () => {
    let e
    beforeEach(() => {
      e = {cancel: sinon.stub()}
      sinon.spy(vm, '$emit')
    })
    it('doit emettre un evenement si OK', () => {
      vm.selected = jdd.eC5
      vm.submit(e)
      expect(e.cancel).to.not.have.been.called
      expect(vm.$emit).to.have.been.calledWith('okModale', jdd.eC5)
    })
    it('doit afficher une erreur si rien n\'est selectionne', () => {
      vm.selected = ''
      vm.submit(e)
      // TODO Verifier que l'alerte est bien levée
      expect(e.cancel).to.have.been.called
    })
  })
})
