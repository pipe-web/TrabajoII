<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import EquipoForm from '../components/EquipoForm.vue'
import {
  actualizarEquipo,
  eliminarEquipo,
  obtenerEquipo,
} from '../services/equiposService'

const route = useRoute()
const router = useRouter()

const equipo = ref(null)
const cargando = ref(true)
const errorCarga = ref('')
const error = ref('')
const mensaje = ref('')
const editando = ref(false)
const guardando = ref(false)

async function cargar() {
  try {
    cargando.value = true
    errorCarga.value = ''
    equipo.value = await obtenerEquipo(route.params.id)
  } catch (e) {
    errorCarga.value = e.message
  } finally {
    cargando.value = false
  }
}

async function guardarCambios(datos) {
  try {
    guardando.value = true
    error.value = ''
    mensaje.value = ''
    await actualizarEquipo(route.params.id, datos)
    editando.value = false
    mensaje.value = 'Cambios guardados correctamente'
    await cargar()
  } catch (e) {
    error.value = e.message
  } finally {
    guardando.value = false
  }
}

async function borrar() {
  if (!confirm(`¿Eliminar el equipo "${equipo.value.nombre}"?`)) return

  try {
    await eliminarEquipo(equipo.value.id)
    router.push('/equipos')
  } catch (e) {
    error.value = e.message
  }
}

onMounted(cargar)
</script>

<template>
  <main>
    <RouterLink to="/equipos">← Volver al listado</RouterLink>

    <p v-if="cargando" class="cargando">Cargando equipo...</p>
    <p v-else-if="errorCarga" class="error">{{ errorCarga }}</p>

    <div v-else-if="equipo" class="tarjeta">
      <template v-if="!editando">
        <h2>{{ equipo.nombre }}</h2>
        <dl class="detalle">
          <dt>ID</dt><dd>{{ equipo.id }}</dd>
          <dt>Código de inventario</dt><dd>{{ equipo.codigoInventario }}</dd>
          <dt>Tipo</dt><dd>{{ equipo.tipo }}</dd>
          <dt>Marca</dt><dd>{{ equipo.marca }}</dd>
          <dt>Modelo</dt><dd>{{ equipo.modelo }}</dd>
          <dt>Ubicación</dt><dd>{{ equipo.ubicacion }}</dd>
          <dt>Estado</dt><dd>{{ equipo.estado }}</dd>
          <dt>Fecha de adquisición</dt><dd>{{ equipo.fechaAdquisicion }}</dd>
          <dt>Observaciones</dt><dd>{{ equipo.observaciones || 'Sin observaciones' }}</dd>
        </dl>
        <div class="acciones">
          <button @click="editando = true">Editar</button>
          <button class="peligro" @click="borrar">Eliminar</button>
        </div>
      </template>

      <template v-else>
        <h2>Editar equipo</h2>
        <EquipoForm
          :inicial="equipo"
          :guardando="guardando"
          texto-boton="Guardar cambios"
          @guardar="guardarCambios"
          @cancelar="editando = false"
        />
      </template>

      <p v-if="mensaje" class="exito">{{ mensaje }}</p>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </main>
</template>