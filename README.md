# Sistema de Gestión de Citas Médicas

Sistema web integral basado en arquitectura Cliente-Servidor desacoplada para la gestión de citas médicas entre pacientes y profesionales de la salud

El proyecto está compuesto por:

* Backend desarrollado con Spring Boot 3.x, siguiendo una arquitectura en capas (Controller – Service – Repository)
* API RESTful documentada y estructurada bajo buenas prácticas
* Persistencia de datos con PostgreSQL utilizando JPA / Hibernate
* Frontend SPA desarrollado con React y TypeScript para una experiencia moderna y dinámica
* Seguridad basada en JWT para autenticación y control de acceso
* Infraestructura contenerizada mediante Docker y Docker Compose para despliegue full-stack

El sistema implementa validaciones de negocio complejas, manejo profesional de relaciones entre entidades (1:1, 1:N y N:M) y separación clara de responsabilidades, alineándose con las tendencias modernas de desarrollo de aplicaciones web empresariales.

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

En El Salvador, muchas clínicas privadas, consultorios médicos y centros de salud aún gestionan sus citas mediante agendas físicas, hojas de cálculo o sistemas no integrados

Esto provoca problemas como:
* Doble reservación de horarios
* Falta de control sobre disponibilidad real de los médicos
* Pérdida de información histórica de pacientes
* Desorganización en especialidades médicas
* Procesos manuales propensos a errores

El Sistema de Gestión de Citas Médicas permite:
* Administrar médicos y sus especialidades
* Registrar pacientes y mantener historial organizado
* Controlar disponibilidad real con validaciones automáticas
* Evitar conflictos de horario mediante reglas de negocio
* Gestionar estados de cita con transiciones controladas
* Centralizar la información en una base de datos segura y estructurada

Este sistema puede ser implementado en clínicas pequeñas y medianas en El Salvador, contribuyendo a la modernización digital del sector salud y mejorando la experiencia tanto del personal médico como de los pacientes

---

## Arquitectura y Enfoque del Desarrollo

El sistema ha sido diseñado bajo una **arquitectura en capas (N-Capas)**, promoviendo el desacoplamiento, la mantenibilidad y la escalabilidad del backend.

Se implementan las siguientes capas:

* **Controller** → Exposición de endpoints REST
* **Service** → Lógica de negocio y manejo de reglas
* **Repository** → Acceso a datos mediante JPA
* **DTO** → Transferencia de datos entre cliente y servidor
* **Entity** → Representación de las tablas en base de datos

Además, se realiza el **mapeo entre DTO y entidades**, evitando exponer directamente el modelo de datos interno.

---

## Desarrollo por Módulos

El sistema ha sido estructurado de forma modular para facilitar su desarrollo progresivo y organizado.

Los módulos definidos son:

* Especialidades
* Médicos
* EspecialidadMedico (relación N:M)
* Pacientes
* Citas

---

## Avance de la Entrega (Laboratorio 2)

Para esta fase del proyecto se ha completado:

* Diseño e implementación de la **base de datos en PostgreSQL**
* Creación del **script SQL (schema.sql)** con la estructura principal e inserción de datos de prueba
* Implementación de la arquitectura en capas en el backend
* Configuración de Swagger / OpenAPI para documentación de la API
* Desarrollo completo del módulo **Especialidades**, incluyendo:
    * Entidad (`@Entity`)
    * DTO
    * Repository (`JpaRepository`)
    * Service con lógica de negocio y mapeo DTO ↔ Entity
    * Controller con operaciones CRUD (GET, POST, PUT, DELETE)
* Validación de persistencia de datos mediante pruebas en Swagger y verificación en base de datos

El módulo **Especialidades** representa la base del sistema, ya que permite organizar la relación entre médicos y sus áreas de atención, siendo fundamental para el funcionamiento de los demás módulos

---

## Estructura del Proyecto

El proyecto está organizado de forma modular y siguiendo una arquitectura en capas para el backend:

    sistema-gestion-citas-medicas/
    │
    ├── backend/
    │   └── src/main/java/com/api/gestioncitasmedicas/
    │       ├── config/        → Configuraciones (Swagger, seguridad, etc.)
    │       ├── controller/    → Controladores REST (endpoints)
    │       ├── dto/           → Objetos de transferencia de datos (DTOs)
    │       ├── entity/        → Entidades JPA (modelos de base de datos)
    │       ├── exception/     → Manejo de excepciones globales
    │       ├── repository/    → Acceso a datos (JpaRepository)
    │       ├── service/       → Lógica de negocio
    │       └── GestioncitasmedicasApplication.java
    │
    │   └── src/main/resources/
    │       ├── static/
    │       ├── templates/
    │       └── application.properties
    │
    │   └── pom.xml
    │
    ├── database/
    │   ├── create_db/     → Scripts SQL de creación de la base de datos
    │   ├── DiagramER/     → Diagramas entidad-relación (DER)
    │
    ├── frontend/          → Aplicación SPA en React + TypeScript
    │
    ├── README.md
    └── .gitignore


### Descripción

- **backend/** → API REST desarrollada con Spring Boot
- **frontend/** → Aplicación cliente (SPA) con React
- **database/** → Scripts SQL y diagramas del modelo relacional

El backend sigue una arquitectura en capas clara, cumpliendo con los principios de separación de responsabilidades y facilitando la escalabilidad del sistema
