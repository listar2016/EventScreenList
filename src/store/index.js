import Vue from 'vue'
import Vuex from 'vuex'

import category from './__category'
import event from './__event'
import country from './__country'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    category,
    event,
    country
  }
})
