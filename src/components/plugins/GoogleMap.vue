<template>
  <div class="gmap">
    <div class="gmap__view" ref="map">
      <div hidden>
        <div ref="infoWindow">
          <span class="poi__name" v-if="clickedMapPOI">{{ clickedMapPOI.name }}</span>
          <span class="poi__address" v-if="clickedMapPOI">{{ clickedMapPOI['formatted_address'] }}</span>

          <div class="clearfix poi__add" v-if="isInfoWindowSaveOptionVisible">
            <input
              v-model="userName"
              type="text"
              placeholder="type in your name"
              class="poi__userName"
            >
            <button class="dismissButton poi__save" @click="addPlace()" flat small>Save place</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from '@/main.js'

export default {
  props: {
    mapOptions: {
      type: Object,
      required: false
    }
  },

  data () {
    return {
      GoogleMapsLoader: null,
      map: null,
      userName: '',
      clickedMapPOI: null,
      infowindowInstance: null,
      isInfoWindowSaveOptionVisible: true
    }
  },

  watch: {
    clickedMapPOI: {
      handler () {},
      deep: true
    },
    mapOptions: {
      handler (mapOptions) {
        this.infowindowInstance.close()
        this.map.setCenter({
          lat: mapOptions.geometry.lat,
          lng: mapOptions.geometry.lng
        })
        this.map.setZoom(mapOptions.zoom)
        this.isInfoWindowSaveOptionVisible = false
        this.getPlaceInformation(mapOptions.id)
      },
      deep: true
    }
  },

  computed: {
    POICountry () {
      if (this.clickedMapPOI) {
        return this.clickedMapPOI['address_components'].filter(adrLevel => {
          return adrLevel.types[0] === 'country'
        })[0]['long_name']
      } else {
        return ''
      }
    },
    POICity () {
      if (this.clickedMapPOI) {
        return this.clickedMapPOI['address_components'].filter(adrLevel => {
          return adrLevel.types[0] === 'administrative_area_level_2'
        })[0]['long_name']
      } else {
        return ''
      }
    }
  },

  methods: {
    addPlace () {
      const self = this
      const placeId = this.clickedMapPOI['place_id']

      if (!this.userName) {
        eventBus.$emit('toggleGMapDialog', { isVisible: true, type: 'error', message: 'Please, type in your name before adding place to list.' })
        return
      }

      if (this.$store.getters.checkIfPlaceIsOnList(placeId)) {
        eventBus.$emit('toggleGMapDialog', { isVisible: true, type: 'info', message: 'This place is already on your list.' })
        return
      }

      const place = {
        id: placeId,
        name: this.clickedMapPOI.name,
        country: self.POICountry,
        city: self.POICity,
        address: this.clickedMapPOI['formatted_address'],
        geometry: {
          lat: this.clickedMapPOI.geometry.location.lat(),
          lng: this.clickedMapPOI.geometry.location.lng()
        },
        user: this.userName
      }
      this.$store.commit('addPlaceToList', place)
      self.infowindowInstance.close()
    },
    handleClick (event) {
      if (event.placeId) {
        // prevent opening gmap default infowindow
        event.stop()
        this.isInfoWindowSaveOptionVisible = true

        this.getPlaceInformation(event.placeId)
      }
    },
    getPlaceInformation (placeId) {
      const self = this
      let placesService = new google.maps.places.PlacesService(self.map)

      // development only, delete before prod
      if (!placesService) {
        eventBus.$emit('toggleGMapDialog', { isVisible: true, type: 'info', message: 'Development mode: Vue server refreshed. Please reload the page to restore google map functionalities.' })
      }

      placesService.getDetails({ placeId: placeId }, function (place, status) {
        if (status === 'OK') {
          self.clickedMapPOI = place

          self.infowindowInstance = new google.maps.InfoWindow({
            content: self.$refs.infoWindow
          })
          self.infowindowInstance.close()
          self.infowindowInstance.setPosition(
            new google.maps.LatLng(
              place.geometry.location.lat(),
              place.geometry.location.lng()
            )
          )
          self.infowindowInstance.open(self.map)
        } else if (status === 'OVER_QUERY_LIMIT') {
          eventBus.$emit('toggleGMapDialog', { isVisible: true, type: 'warning', message: 'Limited free map queries has now been exceed. \nPlease wait for a minute (or more if needed) and refresh page' })
        }
      })
    }
  },

  created () {
    this.GoogleMapsLoader = require('google-maps')
    this.GoogleMapsLoader.KEY = 'AIzaSyAXB18uY6Auv7VLcA_uylJ22xd_VdrnD5c'
    this.GoogleMapsLoader.LANGUAGE = 'en'
    this.GoogleMapsLoader.REGION = 'PL'
    this.GoogleMapsLoader.VERSION = '3.35'
    this.GoogleMapsLoader.LIBRARIES = ['geometry', 'places']
  },

  mounted () {
    const self = this
    const mapNode = this.$refs['map']

    this.GoogleMapsLoader.onLoad(function (google) {})

    this.GoogleMapsLoader.load(function (google) {
      self.map = new google.maps.Map(mapNode, self.mapOptions)
      self.map.addListener('click', self.handleClick.bind(this))
    })
  },

  destroyed () {
    this.GoogleMapsLoader.release(function () {})
  }
}
</script>

<style lang="sass" scoped>
    .gmap
      .poi__name
        font-weight: 700
        margin-bottom: 10px
        font-size: 15px

      .poi__name, .poi__address
        display: block

      .poi__address
        margin-bottom: 15px

      .poi__add
        width: 100%

      .poi__userName
        height: 35px
        color: #1a73e8
        border-radius: 4px
        background-color: #fff
        border: 1px solid #dadce0
        padding: 5px
        margin-right: 10px
        width: calc(100% - 85px - 10px)

        &:focus
          outline: none
          border: 1px solid rgba(#1a73e8, .4)

        ::-webkit-input-placeholder
        font-size: 12px

        ::-moz-placeholder
          font-size: 12px

        :-ms-input-placeholder
          font-size: 12px

        ::placeholder
          font-size: 12px

      .poi__save
        float: right
        padding-left: 10px
        padding-right: 10px
        font-size: 13px

    .gmap__view
      height: calc(60vh)

    @media (min-width: 960px)
      .gmap__view
        height: calc(100vh - 100px)

</style>
