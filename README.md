# Sistema de Gestión de Citas Médicas — Healify

Sistema web integral basado en arquitectura Cliente-Servidor desacoplada para la gestión de citas médicas entre pacientes y profesionales de la salud.

El proyecto está compuesto por:

- Backend desarrollado con Spring Boot 3.x, siguiendo una arquitectura en capas (Controller – Service – Repository)
- API RESTful documentada con Swagger / OpenAPI y estructurada bajo buenas prácticas
- Persistencia de datos con PostgreSQL utilizando JPA / Hibernate
- Frontend SPA desarrollado con React para una experiencia moderna y dinámica
- Infraestructura contenerizada mediante Docker y Docker Compose para despliegue full-stack

---

## Equipo de Desarrollo

| Nombre | Carnet |
|--------|--------|
| Jason Alexander Molina Ortiz | MO21016 |
| Rodrigo Ernesto Garcia Portillo | GP24005 |
| Hugo Fernando Canizales Andrade | CA18052 |
| Marlon Alexis Núñez Ramos | NR24002 |
| Cindy Ariana Reyes Molina | RM24001 |

---

## Problemática que resuelve

En El Salvador, muchas clínicas privadas, consultorios médicos y centros de salud aún gestionan sus citas mediante agendas físicas, hojas de cálculo o sistemas no integrados.

Esto provoca problemas como:

- Doble reservación de horarios
- Falta de control sobre disponibilidad real de los médicos
- Pérdida de información histórica de pacientes
- Desorganización en especialidades médicas
- Procesos manuales propensos a errores

El Sistema de Gestión de Citas Médicas permite:

- Administrar médicos y sus especialidades
- Registrar pacientes y mantener historial organizado
- Controlar disponibilidad real con validaciones automáticas
- Evitar conflictos de horario mediante reglas de negocio
- Gestionar estados de cita con transiciones controladas
- Centralizar la información en una base de datos segura y estructurada

---

## Diagrama Entidad-Relación

![Diagrama ER](database/DiagramER/DER_image.png)

---

## Despliegue con Docker

> **Nota:** Los archivos `.env` han sido incluidos en el repositorio únicamente para facilitar la evaluación académica. En un entorno de producción estos archivos deben excluirse del control de versiones (como se venía trabajando anteriormente).

### Requisitos previos

Tener instalado:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (incluye Docker y Docker Compose)

No se necesita instalar Java, Maven, Node.js ni PostgreSQL de forma local. Docker se encarga de todo.

### Levantar el sistema completo con un solo comando

Desde la raíz del proyecto (donde está el archivo `docker-compose.yml`):

```bash
docker compose up --build
```

Este comando realiza automáticamente lo siguiente:

1. Construye la imagen del backend (compila el JAR con Maven dentro del contenedor)
2. Construye la imagen del frontend (genera el build de React con Vite y lo sirve con Nginx)
3. Descarga la imagen oficial de PostgreSQL
4. Levanta la base de datos y ejecuta `schema.sql` y `data.sql` automáticamente
5. Levanta el backend conectado a la base de datos
6. Levanta el frontend conectado al backend

### Verificar que el sistema está corriendo

Una vez que los logs muestren `Started GestioncitasmedicasApplication`, el sistema está listo. Abrir en el navegador:

| Servicio | URL |
|----------|-----|
| Frontend (aplicación) | http://localhost |
| Swagger (documentación API) | http://localhost:8080/swagger-ui/index.html |
| Health check | http://localhost:8080/api/health |

### Otros comandos útiles

```bash
# Levantar en segundo plano (sin ver los logs)
docker compose up --build -d

# Ver logs de un servicio específico
docker compose logs backend
docker compose logs frontend
docker compose logs db

# Detener el sistema (conserva los datos de la base de datos)
docker compose down

# Detener el sistema y eliminar los datos de la base de datos (reset completo)
docker compose down -v
```

---

## Arquitectura del sistema en Docker

```
docker compose up --build
         │
         ├─► Construye imagen backend  (Maven compila el JAR → JRE Alpine)
         ├─► Construye imagen frontend (Vite build → Nginx Alpine)
         ├─► Descarga imagen PostgreSQL 16
         │
         ├─► Levanta DB → ejecuta schema.sql + data.sql → healthcheck OK
         ├─► Levanta Backend → conecta a DB → Spring Boot inicia en :8080
         └─► Levanta Frontend → Nginx sirve React en :80, proxy /api/* → backend
```

---

## Endpoints de la API

Base URL: `http://localhost:8080/api`

### Health Check

| Método | Endpoint | Descripción | Respuesta |
|--------|----------|-------------|-----------|
| GET | `/info` | Información general de la API | 200 OK |

### Especialidades

