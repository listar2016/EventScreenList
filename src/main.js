import Vue from "vue";
import "./plugins/axios";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import store from "./store";
import moment from "moment";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faClock,
  faTags,
  faMapMarkerAlt,
  faHeart,
  faStar,
  faPencilAlt,
  faLock,
  faEquals,
  faAlignJustify,
  faUser,
  faPhone
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as farHeart,
  faSquare,
  faCheckSquare,
  faCalendarAlt
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import * as VueGoogleMaps from "vue2-google-maps";
import VmBackTop from "vue-multiple-back-top";

library.add(
  faClock,
  faTags,
  faMapMarkerAlt,
  faHeart,
  faStar,
  farHeart,
  faPencilAlt,
  faLock,
  faCheckSquare,
  faSquare,
  faEquals,
  faAlignJustify,
  faCalendarAlt,
  faUser,
  faPhone
);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("vm-back-top", VmBackTop);

import "vue-multiselect/dist/vue-multiselect.min.css";
import "./assets/scss/custom.scss";

Vue.filter("msFormatDate", function(value) {
  if (value) {
    return moment(value).format("LL");
  }
});

Vue.filter("msFormatTime", function(value) {
  if (value) {
    return moment(value).format("LTS");
  }
});

Vue.filter("msFormatDateTime", function(value) {
  if (value) {
    return moment(value).format("LL LTS");
  }
});

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_MAPS_API_KEY
  }
});

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
