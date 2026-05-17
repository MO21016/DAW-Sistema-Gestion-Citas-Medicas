package com.api.gestioncitasmedicas.controller;

import com.api.gestioncitasmedicas.dto.ActualizarEspecialidadDTO;
import com.api.gestioncitasmedicas.dto.CrearEspecialidadDTO;
import com.api.gestioncitasmedicas.dto.EspecialidadDTO;
import com.api.gestioncitasmedicas.service.EspecialidadService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "2. Especialidades", description = "Operaciones para la gestión de especialidades médicas.")
@RestController
@RequestMapping("/api/especialidades")
@RequiredArgsConstructor
public class EspecialidadController {

    private final EspecialidadService especialidadService;

    // GET /api/especialidades - Listar todas
    @Operation(
            summary = "Listar todas las especialidades",
            description = "Retorna una lista con todas las especialidades médicas registradas en el sistema."
    )
    @GetMapping
    public ResponseEntity<List<EspecialidadDTO>> listarTodas() {
        List<EspecialidadDTO> especialidades = especialidadService.obtenerTodas();
        return ResponseEntity.ok(especialidades);
    }

    // GET /api/especialidades/{id} - Obtener una por ID
    @Operation(
            summary = "Obtener especialidad por ID",
            description = "Busca y retorna una especialidad específica según su ID. Si no existe, retorna 404."
    )
    @GetMapping("/{id}")
    public ResponseEntity<EspecialidadDTO> obtenerPorId(@PathVariable Long id) {
        EspecialidadDTO especialidad = especialidadService.obtenerPorId(id);
        return ResponseEntity.ok(especialidad);
    }

    // POST /api/especialidades - Crear nueva especialidad
    @Operation(
            summary = "Crear nueva especialidad",
            description = "Registra una nueva especialidad médica en el sistema."
    )
    @PostMapping
    public ResponseEntity<EspecialidadDTO> crear(@Valid @RequestBody CrearEspecialidadDTO dto) {
        EspecialidadDTO nuevaEspecialidad = especialidadService.crear(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevaEspecialidad);
    }

    // PUT /api/especialidades/{id} - Actualizar especialidad
    @Operation(
            summary = "Actualizar especialidad",
            description = "Actualiza el nombre o descripción de una especialidad existente según su ID."
    )
    @PutMapping("/{id}")
    public ResponseEntity<EspecialidadDTO> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody ActualizarEspecialidadDTO dto) {
        EspecialidadDTO especialidadActualizada = especialidadService.actualizar(id, dto);
        return ResponseEntity.ok(especialidadActualizada);
    }

    // DELETE /api/especialidades/{id} - Eliminar especialidad
    @Operation(
            summary = "Eliminar especialidad",
            description = "Elimina una especialidad del sistema según su ID."
    )
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        especialidadService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}