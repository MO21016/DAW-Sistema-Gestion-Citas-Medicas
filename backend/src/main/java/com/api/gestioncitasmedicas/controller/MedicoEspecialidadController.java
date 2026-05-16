package com.api.gestioncitasmedicas.controller;

import com.api.gestioncitasmedicas.dto.AsignarEspecialidadDTO;
import com.api.gestioncitasmedicas.service.MedicoEspecialidadService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "4. Médicos - Especialidades", description = "Operaciones para asignar y desasignar especialidades a médicos.")
@RestController
@RequestMapping("/api/medicos-especialidades")
@RequiredArgsConstructor
public class MedicoEspecialidadController {

    private final MedicoEspecialidadService medicoEspecialidadService;

    // POST /api/medicos-especialidades - Asignar especialidad a médico
    @Operation(
            summary = "Asignar especialidad a un médico",
            description = "Crea la relación entre un médico y una especialidad. Se requiere el ID del médico y el ID de la especialidad."
    )
    @PostMapping
    public ResponseEntity<String> asignar(@Valid @RequestBody AsignarEspecialidadDTO dto) {
        medicoEspecialidadService.asignarEspecialidadAMedico(dto);
        return ResponseEntity.ok("Especialidad asignada correctamente al médico");
    }

    // DELETE /api/medicos-especialidades?idMedico=1&idEspecialidad=2
    @Operation(
            summary = "Desasignar especialidad de un médico",
            description = "Elimina la relación entre un médico y una especialidad. Ejemplo: /api/medicos-especialidades?idMedico=1&idEspecialidad=2"
    )
    @DeleteMapping
    public ResponseEntity<Void> desasignar(
            @RequestParam Long idMedico,
            @RequestParam Long idEspecialidad) {
        medicoEspecialidadService.desasignarEspecialidadDeMedico(idMedico, idEspecialidad);
        return ResponseEntity.noContent().build();
    }
}
