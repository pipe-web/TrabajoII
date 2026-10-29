import { createRouter, createWebHistory } from 'vue-router'
import EquiposView from '../views/EquiposView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/equipos' },
    { path: '/equipos', name: 'equipos', component: EquiposView },
    {
      path: '/equipos/nuevo',
      name: 'nuevo-equipo',
      component: () => import('../views/NuevoEquipoView.vue'),
    },
    {
      path: '/equipos/:id',
      name: 'detalle-equipo',
      component: () => import('../views/EquipoDetalleView.vue'),
    },
  ],
})

export default router