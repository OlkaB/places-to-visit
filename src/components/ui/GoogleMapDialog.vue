<template>
    <v-dialog v-model="dialogIsVisible" max-width="300">
        <v-card>
            <v-card-text>
                <v-icon large class="d-block mb-2 text-xs-center" :color="dialogType">{{ adjustFaIcon(dialogType) }}</v-icon>
                {{ dialogMessage }}
            </v-card-text>
            <v-divider />
            <v-card-actions>
                <v-spacer />
                <v-btn color="secondary" flat @click="dialogIsVisible = false">Ok</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { eventBus } from '@/main.js'
import adjustFaIcon from '@/mixins/fa-icons.js'

export default {
  mixins: [adjustFaIcon],
  props: {
    isVisible: {
      type: Boolean,
      required: false,
      default: false
    },
    message: {
      type: String,
      required: false,
      default: ''
    },
    type: {
      type: String,
      required: false,
      default: 'error'
    }
  },
  data () {
    return {
      dialogIsVisible: this.isVisible,
      dialogMessage: this.message,
      dialogType: this.type
    }
  },
  created () {
    if (eventBus) {
      eventBus.$on('toggleGMapDialog', dialogParams => {
        this.dialogIsVisible = dialogParams.isVisible
        this.dialogMessage = dialogParams.message
        this.dialogType = dialogParams.type
      })
    }
  },
  beforeDestroy () {
    if (eventBus) {
      eventBus.$off()
    }
  }
}
</script>
