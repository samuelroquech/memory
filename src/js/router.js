import Vue    from 'vue'
import Router from 'vue-router'

import ListItems  from './components/ListItems.vue'
import AddItems   from './components/AddItems.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'ListItems',
            component: ListItems
        },
        {
            path: '/add',
            name: 'AddItems',
            component: AddItems
        }
    ],
    linkActiveClass: "active",
})
