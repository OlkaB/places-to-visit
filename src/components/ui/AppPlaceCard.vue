<template>
  <v-card class="mb-3">
    <v-container class="pa-0">
      <v-layout row wrap justify-space-between class="align-items-center">
        <v-flex class="place-data">
          <v-card-title class="py-0 pl-3">
            <div>
              <span class="title d-block">{{ placeData.name }}</span>
              <span
                class="subheading grey--text d-block mt-1"
              >{{ placeData.country }}, {{ placeData.city }}</span>
              <span class="caption grey--text d-block mt-1"><kbd class="gray">{{ placeData.user }}</kbd></span>
            </div>
          </v-card-title>
        </v-flex>

        <v-flex class="actions-wrapper" justify-space-between>
          <v-card-actions class="py-0">
            <v-tooltip top class="mr-3">
              <v-btn
                fab
                small
                dark
                color="info"
                v-on:click="showPlaceOnMap($event, placeData.id, placeData.geometry)"
                slot="activator"
                class="elevation-1"
              >
                <v-icon>fas fa-map-marker-alt</v-icon>
              </v-btn>
              <span>Show on map</span>
            </v-tooltip>
            <v-tooltip top>
              <v-btn
                fab
                small
                dark
                color="error"
                v-on:click="removePlaceFromList($event, placeData.id)"
                slot="activator"
                class="elevation-1"
              >
                <v-icon>fa fa-trash</v-icon>
              </v-btn>
              <span>Remove place from list</span>
            </v-tooltip>
          </v-card-actions>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import { eventBus } from '@/main.js'

export default {
  props: {
    placeData: {
      type: Object,
      required: true
    }
  },
  methods: {
    removePlaceFromList (event, placeId) {
      this.$store.commit('removePlaceFromList', placeId);
    },
    showPlaceOnMap (event, placeId, placeGeometry) {
      eventBus.$emit('showPlaceOnMap', {
        id: placeId,
        geometry: placeGeometry
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.actions-wrapper
  max-width: 140px

  .v-btn--floating
    border-radius: 5px;

.place-data
  max-width: calc(100% - 150px)
</style>
