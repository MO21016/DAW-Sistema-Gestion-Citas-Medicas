package com.api.gestioncitasmedicas.controller;

import com.api.gestioncitasmedicas.dto.ActualizarPacienteDTO;
import com.api.gestioncitasmedicas.dto.CrearPacienteDTO;
import com.api.gestioncitasmedicas.dto.PacienteDTO;
import com.api.gestioncitasmedicas.service.PacienteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "5. Pacientes", description = "Operaciones para la gestión de pacientes.")
@RestController
@RequestMapping("/api/pacientes")
@RequiredArgsConstructor
public class PacienteController {

    private final PacienteService pacienteService;

    // GET /api/pacientes - Listar todos
    @Operation(
            summary = "Listar todos los pacientes",
            description = "Retorna una lista con todos los pacientes registrados en el sistema."
    )
    @GetMapping
    public ResponseEntity<List<PacienteDTO>> listarTodos() {
        List<PacienteDTO> pacientes = pacienteService.obtenerTodos();
        return ResponseEntity.ok(pacientes);
    }

    // GET /api/pacientes/{id} - Obtener uno por ID
    @Operation(
            summary = "Obtener paciente por ID",
            description = "Busca y retorna un paciente específico según su ID. Si no existe, retorna 404."
    )
    @GetMapping("/{id}")
    public ResponseEntity<PacienteDTO> obtenerPorId(@PathVariable Long id) {
        PacienteDTO paciente = pacienteService.obtenerPorId(id);
        return ResponseEntity.ok(paciente);
    }

    // GET /api/pacientes/buscar?termino=Juan - Buscar por nombre o apellido
    @Operation(
            summary = "Buscar paciente por nombre o apellido",
            description = "Busca pacientes cuyo nombre o apellido contenga el término ingresado. Ejemplo: /buscar?termino=Juan"
    )
    @GetMapping("/buscar")
    public ResponseEntity<List<PacienteDTO>> buscar(@RequestParam String termino) {
        List<PacienteDTO> pacientes = pacienteService.buscarPorNombre(termino);
        return ResponseEntity.ok(pacientes);
    }

    // POST /api/pacientes - Crear nuevo paciente
    @Operation(
            summary = "Crear nuevo paciente",
            description = "Registra un nuevo paciente en el sistema."
    )
    @PostMapping
    public ResponseEntity<PacienteDTO> crear(@Valid @RequestBody CrearPacienteDTO dto) {
        PacienteDTO nuevoPaciente = pacienteService.crear(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoPaciente);
    }

    // PUT /api/pacientes/{id} - Actualizar paciente
    @Operation(
            summary = "Actualizar paciente",
            description = "Actualiza los datos de un paciente existente según su ID."
    )
    @PutMapping("/{id}")
    public ResponseEntity<PacienteDTO> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody ActualizarPacienteDTO dto) {
        PacienteDTO pacienteActualizado = pacienteService.actualizar(id, dto);
        return ResponseEntity.ok(pacienteActualizado);
    }

    // DELETE /api/pacientes/{id} - Eliminar paciente
    @Operation(
            summary = "Eliminar paciente",
            description = "Elimina un paciente del sistema según su ID."
    )
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        pacienteService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}