<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="barra">
    <h1>Inventario de Equipamiento Tecnológico</h1>
    <nav>
      <RouterLink to="/equipos">Listado</RouterLink>
      <RouterLink to="/equipos/nuevo">Nuevo equipo</RouterLink>
    </nav>
  </header>
  <RouterView />
</template>

<style>
* { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, sans-serif; background: #f4f6f8; color: #222; }
.barra { background: #1e3a5f; color: #fff; padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
.barra h1 { margin: 0; font-size: 1.25rem; }
.barra nav a { color: #fff; margin-left: 16px; text-decoration: none; }
.barra nav a.router-link-exact-active { text-decoration: underline; }
main { max-width: 1100px; margin: 24px auto; padding: 0 16px; }
.tarjeta { background: #fff; border-radius: 8px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,.1); margin-top: 12px; }
.tabla-contenedor { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; background: #fff; }
th, td { padding: 8px 10px; border-bottom: 1px solid #ddd; text-align: left; }
th { background: #e9eef3; }
button, .boton { padding: 6px 12px; border: none; border-radius: 4px; cursor: pointer; background: #1e3a5f; color: #fff; text-decoration: none; font-size: .9rem; display: inline-block; }
button.peligro { background: #b42318; }
button.secundario { background: #6b7280; }
button:disabled { opacity: .6; cursor: default; }
input, select, textarea { width: 100%; padding: 8px; border: 1px solid #bbb; border-radius: 4px; font: inherit; font-weight: normal; }
.filtros { display: flex; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; }
.filtros input { flex: 2; min-width: 200px; }
.filtros select { flex: 1; min-width: 150px; }
.formulario { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px; }
.formulario label { display: flex; flex-direction: column; gap: 4px; font-weight: 600; font-size: .9rem; }
.completo { grid-column: 1 / -1; }
.detalle { display: grid; grid-template-columns: 180px 1fr; gap: 6px 12px; }
.detalle dt { font-weight: 600; }
.detalle dd { margin: 0; }
.acciones { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 12px; }
td.acciones { margin-top: 0; }
.error { background: #fde8e8; color: #9b1c1c; padding: 10px; border-radius: 4px; }
.exito { background: #e6f4ea; color: #1e6b34; padding: 10px; border-radius: 4px; }
.cargando { color: #555; font-style: italic; }
</style>