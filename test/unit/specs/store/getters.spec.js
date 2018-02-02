import getters from '@/store/getters'
import * as jdd from '../mockJDD.js'

describe('store/getters', () => {
  describe('listeFiltree', () => {
    it('should return liste if all', () => {
      const state = { items: [jdd.v1, jdd.v2, jdd.v3], filterAll: true }

      const result = getters.listeFiltree(state)

      expect(result.length).to.equal(3)
      expect(result).to.have.members([jdd.v1, jdd.v2, jdd.v3])
    })
    it('should return only where length emplacement > 0', () => {
      const state = { items: [jdd.v1, jdd.v2, jdd.v3, jdd.v4, jdd.v5], filterAll: false }

      const result = getters.listeFiltree(state)

      expect(result.length).to.equal(2)
      expect(result).to.have.members([jdd.v4, jdd.v5])
    })
  })
})
