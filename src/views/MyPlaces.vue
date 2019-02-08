<template>
  <v-layout class="page-container" row wrap justify-space-between>
    <v-flex xs12 md7 lg8>
      <app-gmap :map-options="placeData"/>
    </v-flex>
  </v-layout>
</template>

<script>
  import GoogleMap from '@/components/plugins/GoogleMap'

  export default {
    components: {
      'app-gmap': GoogleMap,
    },
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
      }
    }
  }
</script>
