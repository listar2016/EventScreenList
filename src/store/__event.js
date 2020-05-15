import axios from "axios";

export default {
  state: {
    data: [],
    isLoading: false
  },
  mutations: {
    SET_EVENT_DATA(state, data) {
      state.data = data.data;
      state.isLoading = false;
    },
    EMPTY_EVENT_DATA(state) {
      state.data = [];
      state.isLoading = true;
    },
    SET_LOADING(state, payload) {
      state.isLoading = payload;
    }
  },
  actions: {
    getEventData({ commit }) {
      commit("EMPTY_EVENT_DATA");
      commit("SET_LOADING", true);
      axios
        .get("/json/event.json", {})
        .then(response => {
          // Simulate server delay
          setTimeout(function() {
            if (response.data) {
              commit("SET_EVENT_DATA", response.data);
            }
            commit("SET_LOADING", false);
          }, 1500);
        })
        .catch(error => {
          // Error handling
          console.log('Check for auth permission /n' + error.response)
        })
    },
    async saveRealEvent( eventData) {
      let baseUrl = '' // API Base URL
      let responseData = {
        newId : eventData.itemId,
        msg : ''
      }
      if (responseData.newId > 0) {
        let url = baseUrl + `/api/event/${responseData.newId}`;
        axios.post(url, eventData)
          .then( response => {
            console.log(response)
            responseData.msg = "success"
          })
          .catch( err => {
            console.log(err)
            responseData.msg = err
            responseData.newId = -1
          })
      } else {
        let url = baseUrl + "/api/event";
        await axios.post(url, eventData)
          .then( response => {
            console.log(response)
            responseData.newId = response.id
            responseData.msg = "success"
          })
          .catch( err => {
            console.log(err)
            responseData.newId = -1
            responseData.msg = err
          })
      }
      return responseData
    },
    async saveEventStatus(param) {
      let baseUrl = '' /////////
      let url = baseUrl + "/api/event-status"
      let responseData = {
        status: '',
        msg: ''
      }
      await axios.post(url, param)
        .then ( (response) => {
          console.log(response)
          responseData.status ='ok'
        })
        .catch( err => {
          console.log(err)
          responseData.status ='failed'
          responseData.msg = err
        })
      return responseData
    }
  }
};
