export default {
  methods: {
    adjustFaIcon (iconType) {
      switch (iconType) {
        case 'error':
          return 'fas fa-exclamation-triangle'
        case 'warning':
          return 'fas fa-exclamation'
        case 'success':
          return 'fas fa-check-circle'
        default:
          return 'fas fa-info-circle'
      }
    }
  }
}
