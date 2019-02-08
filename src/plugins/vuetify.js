import Vue from 'vue'
import Vuetify, {
  VApp, // required
  VAlert,
  VAutocomplete,
  VBtn,
  VCard,
  VGrid,
  VDialog,
  VDivider,
  VFlex,
  VHover,
  VIcon,
  VInput,
  VList,
  VNavigationDrawer,
  VResponsive,
  VSpacer,
  VToolbar,
  VTooltip,
  VFadeTransition
} from 'vuetify/lib'
import { Ripple } from 'vuetify/lib/directives'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  theme: {
    primary: '#3f51b5',
    secondary: '#1e88e5',
    accent: '#e91e63',
    error: '#f44336',
    info: '#03a9f4',
    success: '#4caf50',
    warning: '#ff9800'
  },
  iconfont: 'fa',
  components: {
    VApp, // required
    VAlert,
    VAutocomplete,
    VBtn,
    VCard,
    VGrid,
    VDialog,
    VDivider,
    VFlex,
    VHover,
    VIcon,
    VInput,
    VList,
    VNavigationDrawer,
    VResponsive,
    VSpacer,
    VToolbar,
    VTooltip,
    VFadeTransition
  },
  directives: {
    Ripple
  }
})
