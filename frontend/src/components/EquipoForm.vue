<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  inicial: { type: Object, default: null },
  guardando: { type: Boolean, default: false },
  textoBoton: { type: String, default: 'Guardar' },
})

const emit = defineEmits(['guardar', 'cancelar'])

const ESTADOS = ['Disponible', 'En uso', 'Mantención', 'Baja']
const TIPOS = ['Notebook', 'PC', 'Monitor', 'Proyector', 'Impresora', 'Otro']

const form = ref({
  codigoInventario: '',
  nombre: '',
  tipo: '',
  marca: '',
  modelo: '',
  ubicacion: '',
  estado: 'Disponible',
  fechaAdquisicion: '',
  observaciones: '',
})

// Si llega un equipo (modo edición), se copian solo los campos del DTO
watch(
  () => props.inicial,
  (equipo) => {
    if (!equipo) return
    form.value = {
      codigoInventario: equipo.codigoInventario,
      nombre: equipo.nombre,
      tipo: equipo.tipo,
      marca: equipo.marca,
      modelo: equipo.modelo,
      ubicacion: equipo.ubicacion,
      estado: equipo.estado,
      fechaAdquisicion: String(equipo.fechaAdquisicion).slice(0, 10),
      observaciones: equipo.observaciones ?? '',
    }
  },
  { immediate: true },
)

function enviar() {
  const f = form.value
  emit('guardar', {
    codigoInventario: f.codigoInventario.trim(),
    nombre: f.nombre.trim(),
    tipo: f.tipo,
    marca: f.marca.trim(),
    modelo: f.modelo.trim(),
    ubicacion: f.ubicacion.trim(),
    estado: f.estado,
    fechaAdquisicion: f.fechaAdquisicion,
    observaciones: f.observaciones.trim(),
  })
}
</script>

<template>
  <form class="formulario" @submit.prevent="enviar">
    <label>Código de inventario *
      <input v-model="form.codigoInventario" required minlength="3" />
    </label>
    <label>Nombre *
      <input v-model="form.nombre" required minlength="3" />
    </label>
    <label>Tipo *
      <select v-model="form.tipo" required>
        <option value="" disabled>Seleccione...</option>
        <option v-for="t in TIPOS" :key="t">{{ t }}</option>
      </select>
    </label>
    <label>Marca *
      <input v-model="form.marca" required />
    </label>
    <label>Modelo *
      <input v-model="form.modelo" required />
    </label>
    <label>Ubicación *
      <input v-model="form.ubicacion" required />
    </label>
    <label>Estado *
      <select v-model="form.estado" required>
        <option v-for="e in ESTADOS" :key="e">{{ e }}</option>
      </select>
    </label>
    <label>Fecha de adquisición *
      <input v-model="form.fechaAdquisicion" type="date" required />
    </label>
    <label class="completo">Observaciones
      <textarea v-model="form.observaciones" rows="3"></textarea>
    </label>
    <div class="acciones completo">
      <button :disabled="guardando">
        {{ guardando ? 'Guardando...' : textoBoton }}
      </button>
      <button type="button" class="secundario" @click="emit('cancelar')">
        Cancelar
      </button>
    </div>
  </form>
</template>