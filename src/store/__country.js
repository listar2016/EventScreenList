import axios from "axios";
export default {
  state: {
    data: []
  },
  mutations: {
    SET_COUNTRY_DATA(state, data) {
      Object.keys(state).map(key => {
        if (Array.isArray(data[key])) {
          state[key] = data[key];
          return state[key];
        }
      });
    },
    EMPTY_COUNTRY_DATA(state) {
      Object.keys(state).map(key => {
        state[key] = [];
        return state[key];
      });
    }
  },
  actions: {
    getCountryData({ commit }) {
      commit("EMPTY_COUNTRY_DATA");

      axios
        .get("/json/country.json", {})
        .then(response => {
          // Simulate server delay
          setTimeout(function() {
            if (response.data) {
              commit("SET_COUNTRY_DATA", response.data);
            }
          }, 1500);
        })
        .catch(error => {
          // Error handling
          console.log("Check for auth permission /n" + error.response);
        });
    }
  }
};
