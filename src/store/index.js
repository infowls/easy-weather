import axios from 'axios'
import { createStore } from 'vuex'

export default createStore({
  state: {
    cityInput: "",
    cities: [],
    accentColor: "teal",
    logged: false
  },
  mutations: {
    getCitiesApi(state, response) {
      state.cities = [];
      for (let i in response) {
        var item = response[i].name + ", " + response[i].country;
        state.cities.push(item);
      }
    }
  },
  actions: {
    getCitiesApi({ commit }, value) {
      var request = 'https://api.api-ninjas.com/v1/city?name=' + value + "&limit=5";
      axios(request, { headers: { 'X-Api-Key': process.env.VUE_APP_CITIES_API } }).then(response => {
        commit('getCitiesApi', response.data);
      }).catch((err) => console.log(err))
    }
  },
  modules: {

  }
})
