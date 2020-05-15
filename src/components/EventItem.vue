<template>
  <b-card no-body class="item-card mb-1">
    <b-card-body>
      <b-card-title>
        <span v-if="eventData.summary">{{ eventData.summary }}</span>
        <span v-else>{{ eventData.description }}</span>
        <b-link class="m-2" v-if="eventData.starredEvent">
          <font-awesome-icon :icon="['fas','star']" />
        </b-link>
        <b-link class="m-2" v-if="eventData.privateEvent">
          <font-awesome-icon :icon="['fas','lock']" />
        </b-link>
        <b-link class="m-2 float-right" @click="$emit('showEditEvent')">
          <font-awesome-icon icon="pencil-alt" />
        </b-link>
        <b-link
          class="m-2 float-right"
          @click="eventData.isSelected = !eventData.isSelected, $emit('changeSelected')"
        >
          <font-awesome-icon
            :icon=" eventData.isSelected ?  ['far','check-square'] : ['far','square']"
          />
        </b-link>
      </b-card-title>
      <div class="tags mb-2">
        <b-badge variant="primary" v-if="eventData.isHeadline">Headline</b-badge>
        <b-badge variant="secondary" v-if="eventData.isTopStory">Top Story</b-badge>
        <b-badge variant="info" v-if="eventData.isNew">New</b-badge>
        <b-badge variant="success" v-if="eventData.isUpdated">Updated</b-badge>
        <b-badge variant="warning" v-if="eventData.isProvisional">Provisional</b-badge>
        <b-badge
          variant="danger"
          v-if="eventData.embargoTime"
        >Embargo {{ eventData.embargoTime | msFormatDateTime }}</b-badge>
      </div>
      <b-row>
        <b-col md="8">
          <b-card-text v-if="viewMode==2" class="fix-desc">{{ eventData.description }}</b-card-text>
          <b-card-text>
            <span class="mr-4">
              <font-awesome-icon icon="clock" class="mr-2" />
              {{ eventData.startDate | msFormatDate }}
              <span
                v-if="eventData.time"
              >{{ eventData.time | msFormatTime }}</span>
              <span
                v-if="eventData.startDate!=eventData.endDate"
              >- {{ eventData.endDate | msFormatDate }}</span>
            </span>
            <span>
              <font-awesome-icon
                icon="map-marker-alt"
                class="mr-2"
                :class="eventData.location ? 'text-primary' : ''"
                @click="$emit('showGoogleMap')"
              />
              {{ eventData.venue }} {{ eventData.countryName }}
            </span>
          </b-card-text>
          <b-card-text v-if="viewMode==2">
            <span>
              <font-awesome-icon icon="tags" class="mr-2" />
              <span v-for="(cat,index) in eventData.categories" :key="index">
                <span v-if="index>0">,</span>
                {{ cat.categoryName }}
              </span>
            </span>
          </b-card-text>
        </b-col>
        <b-col md="4">
          <strong v-if="viewMode==2">Contacts</strong>
          <div v-for="c in eventData.contacts" :key="c.pressContactID">
            <div>
              <font-awesome-icon icon="user" class="mr-1" />
              <a
                :href="'mailto:' + c.pressContactEmail"
              >{{ c.pressContactName || c.pressContactOffice }}</a>
            </div>
            <div v-if="c.pressContactTelephone">
              <font-awesome-icon icon="phone" class="mr-1" />
              {{ c.pressContactTelephone }}
            </div>
          </div>
        </b-col>
      </b-row>
    </b-card-body>
  </b-card>
</template>
<script>
export default {
  props: {
    eventData: Object,
    viewMode: Number
  }
};
</script>