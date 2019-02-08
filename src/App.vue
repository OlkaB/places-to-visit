<template>
  <v-app>
    <app-menu />
    <v-content>
      <v-container fluid fill-height grid-list-xl>
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import TheMenu from '@/components/layout/TheMenu.vue'

export default {
  name: 'App',
  data () {
    return {
      drawer: false
    }
  },
  props: {
    source: String
  },
  components: {
    'app-menu': TheMenu
  }
}
</script>

<style>
.clearfix::after {
  content: "";
  clear: both;
  display: table;
}

.align-items-center {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.gray {
  background-color: #9f9f9f;
}

.gray--text {
  color: #9f9f9f;
}

::-webkit-scrollbar {
  width: 12px;
  height: 12px;
}

::-webkit-scrollbar-track {
  background-color: rgba(220,220,220,.8);
}

::-webkit-scrollbar-thumb {
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: #3f51b5;
}
</style>
