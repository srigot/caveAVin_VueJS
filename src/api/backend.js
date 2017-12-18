import Vue from 'vue'

/**
 * Mocking client/serveur
 */
const URL = 'https://meancave.herokuapp.com/'

export default {
  getListe () {
    return new Promise((resolve, reject) => {
      // Appel de l'API
      Vue.http.get(URL + 'vins').then(response => {
        resolve(response.body)
      }, err => {
        reject(err)
      })
    })
  },
  deleteVin (vin) {
    return new Promise((resolve, reject) => {
      Vue.http.delete(URL + 'vin/' + vin._id).then(response => {
        resolve()
      }, err => {
        reject(err)
      })
    })
  },
  addVin (vin) {
    return new Promise((resolve, reject) => {
      // Appel de l'API
      Vue.http.post(URL + 'vins', vin).then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
    })
  },
  updateVin (vin) {
    return new Promise((resolve, reject) => {
      Vue.http.put(URL + 'vin/' + vin._id, vin).then(response => {
        resolve()
      }, err => {
        reject(err)
      })
    })
  },
  addEmplacement (vin, emplacement) {
    return new Promise((resolve, reject) => {
      Vue.http.post(URL + 'vin/' + vin._id + '/emplacement', emplacement).then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
    })
  }
}
