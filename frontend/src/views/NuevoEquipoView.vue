<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import EquipoForm from '../components/EquipoForm.vue'
import { crearEquipo } from '../services/equiposService'

const router = useRouter()
const error = ref('')
const guardando = ref(false)

async function guardar(datos) {
  try {
    guardando.value = true
    error.value = ''
    await crearEquipo(datos)
    router.push('/equipos')
  } catch (e) {
    error.value = e.message
  } finally {
    guardando.value = false
  }
}
</script>

<template>
  <main>
    <h2>Registrar nuevo equipo</h2>
    <div class="tarjeta">
      <EquipoForm
        :guardando="guardando"
        texto-boton="Registrar equipo"
        @guardar="guardar"
        @cancelar="router.push('/equipos')"
      />
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </main>
</template>