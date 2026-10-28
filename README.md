 Sistema de Inventario de Equipamiento Tecnológico

Aplicación web cliente-servidor para registrar y administrar el equipamiento tecnológico de una institución. Permite listar, buscar, registrar, consultar, editar y eliminar equipos, con persistencia en MySQL.

**Estudiante:** Felipe Jara
**Asignatura:** Lenguaje de Programación Web II
**Evaluación:** 2

## Tecnologías utilizadas

- **Frontend:** Vue 3, Vite, Vue Router, fetch()
- **Backend:** NestJS, TypeORM, class-validator, class-transformer, @nestjs/config
- **Base de datos:** MySQL 8.0

## Arquitectura

```
Vue.js (localhost:5173)
   | fetch() · HTTP · JSON
NestJS REST API (localhost:3000)
   | Controller -> Service -> TypeORM Repository
MySQL (inventario_tecnologico)
```

## Requisitos de instalación

- Node.js (versión LTS) y npm
- MySQL Server 8.0
- Git

## 1. Crear la base de datos MySQL

```sql
CREATE DATABASE inventario_tecnologico
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
```

La tabla `equipos` se crea automáticamente al iniciar el backend, porque TypeORM está configurado con `synchronize: true` (uso formativo; en producción se recomiendan migraciones).

### Datos de prueba (opcional, después de iniciar el backend una vez)

```sql
USE inventario_tecnologico;
INSERT INTO equipos (codigoInventario, nombre, tipo, marca, modelo, ubicacion, estado, fechaAdquisicion, observaciones) VALUES
('INV-001', 'Notebook docente', 'Notebook', 'Lenovo', 'ThinkPad E14', 'Sala 101', 'En uso', '2024-03-15', 'Asignado a docente de informática'),
('INV-002', 'PC laboratorio 1', 'PC', 'HP', 'ProDesk 400 G7', 'Laboratorio A', 'Disponible', '2023-08-10', NULL),
('INV-003', 'Monitor recepción', 'Monitor', 'Samsung', 'S24F350', 'Recepción', 'Disponible', '2022-11-05', NULL),
('INV-004', 'Proyector auditorio', 'Proyector', 'Epson', 'PowerLite X49', 'Auditorio', 'Mantención', '2021-05-20', 'Lámpara con falla'),
('INV-005', 'Impresora secretaría', 'Impresora', 'Brother', 'HL-L2350DW', 'Secretaría', 'Baja', '2019-02-12', 'Dada de baja por obsolescencia');
```

## 2. Variables de entorno

Copiar `backend/.env.example` como `backend/.env` y completar la contraseña de MySQL:


| DB_HOST | Servidor MySQL | localhost |
| DB_PORT | Puerto MySQL | 3306 |
| DB_USER | Usuario MySQL | root |
| DB_PASSWORD | Contraseña MySQL | CAMBIAR |
| DB_NAME | Nombre de la base | inventario_tecnologico |
| PORT | Puerto de la API | 3000 |

El archivo `.env` no se publica en el repositorio (está en `.gitignore`).

## 3. Ejecutar el backend

```bash
cd backend
npm install
npm run start:dev
```

API disponible en `http://localhost:3000`.

## 4. Ejecutar el frontend

```bash
cd frontend
npm install
npm run dev
```

Aplicación disponible en `http://localhost:5173`.

## Endpoints de la API

| Método | Endpoint | Función |
|---|---|---|
| GET | /equipos | Listar todos los equipos |
| GET | /equipos/:id | Obtener un equipo por ID (404 si no existe) |
| POST | /equipos | Registrar un equipo |
| PATCH | /equipos/:id | Actualizar un equipo |
| DELETE | /equipos/:id | Eliminar un equipo |


## Validaciones implementadas

- `codigoInventario` y `nombre`: obligatorios, mínimo 3 caracteres.
- `tipo`, `marca`, `modelo`, `ubicacion`: obligatorios.
- `estado`: solo Disponible, En uso, Mantención o Baja.
- `fechaAdquisicion`: fecha válida en formato AAAA-MM-DD.
- `observaciones`: opcional.
- `codigoInventario` es único; si se repite, la API responde 409.
- `ValidationPipe` con `whitelist` y `forbidNonWhitelisted`: los campos no declarados en el DTO se rechazan con 400.
- El frontend solicita confirmación antes de eliminar.

## Estructura del proyecto

```
inventario-tecnologico/
├── backend/
│   ├── src/
│   │   ├── equipos/
│   │   │   ├── dto/ (create-equipo.dto.ts, update-equipo.dto.ts)
│   │   │   ├── entities/equipo.entity.ts
│   │   │   ├── equipos.controller.ts
│   │   │   ├── equipos.module.ts
│   │   │   └── equipos.service.ts
│   │   ├── app.module.ts   (conexión TypeORM + MySQL)
│   │   └── main.ts         (CORS y ValidationPipe)
│   └── .env.example
└── frontend/
    └── src/
        ├── components/EquipoForm.vue   (formulario reutilizable crear/editar)
        ├── services/equiposService.js  (llamadas fetch a la API)
        ├── router/index.js
        ├── views/ (EquiposView, NuevoEquipoView, EquipoDetalleView)
        └── App.vue
```

## Pruebas realizadas

/ N.º / Prueba / Resultado esperado 
------------------
 1  Iniciar NestJS / Conecta a MySQL sin errores 
 2  DESCRIBE equipos / Tabla creada por TypeORM 
 3  GET /equipos / Devuelve los registros 
 4  GET /equipos/999 / Responde 404 
 5  Crear equipo desde Vue / Aparece en el listado y en MySQL 
 6  Crear con código repetido / Muestra mensaje de la API 
 7  Editar equipo desde Vue / El cambio persiste 
 8  Eliminar desde Vue / Pide confirmación y elimina  9  Buscar y filtrar por estado / Filtra correctamente 
 10  Reiniciar NestJS / Los datos permanecen 
 11  Backend detenido / Vue muestra mensaje de error de conexión |

## Declaración de uso de Inteligencia Artificial

- Herramienta utilizada: Claude
- Partes del proyecto: readme.md y en algunos errores al conectar la base de datos o por el estilo 
- Tipo de apoyo: explicación,depuración y documentación.
