import Vue from 'vue'

/**
 * Mocking client/serveur
 */
const URL = 'https://meancave.herokuapp.com/vins'

export default {
  getListe () {
    return new Promise((resolve, reject) => {
      // Appel de l'API
      Vue.http.get(URL).then(response => {
        resolve(response.body)
      }, err => {
        reject(err)
      })
    })
  },
  deleteVin (vin) {
    return new Promise((resolve, reject) => {
      Vue.http.delete(URL + '/' + vin._id).then(response => {
        resolve()
      }, err => {
        reject(err)
      })
    })
  },
  addVin (vin) {
    return new Promise((resolve, reject) => {
      // Appel de l'API
      Vue.http.post(URL, vin).then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
    })
  },
  updateVin (vin) {
    return new Promise((resolve, reject) => {
      Vue.http.put(URL + '/' + vin._id, vin).then(response => {
        resolve()
      }, err => {
        reject(err)
      })
    })
  }
}
