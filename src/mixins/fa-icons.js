export default {
    methods: {
        adjustFaIcon (iconType) {
            switch (iconType) {
              case 'error':
                return 'fas fa-exclamation-triangle';
                break;
              case 'warning':
                return 'fas fa-exclamation';
                break;
              case 'success':
                return 'fas fa-check-circle';
                break;
              default:
                return 'fas fa-info-circle';
                break;
            }
          }
    }
}