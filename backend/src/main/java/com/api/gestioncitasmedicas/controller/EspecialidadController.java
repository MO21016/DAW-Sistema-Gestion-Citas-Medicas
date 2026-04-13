//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.api.gestioncitasmedicas.controller;

import com.api.gestioncitasmedicas.dto.ActualizarEspecialidadDTO;
import com.api.gestioncitasmedicas.dto.CrearEspecialidadDTO;
import com.api.gestioncitasmedicas.dto.EspecialidadDTO;
import com.api.gestioncitasmedicas.service.EspecialidadService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import lombok.Generated;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(
        name = "2. Especialidades",
        description = "Operaciones para la gestión de especialidades médicas."
)
@RestController
@RequestMapping({"/api/especialidades"})
public class EspecialidadController {
    private final EspecialidadService especialidadService;

    @Operation(
            summary = "Listar todas las especialidades",
            description = "Retorna una lista con todas las especialidades médicas registradas en el sistema."
    )
    @GetMapping
    public ResponseEntity<List<EspecialidadDTO>> listarTodas() {
        List<EspecialidadDTO> especialidades = this.especialidadService.obtenerTodas();
        return ResponseEntity.ok(especialidades);
    }

    @Operation(
            summary = "Obtener especialidad por ID",
            description = "Busca y retorna una especialidad específica según su ID. Si no existe, retorna 404."
    )
    @GetMapping({"/{id}"})
    public ResponseEntity<EspecialidadDTO> obtenerPorId(@PathVariable Long id) {
        EspecialidadDTO especialidad = this.especialidadService.obtenerPorId(id);
        return ResponseEntity.ok(especialidad);
    }

    @Operation(
            summary = "Crear nueva especialidad",
            description = "Registra una nueva especialidad médica en el sistema."
    )
    @PostMapping
    public ResponseEntity<EspecialidadDTO> crear(@RequestBody @Valid CrearEspecialidadDTO dto) {
        EspecialidadDTO nuevaEspecialidad = this.especialidadService.crear(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevaEspecialidad);
    }

    @Operation(
            summary = "Actualizar especialidad",
            description = "Actualiza el nombre o descripción de una especialidad existente según su ID."
    )
    @PutMapping({"/{id}"})
    public ResponseEntity<EspecialidadDTO> actualizar(@PathVariable Long id, @RequestBody @Valid ActualizarEspecialidadDTO dto) {
        EspecialidadDTO especialidadActualizada = this.especialidadService.actualizar(id, dto);
        return ResponseEntity.ok(especialidadActualizada);
    }

    @Operation(
            summary = "Eliminar especialidad",
            description = "Elimina una especialidad del sistema según su ID."
    )
    @DeleteMapping({"/{id}"})
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        this.especialidadService.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @Generated
    public EspecialidadController(final EspecialidadService especialidadService) {
        this.especialidadService = especialidadService;
    }
}