| Método | Endpoint | Descripción | Respuesta |
|--------|----------|-------------|-----------|
| GET | `/especialidades` | Listar todas las especialidades | 200 OK |
| GET | `/especialidades/{id}` | Obtener especialidad por ID | 200 OK / 404 |
| POST | `/especialidades` | Crear nueva especialidad | 201 Created / 400 / 409 |
| PUT | `/especialidades/{id}` | Actualizar especialidad | 200 OK / 400 / 404 |
| DELETE | `/especialidades/{id}` | Eliminar especialidad | 204 / 400 / 404 |

### Médicos

| Método | Endpoint | Descripción | Respuesta |
|--------|----------|-------------|-----------|
| GET | `/medicos` | Listar todos los médicos | 200 OK |
| GET | `/medicos/{id}` | Obtener médico por ID | 200 OK / 404 |
| POST | `/medicos` | Crear nuevo médico | 201 Created / 400 / 409 |
| PUT | `/medicos/{id}` | Actualizar médico | 200 OK / 400 / 404 |
| DELETE | `/medicos/{id}` | Eliminar médico (sin citas) | 204 / 400 / 409 |

### Médico-Especialidad

| Método | Endpoint | Descripción | Respuesta |
|--------|----------|-------------|-----------|
| GET | `/medico-especialidad` | Listar todas las asignaciones | 200 OK |
| GET | `/medico-especialidad/{id}` | Obtener asignación por ID | 200 OK / 404 |
| POST | `/medico-especialidad` | Asignar especialidad a médico | 201 Created / 400 / 409 |
| DELETE | `/medico-especialidad/{id}` | Eliminar asignación | 204 / 404 |

### Pacientes

| Método | Endpoint | Descripción | Respuesta |
|--------|----------|-------------|-----------|
| GET | `/pacientes` | Listar todos los pacientes | 200 OK |
| GET | `/pacientes/{id}` | Obtener paciente por ID | 200 OK / 404 |
| POST | `/pacientes` | Crear nuevo paciente | 201 Created / 400 / 409 |
| PUT | `/pacientes/{id}` | Actualizar paciente | 200 OK / 400 / 404 |
| DELETE | `/pacientes/{id}` | Eliminar paciente (sin citas) | 204 / 400 / 409 |

### Citas

| Método | Endpoint | Descripción | Respuesta |
|--------|----------|-------------|-----------|
| GET | `/citas` | Listar todas las citas | 200 OK |
| GET | `/citas/{id}` | Obtener cita por ID | 200 OK / 404 |
| POST | `/citas` | Crear nueva cita | 201 Created / 400 / 409 |
| PUT | `/citas/{id}` | Actualizar cita | 200 OK / 400 / 404 |
| PATCH | `/citas/{id}/estado` | Cambiar estado de cita | 200 OK / 400 / 404 |
| DELETE | `/citas/{id}` | Eliminar cita (solo PENDIENTE) | 204 / 400 / 409 |

---

## Validaciones de Negocio

### Validaciones al crear o actualizar una cita

El sistema aplica 7 validaciones críticas en orden antes de registrar una cita:

| # | Validación | Error si falla |
|---|-----------|----------------|
| 1 | El paciente existe en el sistema | 404 Not Found |
| 2 | El médico existe en el sistema | 404 Not Found |
| 3 | La especialidad existe en el sistema | 404 Not Found |
| 4 | El médico tiene asignada esa especialidad | 400 Bad Request |
| 5 | La fecha corresponde a un día hábil (lunes a viernes) | 400 Bad Request |
| 6 | La hora pertenece a un slot permitido | 400 Bad Request |
| 7 | El médico no tiene otra cita en esa fecha y hora | 409 Conflict |

### Horarios de atención

Las citas solo pueden agendarse en los siguientes slots horarios:

```
08:00 — 09:00 — 10:00 — 11:00 — 13:00 — 14:00 — 15:00 — 16:00
```

> La hora de almuerzo (12:00 – 13:00) no está disponible.
> Solo se atiende de lunes a viernes. Fines de semana no permitidos.

### Estados y transiciones de una cita

```
PENDIENTE ──► CONFIRMADA ──► COMPLETADA
    │               │
    └──► CANCELADA ◄┘
```

| Transición | Permitida |
|-----------|-----------|
| PENDIENTE → CONFIRMADA | ✅ |
| PENDIENTE → CANCELADA | ✅ |
| CONFIRMADA → COMPLETADA | ✅ |
| CONFIRMADA → CANCELADA | ✅ |
| COMPLETADA → cualquier estado | ❌ |
| CANCELADA → cualquier estado | ❌ |

> Las citas en estado `COMPLETADA` o `CANCELADA` no pueden modificarse ni eliminarse. Solo se pueden eliminar citas en estado `PENDIENTE`.

---

## Evidencias de Funcionamiento

### Swagger UI

