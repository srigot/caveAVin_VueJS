import getters from '@/store/getters'

const v1 = {_id: 1, nom: 'test 1'}
const v2 = {_id: 2, nom: 'test 2'}
const v3 = {_id: 3, nom: 'test 3', emplacement: []}
const v4 = {_id: 4, nom: 'test 4', emplacement: [{rangee: 'A', colonne: '3'}]}
const v5 = {_id: 5, nom: 'test 5', emplacement: [{rangee: 'A', colonne: '2'}, {rangee: 'B', colonne: '2'}]}

describe('store/getters', () => {
  describe('listeFiltree', () => {
    it('should return liste if all', () => {
      const state = { items: [v1, v2, v3], filterAll: true }

      const result = getters.listeFiltree(state)

      expect(result.length).to.equal(3)
      expect(result).to.have.members([v1, v2, v3])
    })
    it('should return only where length emplacement > 0', () => {
      const state = { items: [v1, v2, v3, v4, v5], filterAll: false }

      const result = getters.listeFiltree(state)

      expect(result.length).to.equal(2)
      expect(result).to.have.members([v4, v5])
    })
  })
})
