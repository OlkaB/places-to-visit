<template>
    <v-layout class="page-container" row wrap justify-space-between>
      <v-flex xs12 md7 lg8>
        <app-gmap :map-options="placeData"/>
      </v-flex>
      <v-flex xs12 md5 lg4 class="places-pane">
        <h2 class="headline font-weight-medium mb-3">Places to visit</h2>
        <v-autocomplete
          v-model="placeQuery"
          color="primary"
          :items="placesList|uniqueValuesFromObjectsArray(['country', 'city', 'name'])"
          hide-no-data
          hide-selected
          clearable
          label="Search for saved place"
          placeholder="Type in place"
          prepend-icon="fas fa-search"
          return-object
          class="mb-3"
        />

        <v-alert
          :value="true"
          :type="placesListAlert.type"
          v-if="placesListAlert.isVisible && placesListFiltered.length > 0"
          dismissible
          transition="scale-transition"
          class="mb-2"
          :icon="adjustFaIcon(this.placesListAlert.type)"
        >{{ placesListAlert.message }}</v-alert>

        <v-list class="transparent" >
          <template v-if="placesListFiltered.length > 0">
            <app-place-card :placeData="place" v-for="place in placesListFiltered" :key="place.id" />
          </template>
          <v-alert v-else
            :value="true"
            type="info"
          >
            No places added yet. Chose (double click) any interactive point from map.
          </v-alert>
        </v-list>
      </v-flex>

      <app-gmap-dialog></app-gmap-dialog>
    </v-layout>
</template>

<script>
import GoogleMap from '@/components/plugins/GoogleMap'
import AppPlaceCard from '@/components/ui/AppPlaceCard'
import GoogleMapDialog from '@/components/ui/GoogleMapDialog'
import { arraysMixins } from '@/mixins/array-mixins.js'
import adjustFaIcon from '@/mixins/fa-icons.js'
import { eventBus } from '@/main.js'

export default {
  components: {
    'app-gmap': GoogleMap,
    'app-place-card': AppPlaceCard,
    'app-gmap-dialog': GoogleMapDialog
  },
  mixins: [arraysMixins, adjustFaIcon],
  data () {
    return {
      placeQuery: '',
      placeData: {
        center: {
          lat: 52.237049,
          lng: 21.017532
        },
        zoom: 11
      },
      placesListAlert: {
        isVisible: false,
        type: 'info',
        message: ''
      },
      numOfPlaces: null
    }
  },
  computed: {
    placesList () {
      return this.$store.getters.places;
    },
    placesListFiltered() {
      return this.filterObjectsArrayByValueQuery(
        this.placesList,
        this.placeQuery
      )
    },
  },
  methods: {
    closePlacesListAlert (delayTimeMs) {
      const self = this;

      setTimeout(function () {
        self.placesListAlert.isVisible = false;
      }, delayTimeMs);
    },
  },
  watch: {
    placesList: {
      handler (places) {
        this.numOfPlaces = places.length;
      },
      deep: true,
      immediate: true
    },
    numOfPlaces (val, oldVal) {
      if (val > oldVal) {
        this.placesListAlert.isVisible = true;
        this.placesListAlert.type = 'success';
        this.placesListAlert.message = 'New place has been added';
      }
      if (val < oldVal) {
        this.placesListAlert.isVisible = true;
        this.placesListAlert.type = 'error';
        this.placesListAlert.message = 'Place has been successfully removed';
      }
      this.closePlacesListAlert(8000)
    }
  },
  created () {
    eventBus.$on('showPlaceOnMap', placeData => {
      this.placeData = {
        geometry: placeData.geometry,
        zoom: 12,
        id: placeData.id
      };
    })
  }
}
</script>

<style lang="sass" scoped>
  @media (min-width: 960px)
    .places-pane
      height: calc(100vh - 100px)
      overflow: auto
</style>
