<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { eliminarEquipo, obtenerEquipos } from '../services/equiposService'

const equipos = ref([])
const cargando = ref(true)
const error = ref('')
const mensaje = ref('')
const busqueda = ref('')
const filtroEstado = ref('')

const equiposFiltrados = computed(() => {
  const texto = busqueda.value.trim().toLowerCase()

  return equipos.value.filter((e) => {
    const coincideTexto =
      !texto ||
      [e.nombre, e.codigoInventario, e.tipo, e.ubicacion, e.estado].some((campo) =>
        campo.toLowerCase().includes(texto),
      )
    const coincideEstado = !filtroEstado.value || e.estado === filtroEstado.value
    return coincideTexto && coincideEstado
  })
})

async function cargar() {
  try {
    cargando.value = true
    error.value = ''
    equipos.value = await obtenerEquipos()
  } catch (e) {
    error.value = e.message
  } finally {
    cargando.value = false
  }
}

async function borrar(equipo) {
  if (!confirm(`¿Eliminar el equipo "${equipo.nombre}" (${equipo.codigoInventario})?`)) return

  try {
    mensaje.value = ''
    await eliminarEquipo(equipo.id)
    mensaje.value = 'Equipo eliminado correctamente'
    await cargar()
  } catch (e) {
    error.value = e.message
  }
}

onMounted(cargar)
</script>

<template>
  <main>
    <h2>Equipos registrados</h2>

    <div class="filtros">
      <input
        v-model="busqueda"
        placeholder="Buscar por nombre, código, tipo, ubicación o estado"
      />
      <select v-model="filtroEstado">
        <option value="">Todos los estados</option>
        <option>Disponible</option>
        <option>En uso</option>
        <option>Mantención</option>
        <option>Baja</option>
      </select>
    </div>

    <p v-if="mensaje" class="exito">{{ mensaje }}</p>
    <p v-if="cargando" class="cargando">Cargando equipos...</p>
    <p v-else-if="error" class="error">{{ error }}</p>

    <template v-else>
      <p>Mostrando {{ equiposFiltrados.length }} de {{ equipos.length }} equipos</p>
      <p v-if="equiposFiltrados.length === 0">No hay equipos que coincidan con la búsqueda.</p>

      <div v-else class="tabla-contenedor">
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Ubicación</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="equipo in equiposFiltrados" :key="equipo.id">
              <td>{{ equipo.codigoInventario }}</td>
              <td>{{ equipo.nombre }}</td>
              <td>{{ equipo.tipo }}</td>
              <td>{{ equipo.ubicacion }}</td>
              <td>{{ equipo.estado }}</td>
              <td class="acciones">
                <RouterLink class="boton" :to="`/equipos/${equipo.id}`">Ver / Editar</RouterLink>
                <button class="peligro" @click="borrar(equipo)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </main>
</template>