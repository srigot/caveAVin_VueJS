import Vue from 'vue'
import CardVin from '@/components/CardVin'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)

const v1 = {_id: 1, nom: 'test 1', emplacement: [{rangee: 'A', colonne: '2'}]}
const v1Vide = {_id: 1, nom: 'test 1', emplacement: []}

describe('CardVin.vue', () => {
  let vm

  beforeEach(function () {
    const Constructor = Vue.extend(CardVin)
    vm = new Constructor({propsData: {item: v1}}).$mount()
  })

  it('should check the name of my vue', () => {
    expect(vm.$options.name).to.equal('cardVin')
  })

  it('should have item prop', () => {
    expect(vm.item).to.equal(v1)
  })

  it('should call emit event on click on ajouterEmplacement', done => {
    const button = vm.$el.querySelector('.btnAddEmpl')

    vm.$on('eventAjouterEmplacement', () => {
      done()
    })

    button.click()
  })

  it('should call emit event on click on supprimerEmplacement', done => {
    const button = vm.$el.querySelector('.btnRemoveEmpl')

    vm.$on('eventSupprimerEmplacement', () => {
      done()
    })

    button.click()
  })
  it('shouldn\'t call emit event on click on supprimerEmplacement when nbBouteilles = 0', () => {
    const Constructor = Vue.extend(CardVin)
    vm = new Constructor({propsData: {item: v1Vide}}).$mount()
    const button = vm.$el.querySelector('.btnRemoveEmpl')

    button.click()
  })
})
