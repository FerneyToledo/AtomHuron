import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
  {
    path: '/ambiente',
    name: 'Ambiente',
    component: () => import(/* webpackChunkName: "about" */ '../views/Ambiente.vue')
  },
  {
    path: '/listaambiente',
    name: 'ListaAmbientes',
    component: () => import(/* webpackChunkName: "about" */ '../views/ListaAmbientes.vue')
  },
  {
    path: '/usuario',
    name: 'Usuarios',
    component: () => import(/* webpackChunkName: "about" */ '../views/Usuario.vue')
  },
  {
    path: '/listausuario',
    name: 'ListaUsuarios',
    component: () => import(/* webpackChunkName: "about" */ '../views/ListaUsuarios.vue')
  },
  {
    path: '/servidor',
    name: 'Servidor',
    component: () => import(/* webpackChunkName: "about" */ '../views/Servidor.vue')
  },
  {
    path: '/listaservidor',
    name: 'ListaServidores',
    component: () => import(/* webpackChunkName: "about" */ '../views/ListaServidores.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
