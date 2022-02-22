import axios from 'axios'
import { createStore } from 'vuex'

export default createStore({
  state: {
    serviceApi: "https://project-services-api.herokuapp.com",
    accentColor: "white",
    cityInput: "",
    city: (typeof localStorage.getItem("city") == undefined) ? null : localStorage.getItem("city"),
    cities: [],
    citiesLong: [],
    unitIndex: 0,
    units: [
      ['metric', '°C', '%', 'mbar', 'm/s', 'm/s'],
      ['imperial', '°F', '%', 'mbar', 'mi/h', 'mi/h']
    ],
    currentWeather: (typeof localStorage.getItem("currentWeather") == undefined) ? null : JSON.parse(localStorage.getItem("currentWeather")),
    dailyWeather: (typeof localStorage.getItem("dailyWeather") == undefined) ? null : JSON.parse(localStorage.getItem("dailyWeather"))
  },
  getters: {
    getConvertedDateTime: state => UNIX_timestamp => {
      var a = new Date(UNIX_timestamp * 1000);
      var year = a.getFullYear();
      var month = a.getMonth() + 1;
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes();
      var datetime = date + '.' + month + '.' + year + '. ' + hour + ':' + min;
      return datetime;
    },

    getConvertedDate: state => UNIX_timestamp => {
      var a = new Date(UNIX_timestamp * 1000);
      var year = a.getFullYear();
      var month = a.getMonth() + 1;
      var d = a.getDate();
      var date = d + '.' + month + '.' + year + '.';
      return date;
    },

    getConvertedTime: state => UNIX_timestamp => {
      var a = new Date(UNIX_timestamp * 1000);
      var hour = a.getHours();
      var datetime = hour + ':' + min;
      return datetime;
    },

    getCurentDateTime: (state, getters) => {
      return getters.getConvertedDateTime(state.dailyWeather.current.dt);
    },

    getDayLabels: (state, getters) => {
      var array = [];
      for (let i in state.dailyWeather.daily) {
        var day = getters.getConvertedDate(state.dailyWeather.daily[i].dt);
        array.push(day);
      }
      return array;
    },

    getHourData: (state, getters) => {
      var t = [];
      var h = [];
      var p = [];
      var w = [];
      var g = [];

      for (let i = 0; i < 12; i++) {
        var dt = getters.getConvertedDateTime(state.dailyWeather.hourly[i].dt);
        t.push([dt, state.dailyWeather.hourly[i].temp]);
        h.push([dt, state.dailyWeather.hourly[i].humidity]);
        p.push([dt, state.dailyWeather.hourly[i].pressure]);
        w.push([dt, state.dailyWeather.hourly[i].wind_speed]);
        g.push([dt, state.dailyWeather.hourly[i].wind_gusts]);
      }

      var obj = {
        chart: [
          [{ name: 'Temperature ' + state.units[state.unitIndex][1], data: t }],
          [{ name: 'Humidity ' + state.units[state.unitIndex][2], data: h }],
          [{ name: 'Pressure ' + state.units[state.unitIndex][3], data: p }],
          [{ name: 'Wind speed ' + state.units[state.unitIndex][4], data: w },
          { name: 'Wind gusts ' + state.units[state.unitIndex][4], data: g }]
        ]
      };

      return obj;
    },

    getDailyData: (state) => {
      var chart = [];
      var table = [];
      var titles = [];

      for (let i in state.dailyWeather.daily) {
        var temp = [{
          name: 'Temperature ' + state.units[state.unitIndex][1],
          data: [
            ['Morning', state.dailyWeather.daily[i].temp.morn],
            ['Day', state.dailyWeather.daily[i].temp.day],
            ['Evening', state.dailyWeather.daily[i].temp.eve],
            ['Night', state.dailyWeather.daily[i].temp.night]
          ]
        }];
        chart.push(temp);

        var dayInfo = [
          ['Max Temperature', state.dailyWeather.daily[i].temp.max + ' ' + state.units[state.unitIndex][1]],
          ['Min Temperature', state.dailyWeather.daily[i].temp.min + ' ' + state.units[state.unitIndex][1]],
          ['Humidity', state.dailyWeather.daily[i].humidity + ' ' + state.units[state.unitIndex][2]],
          ['Pressure', state.dailyWeather.daily[i].pressure + ' ' + state.units[state.unitIndex][3]],
          ['Wind Speed', state.dailyWeather.daily[i].wind_speed + ' ' + state.units[state.unitIndex][4]]
        ];
        table.push(dayInfo);

        var dayTitle = [{
          main: state.dailyWeather.daily[i].weather[0].main,
          description: state.dailyWeather.daily[i].weather[0].description,
          icon: state.dailyWeather.daily[i].weather[0].icon
        }];
        titles.push(dayTitle);
      }

      var obj = {
        titles: titles,
        table: table,
        chart: chart
      };

      return obj;
    }

  },
  mutations: {
    emptyCities(state) {
      state.cities = [];
    },

    emptyCitiesLong(state) {
      state.citiesLong = [];
    },

    setInput(state, value) {
      state.cityInput = value;
    },

    setUnits(state) {
      state.unitIndex = Number(!Boolean(state.unitIndex));
    },

    setAccentColor(state, value) {
      state.accentColor = value;
    },

    setCitiesApi(state, response) {
      state.cities = [];
      for (let i in response) {
        var item = response[i].name + ", " + response[i].country;
        state.cities.push(item);
      }
    },

    setCitiesLongApi(state, response) {
      state.citiesLong = [];
      for (let i in response) {
        var item = response[i].name + ", " + response[i].country;
        state.citiesLong.push(item);
      }
    },

    setGeolocation(state, response) {
      state.city = response;
      localStorage.setItem("city", response);
    },

    setCurrentWeather(state, response) {
      state.currentWeather = response;
      localStorage.setItem("currentWeather", JSON.stringify(response));
    },

    setDailyWeather(state, response) {
      state.dailyWeather = response;
      localStorage.setItem("dailyWeather", JSON.stringify(response));
    }
  },
  actions: {
    getCitiesApi({ commit }, { value, limit }) {
      var request = 'https://api.api-ninjas.com/v1/city?name=' + value + "&limit=" + limit;
      axios(request, { headers: { 'X-Api-Key': process.env.VUE_APP_CITIES_API } }).then(response => {
        if (limit > 5)
          commit('setCitiesLongApi', response.data);
        else
          commit('setCitiesApi', response.data);
      }).catch((err) => console.log(err))
    },

    getGeolocation({ dispatch, commit }) {
      var request = 'https://api.ipgeolocation.io/ipgeo?apiKey=' + process.env.VUE_APP_GEO_API;
      axios(request).then(response => {
        commit('setGeolocation', response.data.city + ", " + response.data.country_code2);
        dispatch('getCurrentWeather', response.data.city);
      }).catch((err) => console.log(err))
    },

    getCurrentWeather({ commit, state }) {
      var request = state.serviceApi + '/now/' + state.city + "/" + state.units[state.unitIndex][0];
      axios.get(request).then(response => {
        commit('setCurrentWeather', response.data);
      }).catch((err) => console.log(err))
    },

    getDailyWeather({ commit, state }) {
      return new Promise((resolve, reject) => {

        var request =  state.serviceApi + '/daily/' + state.city.split(",")[0] + "/" + state.units[state.unitIndex][0];
        axios.get(request).then(response => {
          commit('setDailyWeather', response.data);
          resolve(response.data);
        }).catch((err) => {
          console.log(err);
          reject(err);
        })

      });
    }
  },
  modules: {

  }
})
