import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },{
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },{
    path: '/shop',
    name: 'Shop',
    component: () => import('../views/Shop.vue')
  },{                                                             // Member Folder
    path: '/join',
    name: 'Join',
    component: () => import('../views/member/Join.vue')
  },{
    path: '/praesidium/:id?',
    name: 'Praesidium',
    component: () => import('../views/member/Praesidium.vue'),
    props: true
  },{
    path: '/history',
    name: 'History',
    component: () => import('../views/member/History.vue')
  },{                                                             // Event Folder
    path: '/events/:id',
    name: 'EventDetail',
    component: () => import('../views/event/EventDetails.vue'),
    props: true
  },{
    path: '/events',
    name: 'Events',
    component: () => import('../views/event/Events.vue'),
    props: true
  },{                                                             // Partner Folder
    path: '/partners/:id',
    name: 'PartnerDetail',
    component: () => import('../views/partner/PartnerDetails.vue')
  },{
    path: '/jobs/:id',
    name: 'JobDetail',
    component: () => import('../views/partner/JobDetails.vue'),
    props: true
  },{
    path: '/jobs',
    name: 'Jobs',
    component: () => import('../views/partner/Jobs.vue')
  },{
    path: '/partners',
    name: 'Partners',
    component: () => import('../views/partner/Partners.vue')
  },{                                                             // Catchall 404
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