![Swagger](docs/evidencias/swagger-1.png)
![Swagger](docs/evidencias/swagger-2.png)
![Swagger](docs/evidencias/swagger-3.png)
![Swagger](docs/evidencias/swagger-4.png)
![Swagger](docs/evidencias/swagger-5.png)

### Vistas del Frontend

![Vista](docs/evidencias/frontend-1.png)
![Vista](docs/evidencias/frontend-2.png)
![Vista](docs/evidencias/frontend-3.png)
![Vista](docs/evidencias/frontend-4.png)
![Vista](docs/evidencias/frontend-5.png)
![Vista](docs/evidencias/frontend-6.png)
![Vista](docs/evidencias/frontend-7.png)
![Vista](docs/evidencias/frontend-8.png)
![Vista](docs/evidencias/frontend-9.png)
![Vista](docs/evidencias/frontend-10.png)
![Vista](docs/evidencias/frontend-11.png)
![Vista](docs/evidencias/frontend-12.png)
![Vista](docs/evidencias/frontend-13.png)
![Vista](docs/evidencias/frontend-14.png)
![Vista](docs/evidencias/frontend-15.png)
![Vista](docs/evidencias/frontend-16.png)
![Vista](docs/evidencias/frontend-17.png)
![Vista](docs/evidencias/frontend-18.png)
![Vista](docs/evidencias/frontend-19.png)
![Vista](docs/evidencias/frontend-20.png)
![Vista](docs/evidencias/frontend-21.png)
![Vista](docs/evidencias/frontend-22.png)
![Vista](docs/evidencias/frontend-23.png)
![Vista](docs/evidencias/frontend-24.png)
![Vista](docs/evidencias/frontend-43.png)
![Vista](docs/evidencias/frontend-42.png)
![Vista](docs/evidencias/frontend-41.png)
![Vista](docs/evidencias/frontend-40.png)
![Vista](docs/evidencias/frontend-39.png)
![Vista](docs/evidencias/frontend-38.png)
![Vista](docs/evidencias/frontend-37.png)
![Vista](docs/evidencias/frontend-36.png)
![Vista](docs/evidencias/frontend-35.png)
![Vista](docs/evidencias/frontend-34.png)
![Vista](docs/evidencias/frontend-33.png)
![Vista](docs/evidencias/frontend-32.png)
![Vista](docs/evidencias/frontend-31.png)
![Vista](docs/evidencias/frontend-30.png)
![Vista](docs/evidencias/frontend-29.png)
![Vista](docs/evidencias/frontend-28.png)
![Vista](docs/evidencias/frontend-27.png)
![Vista](docs/evidencias/frontend-26.png)
![Vista](docs/evidencias/frontend-25.png)

---

## Arquitectura y Enfoque del Desarrollo

El sistema ha sido diseñado bajo una arquitectura en capas (N-Capas), promoviendo el desacoplamiento, la mantenibilidad y la escalabilidad del backend.

Se implementan las siguientes capas:

- **Controller** → Exposición de endpoints REST
- **Service** → Lógica de negocio y manejo de reglas
- **Repository** → Acceso a datos mediante JPA
- **DTO** → Transferencia de datos entre cliente y servidor
- **Entity** → Representación de las tablas en base de datos

---

## Documentación de la API

La API REST está documentada mediante Swagger / OpenAPI, accesible en tiempo de ejecución desde:

```
http://localhost:8080/swagger-ui/index.html
```

Se incluye también una colección de Postman en la carpeta `docs/` con pruebas cubiertas para todos los módulos, incluyendo casos de éxito y validaciones de negocio.

Para importarla, abrir Postman e ir a **File → Import** y seleccionar:

```
docs/Gestión Citas Médicas API.postman_collection.json
```

---

## Estructura del Proyecto

```
sistema-gestion-citas-medicas/
│
├── backend/
│   ├── Dockerfile
│   └── src/main/java/com/api/gestioncitasmedicas/
│       ├── config/        → Configuraciones (Swagger, CORS)
│       ├── controller/    → Controladores REST
│       ├── dto/           → Objetos de transferencia de datos
│       ├── entity/        → Entidades JPA
│       ├── exception/     → Manejo global de excepciones
│       ├── repository/    → Acceso a datos
│       └── service/       → Lógica de negocio
│
├── database/
│   ├── create_db/         → schema.sql y data.sql
│   └── DiagramER/         → Diagrama entidad-relación
│
├── docs/
│   ├── evidencias/        → Capturas de pantalla
│   └── Gestión Citas Médicas API.postman_collection.json
│
├── frontend/
│   ├── Dockerfile
│   ├── nginx.conf
│   └── src/
│       ├── components/    → Componentes por módulo
│       ├── hooks/         → Hooks personalizados
│       ├── pages/         → Páginas por ruta
│       ├── services/      → Comunicación con la API
│       └── App.jsx        → Configuración de rutas
│
├── docker-compose.yml
├── .env
├── .env.example
└── README.md
```