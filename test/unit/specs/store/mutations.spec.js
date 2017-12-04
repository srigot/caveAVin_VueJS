import mutations from '@/store/mutations'
import * as types from '@/store/mutations_types'
import * as jdd from '../mockJDD.js'

describe('store/mutations', () => {
  describe(types.AJOUTER_VIN, () => {
    it('shoud add vin to store to empty list', () => {
      const state = { items: [] }
      mutations[types.AJOUTER_VIN](state, jdd.v1)
      expect(state.items.length).to.equal(1)
      expect(state.items[0]).to.equal(jdd.v1)
    })
    it('shoud add vin to store to filled list', () => {
      const state = { items: [jdd.v1, jdd.v2] }
      mutations[types.AJOUTER_VIN](state, jdd.v3)
      expect(state.items.length).to.equal(3)
      expect(state.items[2]).to.equal(jdd.v3)
    })
  })

  describe(types.INIT_LISTE, () => {
    it('should set liste with parameter', () => {
      const state = { items: [] }
      mutations[types.INIT_LISTE](state, [jdd.v1, jdd.v2])
      expect(state.items.length).to.equal(2)
      expect(state.items).to.have.members([jdd.v1, jdd.v2])
    })
  })

  describe(types.SUPPRIMER_VIN, () => {
    it('should delete item from liste', () => {
      const state = { items: [jdd.v1, jdd.v2] }
      mutations[types.SUPPRIMER_VIN](state, jdd.v2)
      expect(state.items.length).to.equal(1)
      expect(state.items).to.have.members([jdd.v1])
      expect(state.items).to.not.have.members([jdd.v2])
    })
    it('shouldn\'t delete unknown item', () => {
      const state = { items: [jdd.v1, jdd.v2] }
      mutations[types.SUPPRIMER_VIN](state, jdd.v3)
      expect(state.items.length).to.equal(2)
      expect(state.items).to.have.members([jdd.v1, jdd.v2])
    })
  })

  describe(types.TOOGLE_FILTREALL, () => {
    it('should toogle false to true', () => {
      const state = {filterAll: false}
      mutations[types.TOOGLE_FILTREALL](state)
      expect(state.filterAll).to.equal(true)
    })
    it('should toogle true to false', () => {
      const state = {filterAll: true}
      mutations[types.TOOGLE_FILTREALL](state)
      expect(state.filterAll).to.equal(false)
    })
  })

  describe(types.AJOUTER_EMPLACEMENT, () => {
    it('should add emplacement to vin with empty property emplacement', () => {
      const state = { items: [jdd.v1, jdd.v3] }
      mutations[types.AJOUTER_EMPLACEMENT](state, {vin: jdd.v3, rangee: 'A', colonne: '3'})
      expect(state.items.length).to.equal(2)
      expect(state.items[1].emplacement.length).to.equal(1)
      expect(state.items[1].emplacement[0].rangee).to.equal('A')
      expect(state.items[1].emplacement[0].colonne).to.equal('3')
    })
    it('should add emplacement to vin with filled property emplacement', () => {
      const state = { items: [jdd.v3, jdd.v4] }
      mutations[types.AJOUTER_EMPLACEMENT](state, {vin: jdd.v4, rangee: 'A', colonne: '3'})
      expect(state.items.length).to.equal(2)
      expect(state.items[1].emplacement.length).to.equal(2)
      expect(state.items[1].emplacement[1].rangee).to.equal('A')
      expect(state.items[1].emplacement[1].colonne).to.equal('3')
    })
    it('should add emplacement to vin without property emplacement', () => {
      const state = { items: [jdd.v1, jdd.v2] }
      mutations[types.AJOUTER_EMPLACEMENT](state, {vin: jdd.v2, rangee: 'A', colonne: '3'})
      expect(state.items.length).to.equal(2)
      expect(state.items[1].emplacement.length).to.equal(1)
      expect(state.items[1].emplacement[0].rangee).to.equal('A')
      expect(state.items[1].emplacement[0].colonne).to.equal('3')
    })
  })

  describe(types.SUPPRIMER_EMPLACEMENT, () => {
    it('shoudn\'t remove inexisting emplacement', () => {
      const state = { items: [jdd.v3, jdd.v5] }
      mutations[types.SUPPRIMER_EMPLACEMENT](state, {vin: jdd.v5, emplacement: jdd.eA2})
      expect(state.items.length).to.equal(2)
      expect(state.items[1].emplacement.length).to.equal(2)
    })
    it('shoud remove existing emplacement', () => {
      const state = { items: [jdd.v3, jdd.v5] }
      mutations[types.SUPPRIMER_EMPLACEMENT](state, {vin: jdd.v5, emplacement: jdd.eB5})
      expect(state.items.length).to.equal(2)
      expect(state.items[1].emplacement.length).to.equal(1)
    })
  })
})
