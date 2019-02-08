export default {
    data () {
        return {
            menuItems: [
                {
                    name: 'Places to visit',
                    path: '/',
                    icon: 'fa fa-map-marker-alt',
                    isExact: true
                },
                {
                    name: 'Item1',
                    path: '/Item1',
                    icon: 'fa fa-th-large',
                    isExact: false
                },
                {
                    name: 'Item2',
                    path: '/Item2',
                    icon: 'fa fa-flask',
                    isExact: false
                },
            ]
        }
    }
}