import Vue    from 'vue'
import Router from 'vue-router'

import ListItems  from './components/ListItems.vue'
import AddItems   from './components/AddItems.vue'
import Memory   from './components/Memory.vue'
import Bulk   from './components/Bulk.vue'

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
        },
        {
            path: '/memory',
            name: 'Memory',
            component: Memory
        },
        {
            path: '/bulk',
            name: 'Bulk',
            component: Bulk
        }
    ],
    linkActiveClass: "active",
})
