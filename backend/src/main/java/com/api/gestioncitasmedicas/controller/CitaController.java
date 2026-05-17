package com.api.gestioncitasmedicas.controller;

import com.api.gestioncitasmedicas.dto.ActualizarCitaDTO;
import com.api.gestioncitasmedicas.dto.CambiarEstadoCitaDTO;
import com.api.gestioncitasmedicas.dto.CitaDTO;
import com.api.gestioncitasmedicas.dto.CrearCitaDTO;
import com.api.gestioncitasmedicas.service.CitaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "6. Citas", description = "Operaciones para la gestión de citas médicas.")
@RestController
@RequestMapping("/api/citas")
@RequiredArgsConstructor
public class CitaController {

    private final CitaService citaService;

    // GET /api/citas - Listar todas las citas
    // GET /api/citas?medico=1 - Filtrar por médico
    // GET /api/citas?paciente=1 - Filtrar por paciente
    // GET /api/citas?estado=PENDIENTE - Filtrar por estado
    @Operation(
            summary = "Listar o filtrar citas",
            description = "Retorna todas las citas. Se puede filtrar por médico, paciente o estado usando parámetros opcionales. Ejemplos: /api/citas?medico=1 | /api/citas?paciente=1 | /api/citas?estado=PENDIENTE"
    )
    @GetMapping
    public ResponseEntity<List<CitaDTO>> listarOFiltrar(
            @RequestParam(required = false) Long medico,
            @RequestParam(required = false) Long paciente,
            @RequestParam(required = false) String estado) {

        List<CitaDTO> citas = citaService.filtrar(medico, paciente, estado);
        return ResponseEntity.ok(citas);
    }

    // GET /api/citas/{id} - Obtener una cita por ID
    @Operation(
            summary = "Obtener cita por ID",
            description = "Busca y retorna una cita específica según su ID. Si no existe, retorna 404."
    )
    @GetMapping("/{id}")
    public ResponseEntity<CitaDTO> obtenerPorId(@PathVariable Long id) {
        CitaDTO cita = citaService.obtenerPorId(id);
        return ResponseEntity.ok(cita);
    }

    // POST /api/citas - Crear nueva cita (con todas las validaciones)
    @Operation(
            summary = "Crear nueva cita",
            description = "Registra una nueva cita aplicando todas las validaciones: el médico debe tener la especialidad indicada, la fecha debe ser día hábil (lunes a viernes) y el horario debe ser uno de los slots válidos: 8:00, 9:00, 10:00, 11:00, 13:00, 14:00, 15:00 o 16:00."
    )
    @PostMapping
    public ResponseEntity<CitaDTO> crear(@Valid @RequestBody CrearCitaDTO dto) {
        CitaDTO nuevaCita = citaService.crear(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevaCita);
    }

    // PUT /api/citas/{id} - Actualizar cita
    @Operation(
            summary = "Actualizar cita",
            description = "Actualiza los datos de una cita existente según su ID."
    )
    @PutMapping("/{id}")
    public ResponseEntity<CitaDTO> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody ActualizarCitaDTO dto) {
        CitaDTO citaActualizada = citaService.actualizar(id, dto);
        return ResponseEntity.ok(citaActualizada);
    }

    // PATCH /api/citas/{id}/estado - Cambiar solo el estado de la cita
    @Operation(
            summary = "Cambiar estado de la cita",
            description = "Modifica únicamente el estado de una cita siguiendo el flujo permitido: PENDIENTE → CONFIRMADA o CANCELADA | CONFIRMADA → COMPLETADA o CANCELADA. No se puede modificar una cita COMPLETADA o CANCELADA."
    )
    @PatchMapping("/{id}/estado")
    public ResponseEntity<CitaDTO> cambiarEstado(
            @PathVariable Long id,
            @Valid @RequestBody CambiarEstadoCitaDTO dto) {
        CitaDTO citaActualizada = citaService.cambiarEstado(id, dto.getNuevoEstado());
        return ResponseEntity.ok(citaActualizada);
    }

    // DELETE /api/citas/{id} - Eliminar cita
    @Operation(
            summary = "Eliminar cita",
            description = "Elimina una cita del sistema. Solo se pueden eliminar citas en estado PENDIENTE o CANCELADA. No se permite eliminar citas COMPLETADAS."
    )
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        citaService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}