import actions from '@/store/actions'
import * as types from '@/store/mutations_types'
import backend from '@/api/backend'
import * as jdd from '../mockJDD.js'

describe('store/actions', () => {
  let mockCommit

  beforeEach(function () {
    mockCommit = sinon.stub() // Mock commit
  })

  describe('initListe', () => {
    let mockPromiseCall
    beforeEach(function () {
      mockPromiseCall = sinon.stub(backend, 'getListe').returnsPromise()
    })
    afterEach(function () {
      backend.getListe.restore()
    })

    it('should call backend', () => {
      actions.initListe({commit: mockCommit})
      expect(backend.getListe).to.have.been.called
    })
    it('should init liste if result ok', () => {
      mockPromiseCall.resolves({items: [jdd.v123]})
      actions.initListe({commit: mockCommit})
      // then
      expect(mockCommit).to.have.been.calledWith(types.INIT_LISTE, {items: [jdd.v123]})
    })
    it('should return erreur if result ko', () => {
      var expectedErr = new Error('Expected error')
      mockPromiseCall.rejects(expectedErr)
      return actions.initListe({commit: mockCommit}).then(result => {
        throw new Error('was not supposed to succeed')
      }, err => {
        expect(err).to.equal(expectedErr)
        expect(mockCommit).to.not.have.been.called
      })
      // then
    })
  })

  describe('supprimerVin', () => {
    let mockPromiseCall
    beforeEach(function () {
      mockPromiseCall = sinon.stub(backend, 'deleteVin').returnsPromise()
    })
    afterEach(function () {
      backend.deleteVin.restore()
    })

    it('should call backend', () => {
      actions.supprimerVin({commit: mockCommit}, jdd.v123)
      expect(backend.deleteVin).to.have.been.calledWith(jdd.v123)
    })
    it('should remove item from list if result ok', () => {
      mockPromiseCall.resolves()
      actions.supprimerVin({commit: mockCommit}, jdd.v123)
      expect(mockCommit).to.have.been.calledWith(types.SUPPRIMER_VIN, jdd.v123)
    })
    it('shouldn\'t remove item from list if result ko', () => {
      var expectedErr = new Error('Expected error')
      mockPromiseCall.rejects(expectedErr)
      return actions.supprimerVin({commit: mockCommit}, jdd.v123).then(result => {
        throw new Error('was not supposed to succeed')
      }, err => {
        expect(err).to.equal(expectedErr)
        expect(mockCommit).to.not.have.been.called
      })
    })
  })

  describe('ajouterVin', () => {
    let mockPromiseCall
    beforeEach(function () {
      mockPromiseCall = sinon.stub(backend, 'addVin').returnsPromise()
    })
    afterEach(function () {
      backend.addVin.restore()
    })

    it('should call backend', () => {
      actions.ajouterVin({commit: mockCommit}, jdd.vSansId)
      expect(backend.addVin).to.have.been.calledWith(jdd.vSansId)
    })
    it('should add item from list if result ok', () => {
      mockPromiseCall.resolves(jdd.v123)
      actions.ajouterVin({commit: mockCommit}, jdd.vSansId)
      expect(mockCommit).to.have.been.calledWith(types.AJOUTER_VIN, jdd.v123)
    })
    it('shouldn\'t add item from list if result ko', () => {
      var expectedErr = new Error('Expected error')
      mockPromiseCall.rejects(expectedErr)
      return actions.ajouterVin({commit: mockCommit}, jdd.vSansId).then(result => {
        throw new Error('was not supposed to succeed')
      }, err => {
        expect(err).to.equal(expectedErr)
        expect(mockCommit).to.not.have.been.called
      })
    })
  })
  describe('toogleFiltreAll', () => {
    it('should call mutations', () => {
      actions.toogleFiltreAll({commit: mockCommit})
      expect(mockCommit).to.have.been.called
    })
  })

  describe('ajouterEmplacement', () => {
    let mockPromiseCall
    beforeEach(function () {
      mockPromiseCall = sinon.stub(backend, 'updateVin').returnsPromise()
    })
    afterEach(function () {
      backend.updateVin.restore()
    })
    it('should call backend', () => {
      actions.ajouterEmplacement({commit: mockCommit}, {vin: jdd.v123, rangee: 'A', colonne: '3'})
      expect(backend.updateVin).to.have.been.calledWith(jdd.v123)
    })
    it('should update vin if result ok', () => {
      mockPromiseCall.resolves()
      actions.ajouterEmplacement({commit: mockCommit}, {vin: jdd.v123, rangee: 'A', colonne: '3'})
      expect(mockCommit).to.have.been.calledWith(types.AJOUTER_EMPLACEMENT, {vin: jdd.v123, rangee: 'A', colonne: '3'})
    })
    it('need to revert if result ko', () => {
      // TODO
    })
  })
})
