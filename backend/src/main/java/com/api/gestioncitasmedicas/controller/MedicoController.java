package com.api.gestioncitasmedicas.controller;

import com.api.gestioncitasmedicas.dto.ActualizarMedicoDTO;
import com.api.gestioncitasmedicas.dto.CrearMedicoDTO;
import com.api.gestioncitasmedicas.dto.MedicoDTO;
import com.api.gestioncitasmedicas.service.MedicoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "3. Médicos", description = "Operaciones para la gestión de médicos.")
@RestController
@RequestMapping("/api/medicos")
@RequiredArgsConstructor
public class MedicoController {

    private final MedicoService medicoService;

    // GET /api/medicos - Listar todos
    @Operation(
            summary = "Listar todos los médicos",
            description = "Retorna una lista con todos los médicos registrados en el sistema."
    )
    @GetMapping
    public ResponseEntity<List<MedicoDTO>> listarTodos() {
        List<MedicoDTO> medicos = medicoService.obtenerTodos();
        return ResponseEntity.ok(medicos);
    }

    // GET /api/medicos/{id} - Obtener uno por ID
    @Operation(
            summary = "Obtener médico por ID",
            description = "Busca y retorna un médico específico según su ID. Si no existe, retorna 404."
    )
    @GetMapping("/{id}")
    public ResponseEntity<MedicoDTO> obtenerPorId(@PathVariable Long id) {
        MedicoDTO medico = medicoService.obtenerPorId(id);
        return ResponseEntity.ok(medico);
    }

    // GET /api/medicos/{id}/especialidades - Obtener especialidades del médico
    @Operation(
            summary = "Ver especialidades del médico",
            description = "Retorna la lista de especialidades asignadas a un médico específico."
    )
    @GetMapping("/{id}/especialidades")
    public ResponseEntity<List<String>> obtenerEspecialidades(@PathVariable Long id) {
        List<String> especialidades = medicoService.obtenerEspecialidadesDeMedico(id);
        return ResponseEntity.ok(especialidades);
    }

    // POST /api/medicos - Crear nuevo médico
    @Operation(
            summary = "Crear nuevo médico",
            description = "Registra un nuevo médico en el sistema."
    )
    @PostMapping
    public ResponseEntity<MedicoDTO> crear(@Valid @RequestBody CrearMedicoDTO dto) {
        MedicoDTO nuevoMedico = medicoService.crear(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoMedico);
    }

    // PUT /api/medicos/{id} - Actualizar médico
    @Operation(
            summary = "Actualizar médico",
            description = "Actualiza los datos de un médico existente según su ID."
    )
    @PutMapping("/{id}")
    public ResponseEntity<MedicoDTO> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody ActualizarMedicoDTO dto) {
        MedicoDTO medicoActualizado = medicoService.actualizar(id, dto);
        return ResponseEntity.ok(medicoActualizado);
    }

    // DELETE /api/medicos/{id} - Eliminar médico
    @Operation(
            summary = "Eliminar médico",
            description = "Elimina un médico del sistema según su ID."
    )
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        medicoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}