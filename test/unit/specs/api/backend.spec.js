import Vue from 'vue'
import backend from '@/api/backend'
import * as jdd from '../mockJDD.js'

const URL = 'https://meancave.herokuapp.com/vins'

describe('api/backend', () => {
  describe('getListe', () => {
    let mockPromiseCall
    beforeEach(() => {
      mockPromiseCall = sinon.stub(Vue.http, 'get').returnsPromise()
    })
    afterEach(() => {
      Vue.http.get.restore()
    })
    it('should could api GET', () => {
      backend.getListe()
      expect(Vue.http.get).to.have.been.calledWith(URL)
    })
    it('should return promise then if ok', () => {
      mockPromiseCall.resolves({body: {items: [jdd.v1, jdd.v2]}})
      return backend.getListe().then(result => {
        expect(result.items.length).to.equal(2)
        expect(result.items).to.have.members([jdd.v1, jdd.v2])
      })
    })
    it('should return promise reject if ko', () => {
      var expectedErr = new Error('Expected error')
      mockPromiseCall.rejects(expectedErr)
      return backend.getListe().then(result => {
        throw new Error('was not supposed to succeed')
      }, err => {
        expect(err).to.equal(expectedErr)
      })
    })
  })

  describe('deleteVin', () => {
    let mockPromiseCall
    beforeEach(() => {
      mockPromiseCall = sinon.stub(Vue.http, 'delete').returnsPromise()
    })
    afterEach(() => {
      Vue.http.delete.restore()
    })
    it('should call api DELETE', () => {
      backend.deleteVin(jdd.v1)
      expect(Vue.http.delete).to.have.been.calledWith(URL + '/' + jdd.v1._id)
    })
    it('should return promise if ok', () => {
      mockPromiseCall.resolves()
      return backend.deleteVin(jdd.v1)
    })
    it('should return promise reject if ko', () => {
      var expectedErr = new Error('Expected error')
      mockPromiseCall.rejects(expectedErr)
      return backend.deleteVin(jdd.v1).then(result => {
        throw new Error('was not supposed to succeed')
      }, err => {
        expect(err).to.equal(expectedErr)
      })
    })
  })

  describe('addVin', () => {
    let mockPromiseCall
    beforeEach(() => {
      mockPromiseCall = sinon.stub(Vue.http, 'post').returnsPromise()
    })
    afterEach(() => {
      Vue.http.post.restore()
    })
    it('should call api POST', () => {
      backend.addVin(jdd.v1)
      expect(Vue.http.post).to.have.been.calledWith(URL)
      // TODO Verifier le contenu du POST
    })
    it('should return promise if ok', () => {
      mockPromiseCall.resolves(jdd.v1)
      return backend.addVin(jdd.vSansId).then(result => {
        expect(result).to.equal(jdd.v1)
      })
    })
    it('should return promise reject if ko', () => {
      var expectedErr = new Error('Expected error')
      mockPromiseCall.rejects(expectedErr)
      return backend.addVin(jdd.v1).then(result => {
        throw new Error('was not supposed to succeed')
      }, err => {
        expect(err).to.equal(expectedErr)
      })
    })
  })

  describe('updateVin', () => {
    let mockPromiseCall
    beforeEach(() => {
      mockPromiseCall = sinon.stub(Vue.http, 'put').returnsPromise()
    })
    afterEach(() => {
      Vue.http.put.restore()
    })
    it('shoud call API PUT', () => {
      backend.updateVin(jdd.v1)
      // TODO verifier le contenu du PUT
      expect(Vue.http.put).to.have.been.calledWith(URL + '/' + jdd.v1._id)
    })
    it('should return promise if ok', () => {
      mockPromiseCall.resolves()
      return backend.updateVin(jdd.v1)
    })
    it('should return promise reject if ko', () => {
      var expectedErr = new Error('Expected error')
      mockPromiseCall.rejects(expectedErr)
      return backend.updateVin(jdd.v1).then(result => {
        throw new Error('was not supposed to succeed')
      }, err => {
        expect(err).to.equal(expectedErr)
      })
    })
  })
})
