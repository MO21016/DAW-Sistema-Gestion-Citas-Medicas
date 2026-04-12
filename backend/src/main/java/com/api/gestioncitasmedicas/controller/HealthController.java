package com.api.gestioncitasmedicas.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Tag(name = "1. Health", description = "Endpoints para verificar el estado del servidor.")
@RestController
@RequestMapping("/api")
public class HealthController {

    @Operation(
            summary = "Verificar estado del servidor",
            description = "Retorna el estado actual de la API, timestamp y versión. Usar para confirmar que el servidor está activo."
    )
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "OK");
        response.put("message", "API Gestión de Citas Médicas funcionando correctamente");
        response.put("timestamp", LocalDateTime.now());
        response.put("version", "1.0.0");

        return ResponseEntity.ok(response);
    }

    @Operation(
            summary = "Información del proyecto",
            description = "Retorna datos generales del proyecto: nombre, versión, equipo desarrollador y descripción."
    )
    @GetMapping("/info")
    public ResponseEntity<Map<String, String>> info() {
        Map<String, String> info = new HashMap<>();
        info.put("proyecto", "API REST - DAW");
        info.put("version", "1.0.0");
        info.put("desarrollador", "Equipo G9");
        info.put("descripcion", "Sistema para gestionar citas médicas con validación de disponibilidad");

        return ResponseEntity.ok(info);
    }
}