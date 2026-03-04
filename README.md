# Sistema de Gestión de Citas Médicas

Sistema web integral basado en arquitectura Cliente-Servidor desacoplada para la gestión de citas médicas entre pacientes y profesionales de la salud

El proyecto está compuesto por:

- Backend desarrollado con Spring Boot 3.x, siguiendo una arquitectura en capas (Controller – Service – Repository)
- API RESTful documentada y estructurada bajo buenas prácticas
- Persistencia de datos con PostgreSQL utilizando JPA / Hibernate
- Frontend SPA desarrollado con React y TypeScript para una experiencia moderna y dinámica
- Seguridad basada en JWT para autenticación y control de acceso
- Infraestructura contenerizada mediante Docker y Docker Compose para despliegue full-stack

El sistema implementa validaciones de negocio complejas, manejo profesional de relaciones entre entidades (1:1, 1:N y N:M) y separación clara de responsabilidades, alineándose con las tendencias modernas de desarrollo de aplicaciones web empresariales.

## Problemática que resuelve

En El Salvador, muchas clínicas privadas, consultorios médicos y centros de salud aún gestionan sus citas mediante agendas físicas, hojas de cálculo o sistemas no integrados

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

Este sistema puede ser implementado en clínicas pequeñas y medianas en El Salvador, contribuyendo a la modernización digital del sector salud y mejorando la experiencia tanto del personal médico como de los pacientes

## Estructura del Proyecto

- /backend → API REST con Spring Boot
- /frontend → SPA con React + TypeScript
- /database → Scripts SQL y documentación del modelo relacional

## Equipo de Desarrollo

| Nombre | Carnet |
|--------|--------|
| Jason Alexander Molina Ortiz | MO21016 |