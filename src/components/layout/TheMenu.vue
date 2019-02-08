<template>
  <div>
    <v-navigation-drawer v-model="isMenuVisible" clipped fixed app>
      <v-list dense v-for="item in menuItems" :key="item.name" ripple>
        <v-list-tile :to="item.path" :exact="item.isExact" active-class="primary--text font-weight-bold" ripple>
          <v-list-tile-action>
            <v-icon small>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app color="primary" dark dense clipped-left>
      <v-toolbar-side-icon @click.stop="isMenuVisible = !isMenuVisible" class="mr-3"/>

      <router-link to="/">
        <v-toolbar-title class="headline" dense height="60">
          <span class="white--text">
            <img alt="page logo" src="@/assets/logo.png" height="22" class="mr-2">MyPlaces
          </span>
        </v-toolbar-title>
      </router-link>

      <v-spacer></v-spacer>

      <span>{{ this.$store.getters.userName }}</span>
      <router-link to="/404">
        <v-btn flat fab small>
          <v-icon>fa fa-sign-out-alt</v-icon>
        </v-btn>
      </router-link>
    </v-toolbar>
  </div>
</template>

<script>
import MenuItems from '@/mixins/menu-items.js'

export default {
  data () {
    return {
      isMenuVisible: false
    }
  },
  mixins: [MenuItems]
}
</script>
