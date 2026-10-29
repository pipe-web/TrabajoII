const API = 'http://localhost:3000/equipos'

async function peticion(url, opciones = {}, mensajePorDefecto = 'Ocurrió un error') {
  let respuesta
  try {
    respuesta = await fetch(url, opciones)
  } catch {
    throw new Error(
      'No se pudo conectar con el servidor. Verifique que el backend esté en ejecución.',
    )
  }

  if (!respuesta.ok) {
    let mensaje = mensajePorDefecto
    try {
      const error = await respuesta.json()
      if (error.message) {
        mensaje = Array.isArray(error.message)
          ? error.message.join('. ')
          : error.message
      }
    } catch {
      // la respuesta no traía JSON; se usa el mensaje por defecto
    }
    throw new Error(mensaje)
  }

  return respuesta.json()
}

export function obtenerEquipos() {
  return peticion(API, {}, 'No fue posible obtener los equipos')
}

export function obtenerEquipo(id) {
  return peticion(`${API}/${id}`, {}, 'Equipo no encontrado')
}

export function crearEquipo(datos) {
  return peticion(
    API,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    },
    'Error al registrar el equipo',
  )
}

export function actualizarEquipo(id, datos) {
  return peticion(
    `${API}/${id}`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    },
    'Error al actualizar el equipo',
  )
}

export function eliminarEquipo(id) {
  return peticion(`${API}/${id}`, { method: 'DELETE' }, 'Error al eliminar el equipo')
}