<template>
  <form>
    <b-form-group
      label="Summary"
      label-for="summary-input">
      <b-form-input
        id="summary-input"
        v-model="eventInfo.summary">
      </b-form-input>
    </b-form-group> 
    <b-form-group
      label="Description"
      label-for="description-input">
      <b-form-textarea
        id="description-input"
        v-model="eventInfo.description">
      </b-form-textarea>
    </b-form-group>
    <b-form-group
      label="Start Date">
      <b-row>
        <b-col>
          <b-form-input type="date" v-model="eventInfo.startDate"></b-form-input>
        </b-col>
        <b-col>
          <b-form-input type="time" v-model="eventInfo.startTime"></b-form-input>
        </b-col>
      </b-row>
    </b-form-group>
    <b-form-group
      label="End Date">
      <b-row>
        <b-col>
          <b-form-input type="date" v-model="eventInfo.endDate"></b-form-input>
        </b-col>
        <b-col>
          <b-form-input type="time" v-model="eventInfo.endTime"></b-form-input>
        </b-col>
      </b-row>
    </b-form-group>
    <b-form-group
      label="Country">
      <multi-select
        v-model="eventInfo.countryName"
        :options="countryList"
        :searchable="true"
        :allow-empty="true"
        :show-labels="false"
        placeholder="Select Country"
      ></multi-select>
    </b-form-group>
    <b-form-group
      label="Venue">
      <b-form-input
        v-model="eventInfo.venue">
      </b-form-input>
    </b-form-group>
    <b-form-group
      label="Category">
      <multi-select
        v-model="eventInfo.categories"
        :options="categoryList"
        :searchable="true"
        :allow-empty="true"
        :show-labels="false"
        :multiple="true"
        placeholder="Select Category"
        track-by="categoryId"
        label="categoryName"
      ></multi-select>
    </b-form-group>
    <b-form-group>
      <b-form-checkbox
        v-model="eventInfo.isHeadline"
        inline>
        HeadLine
      </b-form-checkbox>
      <b-form-checkbox
        v-model="eventInfo.isTopStory"
        inline>
        TopStory
      </b-form-checkbox>
      <b-form-checkbox
        v-model="eventInfo.isProvisional"
        inline>
        Provisional
      </b-form-checkbox>
    </b-form-group>
    <b-form-group>
      <b-form-checkbox
        v-model="eventInfo.privateEvent"
        inline>
        Private
      </b-form-checkbox>
      <b-form-checkbox
        v-model="eventInfo.starredEvent"
        inline>
        Starred
      </b-form-checkbox>
    </b-form-group>
  </form>  
</template>
<script>
import moment from 'moment'
import { mapState } from 'vuex'
import MultiSelect from 'vue-multiselect'
export default {
  props: {
    eventInfo: Object
  },
  components: {
    MultiSelect
  },
  computed: {
		...mapState({
      categoryList: state => state.category.data,
      countryList: state => state.country.data
    })
  },
  created() {
    this.initEvent()
  },
  methods: {
    initEvent() {
      let vm= this
      if (vm.eventInfo.startDate) {
        let startDate = vm.eventInfo.startDate
        vm.eventInfo.startDate = moment(startDate).format("YYYY-MM-DD")
        vm.eventInfo.startTime = moment(startDate).format("HH:mm:ss")
      }

      if (vm.eventInfo.endDate) {
        let endDate = vm.eventInfo.endDate
        vm.eventInfo.endDate = moment(endDate).format("YYYY-MM-DD")
        vm.eventInfo.endTime = moment(endDate).format("HH:mm:ss")
      }
    }
  }
}
</script>